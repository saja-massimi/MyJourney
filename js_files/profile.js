document.addEventListener("DOMContentLoaded", () => {

    /***************************Current User************************/
    const email = localStorage.getItem("loggedInUserEmail");
    const users = JSON.parse(localStorage.getItem("users"));

    const user = users.find(user => user.email === email);
    console.log(user);

    /***************************Set Data************************/
    document.getElementById("user-name").textContent = user.username;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("user-loc").textContent = user.country;
    document.getElementById("user-det-name").textContent = user.username;
    document.getElementById("user-det-email").textContent = user.email;
});


