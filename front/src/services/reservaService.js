import api from "../api";

const API_BASE_URL = "http://localhost:3000/api"; // Ajuste para sua API real

const ReservaService = {
  async getReservasAceitas() {
    try {
      const response = await fetch(`${API_BASE_URL}/reservas?status=aceita`);
      if (!response.ok) {
        throw new Error("Erro ao buscar reservas aceitas");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("ReservaService.getReservasAceitas error:", error);
      throw error;
    }
  },

  async getReservasProfessor(professorId) {
    try {
      const response = await fetch(`${API_BASE_URL}/reservas/professor/${professorId}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar reservas do professor");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("ReservaService.getReservasProfessor error:", error);
      throw error;
    }
  },

  async getReservasProfessorPorStatus(professorId, status) {
    try {
      const response = await fetch(`${API_BASE_URL}/reservas/professor/${professorId}?status=${status}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar reservas do professor com status ${status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("ReservaService.getReservasProfessorPorStatus error:", error);
      throw error;
    }
  },

  async cancelarReserva(reservaId) {
    try {
      const response = await fetch(`${API_BASE_URL}/reservas/${reservaId}/cancelar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao cancelar reserva");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("ReservaService.cancelarReserva error:", error);
      throw error;
    }
  },

  async getDetalhesReserva(reservaId) {
    try {
      const response = await fetch(`${API_BASE_URL}/reservas/${reservaId}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar detalhes da reserva");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("ReservaService.getDetalhesReserva error:", error);
      throw error;
    }
  }
};

export default ReservaService;