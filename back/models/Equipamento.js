// models/equipamento.model.js
'use strict';
import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Equipamento = sequelize.define('Equipamento', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Equipamento.associate = (models) => {
        Equipamento.belongsToMany(models.Espaco, {
            through: models.EspacoEquipamento,
            foreignKey: 'equipamentoId',
            as: 'espacos'
        });
    };

    return Equipamento;
};
