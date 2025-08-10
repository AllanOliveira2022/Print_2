import api from "../api.js";

const API_BASE_URL = "/api/solicitacao";

const ReservaService = {
  async fazerSolicitacao(solicitacaoData) {
    try {
      const response = await api.post(`${API_BASE_URL}/fazersolicitacao`, solicitacaoData);
      return response.data;
    } catch (error) {
      console.error("ReservaService.fazerSolicitacao error:", error);
      throw this._handleError(error);
    }
  },

  async listarSolicitacoes() {
    try {
      const response = await api.get(`${API_BASE_URL}/listar`);
      return response.data;
    } catch (error) {
      console.error("ReservaService.listarSolicitacoes error:", error);
      throw this._handleError(error);
    }
  },

  async getReservasAceitas() {
    try {
      const response = await api.get(`${API_BASE_URL}/listar?status=aceita`);
      return response.data;
    } catch (error) {
      console.error("ReservaService.getReservasAceitas error:", error);
      throw this._handleError(error);
    }
  },

  async getReservasProfessor(professorId) {
    try {
      const response = await api.get(`${API_BASE_URL}/listar?professorId=${professorId}`);
      return response.data;
    } catch (error) {
      console.error("ReservaService.getReservasProfessor error:", error);
      throw this._handleError(error);
    }
  },

  async getReservasProfessorPorStatus(professorId, status) {
    try {
      const response = await api.get(`${API_BASE_URL}/listar?professorId=${professorId}&status=${status}`);
      return response.data;
    } catch (error) {
      console.error("ReservaService.getReservasProfessorPorStatus error:", error);
      throw this._handleError(error);
    }
  },

  async cancelarReserva(reservaId) {
    try {
      const response = await api.put(`${API_BASE_URL}/${reservaId}/cancelar`);
      return response.data;
    } catch (error) {
      console.error("ReservaService.cancelarReserva error:", error);
      throw this._handleError(error);
    }
  },

  async getDetalhesReserva(reservaId) {
    try {
      const response = await api.get(`${API_BASE_URL}/${reservaId}`);
      return response.data;
    } catch (error) {
      console.error("ReservaService.getDetalhesReserva error:", error);
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

export default ReservaService;