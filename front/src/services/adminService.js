import api from '../api.js';

const adminService = {
    async login(adminData) {
        try {
            const response = await api.post(`api/usuarios/login`, adminData);
            return response.data;
        } catch (error) {
            console.error('Erro ao fazer login como administrador:');
            throw this._handleError(error);
        }
    },

    async listarProfessores() {
        try {
            const response = await api.get(`api/administradores/listarprof`);
            return response.data;
        } catch (error) {
            console.error('Erro ao listar professores:');
            throw this._handleError(error);
        }
    },

    _handleError(error) {
        if (error.response) {
            const message = error.response.data?.erro || 'Erro desconhecido no servidor';
            return new Error(message);
        } else if (error.request) {
            return new Error('Sem resposta do servidor');
        } else {
            return new Error('Erro ao configurar a requisição');
        }
    }
};

export default adminService;