import "../pages/index.css";
import {Statistics} from '../js/components/Statistics.js';
import {keywordContainer} from '../js/constans/constans.js';
import {total} from '../js/constans/constans.js';
import {notifications} from '../js/constans/constans.js';
import {storage} from '../js/constans/constans.js';
import {monthContainer} from '../js/constans/constans.js';
import {weekContainer} from '../js/constans/constans.js';

const keyword = localStorage.getItem('keywords');
const newsData = storage.getData('NewsApi');
const statistics = new Statistics(newsData, keywordContainer, total, notifications, keyword, monthContainer, weekContainer);

statistics.loading();