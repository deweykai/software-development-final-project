function search(e) {
  e.preventDefault();
  const tv_show = e.target[0].value;
  loadShow(tv_show);
}

function loadShow(tv_show) {
  hideView(true);
  fetch(`http://api.tvmaze.com/search/shows?q=${tv_show}`)
    .then(data => data.json())
    .then(data => data[0])
    .then(show => renderShow(show.show))
    .catch(console.log);
}

function renderShow(show) {
  console.log(show);
  document.querySelector('#poster-img').src = show.image.original || '-';
  document.querySelector('#title').innerHTML = show.name || '-';
  document.querySelector('#summary').innerHTML = show.summary || '-';
  document.querySelector('#rating').innerHTML = show.rating.average || '-';
  if (show.genres.length === 0) {
    show.genres.push('-');
  }
  document.querySelector('#genres').innerHTML = show.genres;
  hideView(false);
}

function hideView(hidden) {
  const ele = document.querySelector('#tv_detail');

  ele.hidden = hidden;
}