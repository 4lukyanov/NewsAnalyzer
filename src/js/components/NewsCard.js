import {dateFormatForCards} from '../utils/formatDate.js';

export class NewsCard {
  createCards(cardData) {
    let arrayCards = [];
    if(cardData && (cardData.length) && (cardData != undefined)) {
      for ( let i=0; i < cardData.length; i++) {
        const template = `
        <a class="news__item" href="${cardData[i].url}" target="_blank">
        <img class="news__item-image" src="${cardData[i].img}" title="Результат поиска"  alt="Результат поиска">
        <div class="news__item-description">
          <time class="news__item-pubdate">${dateFormatForCards(cardData[i].publishDate)}</time>
          <h3 class="news__item-title">${cardData[i].title}</h3>
          <p class="news__item-text">${cardData[i].description}</p>
          <p class="news__item-link">${cardData[i].name}</p>
        </div>
      </a>`
        arrayCards.push(template)
      };
      return arrayCards;
    };
  };
};
