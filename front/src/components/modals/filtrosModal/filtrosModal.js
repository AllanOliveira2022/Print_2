import { useEffect, useState, useRef } from "react";
import tipoService from "../../../services/tipoService";
import blocoService from "../../../services/blocoService";

function FiltrosModal({ isOpen, onClose, onConfirm }) {
  const [tipos, setTipos] = useState([]);
  const [blocos, setBlocos] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [blocoSelecionado, setBlocoSelecionado] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [capacidadePCD, setCapacidadePCD] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      carregarFiltros();
      // Focus on modal when it opens
      modalRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const carregarFiltros = async () => {
    setLoading(true);
    try {
      const tiposData = await tipoService.listarTodos();
      setTipos(tiposData);
      const blocosData = await blocoService.listarTodos();
      setBlocos(blocosData);
    } catch (err) {
      console.error("Erro ao carregar filtros:", err);
      setErrors({ general: "Erro ao carregar filtros. Tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (capacidade && (isNaN(capacidade) || capacidade < 0)) {
      newErrors.capacidade = "Capacidade deve ser um número não negativo.";
    }
    if (capacidadePCD && (isNaN(capacidadePCD) || capacidadePCD < 0)) {
      newErrors.capacidadePCD = "Capacidade PCD deve ser um número não negativo.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAplicarFiltros = () => {
    if (!validateForm()) return;
    setLoading(true);
    onConfirm({
      tipoId: tipoSelecionado,
      blocoId: blocoSelecionado,
      capacidade: capacidade ? parseInt(capacidade) : "",
      capacidadePCD: capacidadePCD ? parseInt(capacidadePCD) : "",
    });
    setLoading(false);
    onClose();
  };

  const limparFiltros = () => {
    setTipoSelecionado("");
    setBlocoSelecionado("");
    setCapacidade("");
    setCapacidadePCD("");
    setErrors({});
  };

  const handleLimparEAplicar = () => {
    limparFiltros();
    onConfirm({
      tipoId: "",
      blocoId: "",
      capacidade: "",
      capacidadePCD: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 id="modal-title" className="text-2xl font-bold text-green-800 mb-4">
          Filtrar Espaços
        </h1>
        {errors.general && (
          <p className="text-red-500 mb-4" role="alert">
            {errors.general}
          </p>
        )}
        {loading ? (
          <p className="text-gray-600">Carregando...</p>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center">
              <label className="w-1/5 text-sm font-medium text-gray-700">
                Tipo de Espaço:
              </label>
              <select
                value={tipoSelecionado}
                onChange={(e) => setTipoSelecionado(e.target.value)}
                className="w-4/5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                aria-label="Selecionar tipo de espaço"
              >
                <option value="">Selecione um tipo de espaço</option>
                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="w-1/5 text-sm font-medium text-gray-700">
                Bloco Didático:
              </label>
              <select
                value={blocoSelecionado}
                onChange={(e) => setBlocoSelecionado(e.target.value)}
                className="w-4/5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                aria-label="Selecionar bloco didático"
              >
                <option value="">Selecione um bloco</option>
                {blocos.map((bloco) => (
                  <option key={bloco.id} value={bloco.id}>
                    {bloco.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="w-1/5 text-sm font-medium text-gray-700">
                Capacidade Total:
              </label>
              <div className="w-4/5">
                <input
                  type="number"
                  min="0"
                  value={capacidade}
                  onChange={(e) => setCapacidade(e.target.value)}
                  className={`w-full px-4 py-2 border ${
                    errors.capacidade ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`}
                  aria-label="Capacidade total"
                  aria-invalid={!!errors.capacidade}
                  aria-describedby={errors.capacidade ? "capacidade-error" : null}
                />
                {errors.capacidade && (
                  <p id="capacidade-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.capacidade}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <label className="w-1/5 text-sm font-medium text-gray-700">
                Capacidade PCD:
              </label>
              <div className="w-4/5">
                <input
                  type="number"
                  min="0"
                  value={capacidadePCD}
                  onChange={(e) => setCapacidadePCD(e.target.value)}
                  className={`w-full px-4 py-2 border ${
                    errors.capacidadePCD ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`}
                  aria-label="Capacidade PCD"
                  aria-invalid={!!errors.capacidadePCD}
                  aria-describedby={errors.capacidadePCD ? "capacidadePCD-error" : null}
                />
                {errors.capacidadePCD && (
                  <p id="capacidadePCD-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.capacidadePCD}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between gap-5 mt-6">
              <button
                onClick={onClose}
                className="w-1/3 px-6 py-2 text-red-500 border-2 border-red-500 rounded-md uppercase hover:bg-red-500 hover:text-white transition-colors font-semibold"
                aria-label="Cancelar"
              >
                Cancelar
              </button>
              <button
                onClick={limparFiltros}
                className="w-1/3 px-6 py-2 text-gray-500 border-2 border-gray-500 rounded-md uppercase hover:bg-gray-500 hover:text-white transition-colors font-semibold"
                aria-label="Limpar filtros"
              >
                Limpar
              </button>
              <button
                onClick={handleAplicarFiltros}
                disabled={loading}
                className={`w-1/3 px-6 py-2 bg-green-600 text-white rounded-md uppercase hover:bg-green-700 transition-colors font-semibold ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Aplicar filtros"
              >
                {loading ? "Aplicando..." : "Aplicar"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FiltrosModal;