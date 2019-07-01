import moment from 'moment';

export const getFormattedDate = (date, format = 'D/M/YYYY') => (date ? moment(date).format(format) : null);

export const getArtist_Title = (name) => {
  if (name == null) {
    return { artist: null, title: null };
  }
  const spRegex = /^(.*?)(?:,\s.*s.*by)\s(.*?)(?:\son.*[Ss]potify)$/g;
  const removeBrackets = /\W?[([].*[)\]]\W?/g;
  const splitTrack = /^(.*?)\s?[-|]+\s?(.*?)\s?(?:\.?)?\s?(?:ft\.?\s)?(\w+\s?\w+)?$/g;
  const noBrackets = name.replace(removeBrackets, ' ');
  const sp = spRegex.exec(name);
  if (sp !== null) {
    return { title: sp[1], artist: sp[2] };
  }
  const z = splitTrack.exec(noBrackets);
  if (z && z[1] && (z[2] || z[3])) {
    return {
      artist: z[1].trim(),
      title: z[2].trim() || z[3].trim(),
    };
  }
  return { artist: null, title: name };
};

/**
 *
 * @return {{monday: Date, friday: Date, sunday: Date, weekNumber: number}}
 */
export const weekInfo = () => {
  const today = moment();
  const number = today.day();
  const isNewWeek = number >= 0 && number < 5;
  const monday = moment(today).day(isNewWeek ? -6 : 1);
  const friday = moment(today).day(isNewWeek ? -2 : 5);
  const sunday = moment(today).day(isNewWeek ? -7 : 0);
  const weekNumber = today.week();
  return {
    monday,
    friday,
    sunday,
    weekNumber,
    year: today.year(),
  };
};

export const getFbPictureUrl = id => `https://graph.facebook.com/${id}/picture?height=50`;
