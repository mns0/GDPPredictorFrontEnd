## GDP predictor Front-End  

GDP predictions based on 9 macroeconomic indicators.
Data is pulled in from the ST. Louis FRED, processed, run through a trained
onnx.js model and the predictor is output on the front-end. 

### `yarn start`

![Overtrained Model](./public/partial80-20_model_overtrained.gif)

Training progress of the CGAN on the percent difference of the GDP.
The model takes 9 macroeconomic indicators and generates a prediction of the
GDP.

More info will be included in the frontend. 
