import api from '../api.js';

const API_BASE_URL = '/api/tipos';

const tipoService = {
  async cadastrar(tipoData) {
    try {
      const response = await api.post(`${API_BASE_URL}/cadastrar`, tipoData);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar tipo:', error);
      throw this._handleError(error);
    }
  },

  async listarTodos() {
    try {
      const response = await api.get(`${API_BASE_URL}/listar`);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar tipos:', error);
      throw this._handleError(error);
    }
  },

  async buscarPorId(id) {
    try {
      const response = await api.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar tipo com ID ${id}:`, error);
      throw this._handleError(error);
    }
  },

  async editar(id, dadosAtualizados) {
    try {
      const response = await api.put(`${API_BASE_URL}/${id}`, dadosAtualizados);
      return response.data;
    } catch (error) {
      console.error(`Erro ao editar tipo com ID ${id}:`, error);
      throw this._handleError(error);
    }
  },

  async excluir(id) {
    try {
      const response = await api.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir tipo com ID ${id}:`, error);
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

export default tipoService;