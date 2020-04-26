
import axios from 'axios';


let apiKey = process.env.REACT_APP_FRED_KEY;
let url = `https://api.stlouisfed.org/fred/series?series_id=GNPCA&api_key=${apiKey}&file_type=json`;

const proxyurl = "https://cors-anywhere.herokuapp.com/";
fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
.then(response => response.text())
.then(contents => console.log(contents))
.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))


export function getData() {
    let data = [];
  
    data.push({
      title: 'Visits',
      data: getRandomDateArray(150)
    });
  
    return data;
  }
  
  export function getRandomDateArray(numItems) {
    // Create random array of objects (with date)
    let data = [];
    let baseTime = new Date('2018-05-01T00:00:00').getTime();
    let dayMs = 24 * 60 * 60 * 1000;
    for(var i = 0; i < numItems; i++) {
      data.push({
        time: new Date(baseTime + i * dayMs),
        value: Math.round(20 + 80 * Math.random())
      });
    }
    return data;
  }