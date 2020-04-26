

var Fred = require('fred-api');

apiKey = process.env.FRED_KEY;
fred   = new Fred(apiKey);


console.log("apikey:", apiKey);



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