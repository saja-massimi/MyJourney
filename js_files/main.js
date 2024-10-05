const users = JSON.parse(localStorage.getItem("users")) || [];
const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
const anchorTags = document.querySelectorAll('.carousel-item a');

anchorTags.forEach(anchor => {
    anchor.addEventListener('click', (event) => {
        event.preventDefault();
        if (loggedInUserEmail && users.some(user => user.email === loggedInUserEmail)) {

        
        const countryName = anchor.getAttribute('name');
        window.location.href = `hotel.html?country=${countryName}`;
        }
else {
            window.location.href = "./register.html";
}

    });
});


document.addEventListener("DOMContentLoaded", () => {

    const bookBtn = document.getElementById("bookBtn");
    if (loggedInUserEmail && users.some(user => user.email === loggedInUserEmail)) {
        bookBtn.href = "./Location.html";

    } else {
        bookBtn.href = "./register.html";

    }

    
});