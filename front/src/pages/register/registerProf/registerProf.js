import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import professorService from "../../../services/professorService";

const ErrorAlert = ({ error, onClose }) => {
  if (!error) return null;
  
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-700">{error}</p>
        </div>
        <div className="ml-auto pl-3">
          <button 
            onClick={onClose} 
            className="text-red-400 hover:text-red-600 transition-colors" 
            type="button"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const SuccessAlert = ({ show, message, onClose }) => {
  if (!show) return null;
  
  return (
    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-green-700">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <button 
            onClick={onClose} 
            className="text-green-400 hover:text-green-600 transition-colors" 
            type="button"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

function RegisterProf() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmPassword: "",
    codigo_institucional: "",
    area_atuacao: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validações
  const validateForm = () => {
    const { nome, email, senha, confirmPassword, codigo_institucional, area_atuacao } = formData;
    
    if (!nome.trim() || nome.length < 2) {
      setError("Nome deve ter pelo menos 2 caracteres.");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um email válido.");
      return false;
    }
    
    if (senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }
    
    if (senha !== confirmPassword) {
      setError("As senhas não coincidem.");
      return false;
    }
    
    if (!codigo_institucional.trim()) {
      setError("Código institucional é obrigatório.");
      return false;
    }
    
    if (!area_atuacao.trim()) {
      setError("Área de atuação é obrigatória.");
      return false;
    }
    
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const professorData = {
        nome: formData.nome.trim(),
        email: formData.email.trim().toLowerCase(),
        senha: formData.senha,
        codigo_institucional: formData.codigo_institucional.trim(),
        area_atuacao: formData.area_atuacao.trim(),
      };

      await professorService.cadastrar(professorData);
      setSuccess(true);
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error) {
      setError(error.message || "Erro ao cadastrar professor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-md" onSubmit={handleSubmit}>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-700">SIGEF</h1>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">Criar conta - Professor</h2>
          </div>

          <ErrorAlert error={error} onClose={() => setError(null)} />
          
          <SuccessAlert 
            show={success} 
            message="Professor cadastrado com sucesso! Redirecionando..."
            onClose={() => setSuccess(false)}
          />

          <div className="space-y-4">
            <div>
              <label htmlFor="institutional-code" className="block text-sm font-medium text-gray-700">
                Código Institucional <span className="text-red-500">*</span>
              </label>
              <input
                id="institutional-code"
                name="codigo_institucional"
                type="text"
                value={formData.codigo_institucional}
                onChange={handleChange}
                required
                placeholder="Código"
                disabled={loading}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="nome"
                type="text"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Seu nome completo"
                disabled={loading}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="seu@email.com"
                disabled={loading}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              />
            </div>

            <div>
              <label htmlFor="area-atuacao" className="block text-sm font-medium text-gray-700">
                Área de Atuação <span className="text-red-500">*</span>
              </label>
              <input
                id="area-atuacao"
                name="area_atuacao"
                type="text"
                value={formData.area_atuacao}
                onChange={handleChange}
                required
                placeholder="Ex: Matemática, Física, etc."
                disabled={loading}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  name="senha"
                  type="password"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  disabled={loading}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                />
                <p className="mt-1 text-xs text-gray-500">Mínimo 6 caracteres</p>
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirmar Senha <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  disabled={loading}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Cadastrando...
                </div>
              ) : (
                "Criar Conta"
              )}
            </button>

            <Link
              to="/"
              className="w-full flex justify-center py-2 px-4 border border-green-600 rounded-lg shadow-sm text-sm font-medium text-green-600 bg-white hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Já tenho uma conta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterProf;