import api from '../api.js';

const API_BASE_URL = '/api/blocos';

const blocoService = {
  async cadastrar(blocoData) {
    try {
      const response = await api.post(`${API_BASE_URL}/cadastrar`, blocoData);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar bloco:', error);
      throw this._handleError(error);
    }
  },

  async listarTodos() {
    try {
      const response = await api.get(`${API_BASE_URL}/listar`);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar blocos:', error);
      throw this._handleError(error);
    }
  },

  async buscarPorId(id) {
    try {
      const response = await api.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar bloco com ID ${id}:`, error);
      throw this._handleError(error);
    }
  },

  async editar(id, dadosAtualizados) {
    try {
      const response = await api.put(`${API_BASE_URL}/${id}`, dadosAtualizados);
      return response.data;
    } catch (error) {
      console.error(`Erro ao editar bloco com ID ${id}:`, error);
      throw this._handleError(error);
    }
  },

  async excluir(id) {
    try {
      const response = await api.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir bloco com ID ${id}:`, error);
      throw this._handleError(error);
    }
  },

  _handleError(error) {
    if (error.response && error.response.data && error.response.data.message) {
      return new Error(error.response.data.message);
    }
    return new Error('Erro inesperado na comunicação com o servidor.');
  }
};

export default blocoService;