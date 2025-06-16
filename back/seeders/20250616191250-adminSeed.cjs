'use strict';

/*
ADMINISTRADOR
EMAIL:admin@gmail.com
SENHA: admin1234


*/


const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const senhaHash = await bcrypt.hash('admin1234', 10);

    // 1. Inserir o usuário
    await queryInterface.bulkInsert('Usuarios', [
      {
        nome: 'Administrador Padrão',
        email: 'admin@gmail.com',
        senha: senhaHash,
        tipo: 'tecnico',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // 2. Buscar o ID do usuário recém-inserido
    const [usuarios] = await queryInterface.sequelize.query(
      `SELECT id FROM Usuarios WHERE email = 'admin@gmail.com' LIMIT 1;`
    );

    if (!usuarios || usuarios.length === 0) {
      throw new Error('Usuário admin não encontrado para vincular ao Técnico Administrador.');
    }

    const usuarioId = usuarios[0].id;

    // 3. Inserir o TécnicoAdministrador com o ID correto
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
