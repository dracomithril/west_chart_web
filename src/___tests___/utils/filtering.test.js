import filterChart from '../../utils/filtering';

const { chart } = require('../___data___/response.json');

describe('[filterChartWithStore]', () => {
  it('should be able to filter', () => {
    const store = {
      chart,
      filters: {
        add_control: { checked: false },
        create_control: { checked: false },
        update_control: { checked: false },
        less_control: { checked: false },
        more_control: { checked: false },
        woc_control: { checked: false },
        westletter_control: { checked: false },
      },
      until: '2018-03-16T19:54:25.672Z',
      since: '2018-03-10T19:54:25.672Z',
      songsPerDay: 3,
    };
    const filtered = filterChart(
      store.chart,
      store.filters,
      store.since,
      store.until,
      store.songsPerDay,
    );
    expect(filtered.viewChart).toHaveLength(21);
  });
  it('should be able to filter when add_control', () => {
    const store = {
      chart,
      filters: {
        create_control: { checked: true, days: 5 },
        update_control: { checked: false },
        less_control: { checked: false },
        more_control: { checked: false },
        woc_control: { checked: false },
        westletter_control: { checked: true },
      },
      until: '2018-03-19T19:54:25.672Z',
      since: '2018-03-13T19:54:25.672Z',
      songsPerDay: 3,
    };

    const filtered = filterChart(
      store.chart,
      store.filters,
      store.since,
      store.until,
      store.songsPerDay,
    );
    expect(filtered.viewChart).toHaveLength(8);
  });
});
