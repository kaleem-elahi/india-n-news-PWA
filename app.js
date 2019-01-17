const apiKey = 'a7e0f9bd71f34a17b47a10a1f13571fc';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector')
const defaultSource = 'the-washington-post';

window.addEventListener('load', async e => {
  _updateNews();
  await _updateSources();
  sourceSelector.value = defaultSource;

  sourceSelector.addEventListener('change', e => {
    _updateNews(e.target.value);
  });


  if('serviceWorker' in navigator) {
    try {
      navigator.serviceWorker.register('sw.js');
      console.log('SW registered ');
    } catch {
      console.log('SW Failed ');
    }
  }
});


async function _updateSources() {
  const res = await fetch(`https://newsapi.org/v1/sources`);
  const json = await res.json();

  sourceSelector.innerHTML = json.sources.map(src => `
  <option value="${src.id}">${src.name}</option>`).join('\n');
}

async function _updateNews(source = defaultSource) {
  const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`);
  const json = await res.json();

  console.log(json);
  main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
  return `
        <div class="">
        <a class="portfolio-item d-block mx-auto" href="${article.url}"><h2>${article.title}</h2>
          <div class="portfolio-item-caption d-flex position-absolute h-100 w-100">
            <div class="portfolio-item-caption-content my-auto w-100 text-center text-white">
              <i class="fas fa-search-plus fa-3x"></i>
              <p>${article.description}</p>
            </div>
          </div>
          <img class="img-fluid" src="${article.urlToImage}" alt=""/>
        </a>
      </div>
  `;
}


