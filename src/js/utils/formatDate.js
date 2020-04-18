
// функция форматирования даты для запроса к NewsApi
export function dateFormatISO(date) {
  return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate() + 'T' + date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds();
};

// функция отнимает 7 дней от текущей даты
export function weekAgo() {
  const day = new Date();
  day.setDate(day.getDate() - 7);
  return day;
};

// функция преобразования даты из Api
export function dateFormatForCards(dateISO) {
  const date = new Date(Date.parse(dateISO));

  const month = ['января', 'февраля', 'марта', 'апреля', 'мая',
                'июня', 'июля', 'августа', 'сентября', 'октября',
                'ноября','декабря'];

  const newDate = date.getDate() + ' ' + month[date.getMonth()] + ', ' + date.getFullYear();
  return newDate;
};

