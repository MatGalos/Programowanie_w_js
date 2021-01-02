let opwApiKey = "50d53005c0fd5f556bb4ef15224c4209";
let http = new XMLHttpRequest();
http.addEventListener("readystatechange", httpStateChange);
http.addEventListener("progress", httpProgressChange);
http.addEventListener("error", httpError);
let url = `http://api.openweathermap.org/data/2.5/weather?q=Cracow&APPID=${opwApiKey}`;
console.log(url);
http.open("GET", url, true);
http.send();
console.log("Poszłoooo...");
function httpStateChange(e) {
try {
console.log(`http state change: ${e.target.readyState}`);
console.log(`http HTTP Status code: ${e.target.status}`);
if (e.target.readyState == "4") {
     console.log(e.target.responseText);
     document.body.querySelector("#container").innerHTML =
     e.target.responseText;
     pogoda = JSON.parse(e.target.responseText);
     console.log(pogoda);
     document.body.querySelector("#container").innerHTML =
     "Wilgotność: " + pogoda.main.humidity+"%"+
     "temperatura: "+pogoda.main.temp+
     "ciśnienie: "+pogoda.main.humidity;
            }
} catch (e) {
    console.log("Wyjątkowo się coś nie udało...", e);
}
}

        function httpProgressChange(e) {
          console.log(
            `http progress change: ${e.target.position}/${e.target.totalSize}`
          );
        }

        function httpError(e) {
          console.log(`http error! ${e}`);
        }
  
