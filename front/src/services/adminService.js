import api from '../api.js';

const API_BASE_URL = '/api/professores';

const adminService = {

    async login(adminData) {
    try {
      const response = await api.post(`api/usuarios/login`, adminData);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login como administrador:');
      throw this._handleError(error);
    }
  },
};

export default adminService;