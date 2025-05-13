import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CadastrarLaboratorio() {
  const [nome, setNome] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Exemplo de envio de dados para API (ajuste conforme sua API)
    try {
      const response = await fetch("/api/laboratorios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, localizacao }),
      });

      if (response.ok) {
        alert("Laboratório cadastrado com sucesso!");
        navigate("/laboratorios");
      } else {
        alert("Erro ao cadastrar laboratório.");
      }
    } catch (error) {
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cadastrar Laboratório</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do laboratório"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          value={localizacao}
          onChange={(e) => setLocalizacao(e.target.value)}
          placeholder="Localização"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastrarLaboratorio;
