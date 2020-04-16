import {dateFormatForCards} from '../utils/formatDate.js';

export class CommitCard {

  createCards(cardData) {
    let arrayCards = [];
    for ( let i=0; i < cardData.length; i++) {

      const template = `
                <div class="glide__slide github__card">
                  <time class="commit__date">${dateFormatForCards(cardData[i].date)}</time>
                  <div class="commit__info">
                    <img src="${cardData[i].avatar}" alt="Автор коммита" title="Автор коммита" class="commit__photo">
                    <div class="commit__about">
                      <h4 class="commit__author">${cardData[i].name}</h4>
                      <span class="commit__email">${cardData[i].email}</span>
                    </div>
                  </div>
                  <p class="commit__text">${cardData[i].text}</p>
                </div>`

      arrayCards.push(template)
    };
   return arrayCards;
  };
};