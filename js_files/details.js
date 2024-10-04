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
//  document.querySelector(".foodButton").addEventListener('click', getFoods());

async function getData(hotelName = countryName, checkIn = "2024-10-10", checkOut = "2024-10-20", adults = 2, children = 0) {
    const apiUrl = `https://serpapi.com/search.json?engine=google_hotels&q=${encodeURIComponent(hotelName)}&check_in_date=${checkIn}&check_out_date=${checkOut}&adults=${adults}&children=${children}&currency=JOD&gl=us&hl=en&api_key=${apiKey}&q=${countryName}`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        const result = data.properties;

        console.log(result);
        const divContent = result.map(function (element) {

            return `
                <div class="resort-item">
                    <h2 class="hotel-name">${element.name ? element.name : ""}</h2>
                    <img src="${element.images[1].original_image ? element.images[1].original_image : element.images[2].original_image}" alt="${element.name}" class="resort-img">
                    <div class="resort-details">
                        <p>Rating: ⭐ ${element.overall_rating ? element.overall_rating : "N/A"}</p>
                        <ul class="amenities">
                            <li>${element.amenities[5] ? element.amenities[5] : ""}</li>
                            <li>${element.amenities[1] ? element.amenities[1] : ""}</li>
                        </ul>
                        <div class="price"> Price: ${element.total_rate ? element.total_rate.lowest : "400$"}</div>
                    </div>
                    <button class="view-btn">Book Now</button>
                </div>
            `;
        }).join("");

        let divHtml = document.querySelector(".resort-list");
        divHtml.innerHTML = divContent;

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

// async function getFoods() {


//     const apiUrl = `https://serpapi.com/search.json?engine=google_food&q=resturant&location=${countryName}`;



//     let response = await fetch(apiUrl + `&api_key=${apiKey}`);
//     var data = await response.json();



//     const result = data.local_results;
//     console.log(result);
//     let divContent = result.map(function (element) {
//         return `
       
//              <div class="coffee-item">
//         <img src=${element.images[0]} alt="Ment Coffee" class="coffee-img">
//         <div class="coffee-details">
//           <h2 class="coffee-name">${element.title}</h2>
//           <p class="coffee-rating">${element.rating}⭐</p>
//           <p class="coffee-address">${element.address}</p>
//           <p class="coffee-open">${element.hours}</p>
//           <div class="coffee-actions">
//             <button>Order Now</button>
//           </div>
//         </div>
//       </div>
//     </div>
//        `
//     }).join("");
//     let divHtml = document.querySelector(".coffee-list");
//     divHtml.innerHTML = divContent;

// }