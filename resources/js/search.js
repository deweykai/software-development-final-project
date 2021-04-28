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
    .then(show => renderShow((show && show.show) || null))
    .catch(console.log);
}

let tvTitle;

function renderShow(show) {
  if (!show) {
    document.querySelector('#title').innerHTML = 'NOT FOUND';
    document.querySelector('#poster-img').src = '';
    document.querySelector('#summary').innerHTML = '-';
    document.querySelector('#rating').innerHTML = '-';
    document.querySelector('#modalButton').disabled = true;
    hideView(false);
    return;
  }
  tvTitle = show.name;
  document.querySelector('#poster-img').src = show.image.original || '';
  document.querySelector('#title').innerHTML = show.name || '-';
  document.querySelector('#summary').innerHTML = show.summary || '-';
  document.querySelector('#rating').innerHTML = show.rating.average || '-';
  if (show.genres.length === 0) {
    show.genres.push('-');
  }
  document.querySelector('#genres').innerHTML = show.genres;
  document.querySelector("#modalButton").disabled = false;
  hideView(false);
}

function hideView(hidden) {
  const ele = document.querySelector('#tv_detail');

  ele.hidden = hidden;
}

const reviewModal = new bootstrap.Modal(document.querySelector('#reviewModal'));

function showReviewModal() {
  document.querySelector('#modalTitle').innerHTML = `Review ${tvTitle}`;
  document.querySelector('#title_input').value = tvTitle;
  document.querySelector('#review_input').value = '';
  document.querySelector("#submitReviewButton").disabled = true;
  reviewModal.show();
}

function checkReview() {
  const review = document.querySelector('#review_input').value;
  console.log(review);
  if (review === '') {
    document.querySelector("#submitReviewButton").disabled = true;
  } else {
    document.querySelector("#submitReviewButton").disabled = false;
  }
}

function addReview(e) {
  e.preventDefault();

  const title = tvTitle;
  const review = document.querySelector('#review_input').value;
  submitReview(title, review);
  reviewModal.hide();
}

function submitReview(title, review) {
  fetch('api/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tv_show: title,
      review: review,
    }),
  }).then(() => window.location.replace('reviews'));
}