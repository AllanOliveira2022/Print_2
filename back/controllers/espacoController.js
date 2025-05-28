

import db from '../models/index.js'; // Importa o objeto 'db' que contém todos os seus modelos

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
    if (!nome || !codigoIdentificacao || !tipoId || !blocoId || !andar || !capacidade || !capacidadePCD || !situacao) {
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

