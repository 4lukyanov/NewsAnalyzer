export class CommitCardList {
  constructor(domContainer, bulletsContainer) {
    this.cardListContainer = domContainer;
    this.bulletsContainer =  bulletsContainer;
  };

  render(container, htmlObject) {
    container.insertAdjacentHTML('beforeend', htmlObject);
  };

  addCards(arrayCard) {
    for ( let i=0; (i <= arrayCard.length) && (i <= 20); i++) {
      this.render(this.cardListContainer, arrayCard[i]);
    };
  };

  addBullets(arrayCard) {
    for ( let i=0; (i <= arrayCard.length) && (i <= 20); i++) {
      this.render(this.bulletsContainer, this.bulletTemplate(i));
    };
  };

  bulletTemplate(cardNumber) {
    const template = `<button class="glide__bullet" data-glide-dir="=${cardNumber}"></button>`;
    return template;
  };
};