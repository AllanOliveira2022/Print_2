'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const senhaHash = await bcrypt.hash('admin1234', 10);

    await queryInterface.bulkInsert(
      'Usuarios',
      [
        {
          nome: 'Administrador Padrão',
          email: 'admin@gmail.com',
          senha: senhaHash,
          tipo: 'tecnico',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    );

    // Busca o ID do usuário recém-criado
    const [results] = await queryInterface.sequelize.query(
      `SELECT id FROM Usuarios WHERE email = 'admin@gmail.com' LIMIT 1;`
    );

    const usuarioId = results[0].id;

    await queryInterface.bulkInsert('TecnicoAdministradores', [
      {
        id: usuarioId,
        codigo_institucional: 'ADM001',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TecnicoAdministradores', {
      codigo_institucional: 'ADM001'
    }, {});

    await queryInterface.bulkDelete('Usuarios', {
      email: 'admin@gmail.com'
    }, {});
  }
};
