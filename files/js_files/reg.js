"use strict"
document.addEventListener('DOMContentLoaded', function () {
    // ----------------> API country
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const countrySelect = document.getElementById('country');
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.cca2; //country code
                option.textContent = country.name.common;  //country name
                countrySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching countries:', error));
});




// -------------->for slider
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () => {
    container.classList.remove("sign-up-mode");
});



//----------> for matching pass.
// Select the input fields and button
const signupPassword = document.getElementById("signup-password");
const confirmPassword = document.getElementById("confirm-password");
const errorMessage = document.getElementById("error-message");
const signupBtn = document.getElementById("signupBtn");
// Function to check if passwords match
function checkPasswords() {
    if (signupPassword.value !== confirmPassword.value) {
        errorMessage.textContent = "Passwords do not match!";
        signupBtn.disabled = true; // Disable the sign up button
    } else {
        errorMessage.textContent = ""; // Clear the error message if passwords match
        signupBtn.disabled = false; // Enable the sign up button
    }
}
signupPassword.addEventListener('input', checkPasswords);
confirmPassword.addEventListener('input', checkPasswords);




//----------------------> for email rules

const signupEmail = document.getElementById("signup-email");
const emailErrorMessage = document.getElementById("email-error-message");

// Function to validate email format
function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email pattern
    if (!emailPattern.test(signupEmail.value)) {
        emailErrorMessage.textContent = "Please enter a valid email address!";
    } else {
        emailErrorMessage.textContent = ""; // Clear error if valid
    }
}

signupEmail.addEventListener('blur', validateEmail);



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

    // Check if password has at least 8 characters
    if (password.length >= 8) {
        minLength.classList.add("valid");
    } else {
        minLength.classList.remove("valid");
    }

    // Check if password has at least one uppercase letter
    if (/[A-Z]/.test(password)) {
        uppercase.classList.add("valid");
    } else {
        uppercase.classList.remove("valid");
    }

    // Check if password has at least one lowercase letter
    if (/[a-z]/.test(password)) {
        lowercase.classList.add("valid");
    } else {
        lowercase.classList.remove("valid");
    }

    // Check if password has at least one number
    if (/\d/.test(password)) {
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
    }

    // Check if password has at least one special character
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        specialChar.classList.add("valid");
    } else {
        specialChar.classList.remove("valid");
    }
}
// Add input event listener to check password strength while typing
passwordInput.addEventListener('input', checkPasswordStrength);