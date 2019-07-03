// @flow
import { westletter, woc_string } from './consts';
import { subtractDaysFromDate } from './date';
import type {
  ChartEntry, FiltersDefinition, FilterText, FilterValue,
} from '../types';


const countDays = (elem: ChartEntry, {
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

const isItMore = ({ reactionsNum }: ChartEntry,
  { days, checked }) => (checked ? reactionsNum > days : true);
const isItLess = ({ reactionsNum }: ChartEntry,
  { days, checked }) => (checked ? reactionsNum < days : true);

const filters: FilterValue[] = [
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
    check: isItMore,
  },
  {
    control: { name: 'less_then_control', id: 'less' },
    input: { name: 'less_control' },
    description: { start: 'less then' },
    type: 'less',
    check: isItLess,
  },
];

const text_check = (text: string) => ({ message }: ChartEntry) => (message !== undefined
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
const textCheck = (regex: RegExp) => ({ message }: ChartEntry, filter) => (
  filter.checked
    ? true
    : !regex.test(message)
);

const regexWestletter = /WCS\s?Weekly[\Wa-z0-9\s;()]*Westletter/gi;

const text_filters: FilterText[] = [
  {
    control: { name: 'woc_text_control', id: 'woc' },
    input: {
      name: 'woc_control',
    },
    type: 'text',
    text: woc_string.toLowerCase(),
    check: text_check(woc_string.toLowerCase()),
  },
  {
    control: { name: 'westletter_text_control', id: 'westLetter' },
    input: {
      name: 'westletter_control',
    },
    type: 'text',
    text: westletter.toLowerCase(),
    check: textCheck(regexWestletter),
  },
];

const filterDefs: FiltersDefinition = {
  control: filters,
  text: text_filters,
  subtractDaysFromDate,
};
export default filterDefs;
