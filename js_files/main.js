const anchorTags = document.querySelectorAll('.carousel-item a');

anchorTags.forEach(anchor => {
    anchor.addEventListener('click', (event) => {
        event.preventDefault();

        const countryName = anchor.getAttribute('name');
        window.location.href = `hotel.html?country=${countryName}`;
    });
});