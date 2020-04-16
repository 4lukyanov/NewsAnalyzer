import "./pages/index.css";
import {param} from './js/constans/constans.js';
import {NewsApi} from './js/modules/NewsApi.js';
import {DataStorage} from './js/modules/DataStorage.js';
import {NewsCard} from './js/components/NewsCard.js';
import {NewsCardList} from './js/components/NewsCardList.js';

import {newsListContainer} from './js/constans/constans.js';



const storage = new DataStorage();
const card = new NewsCard();

// const newsApi = new NewsApi(param, 'политика');
// newsApi.getNews()
//   .then((res) => {
//     storage.setData('NewsApiii', JSON.stringify(res))
//   });

const arrayNewsCard = card.createCards(storage.getData('NewsApiii'));

const newsList = new NewsCardList(newsListContainer, arrayNewsCard);

newsList.addThreeCards()