'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SolicitacoesReserva', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      data_inicio: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      data_fim: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      dias_semana: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      turno: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      horario: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      observacoes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM('pendente', 'aceita', 'recusada', 'redirecionada'),
        allowNull: false,
        defaultValue: 'pendente',
      },

      professorId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Usuarios', // ou 'Professores' dependendo do nome real da sua tabela
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      espacoId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Espacos',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SolicitacoesReserva');
  },
};
