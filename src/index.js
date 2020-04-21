import "./pages/index.css";
import {param} from './js/constans/constans.js';
import {newsListContainer} from './js/constans/constans.js';
import {newsButton} from './js/constans/constans.js';
import {searchForm} from './js/constans/constans.js';
import {showMoreButton} from './js/constans/constans.js';
import {newsSection} from './js/constans/constans.js';
import {newsNotFound} from './js/constans/constans.js';
import {preloader} from './js/constans/constans.js';
import {error} from './js/constans/constans.js';
import {sectionShowMore} from './js/constans/constans.js';
import {errorValidity} from './js/constans/constans.js';
import {input} from './js/constans/constans.js';
import {NewsApi} from './js/modules/NewsApi.js';
import {storage} from './js/constans/constans.js';
import {NewsCard} from './js/components/NewsCard.js';
import {NewsCardList} from './js/components/NewsCardList.js';
import {SearchInput} from './js/components/SearchInput.js';

const card = new NewsCard();
const search = new SearchInput(newsButton, errorValidity, input);
const newsList = new NewsCardList(newsListContainer, showMoreButton, card, sectionShowMore);
const storageData = storage.getData('NewsApi');
let createCardsApi = card.createCards(storageData);

newsList.loading(createCardsApi, newsSection); //рендер результата после перезагрузки
newsList.setShowMoreListener();
search.inputValueListener();

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  newsSection.setAttribute('style', 'display: none');
  let keyword = searchForm.elements.keyword.value;
  if (!keyword.length) {
    search.validity(keyword.length);
  } else {
    search.validity(keyword.length);
    preloader.classList.add('loading_show');
    const newsApi = new NewsApi(param, keyword);
    newsNotFound.removeAttribute('style');
    newsApi.getNews()
      .then((res) => {
        preloader.classList.remove('loading_show');
        if (res.news.length == 0) {
          newsList.newsNotFoundShow(newsNotFound, newsSection); // если ничего не найдено
        }
        return res;
      })
      .then((res) => {
        if((res.news != undefined) && (res.news.length != 0)) { // не рендерим пустой массив
          newsNotFound.removeAttribute('style')
          newsList.removeCards();
          storage.setData('NewsApi','keywords','total', JSON.stringify(res.news), keyword, JSON.stringify(res.total));
          newsList.addThreeCards(card.createCards(res.news));
          newsSection.setAttribute('style', 'display: block');
        };
      })
      .catch(() => {
        error.classList.add('error_show');
      });
    };
});

