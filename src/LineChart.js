import React from 'react';
import { Chart } from 'react-chartjs-2';


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
        console.log("dd", _data);
        this.myChart.data.labels = _data.map(d => d.time);
        this.myChart.data.datasets[0].data = _data.map(d => d.value);
        console.log("dddddtttttd", this.myChart.data.labels);

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
                unit: 'week'
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                min: 0
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
          pointRadius: 2,
          borderColor: this.props.color,
          borderWidth: 1,
          lineTension: 0
        }]
      }
    });
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}




export default LineChart;