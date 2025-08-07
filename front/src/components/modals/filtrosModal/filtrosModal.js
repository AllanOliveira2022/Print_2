import { useEffect, useState, useRef } from "react";
import tipoService from "../../../services/tipoService";
import blocoService from "../../../services/blocoService";
import espacoService from "../../../services/espacoService";

function FiltrosModal({ isOpen, onClose, onConfirm }) {
  const [tipos, setTipos] = useState([]);
  const [blocos, setBlocos] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [blocoSelecionado, setBlocoSelecionado] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [capacidadePCD, setCapacidadePCD] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [filtrosAplicados, setFiltrosAplicados] = useState({});
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
    setErrors({});
    try {
      const [tiposData, blocosData] = await Promise.all([
        tipoService.listarTodos(),
        blocoService.listarTodos()
      ]);
      setTipos(tiposData);
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

  const aplicarFiltrosMultiplos = async (filtros) => {
    setLoading(true);
    try {
      let espacosFiltrados = [];
      
      // Aplicar filtros individualmente e combinar resultados
      const filtrosAplicados = [];
      
      if (filtros.tipoId) {
        const tipo = tipos.find(t => t.id === parseInt(filtros.tipoId));
        if (tipo) {
          const espacosPorTipo = await espacoService.filtrar('tipoLaboratorio', tipo.nome);
          filtrosAplicados.push(espacosPorTipo);
        }
      }
      
      if (filtros.blocoId) {
        const bloco = blocos.find(b => b.id === parseInt(filtros.blocoId));
        if (bloco) {
          const espacosPorBloco = await espacoService.filtrar('bloco', bloco.nome);
          filtrosAplicados.push(espacosPorBloco);
        }
      }
      
      if (filtros.capacidade) {
        const espacosPorCapacidade = await espacoService.filtrar('capacidadeAlunos', filtros.capacidade);
        filtrosAplicados.push(espacosPorCapacidade);
      }
      
      if (filtros.capacidadePCD) {
        const espacosPorCapacidadePCD = await espacoService.filtrar('capacidadePCD', filtros.capacidadePCD);
        filtrosAplicados.push(espacosPorCapacidadePCD);
      }
      
      // Se não há filtros aplicados, retornar todos os espaços
      if (filtrosAplicados.length === 0) {
        espacosFiltrados = await espacoService.listarTodos();
      } else {
        // Encontrar espaços que atendem a TODOS os filtros aplicados
        const idsPorFiltro = filtrosAplicados.map(espacos => 
          espacos.map(espaco => espaco.id)
        );
        
        // Intersecção de todos os arrays de IDs
        const idsComuns = idsPorFiltro.reduce((acc, ids) => 
          acc.filter(id => ids.includes(id))
        );
        
        // Buscar espaços pelos IDs comuns
        if (idsComuns.length > 0) {
          const todosEspacos = await espacoService.listarTodos();
          espacosFiltrados = todosEspacos.filter(espaco => 
            idsComuns.includes(espaco.id)
          );
        }
      }
      
      return espacosFiltrados;
    } catch (error) {
      console.error("Erro ao aplicar filtros:", error);
      throw new Error("Erro ao aplicar filtros. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleAplicarFiltros = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      const filtros = {
        tipoId: tipoSelecionado,
        blocoId: blocoSelecionado,
        capacidade: capacidade ? parseInt(capacidade) : "",
        capacidadePCD: capacidadePCD ? parseInt(capacidadePCD) : "",
      };
      
      const espacosFiltrados = await aplicarFiltrosMultiplos(filtros);
      
      // Salvar filtros aplicados para exibição
      setFiltrosAplicados(filtros);
      
      // Chamar callback com os espaços filtrados
      onConfirm(espacosFiltrados);
      onClose();
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  const limparFiltros = () => {
    setTipoSelecionado("");
    setBlocoSelecionado("");
    setCapacidade("");
    setCapacidadePCD("");
    setErrors({});
    setFiltrosAplicados({});
  };

  const handleLimparEAplicar = async () => {
    setLoading(true);
    try {
      limparFiltros();
      const todosEspacos = await espacoService.listarTodos();
      onConfirm(todosEspacos);
      onClose();
    } catch (error) {
      setErrors({ general: "Erro ao limpar filtros. Tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  const getFiltrosAtivos = () => {
    const ativos = [];
    if (tipoSelecionado) {
      const tipo = tipos.find(t => t.id === parseInt(tipoSelecionado));
      if (tipo) ativos.push(`Tipo: ${tipo.nome}`);
    }
    if (blocoSelecionado) {
      const bloco = blocos.find(b => b.id === parseInt(blocoSelecionado));
      if (bloco) ativos.push(`Bloco: ${bloco.nome}`);
    }
    if (capacidade) ativos.push(`Capacidade: ${capacidade}`);
    if (capacidadePCD) ativos.push(`Capacidade PCD: ${capacidadePCD}`);
    return ativos;
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
      <div className="bg-white p-6 shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h1 id="modal-title" className="text-2xl font-bold text-green-800 mb-4">
          Filtrar Espaços
        </h1>
        
        {errors.general && (
          <p className="text-red-500 mb-4" role="alert">
            {errors.general}
          </p>
        )}
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Carregando...</p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Filtros Ativos */}
            {getFiltrosAtivos().length > 0 && (
              <div className="bg-green-50 border border-green-200 p-3">
                <h3 className="text-sm font-medium text-green-800 mb-2">Filtros Ativos:</h3>
                <div className="flex flex-wrap gap-2">
                  {getFiltrosAtivos().map((filtro, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs">
                      {filtro}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center">
              <label className="w-1/5 text-sm font-medium text-gray-700">
                Tipo de Espaço:
              </label>
              <select
                value={tipoSelecionado}
                onChange={(e) => setTipoSelecionado(e.target.value)}
                className="w-4/5 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
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
                className="w-4/5 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
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
                  } focus:outline-none focus:ring-2 focus:ring-green-600`}
                  aria-label="Capacidade total"
                  aria-invalid={!!errors.capacidade}
                  aria-describedby={errors.capacidade ? "capacidade-error" : null}
                  placeholder="Ex: 30"
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
                  } focus:outline-none focus:ring-2 focus:ring-green-600`}
                  aria-label="Capacidade PCD"
                  aria-invalid={!!errors.capacidadePCD}
                  aria-describedby={errors.capacidadePCD ? "capacidadePCD-error" : null}
                  placeholder="Ex: 2"
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
                className="w-1/3 px-6 py-2 text-red-500 border-2 border-red-500 uppercase hover:bg-red-500 hover:text-white transition-colors font-semibold"
                aria-label="Cancelar"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleLimparEAplicar}
                className="w-1/3 px-6 py-2 text-gray-500 border-2 border-gray-500 uppercase hover:bg-gray-500 hover:text-white transition-colors font-semibold"
                aria-label="Limpar filtros"
                disabled={loading}
              >
                Limpar
              </button>
              <button
                onClick={handleAplicarFiltros}
                disabled={loading}
                className={`w-1/3 px-6 py-2 bg-green-600 text-white uppercase hover:bg-green-700 transition-colors font-semibold ${
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