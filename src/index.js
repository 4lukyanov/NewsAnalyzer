import "./pages/index.css";
import {param} from './js/constans/constans.js';
import {newsListContainer} from './js/constans/constans.js';
import {newsButton} from './js/constans/constans.js';
import {searchForm} from './js/constans/constans.js';
import {NewsApi} from './js/modules/NewsApi.js';
import {DataStorage} from './js/modules/DataStorage.js';
import {NewsCard} from './js/components/NewsCard.js';
import {NewsCardList} from './js/components/NewsCardList.js';
import {SearchInput} from './js/components/SearchInput.js';

const storage = new DataStorage();
const card = new NewsCard();


// newsApi.getNews()
//   .then((res) => {
//     storage.setData('NewsApiii', JSON.stringify(res))
//   });

const arrayNewsCard = card.createCards(storage.getData('NewsApiii'));

const newsList = new NewsCardList(newsListContainer, arrayNewsCard);

newsList.addThreeCards();

const search = new SearchInput(newsButton);

searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  let keyword = document.forms.search.elements.keyword.value;
  const newsApi = new NewsApi(param, keyword);
  newsApi.getNews()
  .then((res) => {
    console.log(res)
  });
})


  // let keyword = document.forms.search.elements.keyword.value;
  // console.log(keyword)