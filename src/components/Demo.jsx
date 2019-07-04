// @flow
import React from 'react';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import fakeChartData from '../___data___/chartData';
import ChartPresenterContainer from './Chart/ChartPresenter';
import type { ChartEntry } from '../types';
import { updateChartAction } from '../reducers/actions';


type Props ={
  updateChart?: ()=>mixed,
  chart?: ChartEntry[],
}
class Demo extends React.Component<Props> {
  static defaultProps = {
    updateChart: noop,
    chart: [],
  };

  constructor(props) {
    super(props);
    const { updateChart, chart } = props;
    if (chart.length === 0) {
      updateChart(fakeChartData);
    }
  }

  render() {
    return <ChartPresenterContainer />;
  }
}

const mapStateToProps = ({ chart } /* , ownProps */) => ({
  chart,
});

const mapDispatchToProps = dispatch => ({
  updateChart: (chartData) => {
    dispatch(updateChartAction(chartData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
