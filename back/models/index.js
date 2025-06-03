'use strict';

import fs from 'fs'; 
import path from 'path'; 
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath } from 'url'; 
import configJson from '../config/config.js';

// Importar cada arquivo de modelo diretamente
import BlocoModel from './Bloco.js';
import EspacoModel from './Espaco.js';
import EquipamentoModel from './Equipamento.js';
import EspacoEquipamentoModel from './EspacoEquipamento.js';
import ProfessorModel from './Professor.js';
import TecnicoAdministradorModel from './TecnicoAdministrador.js';
import TipoLabModel from './TipoLab.js'; 
import UsuarioModel from './usuario.js';


const env = process.env.NODE_ENV || 'development';
const config = configJson[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Coloque os módulos de modelo importados em um array
const modelDefiners = [
  BlocoModel,
  EspacoModel,
  EquipamentoModel,
  EspacoEquipamentoModel,
  ProfessorModel,
  TecnicoAdministradorModel,
  TipoLabModel, 
  UsuarioModel
  // Adicione outros módulos de modelo aqui
];

// Inicializar cada modelo e adicioná-lo ao objeto db
modelDefiners.forEach(modelDefiner => {
  const model = modelDefiner(sequelize, DataTypes);
  db[model.name] = model; 
});

// Aplicar associações se elas existirem
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;