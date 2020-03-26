function geoApi() {
    fetch(`https://ipapi.co/json/`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            sendingRequest(`q=${data.city}`);
        })
        .catch(function () {
            alert("sorry server has some problems,<br> we work on this now, please try later");
        });
}
geoApi();

time();
setTimeout(time, 30000);
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
    console.log(min);
};

fetch("./cityList.json")
    .then(function (resp) { return resp.json() })
    .then(function (data) {
        inputSearchCity(data);

    })
    .catch(function () {
        alert("sorry server has some problems,<br> we work on this now, please try later");
    });


function inputSearchCity(data_of_cities) {
    const inputCity = document.querySelector('#inputCity');

    function clean_ul() {
        const ul = document.querySelector('.cityList');
        if (ul != null) {
            ul.remove();
        }
    }

    inputCity.oninput = function () {
        let receivedCityName = this.value.trim();

        if (receivedCityName != '') {

            clean_ul();

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
                    else {
                        return;
                    }
                }
            })

            // choise city in list and return id 
            const newCitysList = document.querySelectorAll("li[class='cityList']");
            for (key in newCitysList) {
                newCitysList[key].onclick = function () {
                    sendingRequest(`id=${this.id}`)
                    inputCity.value = this.childNodes.item(0).nodeValue;
                    clean_ul();
                }
            }
        }
        else {
            clean_ul();
        }
    }
}

function sendingRequest(id) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?${id}&appid=c148c178ddd0d5744ea80723e19b4cb0`)
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
            alert("sorry server has some problems,<br> we work on this now, please try later");
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

beckgroundImage();
function beckgroundImage() {
    let x = Math.floor((Math.random() * 4) + 1);
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
    new Image().src = `./img/pk/${x}${y}.jpg`;
    new Image().src = `./img/mobile/${c}.jpg`;

    setTimeout(function () {
        if (window.matchMedia("(max-width: 500px)").matches == true) {
            document.body.style.backgroundImage = `url(./img/mobile/${c}.jpg)`;
        }
        if (window.matchMedia("(max-width: 500px)").matches == false) {
            document.body.style.backgroundImage = `url(./img/pk/${x}${y}.jpg)`;
        }
    }, 1000);
    setTimeout(beckgroundImage, 10000);
}







