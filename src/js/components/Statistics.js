import {dateFormatISOWithoutTime} from '../utils/formatDate.js';

export class Statistics {
  constructor(dataStorage, keywordContainer, totalContainer, notificationsContainer, keyword, monthContainer, weekContainer, diagram) {
    this.dataStorage = dataStorage;
    this.keywordContainer = keywordContainer;
    this.totalContainer = totalContainer;
    this.notificationsContainer = notificationsContainer;
    this.key = keyword;
    this.monthContainer = monthContainer;
    this.weekContainer = weekContainer;
    this.diagram = diagram;
    this.newData = {
      totalMention: 0,
      data: []
    };
  };

  //устанавливаем ключевое слово на страницу
  setKeyword() {
    this.keywordContainer.textContent = localStorage.getItem('keywords');
  };

  //устаналиваем общее количество новостей по запросу
  setTotal() {
    this.totalContainer.textContent = localStorage.getItem('total');
  };

  //устанавливаем на страницу количество упоминаний в заголовках
  setNotificationsCounter() {
    this.notificationsContainer.textContent = this.countMention(this.dataStorage);
  };

  //подсчет количества упоминаний
  countMention(arrayData) {
    let regexp = new RegExp(`${this.key.toLowerCase()}`, `gi`);
    let count = 0;
    arrayData.map(data => {
      data = data.title.toLowerCase();
      let str = data.match(regexp) || [];
      count += str.length;
    });
    return count;
  };

  //устанавливаем месяц
  setMonth() {
    const date = this.maxDateInStorage();
    const month = ['январь', 'февраль', 'март', 'апрель', 'май',
                  'июнь', 'июль', 'август', 'сентябрь', 'октябрь',
                  'ноябрь','декабрь'];

    const newDate = month[date.getMonth()];
    this.monthContainer.textContent = newDate;
  };

  //устаналиваем распредление по дням недели
  setDaysOfTheWeek() {
    let maxDate = this.maxDateInStorage();
    this.render(this.weekContainer, this.daysOfWeekTemplate(maxDate.getDate(), this.getWeekDayName(maxDate)));
    for(let i= 0; i < 6 ; i++) {
      maxDate.setDate(maxDate.getDate()- 1);
      this.render(this.weekContainer, this.daysOfWeekTemplate(maxDate.getDate(), this.getWeekDayName(maxDate)));
    };
  };

  //находим максимальную дату
  maxDateInStorage() {
    let maxDate = 0;
    this.dataStorage.forEach((item) => {
       item = new Date(Date.parse(item.publishDate));
       if(item> maxDate) {
         maxDate = item;
       };
    });
    return maxDate;
  }

  //устанавливаем день недели
  getWeekDayName(date) {
    let days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    let number = date.getDay();
    return days[number];
  };

  //преобразуем структуру данных из апи для построения диаграммы
  transformNewsApiData() {
    const maxDate = this.maxDateInStorage();
    this.newData.data.push({date: dateFormatISOWithoutTime(new Date(maxDate.setDate(maxDate.getDate()))), content: [], count: 0, percent: 0});
    for (let i = 0; i < 6; i++) {
      let day = dateFormatISOWithoutTime(new Date(maxDate.setDate(maxDate.getDate() - 1)));
      this.newData.data.push({date: day, content: [], count: 0, percent: 0});
    };
    return this.newData;
  };

  //наполнение данными новой структуры по ключу даты
  updateNewData() {
    let newData = this.transformNewsApiData();
    this.dataStorage.forEach(item => {
     let dateFormat = dateFormatISOWithoutTime(new Date(item.publishDate));
     for(let i = 0; i < newData.data.length; i++) {
     if (dateFormat == newData.data[i].date) {
      newData.data[i].content.push(item.title);
      newData.data[i].content.push(item.description);
       };
      };
    });
    return newData;
  };

  //подсчет общего количества упоминаний, для расчета процентов
  countTotalMention(arrayNewData) {
    arrayNewData.data.forEach(item => {
      arrayNewData.totalMention += item.count;
    });
    return arrayNewData;
  };

  //подсчет количества упомианий в новой структуре
  countMentionInNewData() {
    let regexp = new RegExp(`${this.key.toLowerCase()}`, `gi`);
    let newData = this.updateNewData();
    for (let i=0; i< newData.data.length; i++) {
      newData.data[i].content.forEach(item => {
        item = item.toLowerCase();
        let str = item.match(regexp) || [];
        newData.data[i].count += str.length;
      });
    };
    return newData;
  };

  //находим процент
  findPercent(newData) {
    newData.data.forEach(item => {
      item.percent = (item.count * 100)/newData.totalMention;
    });
    return newData;
  };

  //создание финальной структуры данных
  createNewData() {
   return this.findPercent((this.countTotalMention(this.countMentionInNewData())));
  };

  //шаблон для колонок диаграммы
  diagramRowsTemplate(data) {
    const template = `<div class="analytics__row-item"><span class="analytics__row-count">${data.count || 0}</span></div>`;
    return template;
  };

  // строим диаграмму
  addRows(data) {
    for(let i=0; i <data.data.length; i++) {
      this.render(this.diagram, this.diagramRowsTemplate(data.data[i], i));
      document.querySelector('.analytics__row-item').setAttribute('style', `width: ${data.data[i].percent || 2}%`); // при нуле сделаем контейнер, чтобы было видно "0"
    };
  };

  //шаблон для дней недели
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
    this.addRows(this.createNewData());
  };
};