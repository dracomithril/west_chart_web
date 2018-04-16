import React from 'react';
import PropTypes from 'prop-types';
import ChartData from './../___data___/chartData';
import { action_types } from './../reducers/action_types';
import ChartPresenter from './Chart/ChartPresenter';

class Demo extends React.Component {
  componentWillMount() {
    const { store } = this.context;
    const { chart } = store.getState();
    if (chart.length === 0) {
      store.dispatch({
        type: action_types.UPDATE_CHART,
        chart: ChartData,
      });
    }
  }

  render() {
    const { store } = this.context;
    const { chart } = store.getState();
    console.log('Demo');
    return <ChartPresenter />;
  }
}

Demo.contextTypes = {
  store: PropTypes.object,
};

export default Demo;
