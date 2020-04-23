export class GithubApi{
    constructor(param){
      this.param = param;
    };

    getCommits() {
        return fetch(`https://api.github.com${this.param}`)
            .then(res => {
              if (res.ok) {
                return res.json();
              }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .then(res => {
              //очищаю и преобразую данные
                return res.map(this._transformData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    _transformData(data) {
        return {
            name: data.commit.committer.name,
            email: data.commit.committer.email,
            date: data.commit.committer.date,
            text: data.commit.message,
            avatar: data.author.avatar_url,
        };
    };
};
