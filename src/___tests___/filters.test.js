/**
 * Created by XKTR67 on 4/19/2017.
 */

import {subtractDaysFromDate} from '../utils/filters_def';

describe('[filters]',  () =>{
  beforeAll(() =>{
    });
    afterAll(() =>{
    });
    beforeEach(() =>{
    });
    afterEach(() =>{
    });
    it("subtractDaysFromDate", () =>{
        let date = new Date('3/29/2017');
        let since =subtractDaysFromDate(date,4);
        expect(since.toLocaleDateString("en-EN")).toBe("3/25/2017");
    });
});
