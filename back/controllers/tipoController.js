
import db from '../models/index.js'; 


export const cadastrarTipo = async (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({
            message: 'O nome do tipo é obrigatório.'
        });
    }

    try {
        const tipoExistente = await db.Tipo.findOne({ where: { nome } });
        if (tipoExistente) {
            return res.status(400).json({ message: 'Já existe um tipo com esse nome' });
        }

        await db.Tipo.create({ nome });

        res.status(201).json({ message: 'Tipo cadastrado com sucesso.' });

    } catch (error) {

        console.error('Erro ao cadastrar tipo:', error);
        res.status(500).json({ message: 'Erro interno ao cadastrar tipo.' });
    }
};


