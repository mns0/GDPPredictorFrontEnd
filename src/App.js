import React from 'react';
import './App.css';
import LineChart from './LineChart.js';
import {getData} from './dataFetcher.js';
import { promises } from 'fs';


// App 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.init_data = [{
      title: '% Difference of GDP',
      data: [{
        time: new Date('2018-05-01T00:00:00').getTime(),
        value: 0.0
    }]
    }];

    this.state = {
      data: this.init_data
    };
  }


  componentDidMount() {
    const fetchUserEmail = async () => {
      const _data =  getData();
      const response = await _data[0].data;
      console.log(_data);
      this.setState({
        data: _data
      });
    };
    fetchUserEmail();
  }


  render() {
    return (
      <div className="App">
        <div className="main chart-wrapper">
          <LineChart
            data={this.state.data[0].data}
            title={this.state.data[0].title}
            color="#3E517A"
          />
        </div>
        </div>
    );
  }
}

//ReactDOM.render(<App />, document.getElementById('root'));

export default App;