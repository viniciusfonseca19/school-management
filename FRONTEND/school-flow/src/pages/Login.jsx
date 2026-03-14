import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isRegister ? "/users/register" : "/users/login";
      const res = await api.post(endpoint, { email, password });

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      alert(isRegister ? "Erro no cadastro" : "Login inválido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>School<span>Flow</span></h1>
          <p>Sistema de Gestão Escolar</p>
        </div>

        <div className="login-form-container">
          <div className="form-tabs">
            <button
              className={!isRegister ? "active" : ""}
              onClick={() => setIsRegister(false)}
            >
              Entrar
            </button>
            <button
              className={isRegister ? "active" : ""}
              onClick={() => setIsRegister(true)}
            >
              Registrar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Carregando..." : isRegister ? "Criar Conta" : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}