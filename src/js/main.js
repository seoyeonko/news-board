import { createSipinner } from './spinners.js';

function createTopNewsElement(article) {
  const { title, summary, link, thumbnailImage } = article;

  const anchor = document.createElement('a');
  anchor.setAttribute('href', link);
  anchor.innerHTML = `
    <article class="news">
      <div class="information">
        <h3 class="title">${title}</h3>
        <p class="description">${summary}</p>
      </div>
      <div class="thumbnail-area">
        <img src="${thumbnailImage}" alt="thumbnail" class="thumbnail" />
      </div>
    </article>`;

  return anchor;
}

function createLatestNewsElement(article) {
  const { title, link } = article;

  const listItem = document.createElement('li');
  const anchor = document.createElement('a');
  anchor.setAttribute('href', link);
  anchor.textContent = title;
  listItem.className = 'latest-news-item';
  listItem.append(anchor);

  return listItem;
}

function hideSpinner(parent) {
  const spinnerArea = parent.querySelector('.spinner-area');
  spinnerArea.style.display = 'none';
}

function renderTopNews() {
  const articleSection = document.getElementById('topNewsList');
  createSipinner(articleSection);

  setTimeout(() => {
    fetch('./data/top.json')
      .then((res) => res.json()) // res.body는 stream 형태로 바로 사용 불가 -> res.json()으로 json 변환 필요
      .then((data) => {
        const { articles } = data;
        const articleList = articles.map((article) =>
          createTopNewsElement(article)
        );

        articleSection.append(...articleList);
      })
      .finally(() => hideSpinner(articleSection));
  }, 1500);
}

function renderLatestNews() {
  const latestNewsList = document.querySelector('.lastest-news-list');
  createSipinner(latestNewsList);

  setTimeout(() => {
    fetch('./data/latest.json')
      .then((res) => res.json())
      .then((data) => {
        const { articles } = data;
        const articleList = articles.map((article) =>
          createLatestNewsElement(article)
        );

        latestNewsList.append(...articleList);
      })
      .finally(() => hideSpinner(latestNewsList));
  }, 1500);
}

// DOMContentLoaded 이벤트
// 브라우저가 HTML을 모두 파싱하여 DOM 트리를 발생하는 즉시 발생
// img, css 리소스가 로드되지 않더라도 DOM 트리 완성시 발생함
// 데이터 조회는 DOM 트리만 완성되면 시작해도 되기 때문
// nor, 모든 리소스 로드한 후 코드 실행하고 싶다면 load 이벤트
document.addEventListener('DOMContentLoaded', () => {
  renderTopNews();
  renderLatestNews();
});
