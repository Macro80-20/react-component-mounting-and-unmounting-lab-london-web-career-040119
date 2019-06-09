import React, {Component} from 'react';

import Pancake from './Pancake';

export default class Game extends Component {

    state = {
      time: undefined,
      //e.g. 
      // "Sun Jun 09 2019 09:46:07 GMT+0100 (British Summer Time)1560070849859" , 
      // then we addpankcake again it will look lie 
      // "Sun Jun 09 2019 09:46:07 GMT+0100 (British Summer Time)15600708892901560070890490"
      pancakes: [],
      cooked: 0,
      burnt: 0,
      raw: 0
    }

  // TODO: create a componentDidMount() which will set the current time
  
  componentDidMount() {
    this.setCurrentTime()
  }

  setCurrentTime = () => {
    this.setState({ time: new Date(Date.now())});
  }

  addPancake = () => {
    this.setState({ // our time initalized with a date , concat add this to the string,each time adding to the string 
      pancakes: this.state.pancakes.concat(Date.now())
    });
  }

  takeItOff = (id, status) => {
    const { pancakes, cooked, burnt, raw } = this.state;

    this.setState({
      pancakes: pancakes.filter(pancake => !(pancake === id)),
      cooked: status === 'cooked' ? cooked + 1 : cooked,
      burnt: status === 'burnt' ? burnt + 1 : burnt,
      raw: status === 'raw' ? raw + 1 : raw
    });
  }

  render() {
    const { pancakes, burnt, cooked, raw, time } = this.state;
    const pans = pancakes.map((pancake, index) => <Pancake key={index} id={pancake} takeItOff={this.takeItOff} />);

    return (
      <div className="Game">
        <span>Pancake shop opened at: {time ? time.toString() : ''}</span>
        <div>
          <div className="Game__score --cooked">Cooked: {cooked}</div>
          <div className="Game__score --burnt">Burnt: {burnt}</div>
          <div className="Game__score --raw">Raw: {raw}</div>
        </div>
        <button
          onClick={this.addPancake}
          className="Game__button"
        >
          New pancake!
        </button>
        <div className="Game__pancakes">{pans}</div>
      </div>
    )
  }
}


