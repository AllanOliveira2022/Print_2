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
