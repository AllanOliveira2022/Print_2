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
};

export default ReservaService;