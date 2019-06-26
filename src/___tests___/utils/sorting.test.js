import sorting from '../../utils/sorting';

describe('[sorting]', () => {
  const base_array = [{
    from: { name: 'krzys' },
    reactionsNum: 7,
    crated_time: new Date('2017-03-14'),
    link: {
      name: 'acbaa',
    },
  }, {
    from: { name: 'bartek' },
    reactionsNum: 3,
    createdTime: new Date('2017-03-16'),
    link: {
      name: 'acbaa',
    },
  }, {
    from: { name: 'zumba' },
    reactionsNum: 9,
    createdTime: new Date('2017-04-14'),
    link: {
      name: 'aabcaa',
    },
  }, {
    from: { name: 'tomek' },
    reactionsNum: 0,
    createdTime: undefined,
    link: {
      name: 'zzzaaaa',
    },
  }, {
    from: { name: 'tomek' },
    reactionsNum: 1,
    createdTime: new Date('2017-02-19'),
    link: {
      name: 'tttaaaa',
    },
  }];
  it('reaction dsc', () => {
    const array = Object.assign([], base_array);
    sorting.reaction(array);
    expect(array[0].reactionsNum).toBe(9);
    expect(array[1].reactionsNum).toBe(7);
    expect(array[2].reactionsNum).toBe(3);
    expect(array[3].reactionsNum).toBe(1);
  });
  it('who asc', () => {
    const array = Object.assign([], base_array);
    sorting.who(array);
    expect(array[0].from.name).toBe('bartek');
    expect(array[1].from.name).toBe('krzys');
    expect(array[2].from.name).toBe('tomek');
    expect(array[3].from.name).toBe('tomek');
    expect(array[4].from.name).toBe('zumba');
  });
  xit('when', () => {
    const array = Object.assign([], base_array);
    sorting.when(array);
    expect(array[0].from.name).toBe('tomek');
    expect(array[0].createdTime).toBeUndefined();
    expect(array[1].from.name).toBe('tomek');
    expect(array[2].from.name).toBe('krzys');
    expect(array[3].from.name).toBe('bartek');
    expect(array[4].from.name).toBe('zumba');
  });
  it('what', () => {
    const array = Object.assign([], base_array);
    sorting.what(array);
    expect(array[0].from.name).toBe('zumba');
    expect(array[1].from.name).toBe('krzys');
    expect(array[2].from.name).toBe('bartek');
    expect(array[3].from.name).toBe('tomek');
    expect(array[4].from.name).toBe('tomek');
    expect(array[4].createdTime).toBeUndefined();
  });
});
