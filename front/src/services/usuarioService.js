import api from '../api.js';

const API_BASE_URL = '/api/usuarios';

const usuarioService = {
  async cadastrar(usuarioData) {
    try {
      const response = await api.post(`${API_BASE_URL}/cadastrar`, usuarioData);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      throw this._handleError(error);
    }
  },

  async login(loginData) {
    try {
      const response = await api.post(`${API_BASE_URL}/login`, loginData);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw this._handleError(error);
    }
  },

  async excluir(id) {
    try {
      const response = await api.delete(`${API_BASE_URL}/deletar/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir usuário com ID ${id}:`, error);
      throw this._handleError(error);
    }
  },

  _handleError(error) {
    if (error.response) {
      // Erros vindos do servidor (com status code)
      if (error.response.data && error.response.data.message) {
        return new Error(error.response.data.message);
      }
      return new Error(`Erro ${error.response.status}: ${error.response.statusText}`);
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      return new Error('Sem resposta do servidor. Verifique sua conexão.');
    } else {
      // Erro ao configurar a requisição
      return new Error('Erro ao configurar a requisição.');
    }
  }
};

export default usuarioService;
