import { Tensor, InferenceSession } from "onnxjs";
import * as d3 from 'd3';
import data from './Preprocessed_data_gdp_pc.csv';
import onnx_model from './gen_8020_model.onnx';


// get data from fred 
export function getDataFromFRED( fredCode ) {
    let apiKey = process.env.REACT_APP_FRED_KEY;
    let url = `https://api.stlouisfed.org/fred/series/observations?series_id=${fredCode}&api_key=${apiKey}&file_type=json`;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    return fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(response => response.json())
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));

}

//backfilling the data
export async function CleanData(fredCode) {
    var data = [];
    var contents = await getDataFromFRED( fredCode );
    console.log("content", Date(contents.observations[20].date),contents.observations[20].date);
    //backfill bad values
    var obvLength = Number(contents.ob3servations.length);
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


// construct the data tensor 
export function constructDataSet() {
    //CPILFESL,DFF,DTB3,DGS5,DGS10,UNRATE,PSAVERT,DSPI,GFDEGDQ188S
    //Getting data 
    let file = "../public/Preprocessed_data_gdp_pc.dat"
    let GDP = CleanData("GDP");
}

//loading and 
//formatting the csvdata
function loadCSVData(fileLocation) {
    return d3.csv(fileLocation, (d) => {
        return {
            DATE : new Date(d['']),
            CPILFESL : +d.CPILFESL,
            DFF: +d.DFF,
            DGS5: +d.DGS5,
            DGS10: +d.DGS10,
            DSPI: +d.DSPI,
            DTB3: +d.DTB3,
            GDP: +d.GDP,
            GFDEGDQ188S: +d.GFDEGDQ188S,
            PSAVERT: +d.PSAVERT,
            UNRATE: +d.UNRATE
        };
    });
}



const randomArray = (length, max) => 
  Array(length).fill().map(() => Math.round(Math.random() * max))



//Construct input into generator from local CSV
async function loadLocalData() {
    //load local csv file
    let localData = await loadCSVData(data);
    //full 2d array dataset Remove the date and GDP column for testing
    let dataColArr = [...Array(localData.columns.length-1-1)].map(e => Array(1).fill(0));
    //create columns for tensor
    localData.map( (d) => {
        for(let i = 1; i < localData.columns.length-1; i++) {
            dataColArr[i-1].push(d[localData.columns[i]]);
        };
    });


    //Data transformation steps


    //Tensor input
    let seqLength = 15;
    let tensorInput = [];
    dataColArr.forEach( col => {
        for (let i = col.length-seqLength; i <col.length;i++ ) {
            tensorInput.push(col[i]);
        };
    });

    let conditionalTensor = new Tensor(tensorInput, "float32",[1, seqLength,9]); //1x15x9
    let noise = randomArray(15,10);
    let noiseTensor = new Tensor(noise, "float32",[1, seqLength,1]); //1x15x9

    //onnx test
    const session = new InferenceSession();
    //const url = "./src/gen_8020_model.onnx";
    await session.loadModel(onnx_model);
    // const inputs = [
    //     conditionalTensor,
    //     noiseTensor
    // ];

    // const outputMap = await session.run(inputs);
    // const outputTensor = outputMap.values().next().value;
    // console.log("dd", outputTensor);


}


loadLocalData()


export function buildModel() {
    //CPILFESL,DFF,DTB3,DGS5,DGS10,UNRATE,PSAVERT,DSPI,GFDEGDQ188S
    //Getting data 
    var file = "../public/Preprocessed_data_gdp_pc.dat"
    const session = new InferenceSession();
    const url = "./model.onnx";
    //await session.loadModel(url);
}


export function getData() {
    let data = [];
    data.push({
      title: 'Visits',
      data: CleanData("GDP")
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