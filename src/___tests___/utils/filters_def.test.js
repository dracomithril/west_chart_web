import { subtractDaysFromDate } from '../../utils/date';

describe('[filters]', () => {
  it('subtractDaysFromDate', () => {
    const date = new Date('3/29/2017');
    const since = subtractDaysFromDate(date, 4);
    expect(since.toLocaleDateString('en-EN')).toBe('3/25/2017');
  });
});
