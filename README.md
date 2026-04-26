# Currency Exchange Frontend

Frontend interface for the **Currency Exchange App**, built with **HTML, CSS, and JavaScript**. It connects to the FastAPI backend and provides a clean user experience for signup, OTP verification, login, currency conversion, and account management.

🌐 Live Demo: [Currency Exchange Frontend](https://abraham-ahmer.github.io/Currency_Exchange_Frontend/)

---

## 🚀 Features
- Signup form with OTP verification flow
- Login and secure session handling
- Currency converter with live exchange rates
- Account deletion option
- Responsive design with global CSS styling
- Integrated with backend API hosted on Render

---

## 📂 Project Structure
frontend/
│── index.html        # Homepage with converter
│── login.html        # Login page
│── signup.html       # Signup + OTP form
│── style.css         # Global styling
│── script.js         # Frontend logic & API calls
│── README.md         # Documentation



---

## ⚙️ Setup & Usage
1. Clone the repo:
   ```bash
   git clone https://github.com/abraham-ahmer/Currency_Exchange_Frontend.git
   cd Currency_Exchange_Frontend

## Backend Integration
Backend live at: https://currency-exchange-backend-zi4p.onrender.com

Frontend communicates via fetch() calls to backend endpoints:

/signup → Register user, send OTP

/signup/verify_otp → Verify OTP

/login → Authenticate user

/currency/currency_converter → Convert currency

/currency/delete → Delete account

License
MIT License — free to use and modify.
