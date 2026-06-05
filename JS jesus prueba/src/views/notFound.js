export default function notFound() {
  return `
    <div style="display:flex;justify-content:center;align-items:center;min-height:100vh;background:#f1f5f9;">
      <div style="text-align:center;">
        <h1 style="font-size:3rem;font-weight:bold;color:#2563eb;">404</h1>
        <p style="color:#64748b;margin-bottom:1rem;">Página no encontrada</p>
        <a href="/" style="color:#2563eb;text-decoration:underline;">Volver al inicio</a>
      </div>
    </div>
  `;
}
