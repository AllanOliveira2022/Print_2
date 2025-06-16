import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import espacoService from '../../../services/espacoService';
import Menu from '../../../components/tecLab/menu/menu';
import { IoArrowBackSharp } from "react-icons/io5";

function DetalhesEspaco() {
  const { id } = useParams();
  const [espaco, setEspaco] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarEspaco = async () => {
      try {
        if (id) {
          const dados = await espacoService.buscarPorId(id);
          setEspaco(dados);
        }
      } catch (err) {
        console.error("Erro ao carregar espaço:", err);
        setError("Erro ao carregar dados do espaço");
      } finally {
        setLoading(false);
      }
    };

    carregarEspaco();
  }, [id]);

  const formatarCampo = (chave) => {
    const map = {
      'id': 'ID',
      'nome': 'Nome',
      'codigoIdentificacao': 'Código de Identificação',
      'nomeBloco': 'Bloco',
      'nomeTipo': 'Tipo de Espaço',
      'andar': 'Andar',
      'capacidade': 'Capacidade Total',
      'capacidadePCD': 'Capacidade PCD',
      'responsavel': 'Responsável',
      'observacoes': 'Observações',
      'situacao': 'Situação',
      'equipamentos': 'Equipamentos'
    };
    return map[chave] || chave;
  };

  const renderizarDados = () => {
    if (!espaco) return null;

    return (
      <div className="space-y-6">
  <div className="space-y-8">
  {/* Seção Informações Gerais */}
  <div>
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Informações Gerais</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm text-gray-500 mb-1">Código de Identificação</label>
        <p className="text-gray-900">
          {espaco.codigoIdentificacao || 'Não informado'}
        </p>
      </div>

      <div>
        <label className="block text-sm text-gray-500 mb-1">Nome</label>
        <p className="text-gray-900">
          {espaco.nome || 'Não informado'}
        </p>
      </div>

      <div>
        <label className="block text-sm text-gray-500 mb-1">Tipo de Espaço</label>
        <p className="text-gray-900">
          {espaco.nomeTipo || 'Não informado'}
        </p>
      </div>
    </div>
  </div>

  {/* Seção Localização */}
  <div>
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Localização</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm text-gray-500 mb-1">Bloco</label>
        <p className="text-gray-900">
          {espaco.nomeBloco || 'Não informado'}
        </p>
      </div>
    
      <div>
        <label className="block text-sm text-gray-500 mb-1">Andar</label>
        <p className="text-gray-900">
          {espaco.andar || 'Não informado'}
        </p>
      </div>
    </div>
  </div>
  
  {/* Seção Estrutura e Capacidade */}
  <div>
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Estrutura e Capacidade</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm text-gray-500 mb-1">Capacidade Total</label>
        <p className="text-gray-900">
          {espaco.capacidade || 'Não informado'}
        </p>
      </div>
      
      <div>
        <label className="block text-sm text-gray-500 mb-1">Acessibilidade PCD</label>
        <p className={espaco.capacidadePCD == 1 ? 'text-green-600' : 'text-red-600'}>
          {espaco.capacidadePCD == 1 ? 'Acessível' : 'Não Acessível'}
        </p>
      </div>
      
      <div>
        <label className="block text-sm text-gray-500 mb-1">Equipamentos</label>
        <p className="text-gray-900">
          {espaco.equipamentos || 'Nenhum equipamento associado'}
        </p>
      </div>
    </div>
  </div>
  
  {/* Seção Informações Adicionais */}
  <div>
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Informações Adicionais</h2>
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-500 mb-1">Responsável</label>
        <p className="text-gray-900">
          {espaco.responsavel || 'Não informado'}
        </p>
      </div>
      
      <div>
        <label className="block text-sm text-gray-500 mb-1">Observações</label>
        <p className="text-gray-900 whitespace-pre-line">
          {espaco.observacoes || 'Nenhuma observação registrada'}
        </p>
      </div>
    </div>
  </div>
</div>
</div>
    );
  };

  // Restante do código (loading, error, etc.) permanece o mesmo...
  if (loading) return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <Menu />
      <div className="flex justify-center items-center w-full p-4 md:p-8">
        <div className="w-full max-w-7xl bg-gray-50 shadow-md p-6 mt-4">
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <Menu />
      <div className="flex justify-center w-full p-4 md:p-8">
        <div className="w-full max-w-7xl bg-red-50 border-l-4 border-red-400 p-6 mt-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!espaco) return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <Menu />
      <div className="flex justify-center w-full p-4 md:p-8">
        <div className="w-full max-w-7xl bg-gray-50 shadow-md p-6 mt-4">
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Espaço não encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">O espaço solicitado não foi encontrado no sistema.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <Menu />
      <div className="flex justify-center w-full p-4 md:p-8">
        <div className="w-full max-w-7xl bg-gray-50 shadow-md p-6 mt-4">
          <div className="flex flex-col mb-6 gap-4">
            <div className="flex justify-start mt-6">
              <button
                onClick={() => window.history.back()}
                className="flex items-center justify-between gap-3 w-full sm:w-auto px-6 py-2 text-green-600 border-2 border-green-600 uppercase hover:bg-green-100 transition-colors"
              >
                <IoArrowBackSharp/>
                Voltar
              </button>
            </div>
            <h1 className="text-2xl font-bold text-green-800 text-left">
              Detalhes do Espaço
            </h1>
            <p className="text-gray-600">
              Visualize os detalhes de espaço cadastrados no SIGEF.
            </p>
          </div>

          <div className="bg-white p-6 shadow-sm rounded-lg">
            <div>
              {renderizarDados()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesEspaco;