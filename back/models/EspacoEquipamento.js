// models/espacoequipamento.model.js
'use strict';
import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const EspacoEquipamento = sequelize.define('EspacoEquipamento', {
        espacoId: {
            type: DataTypes.BIGINT.UNSIGNED,
            references: {
                model: 'Espacos',
                key: 'id'
            },
            onDelete: 'CASCADE',
        },
        equipamentoId: {
            type: DataTypes.BIGINT.UNSIGNED,
            references: {
                model: 'Equipamentos',
                key: 'id'
            },
            onDelete: 'CASCADE',
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'EspacoEquipamento',
        timestamps: false
    });

    return EspacoEquipamento;
};
