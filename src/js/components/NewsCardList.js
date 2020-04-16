export class NewsCardList {
  constructor(domContainer, arrayCard) {
    this.container = domContainer;
    this.arrayCard = arrayCard;
    this.counter = 0;
  };

  render(card) {
    this.container.insertAdjacentHTML('beforeend', card);
  };

  addThreeCards() {
    for ( let i=0; i < 24; i++) {
      this.render(this.arrayCard[i]);
    };
  };

  showMoreCards() {

  };
};
