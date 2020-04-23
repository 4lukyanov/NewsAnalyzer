
// функция форматирования даты для запроса к NewsApi
export function dateFormatISO(date) {
  return date.getUTCFullYear() + '-' + (parseInt(date.getMonth()+1) < 10 ? '0' + parseInt(date.getMonth()+1) : parseInt(date.getMonth()+1)) + '-' + date.getUTCDate() + 'T' + date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds();
};

// функция форматирования даты для статистики
export function dateFormatISOWithoutTime(date) {
  return date.getUTCFullYear() + '-' + (parseInt(date.getMonth()+1) < 10 ? '0' + parseInt(date.getMonth()+1) : parseInt(date.getMonth()+1)) + '-' + date.getUTCDate();
};

// фунция отсчитывает неделю назад
export function weekAgo() {
  let date = new Date();
  date.setDate(date.getDate() - 6);
  let weekAgo = date.getFullYear()+'-'+ (parseInt(date.getMonth()+1) < 10 ? '0' + parseInt(date.getMonth()+1) : parseInt(date.getMonth()+1)) +'-'+date.getDate();
  return weekAgo;
}

// функция преобразования даты из Api
export function dateFormatForCards(dateISO) {
  const date = new Date(Date.parse(dateISO));

  const month = ['января', 'февраля', 'марта', 'апреля', 'мая',
                'июня', 'июля', 'августа', 'сентября', 'октября',
                'ноября','декабря'];

  const newDate = date.getDate() + ' ' + month[date.getMonth()] + ', ' + date.getFullYear();
  return newDate;
};

