// Define a mapping of locations to their full names
const locationMapping = {
    paris: "Paris, France",
    maldives: "Maldives",
    tokyo: "Tokyo, Japan",
    new_york: "New York, USA",
    sydney: "Sydney, Australia",
    cape_town: "Cape Town, South Africa"
};

// Retrieve query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const locationName = urlParams.get('location'); // e.g., "paris"
const packageName = urlParams.get('package'); // e.g., "Romantic Getaway"

// Populate destination and package fields dynamically
const destinationField = document.getElementById('destination');
const packageField = document.getElementById('packages');

if (locationName) {
    // Set the destination field to the full name from the mapping
    destinationField.value = locationMapping[locationName] || "Unknown Location";
} else {
    destinationField.value = "No location selected";
}

if (packageName) {
    // Set the package field to the selected package name
    packageField.value = packageName;
} else {
    packageField.value = "No package selected";
}

// Handle form submission
document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Collect form data
    const bookingDetails = {
        destination: destinationField.value,
        package: packageField.value,
        date: document.getElementById("dates").value,
        adults: document.getElementById("adults").value,
        kids: document.getElementById("kids").value,
        specialRequests: document.getElementById("special-requests").value,
    };

    // Retrieve existing bookings from localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Add the new booking to the list
    bookings.push(bookingDetails);

    // Save the updated bookings list back to localStorage
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Redirect to the Bookings page
    window.location.href = "bookings.html";
});