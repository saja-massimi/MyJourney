"use strict";
document.addEventListener("DOMContentLoaded", function () {
  //country API 
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      const countrySelect = document.getElementById("country");
      data.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.cca2;
        option.textContent = country.name.common;
        countrySelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching countries:", error));
});


const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

//----------> for matching pass.

const signupPassword = document.getElementById("signup-password");
const confirmPassword = document.getElementById("confirm-password");

const errorMessage = document.getElementById("error-message");
const signupBtn = document.getElementById("signupBtn");
// Function to check if passwords match
function checkPasswords() {
  if (signupPassword.value !== confirmPassword.value) {
    errorMessage.textContent = "Passwords do not match!";
    signupBtn.disabled = true;
  } else {
    errorMessage.textContent = "";
    signupBtn.disabled = false;
  }
}
signupPassword.addEventListener("input", checkPasswords);
confirmPassword.addEventListener("input", checkPasswords);

//----------------------> for email rules

const signupEmail = document.getElementById("signup-email");
const emailErrorMessage = document.getElementById("email-error-message");

// Function to validate email format
function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(signupEmail.value)) {
    emailErrorMessage.textContent = "Please enter a valid email address";
  } else {
    emailErrorMessage.textContent = "";
  }
}

signupEmail.addEventListener("blur", validateEmail);

//---------------------------> for pass rules

const passwordInput = document.getElementById("signup-password");

const minLength = document.getElementById("min-length");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const number = document.getElementById("number");
const specialChar = document.getElementById("special-char");

// Function to check password strength
function checkPasswordStrength() {
  const password = passwordInput.value;


  if (password.length >= 8) {
    minLength.classList.add("valid");
  } else {
    minLength.classList.remove("valid");
  }


  if (/[A-Z]/.test(password)) {
    uppercase.classList.add("valid");
  } else {
    uppercase.classList.remove("valid");
  }


  if (/[a-z]/.test(password)) {
    lowercase.classList.add("valid");
  } else {
    lowercase.classList.remove("valid");
  }


  if (/\d/.test(password)) {
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
  }


  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    specialChar.classList.add("valid");
  } else {
    specialChar.classList.remove("valid");
  }
}

passwordInput.addEventListener("input", checkPasswordStrength);



document.querySelector(".sign-up-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();


    const username = document.getElementById("username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const country = document.getElementById("country").value;

    const hashedPassword = CryptoJS.SHA256(password).toString();


    const newUser = {
      username: username,
      email: email,
      password: hashedPassword,
      country: country
    };


    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === email)) {


      document.querySelector(".alert").innerHTML(
        ` <div class='alert alert-danger' role='alert'>
  This email is already registered!
</div> `);


      alert("This email is already registered!");
      return;
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // alert("User data saved successfully!");

    document.querySelector(".alert").innerHTML(
      ` <div class='alert alert-danger' role='alert'>
User data saved successfully!
</div> `);

    window.location.href = "./index.html";
  });


/*******************Sign In************************************/

document.querySelector('.sign-in-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();


    const email = document.getElementById('email').value;
    const password = document.getElementById('pswd').value;

    const hashedPassword = CryptoJS.SHA256(password).toString();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === email && user.password === hashedPassword);


    if (user) {

      alert('Login successful! Welcome ' + user.username);

      window.location.href = 'index.html';
    } else {
      alert('Invalid email or password. Please try again.');
    }
  });



