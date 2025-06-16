// Cache location
let cachedLatitude = null;
let cachedLongitude = null;

// Get a city by the latitude and longitude
function getCityByLocation(latitude, longitude) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "OK") {
                const results = data.results;
                let city = null;

                for (const component of results[0].address_components) {
                    if (component.types.includes("locality")) {
                        city = component.long_name;
                        break;
                    }
                }

                return city;  // <-- return city here so the Promise resolves to it
            } else {
                console.error("Geocoding failed:", data.status);
                return null;  // or throw an error if you want
            }
        })
        .catch(error => {
            console.error("Error with fetch:", error);
            return null;
        });
}

// Get prayer times by location
function getPrayerTimes(latitude, longitude, madhab="0") {
    return fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2&school=${madhab}`)
    .then(response => response.json())
    .then(data => data.data.timings );
}

// If geolocation services are enabled then set the prayer times according to the location
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        cachedLatitude = position.coords.latitude;
        cachedLongitude  = position.coords.longitude;

    // Set location text to the location
    getCityByLocation(cachedLatitude, cachedLongitude)
        .then(city => {
            if (city) {
                document.getElementById("locationText").textContent = `Location: ${city}`;
            } else {
                console.log("City not found");
            }
    });

    // Set the prayer times
    getPrayerTimes(cachedLatitude, cachedLongitude).then(timings => {
        document.getElementById("fajrTime").textContent = timings.Fajr;
        document.getElementById("dhuhrTime").textContent = timings.Dhuhr;
        document.getElementById("asrTime").textContent = timings.Asr;
        document.getElementById("maghribTime").textContent = timings.Maghrib;
        document.getElementById("ishaTime").textContent = timings.Isha;
    });
    });
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownClick() {
    document.getElementById("asrSetting").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-button')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Set the time to reflect the Madhab when the option is selected
function updateAsrTime(madhab) {
    if (cachedLatitude !== null && cachedLongitude !== null) {
        getPrayerTimes(cachedLatitude, cachedLongitude, madhab).then(timings => {
            document.getElementById("asrTime").textContent = timings.Asr;
        });
    } else {
        console.warn("Location not yet available");
    }
}