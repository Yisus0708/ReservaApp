import { loginController } from "@/controllers/login.controller";

export default function loginView() {
  setTimeout(() => loginController());

  return `
    <div style="display:flex;justify-content:center;align-items:center;min-height:100vh;background:#f1f5f9;">
      <div style="background:white;padding:2rem;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);width:360px;">

        <h1 style="font-size:1.5rem;font-weight:bold;margin-bottom:1.5rem;text-align:center;">
          Iniciar Sesión
        </h1>

        <!-- Mensaje de error oculto por defecto -->
        <p id="loginError" style="display:none;color:#dc2626;margin-bottom:1rem;text-align:center;font-size:0.9rem;">
          Credenciales incorrectas
        </p>

        <form id="loginForm">
          <label style="display:block;margin-bottom:0.25rem;font-size:0.9rem;">Correo</label>
          <input
            type="email"
            name="email"
            placeholder="correo@ejemplo.com"
            required
            style="width:100%;padding:0.5rem;border:1px solid #cbd5e1;border-radius:4px;margin-bottom:1rem;box-sizing:border-box;"
          />

          <label style="display:block;margin-bottom:0.25rem;font-size:0.9rem;">Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            style="width:100%;padding:0.5rem;border:1px solid #cbd5e1;border-radius:4px;margin-bottom:1.5rem;box-sizing:border-box;"
          />

          <button
            type="submit"
            style="width:100%;padding:0.6rem;background:#2563eb;color:white;border:none;border-radius:4px;cursor:pointer;font-size:1rem;"
          >
            Entrar
          </button>
        </form>

      </div>
    </div>
  `;
}
