//import { Tensor, InferenceSession } from "onnxjs";



// get data from fred 
export function getFredData( fredCode ) {
    let data = []
    let apiKey = process.env.REACT_APP_FRED_KEY;
    let url = `https://api.stlouisfed.org/fred/series/observations?series_id=${fredCode}&api_key=${apiKey}&file_type=json`;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(response => response.json())
    .then(contents => {
        //backfill bad values
        var obvLength = Number(contents.observations.length);
        var prevobvValue = contents.observations[obvLength-1].value;
        for(var i = obvLength-1; i  >= 0; i--) {
            var obvTime = Date(contents.observations[i].date);
            var obvValue = contents.observations[i].value;
            if (obvValue === '.') {
                data.unshift({ time: obvTime , value: Number(prevobvValue)});
            } else {
                data.unshift({ time: obvTime , value: Number(obvValue)});
                prevobvValue = obvValue;
            };
        }
    })
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
    return data;
}

// construct the data tensor 
export function constructDataSet() {
    //CPILFESL,DFF,DTB3,DGS5,DGS10,UNRATE,PSAVERT,DSPI,GFDEGDQ188S
    //Getting data 
    var GDP = getFredData("GDP");
    var CPI = getFredData("CPILFESL");
    var DFF = getFredData("DFF");
    var DTB3 = getFredData("DTB3");
    var DGS5 = getFredData("DTDGS5B3");
    var DGS10 = getFredData("DGS10");
    var UNRATE = getFredData("UNRATE");
    var PSAVERT = getFredData("PSAVERT");
    var DSPI = getFredData("DSPI");
    var GFDEGDQ188S = getFredData("GFDEGDQ188S");


}




constructDataSet()



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
    for (var i = 0; i < numItems; i++) {
        data.push({
            time: new Date(baseTime + i * dayMs),
            value: Math.round(20 + 80 * Math.random())
        });
    }
    return data;
}