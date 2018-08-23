import { getLinkFromMessage } from '../utils/chart';
const assert = require('assert');

describe('[chart]', () => {
  it('should be able to get link from message', function() {
    const result = getLinkFromMessage('Est domesticus gallus, cesaris. http://www.wp.pl https://open.spotify.com/album/6hCR3zQtRH0IgookOYt771');
    assert(result,'http://www.wp.pl')
  });
});
