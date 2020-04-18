import "../pages/index.css";
import {config} from '../js/constans/constans.js';
import {error} from '../js/constans/constans.js';
import {commits} from '../js/constans/constans.js';
import {bullets} from '../js/constans/constans.js';
import {commitListContainer} from '../js/constans/constans.js';
import {preloader} from '../js/constans/constans.js';
import Glide from '@glidejs/glide';
import {GithubApi} from '../js/modules/GithubApi.js';
import {CommitCard} from '../js/components/CommitCard.js';
import {CommitCardList} from '../js/components/CommitCardList.js';


const gitHubApi = new GithubApi('/repos/4lukyanov/NewsAnalyzer/commits');
const commitCards = new CommitCard();
const commitCardsList = new CommitCardList(commitListContainer, bullets)

gitHubApi.getCommits()
  .then((res) => {
     preloader.classList.remove('loading_show');
     return res;
  })
  .then((res) => {
     const commitsArr = commitCards.createCards(res);
     commitCardsList.addCards(commitsArr);
     commitCardsList.addBullets(commitsArr);
     new Glide('.glide', config).mount();
  })
  .catch(() => {
      preloader.classList.remove('loading_show');
      error.classList.add('error_show');
      commits.classList.add('github__commits_off');
  });
