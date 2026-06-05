import { isAuthenticated, getSession } from "@/utils";

import loginView from "@/views/loginView";
import homeView from "@/views/homeView";
import adminView from "@/views/adminView";
import notFound from "@/views/notFound";


const routes = {
  "/": { view: loginView, requiereAuth: false, soloAdmin: false },
  "/home": { view: homeView, requiereAuth: true, soloAdmin: false },
  "/admin": { view: adminView, requiereAuth: true, soloAdmin: true },
};


export const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};


export const router = () => {
  const app = document.querySelector("#app");
  const path = window.location.pathname;
  const ruta = routes[path];


  if (!ruta) {
    app.innerHTML = notFound();
    return;
  }


  if (ruta.requiereAuth && !isAuthenticated()) {
    navigateTo("/");
    return;
  }


  if (ruta.soloAdmin && getSession()?.role !== "admin") {
    app.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#f1f5f9;">
        <div style="background:white;padding:2rem;border-radius:8px;text-align:center;">
          <h2 style="color:#dc2626;font-size:1.5rem;font-weight:bold;">Acceso Denegado</h2>
          <p style="margin-top:0.5rem;color:#64748b;">No tienes permisos para ver esta página.</p>
          <button onclick="history.back()" style="margin-top:1rem;background:#2563eb;color:white;padding:0.5rem 1rem;border:none;border-radius:4px;cursor:pointer;">Volver</button>
        </div>
      </div>
    `;
    return;
  }

  if (path === "/" && isAuthenticated()) {
    navigateTo("/home");
    return;
  }

  app.innerHTML = ruta.view();
};


window.addEventListener("popstate", router);
