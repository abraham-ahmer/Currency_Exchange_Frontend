const signupForm = document.querySelector("#signupForm");
const otpForm = document.querySelector("#otpForm");
const backBtn = document.querySelector("#backBtn");
const loader = document.querySelector("#Loader");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loader.style.display = "block"; // show loader

  const username = document.querySelector("#signUsername").value.trim();
  const email = document.querySelector("#signEmail").value.trim();
  const password = document.querySelector("#signPassword").value.trim();

  try {
    const response = await fetch("https://currency-exchange-backend-zi4p.onrender.com/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    loader.style.display = "none"; // hide loader once response arrives

    if (response.ok) {
      const data = await response.json();
      
      const messageBox = document.querySelector("#msgBox");
      messageBox.textContent = data.message;
      messageBox.style.display = "block"
      
      signupForm.style.display = "none";
      otpForm.style.display = "block";
      
      otpForm.dataset.email = email;  // create custom attribute with data-email = useremail
    } else {
      const error = await response.json();
      messageBox.textContent = error.details;
      messageBox.style.display = "block"
      signupForm.reset();
    }
  } catch (error) {
    loader.style.display = "none"; // hide loader on error
    alert("Network error. Please try again later.");
  }
});

otpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loader.style.display = "block";

  const otp = document.querySelector("#otpInput").value.trim();
  const email = otpForm.dataset.email;

  try {
    const res = await fetch("https://currency-exchange-backend-zi4p.onrender.com/signup/verify_otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    loader.style.display = "none";

    if (res.ok) {
      const data = await res.json();
      alert(`Signup Completed. Welcome On board ${data.username}`);
      window.location.href = "https://abraham-ahmer.github.io/Currency_Exchange_Frontend/login.html";
    } else {
      const err = await res.json();
      alert(`Error: ${err.details}`);
    }
  } catch (error) {
    alert("Network Error. Please Try Again later.");
  }
});

backBtn.addEventListener("click", () => {
  loader.style.display = "none";  // hide loader on network error
  signupForm.style.display = "block";
  otpForm.style.display = "none";
});
