import api from '../api.js';

const API_BASE_URL = '/api/professores';

const professorService = {
  async cadastrar(professorData) {
    try {
      const response = await api.post(`${API_BASE_URL}/cadastrar`, professorData);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar professor:');
      throw this._handleError(error);
    }
  },

    async login(professorData) {
    try {
      const response = await api.post(`api/usuarios/login`, professorData);
      localStorage.setItem("professorCodigo", response.data.usuario.id);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login como professor:');
      throw this._handleError(error);
    }
  },

  async listarTodos() {
    try {
      const response = await api.get(`${API_BASE_URL}/listar`);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar professores:', error);
      throw this._handleError(error);
    }
  },

  async buscarPorId(id) {
    try {
      const response = await api.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar professor com ID ${id}:`, error);
      throw this._handleError(error);
    }
  },

  async editar(id, dadosAtualizados) {
    try {
      const response = await api.put(`${API_BASE_URL}/editar/${id}`, dadosAtualizados);
      return response.data;
    } catch (error) {
      console.error(`Erro ao editar professor com ID ${id}:`, error);
      throw this._handleError(error);
    }
  },

  async excluir(id) {
    try {
      const response = await api.delete(`api/usuarios/deletar/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir professor com ID ${id}:`, error);
      throw this._handleError(error);
    }
  },

  async filtrar(filtros) {
    try {
      const response = await api.get(`${API_BASE_URL}/filtrar`, { params: filtros });
      return response.data;
    } catch (error) {
      console.error('Erro ao filtrar professores:', error);
      throw this._handleError(error);
    }
  },

  _handleError(error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400 && data.message === 'Email já cadastrado.') {
        return new Error('Email já cadastrado.');
      }
      if (status === 400) {
        return new Error(data.message || 'Dados inválidos. Verifique as informações fornecidas.');
      }
      if (status === 404) {
        return new Error('Professor não encontrado.');
      }
      if (status === 500) {
        return new Error('Erro interno do servidor. Tente novamente mais tarde.');
      }
      if (status === 401) {
        return new Error('Email ou Senha incorretos!');
      }
    }
    return new Error('Erro de conexão ou inesperado. Tente novamente.');
  },
};

export default professorService;