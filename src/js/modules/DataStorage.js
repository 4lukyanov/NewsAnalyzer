export class DataStorage {
  constructor(data) {
    this.data = data;
  };

  setData(key, value) {
    this.clean();
    localStorage.setItem(key, value);
  };

  getData(key) {
   return JSON.parse(localStorage.getItem(key));
  };

  clean() {
    localStorage.clear();
  };
};
