import { getSession } from "@/utils";
import ReservationCard from "@/components/ReservationCard";
import {
  getReservationsByUser,
  createReservation,
  updateReservation,
  changeStatus,
} from "@/services/reservation.service";

export const homeController = async () => {
  const user = getSession();
  const container = document.querySelector("#reservationsContainer");
  const formContainer = document.querySelector("#formContainer");
  const form = document.querySelector("#reservationForm");
  const formTitle = document.querySelector("#formTitle");
  const btnNueva = document.querySelector("#btnNuevaReserva");
  const btnCancelarForm = document.querySelector("#btnCancelarForm");

  const cargarReservas = async () => {
    const reservas = await getReservationsByUser(user.id);

    if (!reservas.length) {
      container.innerHTML = `<p style="color:#64748b;">No tienes reservas aún.</p>`;
      return;
    }

    container.innerHTML = reservas.map(r => ReservationCard(r, user.id)).join("");

    container.querySelectorAll("[data-edit]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-edit");
        const reserva = reservas.find(r => String(r.id) === id);
        abrirFormEditar(reserva); 
      });
    });

    container.querySelectorAll("[data-cancel]").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-cancel");
        if (confirm("¿Cancelar esta reserva?")) {
          
          await changeStatus(id, "cancelled");
          cargarReservas();
        }
      });
    });
  };

  const abrirFormCrear = () => {
    formTitle.textContent = "Nueva Reserva";
    form.reset();
    document.querySelector("#reservationId").value = "";
    formContainer.style.display = "block";
  };

  
  const abrirFormEditar = (reserva) => {
    formTitle.textContent = "Editar Reserva";
    document.querySelector("#reservationId").value = reserva.id;
    document.querySelector("#workspace").value = reserva.workspace;
    document.querySelector("#date").value = reserva.date;
    document.querySelector("#startHour").value = reserva.startHour;
    document.querySelector("#endHour").value = reserva.endHour;
    document.querySelector("#reason").value = reserva.reason;
    formContainer.style.display = "block";
  };

  btnNueva.addEventListener("click", abrirFormCrear);

  btnCancelarForm.addEventListener("click", () => {
    formContainer.style.display = "none";
    form.reset();
  });

  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.querySelector("#reservationId").value;

    
      const datos = {
      userId: user.id,
      userName: user.name,
      workspace: document.querySelector("#workspace").value,
      date: document.querySelector("#date").value,
      startHour: document.querySelector("#startHour").value,
      endHour: document.querySelector("#endHour").value,
      reason: document.querySelector("#reason").value,
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
      console.error("Error al guardar reserva:", error);
      alert("Error al guardar la reserva");
    }
  });

  cargarReservas();
};
