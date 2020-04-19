export class SearchInput {
  constructor(button, error, input) {
    this.button = button;
    this.error = error;
    this.input = input;
  };

  validity(value) {
    if (value) {
      this.error.setAttribute('style', 'display: none');
    } else {
      this.error.setAttribute('style', 'display: block');
      this.buttonLock()
    };
  };

  buttonLock() {
    this.button.setAttribute('disabled', true);
    this.button.setAttribute('style', 'background: #6399ff');
  };

  buttonUnlock() {
    this.button.removeAttribute('disabled');
    this.button.removeAttribute('style');
  };

  inputValueListener() {
    this.input.addEventListener('input', ()=> {
      if(this.button.hasAttribute('disabled')) { //разблокируем кнопку при вводе значения
        this.buttonUnlock();
        this.error.setAttribute('style', 'display: none');
      };
    });
  };
};

