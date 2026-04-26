const loginForm = document.querySelector("#loginForm");
const loader = document.querySelector("#Loader"); // loader element by ID

// get new access token using refresh token
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token"); // get ref tokens from localStorage.
  if (!refreshToken) return null; // if no ref token, return nothin

  try {
    const response = await fetch(
      "https://currency-exchange-backend-zi4p.onrender.com/login/refresh",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      },
    );

    if (response.ok) {
      const data = await response.json(); // If backend accepts the refresh token, it issues new access token.
      localStorage.setItem("access_token", data.access_token); // we overwrite that expired access token
      return data.access_token;
    } else {
      // if refresh failed. 7 days have passed... backend checked it... FORCED LOGOUT
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href =
        "https://abraham-ahmer.github.io/Currency_Exchange_Frontend/index.html";
      return null;
    }
  } catch (error) {
    return null;
  }
}

// runs second and calls refreshAccessToken
function startRefreshTimer() {
  //25 minutes in ms
  const interval = 25 * 60 * 1000;
  setInterval(async () => {
    await refreshAccessToken();
  }, interval);
}

// runs first and call startRefreshTimer
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  loader.style.display = "block"; // show loader immediately on submit

  const username = document.querySelector("#loginUsername").value.trim();
  const password = document.querySelector("#loginPassword").value.trim();

  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  try {
    const response = await fetch(
      "https://currency-exchange-backend-zi4p.onrender.com/login",
      {
        method: "POST",
        body: formData,
      },
    );
    loader.style.display = "none"; // hide loader

    if (response.ok) {
      const data = await response.json();
      alert(`Login successful. Welcome back`);

      // saving both access and refreshing tokens
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      loginForm.reset();
      window.location.href =
        "https://abraham-ahmer.github.io/Currency_Exchange_Frontend/index.html";
      updateNavbar();

      // start refresh timer
      startRefreshTimer();
    } else {
      const error = await response.json();
      alert(`Error occurred while logging in: ${error.detail}`);
      loginForm.reset();
    }
  } catch (err) {
    loader.style.display = "none";
    alert(`Network error: ${err.message}`);
  }
});

// for other endpoints in frontend calling backend endpoints
async function fetchWithAuth(url, options = {}) {
  let token = localStorage.getItem("access_token");

  let response = await fetch(url, {
    ...options,
    headers: { ...options.headers, Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) {
    token = await refreshAccessToken();
    if (token) {
      response = await fetch(url, {
        ...options,
        headers: { ...options.headers, Authorization: `Bearer ${token}` },
      });
    }
  }
  return response;
}

