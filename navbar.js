function updateNavbar() {
  const signupBtn = document.querySelector('a[href="signup.html"]');
  const loginBtn = document.querySelector('a[href="login.html"]');
  token = localStorage.getItem("access_token");

  if (token) {
    signupBtn.style.visibility = "hidden";
    loginBtn.textContent = "Logout";

    loginBtn.addEventListener("click", () => {
      localStorage.removeItem("access_token");
      // location.reload();
    });
  } else {
    signupBtn.style.visibility = "visible";
    loginBtn.textContent = "Login";
  }
}

document.addEventListener("DOMContentLoaded", updateNavbar);
