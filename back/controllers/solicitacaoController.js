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

    // Validação dos campos obrigatórios
    if (!tipo || !data_inicio || !data_fim || !dias_semana || !turno || !horario || !espacoId || !professorId) {
        return res.status(400).json({
            message: 'Todos os campos obrigatórios devem ser preenchidos.'
        });
    }

    const t = await db.sequelize.transaction();

    try {
        // Verifica se o espaço existe
        const espaco = await db.Espaco.findByPk(espacoId);
        if (!espaco) {
            await t.rollback();
            return res.status(404).json({ message: 'Espaço solicitado não encontrado.' });
        }

        // Verifica se o professor existe
        const professor = await db.Usuario.findByPk(professorId);
        if (!professor) {
            await t.rollback();
            return res.status(404).json({ message: 'Professor solicitante não encontrado.' });
        }

        // Cria a solicitação
        const solicitacao = await db.SolicitacaoReserva.create({
            tipo,
            data_inicio,
            data_fim,
            dias_semana,
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
        return res.status(500).json({
            message: 'Erro interno ao realizar solicitação.'
        });
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
