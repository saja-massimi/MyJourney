document.addEventListener("DOMContentLoaded", () => {
    const userNavbar = document.getElementById("userNavbar");
    const guestNavbar = document.getElementById("guestNavbar");


    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

    if (loggedInUserEmail && users.some(user => user.email === loggedInUserEmail)) {
        userNavbar.style.display = "flex";
        guestNavbar.style.display = "none";
    } else {
        userNavbar.style.display = "none";
        guestNavbar.style.display = "flex";
    }
});
