import React from 'react';
import { Chart } from 'react-chartjs-2';
import { Header ,Container, Segment, Grid} from 'semantic-ui-react'


Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";

// LineChart
class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    this.props.data
    .then( _data => {
        this.myChart.data.labels = _data.map(d => d.time);
        this.myChart.data.datasets[0].data = _data.map(d => d.value);
        this.myChart.update();
    })
    .catch( (e) =>{
        console.log("Error logged in linechart class:", e);
    });

  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'line',
      options: {
			  maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'year'
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                min: -1.0,
                stepSize: 0.5
              }
            }
          ]
        }
      },
      data: {
        labels: this.props.data.map(d => d.time),
        datasets: [{
          label: this.props.title,
          data: this.props.data.map(d => d.value),
          fill: 'none',
          backgroundColor: this.props.color,
          pointRadius: 1,
          borderColor: this.props.color,
          borderWidth: 1,
          lineTension: 0
        }],
        ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
        }
      }
    });
  }

  render() {
    return  (
      <Grid centered columns={2}>


    <Grid.Column>

      <Segment compact>
        <Header textAlign='center' as='h2' >GDP Prediction</Header>
          <div className="gdpChartContainer">
            <canvas id="gdpchart" width="300" height="200" ref={this.canvasRef} />
          </div>
          <p>
            GDP Prediction.
          </p>
      </Segment>
      </Grid.Column>


      </Grid>
    )
  }
}




export default LineChart;




