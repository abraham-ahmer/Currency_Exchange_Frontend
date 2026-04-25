const loginForm = document.querySelector("#loginForm");
const loader = document.querySelector("#Loader"); // loader element by ID

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  loader.style.display = "block"; // show loader immediately on submit

  const username = document.querySelector("#loginUsername").value.trim();
  const password = document.querySelector("#loginPassword").value.trim();

  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  try {
    const response = await fetch("https://currency-exchange-backend-zi4p.onrender.com/login", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      alert(`Login successful. Welcome back`);
      localStorage.setItem("access_token", data.access_token);
      loginForm.reset();
      window.location.href = "https://abraham-ahmer.github.io/Currency_Exchange_Frontend/index.html";
      updateNavbar();
    } else {
      const error = await response.json();
      alert(`Error occurred while logging in: ${error.detail}`);
      loginForm.reset();
    }
  } catch (err) {
    alert(`Network error: ${err.message}`);
  } finally {
    loader.style.display = "none"; // hide loader
  }
});

