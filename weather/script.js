// start geoIP api
var geoip2 = function () { function e(e, t, r, n) { this.successCallback = e, this.errorCallback = t, this.type = n } var t = {}; e.prototype.returnSuccess = function (e) { this.successCallback && "function" == typeof this.successCallback && this.successCallback(this.fillInObject(JSON.parse(e))) }, e.prototype.returnError = function (e) { this.errorCallback && "function" == typeof this.errorCallback && (e || (e = { error: "Unknown error" }), this.errorCallback(e)) }; var r = { country: [["continent", "Object", "names", "Object"], ["country", "Object", "names", "Object"], ["registered_country", "Object", "names", "Object"], ["represented_country", "Object", "names", "Object"], ["traits", "Object"]], city: [["city", "Object", "names", "Object"], ["continent", "Object", "names", "Object"], ["country", "Object", "names", "Object"], ["location", "Object"], ["postal", "Object"], ["registered_country", "Object", "names", "Object"], ["represented_country", "Object", "names", "Object"], ["subdivisions", "Array", 0, "Object", "names", "Object"], ["traits", "Object"]] }; return e.prototype.fillInObject = function (e) { for (var t = "country" === this.type ? r.country : r.city, n = 0; n < t.length; n++)for (var o = t[n], s = e, i = 0; i < o.length; i += 2) { var c = o[i]; s[c] || (s[c] = "Object" === o[i + 1] ? {} : []), s = s[c] } try { Object.defineProperty(e.continent, "continent_code", { enumerable: !1, get: function () { return this.code }, set: function (e) { this.code = e } }) } catch (u) { e.continent.code && (e.continent.continent_code = e.continent.code) } if ("country" !== this.type) try { Object.defineProperty(e, "most_specific_subdivision", { enumerable: !1, get: function () { return this.subdivisions[this.subdivisions.length - 1] }, set: function (e) { this.subdivisions[this.subdivisions.length - 1] = e } }) } catch (u) { e.most_specific_subdivision = e.subdivisions[e.subdivisions.length - 1] } return e }, e.prototype.getGeoIPResult = function () { var e, t = this, r = new window.XMLHttpRequest, n = "https://geoip-js.maxmind.com/geoip/v2.1/" + this.type + "/me?", o = { referrer: "file://" }; if (!this.alreadyRan) { this.alreadyRan = 1; for (e in o) o.hasOwnProperty(e) && o[e] && (n += e + "=" + encodeURIComponent(o[e]) + "&"); n = n.substring(0, n.length - 1), r.open("GET", n, !0), r.onload = function () { if ("undefined" == typeof r.status || 200 === r.status) t.returnSuccess(r.responseText); else { var e, n = r.hasOwnProperty("contentType") ? r.contentType : r.getResponseHeader("Content-Type"); if (/json/.test(n) && r.responseText.length) try { e = JSON.parse(r.responseText) } catch (o) { e = { code: "HTTP_ERROR", error: "The server returned a " + r.status + " status with an invalid JSON body." } } else e = r.responseText.length ? { code: "HTTP_ERROR", error: "The server returned a " + r.status + " status with the following body: " + r.responseText } : { code: "HTTP_ERROR", error: "The server returned a " + r.status + " status but either the server did not return a body or this browser is a version of Internet Explorer that hides error bodies." }; t.returnError(e) } }, r.ontimeout = function () { t.returnError({ code: "HTTP_TIMEOUT", error: "The request to the GeoIP2 web service timed out." }) }, r.onerror = function () { t.returnError({ code: "HTTP_ERROR", error: "There was a network error receiving the response from the GeoIP2 web service." }) }, r.send(null) } }, t.country = function (t, r, n) { var o = new e(t, r, n, "country"); o.getGeoIPResult() }, t.city = function (t, r, n) { var o = new e(t, r, n, "city"); o.getGeoIPResult() }, t.insights = function (t, r, n) { var o = new e(t, r, n, "insights"); o.getGeoIPResult() }, t }();
//# sourceMappingURL=geoip2.js.map
// 


let onSuccess = function (geoipResponse) {
    const cityElement = document.querySelector('.cityName');
    if (cityElement) {
        sendingRequest(`q=${geoipResponse.city.names.en}`);
    }

    let countryElement = [];
    if (countryElement) {
        countryElement.textContent = geoipResponse.country.names.en || 'Unknown country';
    }
};

let onError = function (error) {
    window.console.log("something went wrong: " + error.error);
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
        document.body.style.backgroundImage = `url(./img/mobile/${c}.jpg)`;
    }
    if (window.matchMedia("(max-width: 500px)").matches == false) {
        document.body.style.backgroundImage = `url(./img/pk/${x}${y}.jpg)`;
    }
    setTimeout(beckgroundImage, 10000);
}







