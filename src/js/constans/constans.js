import {dateFormatISO} from '../utils/formatDate.js';
import {weekAgo} from '../utils/formatDate.js';

// объект для NewsApi
export const param = {
  apiKey: "ef835791865244009d6ff0d9b2e85c40",
  baseUrl: "https://newsapi.org/v2/everything",
  from: dateFormatISO(weekAgo()),
  to: dateFormatISO(new Date()),
  pageSize: 100,
};

// конфиг для настройки слайдера
export const config = {
  type: "carousel",
  startAt: 0,
  perView: 3.5,
  breakpoints: {
    1024: {
      perView: 2.5,
    },
    700: {
      perView: 1.5,
    },
    460: {
      perView: 1.06,
    },
  },
};

// контейнер для NewsCardList
export const newsListContainer = document.querySelector('.news__list');

// контейнер для CommitCardList
export const commitListContainer = document.querySelector('.glide__slides');

// контейнер для пуль от слайдера
export const bullets = document.querySelector('.glide__bullets');

// уведомление об ошибке запроса
export const error = document.querySelector('.error');

// блок с комитами, который скрою при catch
export const commits = document.querySelector('.github__commits');

// preloader
export const preloader = document.querySelector('.loading')

