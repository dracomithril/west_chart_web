import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import fakeChartData from '../___data___/chartData';
import actionTypes from '../reducers/actionTypes';
import ChartPresenterContainer from './Chart/ChartPresenter';

class Demo extends React.Component {
  componentWillMount() {
    const { updateChart, chart } = this.props;
    if (chart.length === 0) {
      updateChart(fakeChartData);
    }
  }

  render() {
    return <ChartPresenterContainer />;
  }
}

Demo.defaultProps = {
  updateChart: noop,
  chart: [],
};

Demo.propTypes = {
  updateChart: PropTypes.func,
  chart: PropTypes.arrayOf(PropTypes.shape()),
};

const mapStateToProps = ({ chart } /* , ownProps */) => ({
  chart,
});

const mapDispatchToProps = dispatch => ({
  updateChart: (chartData) => {
    dispatch({
      type: actionTypes.UPDATE_CHART,
      chart: chartData,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
