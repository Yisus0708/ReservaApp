import { getSession } from "@/utils";
import Sidebar from "@/components/Sidebar";
import { homeController } from "@/controllers/home.controller";

export default function homeView() {
  const user = getSession(); 
  setTimeout(() => homeController());

  return `
    <div style="display:flex;min-height:100vh;">

      ${Sidebar()}

      <main style="flex:1;background:#f1f5f9;padding:2rem;">

        <h1 style="font-size:1.4rem;font-weight:bold;margin-bottom:0.25rem;">
          Bienvenido, ${user?.name}
        </h1>
        <p style="color:#64748b;margin-bottom:1.5rem;">Rol: ${user?.role}</p>

        <!-- Botón para abrir el formulario de nueva reserva -->
        <button
          id="btnNuevaReserva"
          style="background:#16a34a;color:white;padding:0.5rem 1.2rem;border:none;border-radius:4px;cursor:pointer;margin-bottom:1.5rem;"
        >
          + Nueva Reserva
        </button>

        <!-- Formulario de crear/editar reserva (oculto por defecto) -->
        <div id="formContainer" style="display:none;background:white;padding:1.5rem;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.08);margin-bottom:1.5rem;">
          <h2 id="formTitle" style="font-size:1.1rem;font-weight:bold;margin-bottom:1rem;">Nueva Reserva</h2>

          <form id="reservationForm">
            <!-- Campo oculto para guardar el ID al editar -->
            <input type="hidden" id="reservationId" />

            <label style="display:block;margin-bottom:0.25rem;font-size:0.85rem;">Espacio</label>
            <select id="workspace" required style="width:100%;padding:0.4rem;border:1px solid #cbd5e1;border-radius:4px;margin-bottom:0.75rem;">
              <option value="">Seleccionar...</option>
              <option value="Sala de Reuniones A">Sala de Reuniones A</option>
              <option value="Sala de Reuniones B">Sala de Reuniones B</option>
              <option value="Oficina Privada 1">Oficina Privada 1</option>
              <option value="Espacio Coworking">Espacio Coworking</option>
              <option value="Auditorio">Auditorio</option>
            </select>

            <label style="display:block;margin-bottom:0.25rem;font-size:0.85rem;">Fecha</label>
            <input type="date" id="date" required style="width:100%;padding:0.4rem;border:1px solid #cbd5e1;border-radius:4px;margin-bottom:0.75rem;" />

            <label style="display:block;margin-bottom:0.25rem;font-size:0.85rem;">Hora inicio</label>
            <input type="time" id="startHour" required style="width:100%;padding:0.4rem;border:1px solid #cbd5e1;border-radius:4px;margin-bottom:0.75rem;" />

            <label style="display:block;margin-bottom:0.25rem;font-size:0.85rem;">Hora fin</label>
            <input type="time" id="endHour" required style="width:100%;padding:0.4rem;border:1px solid #cbd5e1;border-radius:4px;margin-bottom:0.75rem;" />

            <label style="display:block;margin-bottom:0.25rem;font-size:0.85rem;">Motivo</label>
            <input type="text" id="reason" placeholder="Motivo de la reserva" required style="width:100%;padding:0.4rem;border:1px solid #cbd5e1;border-radius:4px;margin-bottom:1rem;" />

            <div style="display:flex;gap:0.75rem;">
              <button type="submit" style="background:#2563eb;color:white;padding:0.5rem 1rem;border:none;border-radius:4px;cursor:pointer;">Guardar</button>
              <button type="button" id="btnCancelarForm" style="background:#94a3b8;color:white;padding:0.5rem 1rem;border:none;border-radius:4px;cursor:pointer;">Cancelar</button>
            </div>
          </form>
        </div>

        <!-- Contenedor donde se inyectan las reservas del usuario -->
        <div id="reservationsContainer" style="display:grid;gap:1rem;">
          <p style="color:#64748b;">Cargando reservas...</p>
        </div>

      </main>
    </div>
  `;
}
