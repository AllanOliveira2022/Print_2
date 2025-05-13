'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const TecnicoAdministrador = sequelize.define('TecnicoAdministrador', {
        codigo_institucional: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    });

    // Relacionamento com Usuario
    TecnicoAdministrador.associate = (models) => {
        TecnicoAdministrador.belongsTo(models.Usuario, { foreignKey: 'id' });
    };

    return TecnicoAdministrador;
};
