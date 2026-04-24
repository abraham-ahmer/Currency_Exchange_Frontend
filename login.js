const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.querySelector("#loginUsername").value.trim();
  const password = document.querySelector("#loginPassword").value.trim();

  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);
  console.log(formData)

  const response = await fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    const data = await response.json();
    alert(`Login successful. Welcome back`);
    localStorage.setItem("access_token", data.access_token);
    loginForm.reset();
    window.location.href = "/index.html";

    updateNavbar()
  } else {
    const error = await response.json();
    alert(`Error occured while Loging in. ${error.detail}`);
    loginForm.reset();
  }
});
