

// get data from fred 
export function getDataFromFRED( fredCode ) {
    let apiKey = process.env.REACT_APP_FRED_KEY;
    let url = `https://api.stlouisfed.org/fred/series/observations?series_id=${fredCode}&api_key=${apiKey}&file_type=json`;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    return fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(function(response) {return response.json()})
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));

}


// get data from GDP Prediciton API
export function getDataFromPrediction() {
    let url = `https://serene-crag-25078.herokuapp.com/api/predict`;
    return fetch(url)
    .then(function(response) {return response.json()})
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
}

//backfilling the data
export async function CleanData(fredCode) {
    var data = [];
    var contents = await getDataFromFRED( fredCode );
    console.log("content", Date(contents.observations[20].date),contents.observations[20].date);
    //backfill bad values
    var obvLength = Number(contents.observations.length);
    var prevObvValue = contents.observations[obvLength-1].value;
    for(var i = obvLength-1; i  >= 0; i--) {
        var obvTime = Date(contents.observations[i].date);
        var obvValue = contents.observations[i].value;
        if (obvValue === '.') { 
            data.unshift({ time: obvTime , value: Number(prevObvValue)});
        } else {
            data.unshift({ time: obvTime , value: Number(obvValue)});
            prevObvValue = obvValue;
        };
    }
    return data; 
}


export function formatPredictionAPIData(data) {
    var retArr = [];
    // for(var i = data.dates.length; i  >= 0; i++) {
    //     retArr.push({ time: new Date(data.dates[i]) , value: Number(data.gdp[i])});
    // }
    console.log(retArr);
}



export async function buildModel() {
    //CPILFESL,DFF,DTB3,DGS5,DGS10,UNRATE,PSAVERT,DSPI,GFDEGDQ188S
    //Getting data 
    var data = await getDataFromPrediction();
    console.log("be", data.gdp_time);
    return data.gdp_time;
}

buildModel();

export function getData() {
    let data = [];
    data.push({
      title: 'Percent Change of GDP',
      data: buildModel()
    });
    return data;
}

/*
~~~~~~~~~~~~~~~~~~~~~~~~~
TEST FUNCTIONS
~~~~~~~~~~~~~~~~~~~~~~~~~
*/
export function getData_test() {
    let data = [];
    data.push({
      title: 'Visits',
      data: getRandomDateArray_test(150)
    });
    return data;
  }

export function getRandomDateArray_test(numItems) {
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