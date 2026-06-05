import { removeSession, getSession, isAdmin } from "@/utils";
import { navigateTo } from "@/router/router";


export default function Sidebar() {
  setTimeout(() => {
    document.querySelector("#logoutBtn")?.addEventListener("click", () => {
      removeSession(); 
      navigateTo("/");
    });


    document.querySelector("#linkHome")?.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("/home");
    });

        
    document.querySelector("#linkAdmin")?.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("/admin");
    });
  });

  const user = getSession();

  return `
    <aside style="width:220px;background:#1e293b;color:white;min-height:100vh;padding:1.5rem;display:flex;flex-direction:column;gap:0.5rem;">

      <h2 style="font-size:1.1rem;font-weight:bold;margin-bottom:1rem;border-bottom:1px solid #334155;padding-bottom:0.75rem;">
        ReservaApp
      </h2>

      <!-- Nombre y rol del usuario logueado -->
      <p style="font-size:0.8rem;color:#94a3b8;margin-bottom:0.5rem;">
        ${user?.name} <br/>
        <span style="color:#64748b;">${user?.role}</span>
      </p>

      <!-- Enlace a Home siempre visible -->
      <a id="linkHome" href="/home" style="color:#e2e8f0;text-decoration:none;padding:0.4rem 0.5rem;border-radius:4px;cursor:pointer;">
        Mis Reservas
      </a>

      <!-- Enlace admin solo si el usuario es admin -->
      ${isAdmin() ? `<a id="linkAdmin" href="/admin" style="color:#e2e8f0;text-decoration:none;padding:0.4rem 0.5rem;border-radius:4px;cursor:pointer;">Gestionar Todo</a>` : ""}

      <!-- Botón logout al fondo -->
      <button
        id="logoutBtn"
        style="margin-top:auto;background:transparent;color:#f87171;border:1px solid #f87171;padding:0.4rem 0.5rem;border-radius:4px;cursor:pointer;text-align:left;"
      >
        Cerrar sesión
      </button>

    </aside>
  `;
}
