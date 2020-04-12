import Glide from '@glidejs/glide'

const config = {
  type: 'carousel',
  startAt: 0,
  perView: 3.5,
  breakpoints: {
    1024: {
      perView: 2.5
    },
    700: {
      perView: 1.5
    },
    460: {
      perView: 1.06
    }
  }
};

new Glide('.glide', config).mount()
