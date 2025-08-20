'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const senhaHash = await bcrypt.hash('professor123', 10);

    // 1. Criar o usuário professor
    await queryInterface.bulkInsert('Usuarios', [
      {
        nome: 'Professor 1',
        email: 'professor@gmail.com',
        senha: senhaHash,
        tipo: 'professor',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // 2. Buscar o id do usuário recém criado
    const [usuarios] = await queryInterface.sequelize.query(
      `SELECT id FROM Usuarios WHERE email = 'professor@gmail.com' LIMIT 1;`
    );

    if (!usuarios || usuarios.length === 0) {
      throw new Error('Usuário professor não encontrado para vincular ao Professor.');
    }

    const usuarioId = usuarios[0].id;

    // 3. Criar o registro na tabela Professores
    await queryInterface.bulkInsert('Professores', [
      {
        id: usuarioId,
        codigo_institucional: 'PROF001',
        area_atuacao: 'Informática',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Professores', {
      codigo_institucional: 'PROF001'
    }, {});

    await queryInterface.bulkDelete('Usuarios', {
      email: 'professor@gmail.com'
    }, {});
  }
};
