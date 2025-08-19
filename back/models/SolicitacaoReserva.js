'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const SolicitacaoReserva = sequelize.define('SolicitacaoReserva', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        tipo: { // 'unica' ou 'semestral'
            type: DataTypes.STRING,
            allowNull: false,
        },

        data_inicio: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        data_fim: { // se tipo for 'unica', data_fim pode ser igual à data_inicio
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        dias_semana: { // exemplo: "Segunda, Quarta, Sexta"
            type: DataTypes.STRING,
            allowNull: false,
        },

        turno: { 
            type: DataTypes.STRING,
            allowNull: false,
        },

        horario: { // exemplo: "08:00 às 10:00"
            type: DataTypes.STRING,
            allowNull: false,
        },

        observacoes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        justificativa:{
            type:DataTypes.TEXT,
            allowNull:true,
            defaultValue: 'Nenhuma justificativa',

        },

        status: {
            type: DataTypes.ENUM('pendente', 'aceita', 'recusada', 'redirecionada'),
            allowNull: false,
            defaultValue: 'aceita',
        }
    }, {
        tableName: 'SolicitacoesReserva',
    });

    // Relacionamentos com Professor e Espaço
    SolicitacaoReserva.associate = (models) => {
        SolicitacaoReserva.belongsTo(models.Usuario, { foreignKey: 'professorId' });
        SolicitacaoReserva.belongsTo(models.Espaco, { foreignKey: 'espacoId' });
    };

    return SolicitacaoReserva;
};
