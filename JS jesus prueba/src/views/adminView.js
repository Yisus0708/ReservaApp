import { getSession } from "@/utils";
import Sidebar from "@/components/Sidebar";
import { adminController } from "@/controllers/admin.controller";

// Vista del administrador: gestión completa de todas las reservas
export default function adminView() {
  const user = getSession();

  // Lanzamos el controller después de que el DOM esté listo
  setTimeout(() => adminController());

  return `
    <div style="display:flex;min-height:100vh;">

      ${Sidebar()}

      <main style="flex:1;background:#f1f5f9;padding:2rem;">

        <h1 style="font-size:1.4rem;font-weight:bold;margin-bottom:0.25rem;">
          Panel Administrador
        </h1>
        <p style="color:#64748b;margin-bottom:1.5rem;">Gestión de todas las reservas</p>

        <!-- Botón para crear nueva reserva desde admin -->
        <button
          id="btnNuevaReservaAdmin"
          style="background:#16a34a;color:white;padding:0.5rem 1.2rem;border:none;border-radius:4px;cursor:pointer;margin-bottom:1.5rem;"
        >
          + Nueva Reserva
        </button>

        <!-- Formulario de crear/editar (oculto por defecto) -->
        <div id="formContainerAdmin" style="display:none;background:white;padding:1.5rem;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.08);margin-bottom:1.5rem;">
          <h2 id="formTitleAdmin" style="font-size:1.1rem;font-weight:bold;margin-bottom:1rem;">Nueva Reserva</h2>

          <form id="adminReservationForm">
            <input type="hidden" id="adminReservationId" />

            <label style="display:block;margin-bottom:0.25rem;font-size:0.85rem;">Espacio</label>
            <select id="adminWorkspace" required style="width:100%;padding:0.4rem;border:1px solid #cbd5e1;border-radius:4px;margin-bottom:0.75rem;">
              <option value="">Seleccionar...</option>
              <option value="Sala de Reuniones A">Sala de Reuniones A</option>
              <option value="Sala de Reuniones B">Sala de Reuniones B</option>
              <option value="Oficina Privada 1">Oficina Privada 1</option>
              <option value="Espacio Coworking">Espacio Coworking</option>
              <option value="Auditorio">Auditorio</option>
            </select>

            <label style="display:block;margin-bottom:0.25rem;font-size:0.85rem;">Fecha</label>
            <input type="date" id="adminDate" required style="width:100%;padding:0.4rem;border:1px solid #cbd5e1;border-radius:4px;margin-bottom:0.75rem;" />

            <label style="display:block;margin-bottom:0.25rem;font-size:0.85rem;">Hora inicio</label>
            <input type="time" id="adminStartHour" required style="width:100%;padding:0.4rem;border:1px solid #cbd5e1;border-radius:4px;margin-bottom:0.75rem;" />

            <label style="display:block;margin-bottom:0.25rem;font-size:0.85rem;">Hora fin</label>
            <input type="time" id="adminEndHour" required style="width:100%;padding:0.4rem;border:1px solid #cbd5e1;border-radius:4px;margin-bottom:0.75rem;" />

            <label style="display:block;margin-bottom:0.25rem;font-size:0.85rem;">Motivo</label>
            <input type="text" id="adminReason" placeholder="Motivo de la reserva" required style="width:100%;padding:0.4rem;border:1px solid #cbd5e1;border-radius:4px;margin-bottom:1rem;" />

            <div style="display:flex;gap:0.75rem;">
              <button type="submit" style="background:#2563eb;color:white;padding:0.5rem 1rem;border:none;border-radius:4px;cursor:pointer;">Guardar</button>
              <button type="button" id="btnCancelarFormAdmin" style="background:#94a3b8;color:white;padding:0.5rem 1rem;border:none;border-radius:4px;cursor:pointer;">Cancelar</button>
            </div>
          </form>
        </div>

        <!-- Tabla de todas las reservas -->
        <div style="background:white;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.08);overflow:auto;">
          <table style="width:100%;border-collapse:collapse;">
            <thead style="background:#e2e8f0;">
              <tr>
                <th style="padding:0.75rem;text-align:left;font-size:0.85rem;">Usuario</th>
                <th style="padding:0.75rem;text-align:left;font-size:0.85rem;">Espacio</th>
                <th style="padding:0.75rem;text-align:left;font-size:0.85rem;">Fecha</th>
                <th style="padding:0.75rem;text-align:left;font-size:0.85rem;">Horario</th>
                <th style="padding:0.75rem;text-align:left;font-size:0.85rem;">Estado</th>
                <th style="padding:0.75rem;text-align:left;font-size:0.85rem;">Acciones</th>
              </tr>
            </thead>
            <!-- Las filas se inyectan aquí por el controller -->
            <tbody id="adminTableBody">
              <tr><td colspan="6" style="padding:1rem;text-align:center;color:#64748b;">Cargando...</td></tr>
            </tbody>
          </table>
        </div>

      </main>
    </div>
  `;
}
