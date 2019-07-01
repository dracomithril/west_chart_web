
const utils = jest.genMockFromModule('./../utils');
utils.subtractDaysFromDate.mockImplementationOnce((a, days) => {
  const sinceDate = new Date(a);
  sinceDate.setDate(new Date(a).getDate() - days);
  return sinceDate;
});
export default utils;
