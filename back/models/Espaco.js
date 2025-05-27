'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Espaco = sequelize.define('Espaco', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        codigoIdentificacao: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        tipoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Tipos',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        andar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipoEspaco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        capacidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        equipamentosDisponiveis: {
            type: DataTypes.TEXT, // Pode ser uma lista em string separada por vírgula
            allowNull: false,
        },
        capacidadePCD: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        responsavel: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        observacoes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        situacao:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Espaco.associate = (models) =>{
        Espaco.belongsTo(models.Bloco, {
            foreignKey: 'blocoId',
            as: 'bloco'
        });

        Espaco.belongsTo(models.Tipo, {
            foreignKey: 'tipoId',
            as: 'Tipo'
        });
        
    }


    return Espaco;
};
