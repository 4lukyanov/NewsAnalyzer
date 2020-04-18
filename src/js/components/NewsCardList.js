export class NewsCardList {
  constructor(domContainer, showButton, card, sectionShowMore) {
    this.container = domContainer;
    this.button = showButton;
    this.showMoreContainer = sectionShowMore;
    this.card = card;
    this.count = 3;
  };

  render(card) {
    this.container.insertAdjacentHTML('beforeend', card);
  };

  addThreeCards(arrayCard) {
    if((arrayCard != undefined)) {
      for ( let i= 0;(i <= arrayCard.length) && (i < 3); i++) {
        this.render(arrayCard[i]);
      };
    };
  };

  loading(storageData, container) {
    if (storageData) {
      container.setAttribute('style', 'display: block')
      this.addThreeCards(storageData);
    };
  };

  removeCards() {
    const cardList = document.querySelectorAll('.news__item');
    if (cardList.length) {
      for (let card of cardList) {
          card.remove();
      };
    };
  };

  newsNotFoundShow(container, resultContainer) {
    resultContainer.removeAttribute('style');
    container.setAttribute('style', 'display: flex');
  };

  setShowMoreListener() {
    this.button.addEventListener('click', () => {
      let storageData = JSON.parse(localStorage.getItem('NewsApi'));
      let cardsArray = this.card.createCards(storageData);
      for ( let i = this.count ; i < (this.count + 3) ; i++) {
        this.render(cardsArray[i]);
      };
      this.count +=3;
      this.showMoreDisplayNone();
    })
  };

  showMoreDisplayNone() {
    let storageData = JSON.parse(localStorage.getItem('NewsApi'));
    if(this.count + 3 >= (storageData.length)) {
      this.showMoreContainer.setAttribute('style', 'display:none');
    } else {
      this.showMoreContainer.removeAttribute('style');
    };
  };
};
