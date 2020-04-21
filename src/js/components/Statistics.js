export class Statistics {
  constructor(dataStorage, keywordContainer, totalContainer, notificationsContainer, keyword, monthContainer, weekContainer) {
    this.dataStorage = dataStorage;
    this.keywordContainer = keywordContainer;
    this.totalContainer = totalContainer;
    this.notificationsContainer = notificationsContainer;
    this.key = keyword;
    this.monthContainer = monthContainer;
    this.weekContainer = weekContainer;
  };

  setKeyword() {
    this.keywordContainer.textContent = localStorage.getItem('keywords');
  };

  setTotal() {
    this.totalContainer.textContent = localStorage.getItem('total');
  };

  setNotificationsCounter() {
    let regexp = new RegExp(`${this.key.toLowerCase()}`, `gi`);
    let count = 0;
    this.dataStorage.map(data => {
      data = data.title.toLowerCase();
      let str = data.match(regexp) || [];
      count += str.length;
    })
    this.notificationsContainer.textContent = count;
  };

  setMonth() {
    const date = new Date();
    const month = ['январь', 'февраль', 'март', 'апрель', 'май',
                  'июнь', 'июль', 'август', 'сентябрь', 'октябрь',
                  'ноябрь','декабрь'];

    const newDate = month[date.getMonth()];
    this.monthContainer.textContent = newDate;
  };

  setDaysOfTheWeek() {
    const date = new Date();
    this.render(this.weekContainer, this.daysOfWeekTemplate(date.getDate(), this.getWeekDayName(date)));
    for(let i= 0; i < 6 ; i++) {
      date.setDate(date.getDate()- 1);
      this.render(this.weekContainer, this.daysOfWeekTemplate(date.getDate(), this.getWeekDayName(date)));
    };
  };

  getWeekDayName(date) {
    let days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    var number = date.getDay();
    return days[number];
  };

  daysOfWeekTemplate(date, weekDayName) {
    const template = `<p class="analytics__y-item"><span class="analytics__y-date">${date}</span>, ${weekDayName}</p>`;
    return template;
  };

  render(container, htmlObject) {
    container.insertAdjacentHTML('afterbegin', htmlObject);
  };

  loading() {
    this.setKeyword();
    this.setTotal();
    this.setNotificationsCounter();
    this.setMonth();
    this.setDaysOfTheWeek();
  };
};