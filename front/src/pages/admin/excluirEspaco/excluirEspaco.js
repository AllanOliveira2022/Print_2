import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import Menu from '../../../components/tecLab/menu/menu';

function ExcluirLaboratorio() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [laboratorio, setLaboratorio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [excluindo, setExcluindo] = useState(false);
    const [erro, setErro] = useState('');

    // Buscar dados do laboratório
    useEffect(() => {
        const buscarLaboratorio = async () => {
            try {
                const response = await fetch(`/api/laboratorios/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setLaboratorio(data.laboratorio);
                } else {
                    setErro(data.message || 'Erro ao buscar laboratório');
                }
            } catch (error) {
                console.error('Erro ao buscar laboratório:', error);
                setErro('Erro de conexão com o servidor');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            buscarLaboratorio();
        }
    }, [id]);

    // Função para excluir laboratório
    const handleExcluir = async () => {
        setExcluindo(true);
        setErro('');

        try {
            const response = await fetch(`/api/espacos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Redirecionar para a lista com mensagem de sucesso
                navigate('/admin/espacos', { 
                    state: { 
                        mensagem: 'Laboratório excluído com sucesso!',
                        tipo: 'sucesso'
                    }
                });
            } else {
                setErro(data.message || 'Erro ao excluir laboratório');
            }
        } catch (error) {
            console.error('Erro ao excluir laboratório:', error);
            setErro('Erro de conexão com o servidor');
        } finally {
            setExcluindo(false);
        }
    };

    const handleCancelar = () => {
        navigate('/admin/espacos');
    };

    if (loading) {
        return (
            <div className="flex flex-col md:flex-row w-full min-h-screen">
                <Menu />
                <div className="flex justify-center items-center w-full p-4">
                    <div className="text-xl text-gray-600">Carregando...</div>
                </div>
            </div>
        );
    }

    if (!laboratorio) {
        return (
            <div className="flex flex-col md:flex-row w-full min-h-screen">
                <Menu />
                <div className="flex justify-center items-center w-full p-4">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <strong>Erro:</strong> {erro || 'Laboratório não encontrado'}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen">
            <Menu />
            <div className="flex justify-center w-full p-4 md:p-8">
                <div className="w-full max-w-4xl bg-gray-50 rounded-lg shadow-md p-6 mt-4">
                    {/* Header */}
                    <div className="flex items-center mb-6 gap-4">
                        <button
                            onClick={handleCancelar}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <FaArrowLeft className="h-5 w-5" />
                            Voltar
                        </button>
                        <h1 className="text-2xl font-bold text-red-800">
                            Excluir Laboratório
                        </h1>
                    </div>

                    {/* Alerta de Confirmação */}
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                        <div className="flex items-center">
                            <FaExclamationTriangle className="h-8 w-8 text-red-400 mr-3" />
                            <div>
                                <h3 className="text-lg font-medium text-red-800">
                                    Atenção! Esta ação não pode ser desfeita.
                                </h3>
                                <p className="text-red-700 mt-1">
                                    Você está prestes a excluir permanentemente este laboratório. 
                                    Todas as informações associadas serão perdidas.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dados do Laboratório */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Dados do Laboratório a ser Excluído:
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Nome:</label>
                                <p className="text-gray-800 font-semibold">{laboratorio.nome}</p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Código de Identificação:</label>
                                <p className="text-gray-800 font-semibold">{laboratorio.codigoIdentificacao}</p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Bloco Didático:</label>
                                <p className="text-gray-800">{laboratorio.blocoDidatico}</p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Número:</label>
                                <p className="text-gray-800">{laboratorio.numero}</p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Tipo de Laboratório:</label>
                                <p className="text-gray-800">{laboratorio.tipoLaboratorio}</p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Situação:</label>
                                <p className={`font-semibold ${laboratorio.situacao === 'Disponível' ? 'text-green-600' : 'text-red-600'}`}>
                                    {laboratorio.situacao}
                                </p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Capacidade:</label>
                                <p className="text-gray-800">{laboratorio.capacidade} pessoas</p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Responsável:</label>
                                <p className="text-gray-800">{laboratorio.responsavel}</p>
                            </div>
                        </div>

                        {laboratorio.observacoes && (
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-600">Observações:</label>
                                <p className="text-gray-800">{laboratorio.observacoes}</p>
                            </div>
                        )}
                    </div>

                    {/* Mensagem de Erro */}
                    {erro && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            <strong>Erro:</strong> {erro}
                        </div>
                    )}

                    {/* Confirmação Final */}
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                        <p className="text-gray-700 font-medium">
                            Digite "CONFIRMAR" no campo abaixo para confirmar a exclusão:
                        </p>
                        <input
                            type="text"
                            placeholder="Digite CONFIRMAR"
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            id="confirmacao"
                        />
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                        <button
                            onClick={handleCancelar}
                            disabled={excluindo}
                            className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors font-medium disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        
                        <button
                            onClick={() => {
                                const confirmacao = document.getElementById('confirmacao').value;
                                if (confirmacao === 'CONFIRMAR') {
                                    handleExcluir();
                                } else {
                                    setErro('Digite "CONFIRMAR" para prosseguir com a exclusão');
                                }
                            }}
                            disabled={excluindo}
                            className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {excluindo ? (
                                <span className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Excluindo...
                                </span>
                            ) : (
                                'Confirmar Exclusão'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExcluirLaboratorio;