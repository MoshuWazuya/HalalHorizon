const locationMapping = {
    paris: "Paris, France",
    maldives: "Maldives",
    tokyo: "Tokyo, Japan",
    new_york: "New York, USA",
    sydney: "Sydney, Australia",
    cape_town: "Cape Town, South Africa"
};

const urlParams = new URLSearchParams(window.location.search);
const locationName = urlParams.get('location'); 
const packageName = urlParams.get('package'); 

const destinationField = document.getElementById('destination');
const packageField = document.getElementById('packages');

if (locationName) {
    destinationField.value = locationMapping[locationName] || "Unknown Location";
} else {
    destinationField.value = "No location selected";
}

if (packageName) {
    packageField.value = packageName;
} else {
    packageField.value = "No package selected";
}

document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const bookingDetails = {
        destination: destinationField.value,
        package: packageField.value,
        date: document.getElementById("dates").value,
        adults: document.getElementById("adults").value,
        kids: document.getElementById("kids").value,
        specialRequests: document.getElementById("special-requests").value,
    };

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push(bookingDetails);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    window.location.href = "bookings.html";
});