export class DataStorage {
  constructor(data) {
    this.data = data;
  };

  setData(key, keyKeywords,keyTotal, value, valueKeywords, valueTotal) {
    this.clean();
    if (value != '[]') {
      localStorage.setItem(key, value);
      localStorage.setItem(keyKeywords, valueKeywords);
      localStorage.setItem(keyTotal, valueTotal);
    };
  };

  getData(key) {
   return JSON.parse(localStorage.getItem(key));
  };

  clean() {
    localStorage.clear();
  };
};
