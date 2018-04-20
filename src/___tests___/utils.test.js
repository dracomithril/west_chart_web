/**
 * Created by XKTR67 on 4/19/2017.
 */
import configureMockStore from 'redux-mock-store';
import { filterChart, getArtist_Title, getChartFromServer, sorting } from '../utils/utils';

jest.mock('cookies-js');

const sinon = require('sinon');
const { chart } = require('./___data___/response.json');
const mockStore = configureMockStore([]);
describe('[utils]', () => {
  beforeAll(() => {
  });
  afterAll(() => {
    jest.unmock('cookies-js');
  });
  beforeEach(() => {
  });
  afterEach(() => {
  });
  describe('[sorting]', () => {
    let base_array = [{
      from: { name: "krzys" },
      reactions_num: 7,
      crated_time: new Date('2017-03-14'),
      link: {
        name: 'acbaa',
      },
    }, {
      from: { name: "bartek" },
      reactions_num: 3,
      createdTime: new Date('2017-03-16'),
      link: {
        name: 'acbaa',
      },
    }, {
      from: { name: "zumba" },
      reactions_num: 9,
      createdTime: new Date('2017-04-14'),
      link: {
        name: 'aabcaa',
      },
    }, {
      from: { name: 'tomek' },
      reactions_num: 0,
      createdTime: undefined,
      link: {
        name: 'zzzaaaa',
      },
    }, {
      from: { name: 'tomek' },
      reactions_num: 1,
      createdTime: new Date('2017-02-19'),
      link: {
        name: 'tttaaaa',
      },
    }];
    it("reaction dsc", () => {
      let array = Object.assign([], base_array);
      sorting.reaction(array);
      expect(array[0].reactions_num).toBe(9);
      expect(array[1].reactions_num).toBe(7);
      expect(array[2].reactions_num).toBe(3);
      expect(array[3].reactions_num).toBe(1);
    });
    it('who asc', function () {
      let array = Object.assign([], base_array);
      sorting.who(array);
      expect(array[0].from.name).toBe("bartek");
      expect(array[1].from.name).toBe("krzys");
      expect(array[2].from.name).toBe("tomek");
      expect(array[3].from.name).toBe("tomek");
      expect(array[4].from.name).toBe("zumba");
    });
    xit('when', function () {
      let array = Object.assign([], base_array);
      sorting.when(array);
      expect(array[0].from.name).toBe("tomek");
      expect(array[0].createdTime).toBeUndefined();
      expect(array[1].from.name).toBe("tomek");
      expect(array[2].from.name).toBe("krzys");
      expect(array[3].from.name).toBe("bartek");
      expect(array[4].from.name).toBe("zumba");
    });
    it('what', function () {
      let array = Object.assign([], base_array);
      sorting.what(array);
      expect(array[0].from.name).toBe("zumba");
      expect(array[1].from.name).toBe("krzys");
      expect(array[2].from.name).toBe("bartek");
      expect(array[3].from.name).toBe("tomek");
      expect(array[4].from.name).toBe("tomek");
      expect(array[4].createdTime).toBeUndefined();
    });

  });
  describe('[getChartFromServer]', function () {
    it('get list', function () {
      const store = mockStore();
      let fetch = sinon.stub(window, 'fetch');
      let CookiesMock = require('cookies-js');
      CookiesMock.set = sinon.spy();
      const resp = {
        text: sinon.stub(),
        json: sinon.stub(),
        status: 200,
      };
      resp.json.returns(Promise.resolve({ chart: ['zzz', 'bbb'], lastUpdateDate: 'update' }));
      fetch.withArgs('/api/fb/get_chart?').returns(Promise.resolve(resp));
      return getChartFromServer({}, store).then((z) => {
        expect(store.getActions().length).toBe(0);
        expect(z.chart.length).toBe(2);
        expect(z.lastUpdateDate).toBe('update');
        window.fetch.restore();
      });
    });
  });
  describe('[getArtist_Title]', function () {
    const str1 = {
      description: "Vali - Ain't No Friend Of Mine (Official Video)",
      artist: "Vali", title: "Ain't No Friend Of Mine",
    };
    const str2 = {
      description: "Chet Faker - 1998 ft Banks",
      artist: "Chet Faker", title: "1998 ft Banks", ft: "Banks",
    };
    const str4 = {
      description: "X Ambassadors - Unsteady (Erich Lee Gravity Remix)",
      artist: "X Ambassadors", title: "Unsteady",
    };
    const str5 = {
      description: "Galway Girl, a song by Ed Sheeran on Spotify",
      artist: "Ed Sheeran", title: "Galway Girl",
    };
    const str6 = {
      description: "James Hersey - Miss You (Official Audio)",
      artist: "James Hersey", title: "Miss You",
    };
    const str3 = {
      description: "Charlie Puth - Attention [Official Video]",
      artist: "Charlie Puth", title: "Attention",
    };
    const str7 = {
      description: "DNCE - Kissing Strangers (Audio) ft. Nicki Minaj",
      artist: "DNCE", title: "Kissing Strangers",
    };
    // const str8 = {
    //     description: "Sam Smith - Make It To Me - Stripped (Live) (VEVO LIFT UK) ft. Howard Lawrence",
    //     artist: "Sam Smith", title: "Make It To Me"
    // };
    const str9 = {
      description: "Imagine Dragons - Thunder (Audio)",
      artist: "Imagine Dragons", title: "Thunder",
    };
    const str10 = {
      description: "Pitbull Ft Mayer Hawthorne Do It Lyrics",
      artist: null, title: "Pitbull Ft Mayer Hawthorne Do It Lyrics",
    };
    // 1. Booyah Riot - 2AM
    // 2. Cosmo's Midnight - History
    // 3. Jane XØ - Love Me
    // 4. Fergie - London Bridge
    // 5. Roo Panes - Lullaby Love
    // 6. Ivy Levan - Hot Damn
    const str11 = {
      description: "Booyah Riot - 2AM",
      artist: "Booyah Riot", title: "2AM",
    };
    const str12 = {
      description: "Cosmo's Midnight - History",
      artist: "Cosmo's Midnight", title: "History",
    };
    const str13 = {
      description: "Jane XØ - Love Me",
      artist: "Jane XØ", title: "Love Me",
    };
    const str14 = {
      description: "Fergie - London Bridge",
      artist: "Fergie", title: "London Bridge",
    };
    const str15 = {
      description: "Shania Twain - Ka-Ching! (Red Version)",
      artist: "Shania Twain", title: "Ka-Ching! (Red Version)",
    };


    it('should return artist and title', function () {
      const res1 = getArtist_Title(str1.description);
      expect(res1.artist).toBe(str1.artist);
      expect(res1.title).toBe(str1.title);
      const res2 = getArtist_Title(str2.description);
      expect(res2.artist).toBe(str2.artist);
      expect(res2.title).toBe(str2.title);
      const res3 = getArtist_Title(str4.description);
      expect(res3.artist).toBe(str4.artist);
      expect(res3.title).toBe(str4.title);
      const res4 = getArtist_Title(str6.description);
      expect(res4.artist).toBe(str6.artist);
      expect(res4.title).toBe(str6.title);
      const res5 = getArtist_Title(str5.description);
      expect(res5.artist).toBe(str5.artist);
      expect(res5.title).toBe(str5.title);
      const res6 = getArtist_Title(str3.description);
      expect(res6.artist).toBe(str3.artist);
      expect(res6.title).toBe(str3.title);
      const res7 = getArtist_Title(str7.description);
      expect(res7.artist).toBe(str7.artist);
      expect(res7.title).toBe(str7.title);
      // const res8 = getArtist_Title(str8.description);
      // expect(res8.artist).toBe(str8.artist);
      // expect(res8.title).toBe(str8.title);
      const res9 = getArtist_Title(str9.description);
      expect(res9.artist).toBe(str9.artist);
      expect(res9.title).toBe(str9.title);

      const res12 = getArtist_Title(str12.description);
      expect(res12.artist).toBe(str12.artist);
      expect(res12.title).toBe(str12.title);
      const res13 = getArtist_Title(str13.description);
      expect(res13.artist).toBe(str13.artist);
      expect(res13.title).toBe(str13.title);
      const res14 = getArtist_Title(str14.description);
      expect(res14.artist).toBe(str14.artist);
      expect(res14.title).toBe(str14.title);
      const res11 = getArtist_Title(str11.description);
      expect(res11.artist).toBe(str11.artist);
      expect(res11.title).toBe(str11.title);
      const res15 = getArtist_Title(str15.description);
      expect(res15.artist).toBe(str15.artist);
      expect(res15.title).toBe(str15.title);
    });
    it('should return title if no mach from regex', function () {
      const res10 = getArtist_Title(str10.description);
      expect(res10.artist).toBe(str10.artist);
      expect(res10.title).toBe(str10.title);
    });


  });
  describe('[filterChartWithStore]', function () {
    it('should be able to filter', function () {
      let getStore = {
        chart: chart,
        filters: {
          add_control: { checked: false },
          create_control: { checked: false },
          update_control: { checked: false },
          less_control: { checked: false },
          more_control: { checked: false },
          woc_control: { checked: false },
          westletter_control: { checked: false },
        }, until: "2018-03-16T19:54:25.672Z", songsPerDay: 3,
      };
      const filtered = filterChart(getStore.chart, getStore.filters, getStore.until, getStore.songsPerDay);
      expect(filtered.viewChart.length).toBe(24);
    });
    it('should be able to filter when add_control', function () {
      let getStore = {
        chart: chart,
        filters: {
          create_control: { checked: true, days: 7 },
          update_control: { checked: false },
          less_control: { checked: false },
          more_control: { checked: false },
          woc_control: { checked: false },
          westletter_control: { checked: true },
        }, until: "2018-03-21T19:54:25.672Z", songsPerDay: 3,
      };

      const filtered = filterChart(getStore.chart, getStore.filters, getStore.until, getStore.songsPerDay);
      expect(filtered.viewChart.length).toBe(8);
    });

  });
});
