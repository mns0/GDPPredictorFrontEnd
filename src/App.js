import React from 'react';
import './App.css';
import LineChart from './LineChart.js';
import {getData} from './dataFetcher.js';

// App 
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: getData()
    };
  }

  componentDidMount() {
    window.setInterval(() => {
      this.setState({
        data: getData()
      })
    }, 5000)
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