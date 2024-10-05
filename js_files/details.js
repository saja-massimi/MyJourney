"use strict"
const apiKey = "4b3141bb29beee1c182a1ca3ca6b65e74ca99e7f80d52b33badeb04a71ffd084";

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


const countryName = getQueryParam('country');



/********************************************************************************************* */

document.addEventListener("DOMContentLoaded", getData);
document.querySelector(".filter-btn").addEventListener('click', getData);
document.querySelector(".foodButton").addEventListener('click', getFoods);

async function getData(hotelName = countryName, checkIn = "2024-10-10", checkOut = "2024-10-20", adults = 2, children = 0) {
    const apiUrl = `https://serpapi.com/search.json?engine=google_hotels&q=${encodeURIComponent(hotelName)}&check_in_date=${checkIn}&check_out_date=${checkOut}&adults=${adults}&children=${children}&currency=JOD&gl=us&hl=en&api_key=${apiKey}&q=${countryName}`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        const result = data.properties || [];

        console.log(result);

        let divHtml = document.querySelector(".resort-list");


        if (result.length === 0) {
            divHtml.innerHTML = `<p>No Hotels Available</p>`;
        } else {
            const divContent = result.map(function (element) {
                return `
                    <div class="resort-item">
                        <h2 class="hotel-name">${element.name ? element.name : ""}</h2>
                        <img src="${element.images[1]?.original_image || element.images[2]?.original_image}" alt="${element.name}" class="resort-img">
                        <div class="resort-details">
                            <p>Rating: ⭐ ${element.overall_rating || "N/A"}</p>
                            <ul class="amenities">
                                <li>${element.amenities && element.amenities.length > 5 ? element.amenities[5] : ""}</li>
                                <li>${element.amenities && element.amenities.length > 1 ? element.amenities[1] : ""}</li>
                            </ul>
                            <div class="price"> Price: ${element.total_rate ? element.total_rate.lowest : "JOD 400"}</div>
                        </div>
                        <button class="view-btn">Book Now</button>
                    </div>
                `;
            }).join("");


            divHtml.innerHTML = divContent;
        }

    } catch (error) {
        console.error('Error fetching hotels:', error);
    }
}


document.getElementById('search-btn').addEventListener('click', function () {
    const hotelName = document.getElementById('hotel-name').value;
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;

    if (hotelName && checkIn && checkOut) {
        getData(hotelName, checkIn, checkOut, adults, children);
    } else {
        alert("Please fill in all fields.");
    }
});
/******************************************************************** */

// Fetch and display restaurant data
async function getFoods() {
    const apiUrl = `https://serpapi.com/search.json?engine=google_food&q=restaurant&location=${countryName}&api_key=${apiKey}`;

    try {
        let response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        let data = await response.json();
        const result = data.local_results || [];
        console.log(data);

        let divHtml = document.querySelector(".resort-list");

        if (result.length === 0) {
            divHtml.innerHTML = `<p>No Restaurants Available</p>`;
        } else {
            let divContent = result.map(function (element) {
                return `
                    <div class="coffee-item">
                        <img src="${element.images?.[0] || 'default-image-url.jpg'}" alt="${element.title}" class="coffee-img">
                        <div class="coffee-details">
                            <h2 class="coffee-name">${element.title}</h2>
                            <p class="coffee-rating">${element.rating || 'N/A'} ⭐</p>
                            <p class="coffee-address">${element.address || 'No address available'}</p>
                            <p class="coffee-open">${element.hours || 'No hours available'}</p>
                            <div class="coffee-actions">
                                <button>Order Now</button>
                            </div>
                        </div>
                    </div>
                `;
            }).join("");

            divHtml.innerHTML = divContent;
        }

    } catch (error) {
        console.error('Error fetching restaurants:', error);
        alert(`Error fetching restaurants: ${error.message}`);
    }
}