export class NewsApi {
  constructor(param, keyword) {
    this.param = param;
    this.keyword = keyword;
  }

  getNews() {
    return fetch(`${this.param.baseUrl}?q=${this.keyword}&apiKey=${this.param.apiKey}&from=${this.param.from}&to=${this.param.to}&pageSize=${this.param.pageSize}`)
      .then((res) => {
        return res;
      })
      .then((res => {
        if (res.ok) {
          return res.json();
        }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }))
      .then(res => {
        //очищаю и преобразую данные
        return {
          total: res.totalResults,
          news: res.articles.map(this._transformData),
        };
      })
      .catch(err => {
        console.log(err);
      });
  };

  _transformData(data) {
    return {
        name: data.source.name,
        title: data.title,
        publishDate: data.publishedAt,
        description: data.description,
        img: data.urlToImage,
        url: data.url
    };
  };
};




