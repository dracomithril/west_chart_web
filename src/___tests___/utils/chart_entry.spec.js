import { getLinkFromMessage } from '../../utils/chart_entry';

const assert = require('assert');

describe('[chart]', () => {
  it('should be able to get link from message', () => {
    const result = getLinkFromMessage('Est domesticus gallus, cesaris. http://www.wp.pl https://open.spotify.com/album/6hCR3zQtRH0IgookOYt771');
    assert(result, 'http://www.wp.pl');
  });
});
