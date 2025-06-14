if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

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

    // Prayer times function
    function getPrayerTimes(latitude, longitude, location) {
        return fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`)
            .then(response => response.json())
            .then(data => data.data.timings );
    }

    // Set location text to the location
    getCityByLocation(latitude, longitude)
        .then(city => {
            if (city) {
                document.getElementById("locationText").textContent = `Location: ${city}`;
            } else {
                console.log("City not found");
            }
    });

    // Set the prayer times
    getPrayerTimes(latitude, longitude).then(timings => {
        document.getElementById("fajrTime").textContent = timings.Fajr;
        document.getElementById("dhuhrTime").textContent = timings.Dhuhr;
        document.getElementById("asrTime").textContent = timings.Asr;
        document.getElementById("maghribTime").textContent = timings.Maghrib;
        document.getElementById("ishaTime").textContent = timings.Isha;
    });
    });
}