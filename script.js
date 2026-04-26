// GLOBAL TIME
const now = new Date();

const formattedTime =
  now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }) +
  " " +
  now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

//  CURRENCY CONVERTER       (OPTION 1)

const converterForm = document.querySelector("#converterForm");
const converterResult = document.querySelector("#converterResult");
const loader = document.querySelector("#Loader")

if (converterForm) {
  converterForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loader.style.display = "block"; // show loader

    const base_currency = document.querySelector("#baseCurrency").value.trim().toUpperCase();
    const target_currency = document.querySelector("#targetCurrency").value.trim().toUpperCase();
    const amount = document.querySelector("#amount").value.trim();

    if (amount < 1) {
      loader.style.display = "none"; // hide loader immediately
      converterResult.innerHTML = "<p>Amount cannot be less than 1</p>";
      return;
    }

    try {
      const response = await fetch("https://currency-exchange-backend-zi4p.onrender.com/currency/currency_converter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base_currency, target_currency, amount }),
      });

      loader.style.display = "none"; // hide loader once response arrives

      if (response.ok) {
        const data = await response.json();
        converterResult.innerHTML = `
          <h4>CURRENCY CONVERTER RESULT</h4><br>
          <p><strong>Base Currency: </strong>${base_currency}</p>
          <p><strong>Target Currency: </strong>${target_currency}</p>
          <p><strong>Amount: </strong>${amount}</p>
          <p><strong>Market Rate: </strong>${data.live}</p>
          <p><strong>Time: </strong>${formattedTime}</p>
        `;
        converterForm.reset();
      } else {
        const error = await response.json();
        const errMessage = error.detail || error.message || "Unknown error";
        converterResult.innerHTML = `<p>${errMessage}</p>`;
        converterForm.reset();
      }
    } catch (error) {
      loader.style.display = "none"; // hide loader on network error
      converterResult.innerHTML = `<p>Network error. Please try again later.</p>`;
    }
  });
}

//  LIVE CURRENCY        (OPTION 2)

const liveForm = document.querySelector("#liveForm");
const liveResult = document.querySelector("#liveResult");

if (liveForm) {
  liveForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loader.style.display = "block"; // show loader immediately

    const base_currency = document
      .querySelector("#liveBaseCurrency")
      .value.trim()
      .toUpperCase();
    const target_currency = document
      .querySelector("#liveTargetCurrency")
      .value.trim()
      .toUpperCase();

    try {
      const response = await fetch(
        "https://currency-exchange-backend-zi4p.onrender.com/currency/live_currency_exchange",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base_currency, target_currency }),
        },
      );

      loader.style.display = "none"; // hide loader once response arrives

      if (response.ok) {
        const data = await response.json();
        liveResult.innerHTML = `
          <h4>Live Currency Exchange</h4><br>
          <p><strong>Base Currency: </strong>${data.base}</p>
          <p><strong>Target Currency: </strong>${data.target}</p>
          <p><strong>Time: </strong>${formattedTime}</p>
        `;
        liveForm.reset();
      } else {
        const error = await response.json();
        const errorMsg = error.detail || error.message || "Unknown error";
        liveResult.innerHTML = `<p>${errorMsg}</p>`;
        liveForm.reset();
      }
    } catch (error) {
      loader.style.display = "none"; // hide loader on network error
      liveResult.innerHTML = `<p>Network error. Please try again later.</p>`;
    }
  });
}

// HISTORICAL CHECK ENDPOINT (OPTION 3)

const historyForm = document.querySelector("#historyForm");
const historyResult = document.querySelector("#historyResult");

if (historyForm) {
  historyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loader.style.display = "block"; // show loader immediately

    const base_currency = document.querySelector("#historyBaseCurrency").value.trim().toUpperCase();
    const target_currency = document.querySelector("#historyTargetCurrency").value.trim().toUpperCase();
    const amount = document.querySelector("#historyAmount").value.trim();
    const historical_date = document.querySelector("#historicalDate").value.trim();
    const token = localStorage.getItem("access_token");

    if (!token) {
      loader.style.display = "none"; // hide loader
      historyResult.innerHTML = "<p>Please Login First to check historical data of supported currencies.</p>";
      return;
    }

    if (amount < 1) {
      loader.style.display = "none"; // hide loader
      historyResult.innerHTML = "<p>Cannot get data of amount less than 1</p>";
      return;
    }

    // to make sure user wont give date from future
    const selectedDate = new Date(historical_date);
    const todayDate = new Date();
    if (selectedDate > todayDate) {
      loader.style.display = "none"; // hide loader
      historyResult.textContent = "Cannot get data of future dates.";
      return;
    }

    try {
      const response = await fetchWithAuth("https://currency-exchange-backend-zi4p.onrender.com/currency/historical_currency_data", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ base_currency, target_currency, amount, historical_date }),
      });

      loader.style.display = "none"; // hide loader once response arrives

      if (response.ok) {
        const data = await response.json();
        historyResult.innerHTML = `
          <h4>Historical Currency Data</h4><br>
          <p><strong>Base Currency: </strong>${base_currency}</p>
          <p><strong>Target Currency: </strong>${target_currency}</p>
          <p><strong>Date: </strong>${historical_date}</p>
          <p><strong>Amount Converted: </strong>${amount}</p>
          <p><strong>Historical Data: </strong>${data.converted.toFixed(2)}</p>
        `;
        historyForm.reset();
      } else {
        const error = await response.json();
        const errMsg = error.details || error.message || "Unknown error";
        historyResult.innerHTML = `<p>${errMsg}</p>`;
        historyForm.reset();
      }
    } catch (error) {
      loader.style.display = "none"; // hide loader on network error
      historyResult.innerHTML = `<p>Network error. Please try again later.</p>`;
    }
  });
}


// DELETE ACCOUNT AND HISTORY (OPTION 4)

const dltButton = document.querySelector("#dltButton");
const dltText = document.querySelector("#dltText");

const signupBtn = document.querySelector('a[href="signup.html"]');
const loginBtn = document.querySelector('a[href="login.html"]');

if (dltButton) {
  dltButton.addEventListener("click", async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      dltText.textContent =
        "Please log in first to delete your account and history";
      return;
    }

    loader.style.display = "block"; // show loader 

    try {
      const response = await fetchWithAuth("https://currency-exchange-backend-zi4p.onrender.com/currency/delete", {
        method: "DELETE"
      });
      console.log("fetchWithAuth final response status:", response.status);

      loader.style.display = "none"; // stop loader once response arrives

      if (response.ok) {
        const data = await response.json();
        dltText.textContent = `${data.message}`;
        localStorage.removeItem("access_token");
        window.location.href = "https://abraham-ahmer.github.io/Currency_Exchange_Frontend/index.html";
        signupBtn.style.visibility = "visible";
        loginBtn.textContent = "Login";
      } else {
        const error = await response.json();
        dltText.textContent = `${error.detail}`;
      }
    } catch (err) {
      loader.style.display = "none"; // stop loader on network error
      dltText.textContent = `Network error: ${err.message}`;
    }
  });
}

