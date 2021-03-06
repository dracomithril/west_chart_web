import { westletter, woc_string } from './consts';
import { subtractDaysFromDate } from './date';

/**
 *
 * @returns {boolean}
 * @param elem
 * @param filter
 */
const countDays = (elem, {
  valueName, until, days, checked,
}) => {
  if (checked) {
    const date = elem[valueName];
    const cIn1 = new Date(date).getTime();
    const time = subtractDaysFromDate(until, days).getTime();
    const timeLeft = cIn1 - time;
    // what if its newer then until
    return timeLeft > 0;
  }
  return true;
};

const filters = [
  {
    control: { name: 'date_create_control', id: 'create' },
    input: { max: 31, name: 'create_control' },
    valueName: 'createdTime',
    description: { start: 'created in last', end: 'days' },
    type: 'countDays',
    check: countDays,
  },
  {
    control: { name: 'date_update_control', id: 'update' },
    input: { max: 31, name: 'update_control' },
    valueName: 'updatedTime',
    description: { start: 'updated in last', end: 'days' },
    type: 'countDays',
    check: countDays,
  },
  {
    control: { name: 'more_then_control', id: 'more' },
    input: { name: 'more_control' },
    description: { start: 'more then' },
    type: 'more',
    check: ({ reactionsNum }, { days, checked }) => (checked ? reactionsNum > days : true),
  },
  {
    control: { name: 'less_then_control', id: 'less' },
    input: { name: 'less_control' },
    description: { start: 'less then' },
    type: 'less',
    check: ({ reactionsNum }, { days, checked }) => (checked ? reactionsNum < days : true),
  },
];

const text_check = text => ({ message }) => (message !== undefined
  ? !message.toLowerCase().includes(text) : true);

/**
 * Check for text
 * table of truth
 * checked | valid | show
 * 0       | 0     | true
 * 0       | 1     | false
 * 1       | 0     | true
 * 1       | 1     | true
 * @param regex
 * @return {function({message?: *}, *): boolean}
 */
const textCheck = regex => ({ message }, filter) => (filter.checked ? true : !regex.test(message));
const regexWestletter = /WCS\s?Weekly[\Wa-z0-9\s;()]*Westletter/gi;
const text_filters = [
  {
    control: { name: 'woc_text_control', id: 'woc' },
    input: {
      name: 'woc_control',
    },
    text: woc_string.toLowerCase(),
    check: text_check(woc_string.toLowerCase()),
  },
  {
    control: { name: 'westletter_text_control', id: 'westLetter' },
    input: {
      name: 'westletter_control',
    },
    text: westletter.toLowerCase(),
    check: textCheck(regexWestletter),
  },
];

export default {
  control: filters,
  text: text_filters,
  subtractDaysFromDate,
};
