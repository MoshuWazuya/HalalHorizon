const urlParams = new URLSearchParams(window.location.search);
const selectedLocation = urlParams.get('location');

console.log("Selected location:", selectedLocation);

const packagesData = {
    paris: [
        {
            name: "Romantic Getaway",
            benefits: ["Eiffel Tower tour", "Seine River cruise", "5-star hotel stay"],
            price: "$1,500"
        },
        {
            name: "Cultural Experience",
            benefits: ["Louvre Museum tickets", "guided city tour", "fine dining"],
            price: "$1,200"
        }
    ],
    maldives: [
        {
            name: "Beach Paradise",
            benefits: ["Overwater bungalow", "snorkeling excursion", "all-inclusive meals"],
            price: "$3,000"
        },
        {
            name: "Luxury Escape",
            benefits: ["Private villa", "spa treatments", "sunset cruise"],
            price: "$4,500"
        }
    ],
    tokyo: [
        {
            name: "City Adventure",
            benefits: ["Shibuya crossing tour", "sushi making class", "4-star hotel"],
            price: "$2,000"
        },
        {
            name: "Cultural Highlights",
            benefits: ["Temple visits", "kimono experience", "guided history tour"],
            price: "$2,500"
        }
    ],
    new_york: [
        {
            name: "Big Apple Tour",
            benefits: ["Broadway show", "Empire State Building tickets", "hotel stay"],
            price: "$1,800"
        },
        {
            name: "Shopping Spree",
            benefits: ["Fifth Avenue guide", "premium shopping discounts", "dinner"],
            price: "$2,100"
        }
    ],
    sydney: [
        {
            name: "Harbor Adventure",
            benefits: ["Sydney Opera House tour", "harbor cruise", "luxury stay"],
            price: "$2,800"
        },
        {
            name: "Wildlife Encounter",
            benefits: ["Taronga Zoo tickets", "Blue Mountains tour", "breakfast"],
            price: "$2,300"
        }
    ],
    cape_town: [
        {
            name: "Safari and City",
            benefits: ["Table Mountain tour", "safari experience", "boutique hotel"],
            price: "$3,200"
        },
        {
            name: "Coastal Retreat",
            benefits: ["Cape Point tour", "whale watching", "beachfront stay"],
            price: "$3,000"
        }
    ]
};

const packagesContainer = document.getElementById('packages');

if (selectedLocation && packagesData[selectedLocation]) {
    packagesData[selectedLocation].forEach(pkg => {
        const packageElement = document.createElement('div');
        packageElement.className = 'package';

        const benefitsList = pkg.benefits.map(benefit => `<li>${benefit}</li>`).join('');

        packageElement.innerHTML = `
            <h3>${pkg.name}</h3>
            <p><strong>Benefits:</strong></p>
            <ul>${benefitsList}</ul>
            <p><strong>Price:</strong> ${pkg.price}</p>
            <button onclick="bookPackage('${selectedLocation}', '${pkg.name}')">Book Now</button>
        `;

        packagesContainer.appendChild(packageElement);
    });
} else {
    packagesContainer.innerHTML = '<p>No packages available for the selected location.</p>';
}

function bookPackage(location, packageName) {
    const checkoutUrl = `checkoutpage.html?location=${encodeURIComponent(location)}&package=${encodeURIComponent(packageName)}`;
    window.location.href = checkoutUrl;
}