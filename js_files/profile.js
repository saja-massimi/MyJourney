document.addEventListener("DOMContentLoaded", () => {

    /***************************Current User************************/
    const email = localStorage.getItem("loggedInUserEmail");
    const users = JSON.parse(localStorage.getItem("users"));

    const user = users.find(user => user.email === email);
    console.log(user);

    /***************************Set User Data************************/
    document.getElementById("user-name").textContent = user.username;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("user-loc").textContent = user.country;
    document.getElementById("user-det-name").textContent = user.username;
    document.getElementById("user-det-email").textContent = user.email;

    /***************************Display Bookings************************/
    if (typeof user.bookings === "undefined") {
        user.bookings = [];
    }
    const bookings = user.bookings;
    const bookingsContainer = document.querySelector('.bookings');


    if (bookings.length === 0) {
        bookingsContainer.innerHTML = '<p>No bookings found.</p>';
    } else {
        bookings.forEach((booking, index) => {
            const bookingItem = document.createElement('div');
            bookingItem.classList.add('booking-item');

            bookingItem.innerHTML = `
                <h3 class="country-name">${booking.hotelName}</h3>
                <p class="booking-date">Check-in: ${booking.checkIn}</p>
                <p class="booking-date">Check-out: ${booking.checkOut}</p>
                <p class="booking-description">
                   <p> Booking for ${booking.adults} adult(s) and ${booking.children} child(ren). </p>
                   <p> Total Price: ${booking.totalPrice} </p>
                </p>
                <div class="guest-info">
                    <div class="guest-card">
                        <p><strong>Adults:</strong> ${booking.adults}</p>
                        <p><strong>Children:</strong> ${booking.children}</p>
                    </div>
                </div>
                <button class="delete-btn" data-index="${index}">Delete Booking</button>
            `;

            bookingsContainer.appendChild(bookingItem);
        });
        /*****************************************Delete Booked info************************************* */
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {

                const email = localStorage.getItem('loggedInUserEmail');
                const users = JSON.parse(localStorage.getItem('users'));
                const user = users.find(u => u.email === email);

                if (user) {
                    const index = event.target.dataset.index;
                    if (user.bookings && user.bookings.length > 0) {
                        user.bookings.splice(index, 1);
                        localStorage.setItem('users', JSON.stringify(users));

                        event.target.parentElement.remove();
                        const bookingsContainer = document.querySelector('.bookings-container');
                        if (user.bookings.length === 0) {
                            bookingsContainer.innerHTML = '<p>No bookings yet</p>';
                        }
                    }
                } else {
                    console.error('User not found');
                }
            });
        });






    }
});


