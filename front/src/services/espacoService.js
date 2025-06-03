import api from '../api.js';

const API_BASE_URL = '/api/espacos';

const espacoService = {
  async cadastrar(espacoData) {
    try {
      const response = await api.post(`${API_BASE_URL}/cadastrar`, espacoData);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar espaço:', error);
      throw this._handleError(error);
    }
  },

  async listarTodos() {
    try {
      const response = await api.get(`${API_BASE_URL}/listar`);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar espaços:', error);
      throw this._handleError(error);
    }
  },

  async buscarPorId(id) {
    try {
      const response = await api.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar espaço com ID ${id}:`, error);
      throw this._handleError(error);
    }
  },

  async editar(id, dadosAtualizados) {
    try {
      const response = await api.put(`${API_BASE_URL}/${id}`, dadosAtualizados);
      return response.data;
    } catch (error) {
      console.error(`Erro ao editar espaço com ID ${id}:`, error);
      throw this._handleError(error);
    }
  },

  async excluir(id) {
    try {
      const response = await api.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir espaço com ID ${id}:`, error);
      throw this._handleError(error);
    }
  },

  async filtrar(filtros) {
    try {
      const response = await api.get(`${API_BASE_URL}/filtrar`, { params: filtros });
      return response.data;
    } catch (error) {
      console.error('Erro ao filtrar espaços:', error);
      throw this._handleError(error);
    }
  },
};

export default espacoService;