/*global localStorage*/
/*Highest scores component*/
/*List of all the user's highscores*/

import React from 'react';
import _ from 'underscore';

class Scores extends React.Component {
  constructor(props) {
    super(props);
    //must do this to rerender localStorage data
    //for sure there is a better way but i c an't find one atm
    this.init = () => {
      this.db = JSON.parse(localStorage.db || []);
      this.scores = [];
      this.scores = this.db
      .map(({user, scores}) => ({
        user,
        'bestScore': scores
        .sort((first, second) => {
          return Number(first) < Number(second);
        })
        .reduce(prev => Number(prev))
      }))
      .sort((first, second) => {
        return Number(first.bestScore) < Number(second.bestScore);
      });

      this.scores = _.uniq(this.scores);
    };

    this.init();
  }

  render() {
    return <section onLoad={this.init()} className='center-content scores'>
      <h1 className="line-compress">
        Highest Scores
      </h1>
      <ul>
      {this.scores.map(item => {
        return (
          <li key={item.user}>
            {item.user}
            <div>{item.bestScore}</div>
          </li>
          );
      })}
      </ul>
    </section>;
  }
}

export default Scores;
