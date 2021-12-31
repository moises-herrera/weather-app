const apiKey = "d95bbbe974cf518d2915e9bc6549810c";
/*
const baseURL =
    "http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&lang=es&appid=d95bbbe974cf518d2915e9bc6549810c";
*/
const requestCity = async (cityName, countryCode) => {
    const baseURL = "https://api.openweathermap.org/data/2.5/weather";
    const query = `?q=${cityName},${countryCode}&units=metric&lang=es&appid=${apiKey}`;
    
    const response = await fetch(baseURL + query);

    const data = await response.json();
    return data;
};