'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EspacoEquipamento', {
      espacoId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Espacos',
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      equipamentoId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Equipamentos',
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EspacoEquipamento');
  },
};