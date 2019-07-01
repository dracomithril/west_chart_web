const sorting = {
  /**
   * descending
   * @param array
   */
  reaction: (array) => {
    array.sort((a, b) => b.reactionsNum - a.reactionsNum);
  },
  /**
   * ascending
   * @param array
   */
  who: (array) => {
    array.sort((a, b) => {
      if (a.from.name < b.from.name) return -1;
      if (a.from.name > b.from.name) return 1;
      return 0;
    });
  },
  /**
   * ascending
   * @param array
   */
  when: (array) => {
    array.sort((a, b) => (a.createdTime
      ? a.createdTime.getTime() : 0) - (b.createdTime ? b.createdTime.getTime() : 0));
  },
  /**
   * ascending
   * @param array
   */
  what: (array) => {
    array.sort((a, b) => {
      if (a.link.name < b.link.name) return -1;
      if (a.link.name > b.link.name) return 1;
      return 0;
    });
  },
};

export default sorting;
