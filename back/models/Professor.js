'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Professor = sequelize.define('Professor', {
        codigo_institucional: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        area_atuacao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    // Relacionamento com Usuario
    Professor.belongsTo(sequelize.models.Usuario, { foreignKey: 'id' });

    return Professor;
};
