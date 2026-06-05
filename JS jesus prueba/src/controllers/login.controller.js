import { saveSession } from "@/utils";
import { navigateTo } from "@/router/router";
import { http } from "@/api/http";

export const loginController = () => {
  const form = document.querySelector("#loginForm");
  const errorMsg = document.querySelector("#loginError");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    try {
      const users = await http.get(`/users?email=${email}&password=${password}`);

      if (!users.length) {
        errorMsg.style.display = "block";
        return;
      }

      saveSession({
        id: users[0].id,
        name: users[0].name,
        role: users[0].role,
      });

      if (users[0].role === "admin") {
        navigateTo("/admin");
      } else {
        navigateTo("/home");
      }

    } catch (error) {
      console.error("Error en login:", error);
      errorMsg.textContent = "Error conectando con el servidor";
      errorMsg.style.display = "block";
    }
  });
};
