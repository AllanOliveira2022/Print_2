'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Laboratorios', {
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
      blocoDidatico: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipoLaboratorio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      capacidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantidadeComputadores: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      equipamentosDisponiveis: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      softwaresInstalados: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      capacidadePCD: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      responsavel: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('Laboratorios');
  },
};
