// Mock API para laboratórios - Simulação completa
class MockLaboratoriosAPI {
    constructor() {
        // Dados padrão dos laboratórios
        this.laboratorios = [
            {
                id: 1,
                nome: "Laboratório de Informática I",
                codigoIdentificacao: "INFO-001",
                blocoDidatico: "Bloco A",
                numero: "101",
                tipoLaboratorio: "Informática",
                capacidade: 40,
                quantidadeComputadores: 20,
                equipamentosDisponiveis: "Computadores Dell, Projetor, Quadro Digital",
                softwaresInstalados: "Windows 11, Office 365, Visual Studio, MySQL",
                capacidadePCD: 2,
                responsavel: "Prof. João Silva",
                observacoes: "Laboratório equipado com ar condicionado e sistema de som",
                situacao: "Disponível",
                createdAt: "2024-01-15T10:30:00Z",
                updatedAt: "2024-01-15T10:30:00Z"
            },
            {
                id: 2,
                nome: "Laboratório de Química Geral",
                codigoIdentificacao: "QUIM-001",
                blocoDidatico: "Bloco B",
                numero: "205",
                tipoLaboratorio: "Química",
                capacidade: 30,
                quantidadeComputadores: 0,
                equipamentosDisponiveis: "Bancadas com pias, Capela de exaustão, Balanças analíticas, Estufas",
                softwaresInstalados: "",
                capacidadePCD: 1,
                responsavel: "Prof. Maria Santos",
                observacoes: "Laboratório com sistema de segurança e chuveiro de emergência",
                situacao: "Disponível",
                createdAt: "2024-01-10T14:20:00Z",
                updatedAt: "2024-01-20T09:15:00Z"
            },
            {
                id: 3,
                nome: "Laboratório de Física Experimental",
                codigoIdentificacao: "FIS-001",
                blocoDidatico: "Bloco C",
                numero: "301",
                tipoLaboratorio: "Física",
                capacidade: 25,
                quantidadeComputadores: 5,
                equipamentosDisponiveis: "Osciloscópios, Multímetros, Fontes de alimentação, Geradores de função",
                softwaresInstalados: "LabVIEW, MATLAB, Origin",
                capacidadePCD: 2,
                responsavel: "Prof. Carlos Oliveira",
                observacoes: "Equipamentos de alta precisão para experimentos avançados",
                situacao: "Indisponível",
                createdAt: "2024-01-12T16:45:00Z",
                updatedAt: "2024-01-25T11:30:00Z"
            },
            {
                id: 4,
                nome: "Laboratório de Mecatrônica",
                codigoIdentificacao: "MEC-001",
                blocoDidatico: "Bloco A",
                numero: "150",
                tipoLaboratorio: "Mecatrônica",
                capacidade: 35,
                quantidadeComputadores: 12,
                equipamentosDisponiveis: "Bancadas de montagem, Impressora 3D, Robôs educacionais, Sensores diversos",
                softwaresInstalados: "SolidWorks, Arduino IDE, Python, ROS",
                capacidadePCD: 3,
                responsavel: "Prof. Ana Costa",
                observacoes: "Laboratório multidisciplinar com foco em automação",
                situacao: "Disponível",
                createdAt: "2024-01-18T08:15:00Z",
                updatedAt: "2024-01-18T08:15:00Z"
            },
            {
                id: 5,
                nome: "Laboratório de Redes e Telecomunicações",
                codigoIdentificacao: "REDE-001",
                blocoDidatico: "Bloco D",
                numero: "102",
                tipoLaboratorio: "Redes",
                capacidade: 32,
                quantidadeComputadores: 16,
                equipamentosDisponiveis: "Switches Cisco, Roteadores, Cabos de rede, Analisadores de protocolo",
                softwaresInstalados: "Packet Tracer, Wireshark, GNS3, Windows Server",
                capacidadePCD: 2,
                responsavel: "Prof. Roberto Lima",
                observacoes: "Laboratório com estrutura completa para certificações Cisco",
                situacao: "Disponível",
                createdAt: "2024-01-08T13:20:00Z",
                updatedAt: "2024-01-22T15:45:00Z"
            },
            {
                id: 6,
                nome: "Laboratório de Eletrônica Digital",
                codigoIdentificacao: "ELET-001",
                blocoDidatico: "Bloco C",
                numero: "250",
                tipoLaboratorio: "Eletrônica",
                capacidade: 28,
                quantidadeComputadores: 8,
                equipamentosDisponiveis: "Protoboards, Fontes variáveis, Osciloscópios digitais, Microcontroladores",
                softwaresInstalados: "Proteus, Eagle, MPLAB, Quartus",
                capacidadePCD: 1,
                responsavel: "Prof. Fernando Alves",
                observacoes: "Equipamentos atualizados para projetos de FPGA e microcontroladores",
                situacao: "Manutenção",
                createdAt: "2024-01-05T09:30:00Z",
                updatedAt: "2024-01-28T14:10:00Z"
            },
            {
                id: 7,
                nome: "Laboratório de Biologia Molecular",
                codigoIdentificacao: "BIO-001",
                blocoDidatico: "Bloco E",
                numero: "201",
                tipoLaboratorio: "Biologia",
                capacidade: 20,
                quantidadeComputadores: 4,
                equipamentosDisponiveis: "Microscópios, Centrífugas, Termociclador, Eletroforese",
                softwaresInstalados: "ImageJ, BioEdit, Geneious, MEGA",
                capacidadePCD: 1,
                responsavel: "Prof. Patricia Rocha",
                observacoes: "Laboratório P2 com controle rigoroso de acesso",
                situacao: "Disponível",
                createdAt: "2024-01-20T11:15:00Z",
                updatedAt: "2024-01-20T11:15:00Z"
            },
            {
                id: 8,
                nome: "Laboratório de Informática II",
                codigoIdentificacao: "INFO-002",
                blocoDidatico: "Bloco A",
                numero: "105",
                tipoLaboratorio: "Informática",
                capacidade: 45,
                quantidadeComputadores: 25,
                equipamentosDisponiveis: "Computadores HP, Tablets, Projetor 4K, Sistema de som",
                softwaresInstalados: "Linux Ubuntu, Docker, Node.js, React, PostgreSQL",
                capacidadePCD: 3,
                responsavel: "Prof. Lucas Mendes",
                observacoes: "Laboratório dedicado ao desenvolvimento web e mobile",
                situacao: "Disponível",
                createdAt: "2024-01-25T07:45:00Z",
                updatedAt: "2024-01-25T07:45:00Z"
            }
        ];
        
        this.nextId = 9; // Próximo ID disponível
    }

    // Simular delay de rede
    delay(ms = 500) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // GET /api/laboratorios - Listar todos
    async listarLaboratorios() {
        await this.delay();
        return {
            success: true,
            laboratorios: [...this.laboratorios].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        };
    }

    // GET /api/laboratorios/:id - Buscar por ID
    async buscarLaboratorioPorId(id) {
        await this.delay();
        const laboratorio = this.laboratorios.find(lab => lab.id === parseInt(id));
        
        if (!laboratorio) {
            return {
                success: false,
                message: 'Laboratório não encontrado.'
            };
        }

        return {
            success: true,
            laboratorio
        };
    }

    // POST /api/laboratorios/cadastrar - Cadastrar novo
    async cadastrarLaboratorio(dados) {
        await this.delay();
        
        // Verificar se código já existe
        const codigoExiste = this.laboratorios.some(lab => 
            lab.codigoIdentificacao === dados.codigoIdentificacao
        );

        if (codigoExiste) {
            return {
                success: false,
                message: 'Já existe um laboratório com esse código de identificação.'
            };
        }

        const novoLaboratorio = {
            id: this.nextId++,
            ...dados,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.laboratorios.push(novoLaboratorio);

        return {
            success: true,
            message: 'Laboratório cadastrado com sucesso.',
            laboratorio: novoLaboratorio
        };
    }

    // PUT /api/laboratorios/:id - Editar
    async editarLaboratorio(id, dados) {
        await this.delay();
        
        const index = this.laboratorios.findIndex(lab => lab.id === parseInt(id));
        
        if (index === -1) {
            return {
                success: false,
                message: 'Laboratório não encontrado.'
            };
        }

        // Verificar se código já existe em outro laboratório
        if (dados.codigoIdentificacao !== this.laboratorios[index].codigoIdentificacao) {
            const codigoExiste = this.laboratorios.some(lab => 
                lab.codigoIdentificacao === dados.codigoIdentificacao && lab.id !== parseInt(id)
            );

            if (codigoExiste) {
                return {
                    success: false,
                    message: 'Já existe um laboratório com esse código de identificação.'
                };
            }
        }

        const laboratorioAtualizado = {
            ...this.laboratorios[index],
            ...dados,
            updatedAt: new Date().toISOString()
        };

        this.laboratorios[index] = laboratorioAtualizado;

        return {
            success: true,
            message: 'Laboratório atualizado com sucesso.',
            laboratorio: laboratorioAtualizado
        };
    }

    // DELETE /api/laboratorios/:id - Excluir
    async excluirLaboratorio(id) {
        await this.delay();
        
        const index = this.laboratorios.findIndex(lab => lab.id === parseInt(id));
        
        if (index === -1) {
            return {
                success: false,
                message: 'Laboratório não encontrado.'
            };
        }

        this.laboratorios.splice(index, 1);

        return {
            success: true,
            message: 'Laboratório excluído com sucesso.'
        };
    }

    // GET /api/laboratorios/filtrar - Filtrar laboratórios
    async filtrarLaboratorios(filtros) {
        await this.delay();
        
        let laboratoriosFiltrados = [...this.laboratorios];

        if (filtros.nome) {
            laboratoriosFiltrados = laboratoriosFiltrados.filter(lab =>
                lab.nome.toLowerCase().includes(filtros.nome.toLowerCase())
            );
        }

        if (filtros.tipo) {
            laboratoriosFiltrados = laboratoriosFiltrados.filter(lab =>
                lab.tipoLaboratorio.toLowerCase().includes(filtros.tipo.toLowerCase())
            );
        }

        if (filtros.bloco) {
            laboratoriosFiltrados = laboratoriosFiltrados.filter(lab =>
                lab.blocoDidatico.toLowerCase().includes(filtros.bloco.toLowerCase())
            );
        }

        if (filtros.situacao) {
            laboratoriosFiltrados = laboratoriosFiltrados.filter(lab =>
                lab.situacao === filtros.situacao
            );
        }

        return {
            success: true,
            laboratorios: laboratoriosFiltrados.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        };
    }
}

// Instância global da API
const mockAPI = new MockLaboratoriosAPI();

// Interceptador de fetch para simular API
const originalFetch = window.fetch;
window.fetch = async function(url, options = {}) {
    // Verificar se é uma chamada para a API de laboratórios
    if (url.includes('/api/laboratorios')) {
        const method = options.method || 'GET';
        const body = options.body ? JSON.parse(options.body) : null;

        try {
            let response;

            if (url === '/api/laboratorios' && method === 'GET') {
                response = await mockAPI.listarLaboratorios();
            } 
            else if (url === '/api/laboratorios/cadastrar' && method === 'POST') {
                response = await mockAPI.cadastrarLaboratorio(body);
            }
            else if (url.includes('/api/laboratorios/filtrar') && method === 'GET') {
                const urlParams = new URLSearchParams(url.split('?')[1]);
                const filtros = {
                    nome: urlParams.get('nome') || '',
                    tipo: urlParams.get('tipo') || '',
                    bloco: urlParams.get('bloco') || '',
                    situacao: urlParams.get('situacao') || ''
                };
                response = await mockAPI.filtrarLaboratorios(filtros);
            }
            else if (url.match(/\/api\/laboratorios\/\d+$/) && method === 'GET') {
                const id = url.split('/').pop();
                response = await mockAPI.buscarLaboratorioPorId(id);
            }
            else if (url.match(/\/api\/laboratorios\/\d+$/) && method === 'PUT') {
                const id = url.split('/').pop();
                response = await mockAPI.editarLaboratorio(id, body);
            }
            else if (url.match(/\/api\/laboratorios\/\d+$/) && method === 'DELETE') {
                const id = url.split('/').pop();
                response = await mockAPI.excluirLaboratorio(id);
            }

            if (response) {
                const status = response.success ? 200 : (response.message?.includes('não encontrado') ? 404 : 400);
                
                return Promise.resolve({
                    ok: response.success,
                    status: status,
                    json: async () => response
                });
            }
        } catch (error) {
            return Promise.resolve({
                ok: false,
                status: 500,
                json: async () => ({
                    success: false,
                    message: 'Erro interno do servidor',
                    detalhes: error.message
                })
            });
        }
    }

    // Para outras URLs, usar fetch original
    return originalFetch.call(this, url, options);
};

// Função para adicionar laboratórios extras (para testes)
window.adicionarLaboratorioTeste = (dados) => {
    return mockAPI.cadastrarLaboratorio(dados);
};

// Função para resetar dados (para testes)
window.resetarLaboratorios = () => {
    mockAPI.laboratorios = mockAPI.laboratorios.slice(0, 8); // Manter apenas os 8 originais
    mockAPI.nextId = 9;
    console.log('Dados resetados para os laboratórios padrão');
};

// Função para ver todos os laboratórios (para debug)
window.verLaboratorios = () => {
    console.table(mockAPI.laboratorios);
    return mockAPI.laboratorios;
};

console.log('🧪 Mock API de Laboratórios carregada!');
console.log('📊 Laboratórios disponíveis:', mockAPI.laboratorios.length);
console.log('🔧 Funções de debug: window.verLaboratorios(), window.resetarLaboratorios()');

export default mockAPI;