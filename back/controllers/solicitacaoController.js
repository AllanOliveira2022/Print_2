import db from '../models/index.js';
import { Op } from 'sequelize';

export const fazerSolicitacao = async (req, res) => {
    const {
        tipo,
        data_inicio,
        data_fim,
        dias_semana,
        turno,
        horario,
        observacoes,
        espacoId,
        professorId
    } = req.body;

    // Validação de campos
    if (!tipo || !data_inicio || !data_fim || !dias_semana || !turno || !horario || !espacoId || !professorId) {
        return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    // Garante que 'dias_semana' seja um array para a lógica de verificação
    let diasSemanaArray = dias_semana;
    if (typeof dias_semana === 'string') {
        diasSemanaArray = dias_semana.split(',').map(dia => dia.trim());
    } else if (!Array.isArray(dias_semana)) {
        return res.status(400).json({ message: "O formato de 'dias_semana' é inválido." });
    }
    
    const t = await db.sequelize.transaction();

    try {
        const espaco = await db.Espaco.findByPk(espacoId);
        if (!espaco) {
            await t.rollback();
            return res.status(404).json({ message: 'Espaço solicitado não encontrado.' });
        }

        const professor = await db.Usuario.findByPk(professorId);
        if (!professor) {
            await t.rollback();
            return res.status(404).json({ message: 'Professor solicitante não encontrado.' });
        }
        
        const condicaoDiasSemana = diasSemanaArray.map(dia => ({
            dias_semana: { [Op.like]: `%${dia}%` }
        }));

        const conflitoEncontrado = await db.SolicitacaoReserva.findOne({
            where: {
                espacoId: espacoId,
                status: 'aceita', // << PONTO DE CORREÇÃO 1
                turno: turno,
                horario: horario,
                data_inicio: { [Op.lte]: data_fim },
                data_fim: { [Op.gte]: data_inicio },
                [Op.or]: condicaoDiasSemana,
            }
        });

        if (conflitoEncontrado) {
            await t.rollback();
            return res.status(409).json({ message: 'Conflito de agendamento. O espaço já está reservado.' });
        }
        
        const solicitacao = await db.SolicitacaoReserva.create({
            tipo,
            data_inicio,
            data_fim,
            dias_semana: diasSemanaArray.join(', '), // << PONTO DE CORREÇÃO 2
            turno,
            horario,
            observacoes,
            espacoId,
            professorId
        }, { transaction: t });

        await t.commit();
        return res.status(201).json({
            message: 'Solicitação de reserva enviada com sucesso.',
            solicitacao
        });

    } catch (error) {
        await t.rollback();
        console.error('Erro ao fazer solicitação:', error);
        return res.status(500).json({ message: 'Erro interno ao realizar solicitação.' });
    }
};

export const verSolicitacoes = async (req, res) => {
    try {
        const solicitacoes = await db.SolicitacaoReserva.findAll({
            include: [
                {
                    model: db.Usuario,
                    attributes: ['id', 'nome', 'email', 'tipo'],
                },
                {
                    model: db.Espaco,
                    include: [
                        {
                            model: db.Bloco,
                            as: 'bloco',
                            attributes: ['id', 'nome']
                        },
                        {
                            model: db.Tipo,
                            as: 'Tipo',
                            attributes: ['id', 'nome']
                        }
                    ],
                    attributes: [
                        'id',
                        'nome',
                        'codigoIdentificacao',
                        'andar',
                        'capacidade',
                        'capacidadePCD',
                        'responsavel',
                        'observacoes',
                        'situacao'
                    ]
                }
            ]
        });

        res.status(200).json(solicitacoes);
    } catch (error) {
        console.error('Erro ao listar solicitações:', error);
        res.status(500).json({ message: 'Erro interno ao listar solicitações.' });
    }
};

//mostra as reservas feitas pelo professor logado
export const verSolicitacaoProf = async (req, res) => {
    try {
        // Se você tiver middleware de autenticação JWT/Session, geralmente vem de req.user.id
        const professorId = req.user?.id || req.params.id;

        if (!professorId) {
            return res.status(400).json({ message: 'ID do professor não encontrado.' });
        }

        const solicitacoes = await db.SolicitacaoReserva.findAll({
            where: { professorId }, // <<--- filtro por usuário logado
            include: [
                {
                    model: db.Usuario,
                    attributes: ['id', 'nome', 'email', 'tipo'],
                },
                {
                    model: db.Espaco,
                    include: [
                        {
                            model: db.Bloco,
                            as: 'bloco',
                            attributes: ['id', 'nome']
                        },
                        {
                            model: db.Tipo,
                            as: 'Tipo',
                            attributes: ['id', 'nome']
                        }
                    ],
                    attributes: [
                        'id',
                        'nome',
                        'codigoIdentificacao',
                        'andar',
                        'capacidade',
                        'capacidadePCD',
                        'responsavel',
                        'observacoes',
                        'situacao'
                    ]
                }
            ]
        });

        if (solicitacoes.length === 0) {
            return res.status(404).json({ message: 'Nenhuma solicitação encontrada para este professor.' });
        }

        res.status(200).json(solicitacoes);
    } catch (error) {
        console.error('Erro ao listar solicitações do professor:', error);
        res.status(500).json({ message: 'Erro interno ao listar solicitações do professor.' });
    }
};

// aceitar, recusar ou redirecionar uma solicitação - ADMIN
export const tratarSolicitacao = async (req, res) => {
    const { id } = req.params; // id da solicitação que vai ser tratada
    const { status, justificativa, novoEspacoId } = req.body;

    // Validação de status
    const statusValidos = ['aceita', 'recusada', 'redirecionada'];
    if (!statusValidos.includes(status)) {
        return res.status(400).json({ message: 'Status inválido. Use: aceita, recusada ou redirecionada.' });
    }

    try {
        const solicitacao = await db.SolicitacaoReserva.findByPk(id);

        if (!solicitacao) {
            return res.status(404).json({ message: 'Solicitação não encontrada.' });
        }

        // Caso seja recusada ou redirecionada, justificativa é obrigatória
        if ((status === 'recusada' || status === 'redirecionada') && !justificativa) {
            return res.status(400).json({ message: 'É necessário fornecer uma justificativa.' });
        }

        // Se for redirecionada, precisa de novo espaço
        if (status === 'redirecionada') {
            if (!novoEspacoId) {
                return res.status(400).json({ message: 'É necessário informar o novo espaço para redirecionar.' });
            }

            const novoEspaco = await db.Espaco.findByPk(novoEspacoId);
            if (!novoEspaco) {
                return res.status(404).json({ message: 'Novo espaço informado não encontrado.' });
            }

            solicitacao.espacoId = novoEspacoId; // Atualiza o espaço da solicitação
        }

        solicitacao.status = status;
        solicitacao.justificativa = justificativa || solicitacao.justificativa;

        await solicitacao.save();

        return res.status(200).json({
            message: `Solicitação ${status} com sucesso.`,
            solicitacao,
        });

    } catch (error) {
        console.error('Erro ao tratar solicitação:', error);
        return res.status(500).json({ message: 'Erro interno ao tratar solicitação.' });
    }
};


//mostra todos os espaços disponiveis na data solicitada
export const verEspacosDisponiveis = async (req, res) => {
    const {
        data_inicio,
        data_fim,
        dias_semana,
        turno,
        horario,
    } = req.query; // Usar req.query para dados GET

    // Validação de campos
    if (!data_inicio || !data_fim || !dias_semana || !turno || !horario) {
        return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    // Garante que 'dias_semana' seja um array
    let diasSemanaArray = dias_semana.split(',').map(dia => dia.trim());

    try {
        const condicaoDiasSemana = diasSemanaArray.map(dia => ({
            dias_semana: { [Op.like]: `%${dia}%` }
        }));

        // Primeiro, encontre todos os espaços que ESTÃO ocupados
        const espacosOcupados = await db.SolicitacaoReserva.findAll({
            attributes: ['espacoId'],
            where: {
                status: 'aceita',
                turno: turno,
                horario: horario,
                data_inicio: { [Op.lte]: data_fim },
                data_fim: { [Op.gte]: data_inicio },
                [Op.or]: condicaoDiasSemana,
            },
            group: ['espacoId'], // Agrupa para ter IDs únicos
        });

        // Extrai os IDs dos espaços ocupados para uma lista
        const idsEspacosOcupados = espacosOcupados.map(solicitacao => solicitacao.espacoId);

        // Agora, encontre todos os espaços que NÃO ESTÃO nessa lista de ocupados
        const espacosDisponiveis = await db.Espaco.findAll({
            where: {
                id: {
                    [Op.notIn]: idsEspacosOcupados,
                },
            },
            include: [
                {
                    model: db.Bloco,
                    as: 'bloco',
                    attributes: ['id', 'nome']
                },
                {
                    model: db.Tipo,
                    as: 'Tipo',
                    attributes: ['id', 'nome']
                }
            ],
        });

        if (espacosDisponiveis.length === 0) {
            return res.status(404).json({ message: 'Nenhum espaço disponível encontrado com os critérios fornecidos.' });
        }

        return res.status(200).json({
            message: 'Espaços disponíveis encontrados com sucesso.',
            espacos: espacosDisponiveis,
        });

    } catch (error) {
        console.error('Erro ao verificar disponibilidade de espaços:', error);
        return res.status(500).json({ message: 'Erro interno ao verificar disponibilidade.' });
    }
};


