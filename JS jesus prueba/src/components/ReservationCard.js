export default function ReservationCard(reservation, userId) {
  const { id, workspace, date, startHour, endHour, reason, status } = reservation;

  const colores = {
    pending: "#f59e0b",   
    approved: "#16a34a",  
    rejected: "#dc2626",
    cancelled: "#94a3b8",
  };

  const color = colores[status] || "#64748b";

  const puedaEditar = status === "pending";

  const puedeCancel = status === "pending" || status === "approved";

  return `
    <div style="background:white;border-radius:8px;padding:1rem;box-shadow:0 1px 4px rgba(0,0,0,0.08);border-left:4px solid ${color};">

      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.5rem;">
        <h3 style="font-weight:bold;font-size:1rem;">${workspace}</h3>
        <!-- Badge de estado con color según su valor -->
        <span style="background:${color};color:white;padding:0.15rem 0.5rem;border-radius:12px;font-size:0.75rem;">${status}</span>
      </div>

      <p style="font-size:0.85rem;color:#475569;"> ${date} &nbsp; ${startHour} - ${endHour}</p>
      <p style="font-size:0.85rem;color:#475569;margin-top:0.25rem;"> ${reason}</p>

      <!-- Botones de acción según el estado -->
      <div style="display:flex;gap:0.5rem;margin-top:0.75rem;">
        ${puedaEditar ? `<button data-edit="${id}" style="background:#2563eb;color:white;padding:0.3rem 0.75rem;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;">Editar</button>` : ""}
        ${puedeCancel ? `<button data-cancel="${id}" style="background:#dc2626;color:white;padding:0.3rem 0.75rem;border:none;border-radius:4px;cursor:pointer;font-size:0.8rem;">Cancelar</button>` : ""}
      </div>

    </div>
  `;
}
