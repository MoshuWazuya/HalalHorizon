const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
const bookingsList = document.getElementById("bookings-list");

    if (bookings.length > 0) {
        bookings.forEach((booking, index) => {
            const bookingCard = document.createElement("div");
            bookingCard.className = "booking-card";
            bookingCard.innerHTML = `
                <h2>Booking ${index + 1}</h2>
                <p><strong>Destination:</strong> ${booking.destination}</p>
                <p><strong>Package:</strong> ${booking.package}</p>
                <p><strong>Date:</strong> ${booking.date}</p>
                <p><strong>Adults:</strong> ${booking.adults}</p>
                <p><strong>Kids:</strong> ${booking.kids}</p>
                <p><strong>Special Requests:</strong> ${booking.specialRequests || "None"}</p>
                `;
                bookingsList.appendChild(bookingCard);
            });
        } else {
            bookingsList.innerHTML = "<p>No bookings found.</p>";
        }