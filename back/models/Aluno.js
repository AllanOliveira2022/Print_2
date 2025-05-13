'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Aluno = sequelize.define('Aluno', {
        matricula: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    });

    // Relacionamento com Usuario
    Aluno.associate = (models) => {
        Aluno.belongsTo(models.Usuario, { foreignKey: 'id' });
    };
    return Aluno;
};
