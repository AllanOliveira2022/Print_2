'use strict';

import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export default (sequelize) => {
    const Usuario = sequelize.define('Usuario', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.ENUM('aluno', 'professor', 'tecnico'),
            allowNull: false,
        },
    });

    // Hook para criptografar a senha antes de criar ou atualizar o usuário
    Usuario.beforeCreate(async (usuario, options) => {
        if (usuario.senha) {
            const salt = await bcrypt.genSalt(10);
            usuario.senha = await bcrypt.hash(usuario.senha, salt);
        }
    });

    // Relacionamentos
    Usuario.associate = (models) => {
        Usuario.hasOne(models.Aluno, { foreignKey: 'id' });
        Usuario.hasOne(models.Professor, { foreignKey: 'id' });
        Usuario.hasOne(models.TecnicoAdministrador, { foreignKey: 'id' });
    };

    return Usuario;
};
