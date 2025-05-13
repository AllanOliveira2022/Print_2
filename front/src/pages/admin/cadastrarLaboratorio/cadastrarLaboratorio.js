import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../../components/tecLab/menu/menu";

function CadastrarLaboratorio() {
  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    bloco: "",
    numero: "",
    tipo: "",
    capacidade: "",
    quantidadeComputadores: "",
    equipamentos: "",
    softwares: "",
    capacidadePCD: "",
    responsavel: "",
    observacoes: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Substitua pela sua URL real da API
      const response = await fetch("/api/laboratorios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Laboratório cadastrado com sucesso!");
        navigate("/admin/laboratorios");
      } else {
        alert("Erro ao cadastrar laboratório.");
      }
    } catch (error) {
      alert("Erro de conexão.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Menu />
      <div className="flex flex-col w-full p-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Cadastrar laboratório</h2>
        <p className="text-gray-500 mb-6">
          Cadastre um novo laboratório no SIGEF. Adicione as informações sobre o novo laboratório.
        </p>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow-md">
          {/* Campos de entrada - Nome, Código, etc */}
          <input name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} className="input" required />
          <input name="codigo" placeholder="Código de identificação" value={formData.codigo} onChange={handleChange} className="input" required />
          <input name="bloco" placeholder="Bloco didático" value={formData.bloco} onChange={handleChange} className="input" />
          <input name="numero" placeholder="Número" value={formData.numero} onChange={handleChange} className="input" />
          <input name="tipo" placeholder="Tipo de laboratório" value={formData.tipo} onChange={handleChange} className="input" />
          <input name="capacidade" placeholder="Capacidade" value={formData.capacidade} onChange={handleChange} className="input" />
          <input name="quantidadeComputadores" placeholder="Quantidade de computadores" value={formData.quantidadeComputadores} onChange={handleChange} className="input" />
          <input name="equipamentos" placeholder="Equipamentos disponíveis" value={formData.equipamentos} onChange={handleChange} className="input" />
          <input name="softwares" placeholder="Softwares instalados" value={formData.softwares} onChange={handleChange} className="input" />
          <input name="capacidadePCD" placeholder="Capacidade para PCD" value={formData.capacidadePCD} onChange={handleChange} className="input" />
          <input name="responsavel" placeholder="Responsável" value={formData.responsavel} onChange={handleChange} className="input" />
          <input name="observacoes" placeholder="Observações (opcional)" value={formData.observacoes} onChange={handleChange} className="input" />

          <div className="col-span-2 flex justify-between mt-4">
            <button type="button" onClick={() => navigate("/admin/laboratorios")} className="border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50">
              Cancelar
            </button>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Cadastrar Laboratório
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastrarLaboratorio;
