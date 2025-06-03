'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Bloco = sequelize.define('Bloco', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        tableName: 'Blocos' // 👈 Aqui está a correção
    });

    // Relacionamento com Laboratorio
    Bloco.associate = (models) => {
        Bloco.hasMany(models.Espaco, { foreignKey: 'blocoId', as: 'Espaço'});
    };

    return Bloco;
};
