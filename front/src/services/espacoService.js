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

  async buscarPorNome(nome) {
    try {
      const response = await api.get(`${API_BASE_URL}/buscar/${nome}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar espaço por nome ${nome}:`, error);
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

  async filtrar(tipo, valor) {
    try {
      const response = await api.get(`${API_BASE_URL}/filtrar/${tipo}/${valor}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao filtrar espaços:', error);
      throw this._handleError(error);
    }
  },

  async filtrarPorParametros(filtros) {
    try {
      const response = await api.get(`${API_BASE_URL}/filtrar`, { params: filtros });
      return response.data;
    } catch (error) {
      console.error('Erro ao filtrar espaços por parâmetros:', error);
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

export default espacoService;