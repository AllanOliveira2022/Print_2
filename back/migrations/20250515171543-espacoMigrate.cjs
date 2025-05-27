'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Espacos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      codigoIdentificacao: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      tipoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tipos',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      blocoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Blocos',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      andar: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipoEspaco: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      capacidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      equipamentosDisponiveis: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      capacidadePCD: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      responsavel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      observacoes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      situacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Espacos');
  },
};
