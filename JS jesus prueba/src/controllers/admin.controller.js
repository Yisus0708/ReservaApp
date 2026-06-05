import { getSession } from "@/utils";
import {
  getReservations,
  createReservation,
  updateReservation,
  changeStatus,
  deleteReservation,
} from "@/services/reservation.service";

export const adminController = async () => {
  const user = getSession();
  const tbody = document.querySelector("#adminTableBody");
  const formContainer = document.querySelector("#formContainerAdmin");
  const form = document.querySelector("#adminReservationForm");
  const formTitle = document.querySelector("#formTitleAdmin");
  const btnNueva = document.querySelector("#btnNuevaReservaAdmin");
  const btnCancelar = document.querySelector("#btnCancelarFormAdmin");

  const cargarReservas = async () => {
    const reservas = await getReservations();

    if (!reservas.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="padding:1rem;text-align:center;color:#64748b;">No hay reservas</td></tr>`;
      return;
    }

    tbody.innerHTML = reservas.map(r => `
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:0.6rem;">${r.userName || "—"}</td>
        <td style="padding:0.6rem;">${r.workspace}</td>
        <td style="padding:0.6rem;">${r.date}</td>
        <td style="padding:0.6rem;">${r.startHour} - ${r.endHour}</td>
        <td style="padding:0.6rem;">
          <span style="background:${badgeColor(r.status)};color:white;padding:0.15rem 0.5rem;border-radius:12px;font-size:0.75rem;">${r.status}</span>
        </td>
        <td style="padding:0.6rem;display:flex;gap:0.4rem;flex-wrap:wrap;">
          <!-- Admin puede editar cualquier reserva -->
          <button data-edit="${r.id}" style="background:#2563eb;color:white;padding:0.2rem 0.5rem;border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;">Editar</button>

          <!-- Aprobar solo si está pendiente -->
          ${r.status === "pending" ? `<button data-approve="${r.id}" style="background:#16a34a;color:white;padding:0.2rem 0.5rem;border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;">Aprobar</button>` : ""}

          <!-- Rechazar solo si está pendiente -->
          ${r.status === "pending" ? `<button data-reject="${r.id}" style="background:#f59e0b;color:white;padding:0.2rem 0.5rem;border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;">Rechazar</button>` : ""}

          <!-- Eliminar siempre disponible para admin -->
          <button data-delete="${r.id}" style="background:#dc2626;color:white;padding:0.2rem 0.5rem;border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;">Eliminar</button>
        </td>
      </tr>
    `).join("");
 
    tbody.querySelectorAll("[data-edit]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-edit");
        const reserva = reservas.find(r => String(r.id) === id);
        abrirFormEditar(reserva);
      });
    });

    tbody.querySelectorAll("[data-approve]").forEach(btn => {
      btn.addEventListener("click", async () => {
        await changeStatus(btn.getAttribute("data-approve"), "approved");
        cargarReservas();
      });
    });

    tbody.querySelectorAll("[data-reject]").forEach(btn => {
      btn.addEventListener("click", async () => {
        await changeStatus(btn.getAttribute("data-reject"), "rejected");
        cargarReservas();
      });
    });

    tbody.querySelectorAll("[data-delete]").forEach(btn => {
      btn.addEventListener("click", async () => {
        if (confirm("¿Eliminar esta reserva permanentemente?")) {
          await deleteReservation(btn.getAttribute("data-delete"));
          cargarReservas();
        }
      });
    });
  };

  const badgeColor = (status) => {
    const colores = { pending: "#f59e0b", approved: "#16a34a", rejected: "#dc2626", cancelled: "#94a3b8" };
    return colores[status] || "#64748b";
  };

  const abrirFormCrear = () => {
    formTitle.textContent = "Nueva Reserva";
    form.reset();
    document.querySelector("#adminReservationId").value = "";
    formContainer.style.display = "block";
  };

  const abrirFormEditar = (reserva) => {
    formTitle.textContent = "Editar Reserva";
    document.querySelector("#adminReservationId").value = reserva.id;
    document.querySelector("#adminWorkspace").value = reserva.workspace;
    document.querySelector("#adminDate").value = reserva.date;
    document.querySelector("#adminStartHour").value = reserva.startHour;
    document.querySelector("#adminEndHour").value = reserva.endHour;
    document.querySelector("#adminReason").value = reserva.reason;
    formContainer.style.display = "block";
  };

  btnNueva.addEventListener("click", abrirFormCrear);

  btnCancelar.addEventListener("click", () => {
    formContainer.style.display = "none";
    form.reset();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.querySelector("#adminReservationId").value;

    const datos = {
      userId: user.id,
      userName: user.name,
      workspace: document.querySelector("#adminWorkspace").value,
      date: document.querySelector("#adminDate").value,
      startHour: document.querySelector("#adminStartHour").value,
      endHour: document.querySelector("#adminEndHour").value,
      reason: document.querySelector("#adminReason").value,
      status: "pending",
    };

    try {
      if (id) {
        await updateReservation(id, { ...datos, id: Number(id) });
      } else {
        await createReservation(datos);
      }

      formContainer.style.display = "none";
      form.reset();
      cargarReservas();

    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar la reserva");
    }
  });

  cargarReservas();
};
