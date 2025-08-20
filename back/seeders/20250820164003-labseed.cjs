'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Inserir o Bloco
    await queryInterface.bulkInsert('Blocos', [
      {
        nome: 'Bloco de Informática',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Buscar o id do bloco
    const [blocos] = await queryInterface.sequelize.query(
      `SELECT id FROM Blocos WHERE nome = 'Bloco de Informática' LIMIT 1;`
    );
    const blocoId = blocos[0].id;

    // 2. Inserir o Tipo
    await queryInterface.bulkInsert('Tipos', [
      {
        nome: 'Informática',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    const [tipos] = await queryInterface.sequelize.query(
      `SELECT id FROM Tipos WHERE nome = 'Informática' LIMIT 1;`
    );
    const tipoId = tipos[0].id;

    // 3. Inserir o Espaço
    await queryInterface.bulkInsert('Espacos', [
      {
        nome: 'Laboratório de Informática',
        codigoIdentificacao: 'LAB-INF-001',
        tipoId: tipoId,
        blocoId: blocoId,
        andar: '1º andar',
        capacidade: 22,
        capacidadePCD: true,
        responsavel: 'Coordenador de Informática',
        observacoes: 'Laboratório equipado para aulas práticas.',
        situacao: 'Disponivel',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    const [espacos] = await queryInterface.sequelize.query(
      `SELECT id FROM Espacos WHERE codigoIdentificacao = 'LAB-INF-001' LIMIT 1;`
    );
    const espacoId = espacos[0].id;

    // 4. Inserir Equipamento
    await queryInterface.bulkInsert('Equipamentos', [
      {
        nome: 'Computador',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    const [equipamentos] = await queryInterface.sequelize.query(
      `SELECT id FROM Equipamentos WHERE nome = 'Computador' LIMIT 1;`
    );
    const equipamentoId = equipamentos[0].id;

    // 5. Relacionar Espaço e Equipamento
    await queryInterface.bulkInsert('EspacoEquipamento', [
      {
        espacoId: espacoId,
        equipamentoId: equipamentoId,
        quantidade: 22
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove as associações
    await queryInterface.bulkDelete('EspacoEquipamento', null, {});
    await queryInterface.bulkDelete('Espacos', { codigoIdentificacao: 'LAB-INF-001' }, {});
    await queryInterface.bulkDelete('Equipamentos', { nome: 'Computador' }, {});
    await queryInterface.bulkDelete('Blocos', { nome: 'Bloco de Informática' }, {});
    await queryInterface.bulkDelete('Tipos', { nome: 'Informática' }, {});
  }
};
