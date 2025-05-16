// src/services/ReservaService.js

// Você pode usar axios, fetch, ou qualquer outra lib para requisições HTTP
// Aqui vai um exemplo usando fetch para buscar reservas aceitas.

const API_BASE_URL = "http://localhost:3000/api"; // Ajuste para sua API real

const ReservaService = {
  async getReservasAceitas() {
    try {
      const response = await fetch(`${API_BASE_URL}/reservas?status=aceita`);
      if (!response.ok) {
        throw new Error("Erro ao buscar reservas aceitas");
      }
      const data = await response.json();
      return data; // espera-se um array de reservas aceitas
    } catch (error) {
      console.error("ReservaService.getReservasAceitas error:", error);
      throw error;
    }
  },

  // Pode adicionar mais métodos para criar, editar, deletar reservas...
};

export default ReservaService;
