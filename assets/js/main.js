// Für dieses Projekt verwenden wir die APIs Open Weather API, um eine Weather-Website zu erstellen.
// https://openweathermap.org/guide

// Um diese API nutzen zu können, müssen wir uns registrieren, um den API-Key zu erhalten.

// Nachdem du die Daten von der API erhalten hast, kannst du sie verwenden, um die Weather in einem ansprechenden Design anzuzeigen.

// -- CITY: LONDON --
// Doku: https://openweathermap.org/current#parameter
const aTag = document.createElement("a");
fetch("https://api.openweathermap.org/data/2.5/weather?q=london&appid=0ddd5e945f7a773bc88b9975bb9bd4e5&units=metric")
    .then((response) => response.json())
    .then((data) => {
        // console.log(data);

        // Zugriff auf Obejkteigenschaften
        const city = data.name;
        const descriptions = data.weather[0].description;
        const temp = data.main.temp;
        const icon = data.weather[0].icon;
        const pressure = data.main.pressure;
        const humidity = data.main.humidity;
        const coordsLon = data.coord.lon;
        const coordsLat = data.coord.lat;
        const windSpeed = data.wind.speed;
        const windDeg = data.wind.deg;
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;

        // London local time
        const date = new Date();
        const localTime = date.toLocaleTimeString("en-GB", { timeZone: 'Europe/London' });
        const localDateTime = date.toLocaleString("en-GB", { dateStyle: "medium" });



        //Unix timestamp umrechnen für sunrise
        const sunriseCalc = new Date(sunrise * 1000);
        localSunrise = sunriseCalc.toLocaleTimeString("en-GB", { timeZone: 'Europe/London' });
        //Unix timestamp umrechnen für sunrise
        const sunsetCalc = new Date(sunset * 1000);
        localSunset = sunsetCalc.toLocaleTimeString("en-GB", { timeZone: 'Europe/London' });

        // Neues Objekt für die for..in-Schleife
        const newObject = {
            localTime: localTime,
            windSpeed: `${windSpeed} m/s,
            Direction (${windDeg}°)`,
            cloudiness: descriptions,
            pressure: `${pressure} hpa`,
            humidity: `${humidity} %`,
            sunrise: localSunrise,
            sunset: localSunset,
            coords: `[${coordsLon}, ${coordsLat}]`
        };

        // Elemente erstellen
        const containerElement = document.createElement("div");
        const HeadingElement = document.createElement("h1");
        const imgTempContainer = document.createElement("div");
        const imgIcon = document.createElement("img");
        const pTempElement = document.createElement("p");
        const pDescriptionElment = document.createElement("p");
        const pObtainedData = document.createElement("p");
        const table = document.createElement("table");

        // Elementenzuweisung
        HeadingElement.innerText = `Weather in ${city}, GB`;
        imgIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        pTempElement.innerText = temp + " °C";
        pDescriptionElment.innerText = descriptions;
        pObtainedData.innerHTML = `Obtained at ${localTime}, ${localDateTime} ${aTag}`;
        aTag.href = "#";
        aTag.textContent = "Wrong data?";
        aTag.style.color = "tomato";

        // Zuweisung von CSS
        table.classList.add("table", "tableBorder");
        containerElement.classList.add("container");
        HeadingElement.classList.add("heading");
        pTempElement.classList.add("temp-p");
        imgTempContainer.classList.add("imgTemp");

        // HTML 
        containerElement.appendChild(HeadingElement);
        containerElement.appendChild(imgTempContainer);
        imgTempContainer.appendChild(imgIcon);
        imgTempContainer.appendChild(pTempElement);
        containerElement.appendChild(pDescriptionElment);
        containerElement.appendChild(pObtainedData);
        containerElement.appendChild(aTag);
        containerElement.appendChild(table);

        // Tabelle generieren
        for (const property in newObject) {
            const tableTr = document.createElement("tr");
            const tableTd = document.createElement("td");
            const tableTd1 = document.createElement("td");

            const newProp = property.charAt(0).toUpperCase() + property.slice(1);
            tableTd.classList.add("tableTD", "tableBorder");
            tableTd1.classList.add("tableBorder");
            tableTr.classList.add("tableTR", "tableBorder");
            tableTd.innerText = newProp;
            tableTd1.innerText = newObject[property];

            tableTr.appendChild(tableTd);
            tableTr.appendChild(tableTd1);
            table.appendChild(tableTr);
            document.body.appendChild(containerElement);
        }
    });

aTag.addEventListener("click", () => {
    alert("i don't give a fuck");
});







