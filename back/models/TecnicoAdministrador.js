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
    TecnicoAdministrador.belongsTo(sequelize.models.Usuario, { foreignKey: 'id' });

    return TecnicoAdministrador;
};
