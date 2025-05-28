
import db from '../models/index.js'; 

export const cadastrarBloco = async (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({
            message: 'O nome do bloco é obrigatório.'
        });
    }

    try {
        const blocoExistente = await db.Bloco.findOne({ where: { nome } });
        if (blocoExistente) {
            return res.status(400).json({ message: 'Já existe um Bloco com esse nome!.' });
        }

        await db.Bloco.create({ nome });

        res.status(201).json({ message: 'Bloco cadastrado com sucesso.' });

    } catch (error) {
        console.error('Erro ao cadastrar bloco:', error);
        res.status(500).json({ message: 'Erro interno ao cadastrar bloco.' });
    }
};


