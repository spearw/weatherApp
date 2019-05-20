var api_key = "f0efff1cb839995369ad63a56af8704d"

async function getWeather()
{
    let search = document.querySelector("input").value;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${api_key}`
    let futureWeatherurl = `http://api.openweathermap.org/data/2.5/forecast?q=${search}&APPID=${api_key}`
    console.log(search);
    console.log(url);

    const response = await fetch(url, {mode: 'cors'});
    const weatherData = await response.json();
    //img.src = imgData.data.images.original.url;
    currentWeather = weatherData.weather[0].description
    humidity = weatherData.main.humidity
    temp = weatherData.main.temp
    cityName = weatherData.name
    cloudPercent = weatherData.clouds.all
    appData = {currentWeather: currentWeather, humidity: humidity, temp: temp, cloudPercent: cloudPercent, cityName: cityName}
    return appData
};

async function getWeatherMap()
{
    let layer = "precipitation_new"
    let url = `https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${api_key}`

};


async function getImage(currentWeather)
{
    const img = document.querySelector("img");
    let search = currentWeather.split(" ").pop()
    console.log("get image: " + currentWeather)
    let url = "https://api.giphy.com/v1/gifs/translate?api_key=LYtbBE26klL3jPoLMkjJtljy49DkQoYI&s=" + search;

    const response = await fetch(url, {mode: 'cors'});
    const imgData = await response.json();
    img.src = imgData.data.images.original.url;
}

function updateHTML(){

    promise = getWeather()
    promise.then(function(result) {

        console.log(result); // "Stuff worked!"
        //converting into titlecase from lowercase
        document.getElementById("currentWeather").innerHTML = "Weather: " + result.currentWeather.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        document.getElementById("humidity").innerHTML = "Humidity: " + result.humidity;
        document.getElementById("cloudPercent").innerHTML = "Cloud Coverage: " + result.cloudPercent + "%";
        //converting default K into F
        document.getElementById("temp").innerHTML = "Temperature: " + (Math.round(result.temp * 9/5 - 459.67)) + "°F";
        document.getElementById("cityName").innerHTML = result.cityName;
        getImage(result.currentWeather)


    }, function(err) {
        console.log(err); // Error: "It broke"
    });

}

document.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        updateHTML()
    }
});
