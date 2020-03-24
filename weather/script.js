let onSuccess = function (geoipResponse) {
    const cityElement = document.querySelector('.cityName');
    if (cityElement) {
        sendingRequest(`q=${geoipResponse.city.names.en}`)
    }

    let countryElement = [];
    if (countryElement) {
        countryElement.textContent = geoipResponse.country.names.en || 'Unknown country';
    }
};

let onError = function (error) {
    window.console.log("something went wrong: " + error.error)
};

let onLoad = function () {
    geoip2.city(onSuccess, onError);
};

document.addEventListener('DOMContentLoaded', onLoad);

time();
setTimeout(time, 10000);
function time() {
    const outTime = document.querySelector(".time");
    let time = new Date();
    hr = time.getHours();
    min = time.getMinutes();

    if (hr < 10) {
        hr = "0" + hr;
    }
    if (min < 10) {
        min = "0" + min;
    }
    outTime.innerHTML = `${hr} : ${min}`;
}

fetch("./cityList.json")
    .then(function (resp) { return resp.json() })
    .then(function (data) {
        inputSearchCity(data);

    })
    .catch(function () {
        // catch any errors
    });


function inputSearchCity(x) {
    const inputCity = document.querySelector('#inputCity');
    inputCity.oninput = function () {
        let receivedCityName = this.value.trim();
        let data_of_cities = x;


        if (receivedCityName != '') {
            // clean ul 
            const ul = document.querySelector('.cityList');
            if (ul != null) {
                ul.remove();
            }

            // create ul element in html
            let cityList = document.createElement('ul');
            cityList.className = 'cityList';
            inputCity.after(cityList);

            // restriction list of the city
            let stopFunction = 0;

            // search in json arr and create elemnt li
            data_of_cities.forEach(function (item, i, f) {
                let dataName = item.name.toLowerCase();
                if (dataName.search(receivedCityName.toLowerCase()) == 0) {
                    if (stopFunction < 5) {
                        let li = document.createElement('li');
                        li.id = item.id;
                        li.className = "cityList";
                        li.innerHTML = item.name;
                        cityList.append(li);
                        stopFunction++;
                    }

                }
            })

            // choise city in list and return id 
            const newCitysList = document.querySelectorAll("li[class='cityList']");
            for (key in newCitysList) {
                newCitysList[key].onclick = function () {
                    sendingRequest(`id=${this.id}`)
                    inputCity.value = this.childNodes.item(0).nodeValue;
                    const ul = document.querySelector('.cityList');
                    if (ul != null) {
                        ul.remove();
                    }
                }
            }
        }
    }
}

function sendingRequest(x) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?${x}&appid=c148c178ddd0d5744ea80723e19b4cb0`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            document.querySelector('.cityName').textContent = data.name;
            document.querySelector('.country').textContent = data.sys.country;
            document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
            document.querySelector('.description').textContent = data.weather[0]['description'];
            document.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
            document.querySelector('.pressure').innerHTML = `Pressure: ${data.main.pressure} hPa`;
            document.querySelector('.humidity').innerHTML = `Humidity: ${data.main.humidity} %`;
            document.querySelector('.wind-speed').innerHTML = `${data.wind.speed} m/s`;
            document.querySelector('.pointer').style.transform = `rotate(${data.wind.deg}deg)`;
            document.querySelector('.wind').setAttribute("data-title", cardinalDirection(data.wind.deg));

        })
        .catch(function () {
            // catch any errors
        });
}

function cardinalDirection(x) {
    if (x >= 349 && x <= 11) {
        return "North";
    }
    if (x >= 12 && x <= 33) {
        return "North-Northeas";
    }
    if (x >= 34 && x <= 56) {
        return "Northeast ";
    }
    if (x >= 57 && x <= 78) {
        return "East-Northeast";
    }
    if (x >= 79 && x <= 101) {
        return "East";
    }
    if (x >= 102 && x <= 123) {
        return "East-Southeast";
    }
    if (x >= 124 && x <= 146) {
        return "Southeast";
    }
    if (x >= 147 && x <= 168) {
        return "South-Southeastt";
    }
    if (x >= 169 && x <= 191) {
        return "South";
    }
    if (x >= 192 && x <= 213) {
        return "South-Southwest";
    }
    if (x >= 214 && x <= 236) {
        return "Southwest ";
    }
    if (x >= 237 && x <= 258) {
        return "West-Southwest";
    }
    if (x >= 259 && x <= 281) {
        return "West";
    }
    if (x >= 282 && x <= 303) {
        return "West-Northwest";
    }
    if (x >= 304 && x <= 326) {
        return "Northwest";
    }
    if (x >= 327 && x <= 348) {
        return "Northwest";
    }
}

beckgroundImage()
function beckgroundImage() {
    let x = Math.floor((Math.random() * 7) + 1);
    let b = Math.floor((Math.random() * 3) + 1);
    let c = Math.floor((Math.random() * 6) + 1);
    let y = "";
    if (b == 1) {
        y = "b";
    }
    if (b == 2) {
        y = "o";
    }
    if (b == 3) {
        y = "p";
    }

    if (window.matchMedia("(max-width: 500px)").matches == true) {
        document.body.style.backgroundImage = `url(/weather/img/mobile/${c}.jpg)`;
    }
    if (window.matchMedia("(max-width: 500px)").matches == false) {
        document.body.style.backgroundImage = `url(/weather/img/pk/${x}${y}.jpg)`;
    }
    setTimeout(beckgroundImage, 10000);
}







