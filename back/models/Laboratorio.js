'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Laboratorio = sequelize.define('Laboratorio', {
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
        blocoDidatico: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        numero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipoLaboratorio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        capacidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantidadeComputadores: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        equipamentosDisponiveis: {
            type: DataTypes.TEXT, // Pode ser uma lista em string separada por vírgula
            allowNull: false,
        },
        softwaresInstalados: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        capacidadePCD: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        responsavel: {
            type: DataTypes.STRING,
            allowNull: false,
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


    return Laboratorio;
};
