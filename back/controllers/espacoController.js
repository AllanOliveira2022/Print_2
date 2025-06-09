

import db from '../models/index.js'; // Importa o objeto 'db' que contém todos os seus modelos
import { Op } from 'sequelize';
export const cadastrarEspaco = async (req, res) => {
    // Extrai os dados do corpo da requisição
    const {
        nome,
        codigoIdentificacao,
        tipoId,
        blocoId, // Assumindo que blocoId virá do frontend
        andar,
        capacidade,
        capacidadePCD,
        responsavel,
        observacoes,
        situacao,
        equipamentos // Esta será uma array de objetos de equipamento
    } = req.body;

    // Validação básica dos campos obrigatórios do Espaço

    if (capacidadePCD === null || capacidadePCD === undefined || capacidadePCD === ""){
        return res.status(400).json({
            message: 'O campo capacidade PCD é obrigatório!'
        });

    }
    if (!nome || !codigoIdentificacao || !tipoId || !blocoId || !andar || !capacidade || !situacao) {
        return res.status(400).json({
            message: 'Todos os campos obrigatórios do espaço (nome, código, tipo, bloco, andar, capacidade, capacidade PCD, situação) devem ser preenchidos.'
        });
    }

    // Inicia uma transação para garantir que todas as operações (criar espaço, criar equipamentos, criar associações)
    // sejam bem-sucedidas ou que todas sejam revertidas em caso de erro.
    const t = await db.sequelize.transaction();

    try {
        // 1. Verifica se o código de identificação do espaço já existe
        const espacoExistente = await db.Espaco.findOne({ where: { codigoIdentificacao } });
        if (espacoExistente) {
            await t.rollback(); // Reverte a transação
            return res.status(400).json({ message: 'Já existe um espaço com este código de identificação.' });
        }

        // 2. Cria o novo Espaço
        const novoEspaco = await db.Espaco.create({
            nome,
            codigoIdentificacao,
            tipoId,
            blocoId, 
            andar,
            capacidade,
            capacidadePCD,
            responsavel,
            observacoes,
            situacao
        }, { transaction: t });

        // 3. Processa os equipamentos
        if (equipamentos && equipamentos.length > 0) {
            for (const itemEquipamento of equipamentos) {
                const { nome: nomeEquipamento, quantidade } = itemEquipamento;
                
                if (!nomeEquipamento || !quantidade) {
                    await t.rollback();
                    return res.status(400).json({ message: 'Nome e quantidade são obrigatórios para cada equipamento.' });
                }
                

                // Tenta encontrar o equipamento existente pelo nome
                let equipamento = await db.Equipamento.findOne({ where: { nome: nomeEquipamento } });


                if (!equipamento) {
                    equipamento = await db.Equipamento.create({ nome: nomeEquipamento }, { transaction: t });
                }


                await db.EspacoEquipamento.create({
                    espacoId: novoEspaco.id,
                    equipamentoId: equipamento.id,
                    quantidade: quantidade
                }, { transaction: t });
            }
        }


        await t.commit();
        res.status(201).json({ message: 'Espaço e equipamentos cadastrados com sucesso.' });

    } catch (error) {

        await t.rollback();
        console.error('Erro ao cadastrar espaço e equipamentos:', error);
        res.status(500).json({ message: 'Erro interno ao cadastrar espaço e equipamentos.' });
    }
};

export const listarEspacos = async (req, res) => {
    try {
        const espacos = await db.Espaco.findAll({
            include: [
                {
                    model: db.Bloco,
                    as: 'bloco', // Usar o 'as' definido na associação do model Espaco
                    attributes: ['nome'] // Seleciona apenas o nome do bloco
                },
                {
                    model: db.Tipo,
                    as: 'Tipo', // Usar o 'as' definido na associação do model Espaco
                    attributes: ['nome'] // Seleciona apenas o nome do tipo
                },
                {
                    model: db.Equipamento,
                    as: 'equipamentos', // Usar o 'as' definido na associação do model Espaco
                    through: {
                        attributes: ['quantidade'] // Seleciona a quantidade da tabela de junção
                    },
                    attributes: ['nome'] // Seleciona o nome do equipamento
                }
            ],
            order: [
                ['nome', 'ASC'] // Ordena os espaços pelo nome
            ]
        });

        // Mapeia os resultados para o formato desejado, concatenando os equipamentos
        const espacosFormatados = espacos.map(espaco => {
            const dadosEspaco = espaco.get({ plain: true }); // Obtém um objeto JSON simples do modelo

            // Concatena os equipamentos
            const equipamentosConcatenados = dadosEspaco.equipamentos
                .map(equipamento => `${equipamento.nome} (${equipamento.EspacoEquipamento.quantidade})`)
                .join('; '); // Junta com '; ' como separador

            return {
                id: dadosEspaco.id,
                nome: dadosEspaco.nome,
                codigoIdentificacao: dadosEspaco.codigoIdentificacao,
                nomeBloco: dadosEspaco.bloco ? dadosEspaco.bloco.nome : null, // Verifica se bloco existe
                nomeTipo: dadosEspaco.Tipo ? dadosEspaco.Tipo.nome : null, // Verifica se tipo existe
                andar: dadosEspaco.andar,
                capacidade: dadosEspaco.capacidade,
                capacidadePCD: dadosEspaco.capacidadePCD,
                responsavel: dadosEspaco.responsavel,
                observacoes: dadosEspaco.observacoes,
                situacao: dadosEspaco.situacao,
                equipamentos: equipamentosConcatenados || 'Nenhum equipamento associado.' // Mostra uma mensagem se não houver equipamentos
            };
        });

        res.status(200).json(espacosFormatados);

    } catch (error) {
        console.error('Erro ao listar espaços:', error);
        res.status(500).json({ message: 'Erro interno ao listar espaços.' });
    }
};

export const listarEspacosId = async (req, res) => {
    try {
        const { id } = req.params; 

        const espaco = await db.Espaco.findByPk(id, { 
            include: [
                {
                    model: db.Bloco,
                    as: 'bloco',
                    attributes: ['nome']
                },
                {
                    model: db.Tipo,
                    as: 'Tipo',
                    attributes: ['nome']
                },
                {
                    model: db.Equipamento,
                    as: 'equipamentos',
                    through: {
                        attributes: ['quantidade']
                    },
                    attributes: ['nome']
                }
            ]
        });

        // Se o espaço não for encontrado
        if (!espaco) {
            return res.status(404).json({ message: 'Espaço não encontrado.' });
        }

        // Formata o resultado para ter os equipamentos concatenados, similar ao listarEspacos
        const dadosEspaco = espaco.get({ plain: true });

        const equipamentosConcatenados = dadosEspaco.equipamentos
            .map(equipamento => `${equipamento.nome} (${equipamento.EspacoEquipamento.quantidade})`)
            .join('; ');

        const espacoFormatado = {
            id: dadosEspaco.id,
            nome: dadosEspaco.nome,
            codigoIdentificacao: dadosEspaco.codigoIdentificacao,
            nomeBloco: dadosEspaco.bloco ? dadosEspaco.bloco.nome : null,
            nomeTipo: dadosEspaco.Tipo ? dadosEspaco.Tipo.nome : null,
            andar: dadosEspaco.andar,
            capacidade: dadosEspaco.capacidade,
            capacidadePCD: dadosEspaco.capacidadePCD,
            responsavel: dadosEspaco.responsavel,
            observacoes: dadosEspaco.observacoes,
            situacao: dadosEspaco.situacao,
            equipamentos: equipamentosConcatenados || 'Nenhum equipamento associado.'
        };

        res.status(200).json(espacoFormatado);

    } catch (error) {
        console.error('Erro ao buscar espaço por ID:', error);
        res.status(500).json({ message: 'Erro interno ao buscar espaço.' });
    }
};

export const buscarEspacos = async (req, res) => {
    try {
        const { nomeEspaco } = req.params;

        const whereClause = {};

        if (nomeEspaco) {
            whereClause.nome = {
                [Op.like]: `%${nomeEspaco}%`  // corrigido para MySQL
            };
        }

        const espacos = await db.Espaco.findAll({
            where: whereClause,
            include: [
                {
                    model: db.Bloco,
                    as: 'bloco',
                    attributes: ['nome'],
                    required: false
                },
                {
                    model: db.Tipo,
                    as: 'Tipo',
                    attributes: ['nome'],
                    required: false
                },
                {
                    model: db.Equipamento,
                    as: 'equipamentos',
                    through: {
                        attributes: ['quantidade']
                    },
                    attributes: ['nome'],
                    required: false
                }
            ],
            order: [['nome', 'ASC']]
        });

        const espacosFormatados = espacos.map(espaco => {
            const dados = espaco.get({ plain: true });
            const equipamentos = dados.equipamentos.map(e => `${e.nome} (${e.EspacoEquipamento.quantidade})`).join('; ');

            return {
                id: dados.id,
                nome: dados.nome,
                codigoIdentificacao: dados.codigoIdentificacao,
                nomeBloco: dados.bloco?.nome || null,
                nomeTipo: dados.Tipo?.nome || null,
                andar: dados.andar,
                capacidade: dados.capacidade,
                capacidadePCD: dados.capacidadePCD,
                responsavel: dados.responsavel,
                observacoes: dados.observacoes,
                situacao: dados.situacao,
                equipamentos: equipamentos || 'Nenhum equipamento associado.'
            };
        });

        res.status(200).json(espacosFormatados);
    } catch (error) {
        console.error('Erro ao buscar espaços:', error);
        res.status(500).json({ message: 'Erro interno ao buscar espaços.' });
    }
};


export const filtrarEspaco = async (req, res) => {
    try {
        const { tipo, valor } = req.params;

        let filtro = {};

        switch (tipo) {
            case 'tipoLaboratorio':
                filtro['$Tipo.nome$'] = { [Op.like]: `%${valor}%` };
                break;

            case 'bloco':
                filtro['$bloco.nome$'] = { [Op.like]: `%${valor}%` };
                break;

            case 'capacidadeAlunos':
                filtro.capacidade = parseInt(valor);
                break;

            case 'capacidadePCD':
                filtro.capacidadePCD = parseInt(valor);
                break;

            default:
                return res.status(400).json({ message: 'Tipo de filtro inválido.' });
        }

        const espacos = await db.Espaco.findAll({
            where: filtro,
            include: [
                {
                    model: db.Bloco,
                    as: 'bloco',
                    attributes: ['nome']
                },
                {
                    model: db.Tipo,
                    as: 'Tipo',
                    attributes: ['nome']
                },
                {
                    model: db.Equipamento,
                    as: 'equipamentos',
                    through: { attributes: ['quantidade'] },
                    attributes: ['nome']
                }
            ],
            order: [['nome', 'ASC']]
        });

        const espacosFormatados = espacos.map(espaco => {
            const dados = espaco.get({ plain: true });
            const equipamentos = dados.equipamentos.map(e => `${e.nome} (${e.EspacoEquipamento.quantidade})`).join('; ');

            return {
                id: dados.id,
                nome: dados.nome,
                codigoIdentificacao: dados.codigoIdentificacao,
                nomeBloco: dados.bloco?.nome || null,
                nomeTipo: dados.Tipo?.nome || null,
                andar: dados.andar,
                capacidade: dados.capacidade,
                capacidadePCD: dados.capacidadePCD,
                responsavel: dados.responsavel,
                observacoes: dados.observacoes,
                situacao: dados.situacao,
                equipamentos: equipamentos || 'Nenhum equipamento associado.'
            };
        });

        return res.status(200).json(espacosFormatados);

    } catch (error) {
        console.error('Erro ao filtrar espaços:', error);
        return res.status(500).json({ message: 'Erro interno ao filtrar espaços.' });
    }
};

export const excluirEspaco = async (req, res) => {
    const { id } = req.params; 

    const t = await db.sequelize.transaction();

    try {
        const espaco = await db.Espaco.findByPk(id, { transaction: t });

        if (!espaco) {
            await t.rollback(); 
            return res.status(404).json({ message: 'Espaço não encontrado.' });
        }

        await db.EspacoEquipamento.destroy({
            where: { espacoId: id },
            transaction: t
        });

        await espaco.destroy({ transaction: t });

        await t.commit();
        res.status(200).json({ message: 'Espaço excluído com sucesso.' });

    } catch (error) {
        await t.rollback();
        console.error('Erro ao excluir espaço:', error);
        res.status(500).json({ message: 'Erro interno ao excluir espaço.' });
    }
};