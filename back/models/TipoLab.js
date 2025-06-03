'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Tipo = sequelize.define('Tipo', {
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
        tableName: 'Tipos' 
    });

    // Relacionamento com Laboratorio
    Tipo.associate = (models) => {
        Tipo.hasMany(models.Espaco, { foreignKey: 'tipoId' });
    };

    return Tipo;
};
