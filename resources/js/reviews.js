let reviews = [];
let filter = '';

function loadAll() {
  fetch('/api/review')
    .then(data => data.json())
    .then(data => reviews = data)
    .then(renderReviews);
}

function buildReviewRow(name, review, date) {
  let row = document.createElement('tr');

  [name, review, date].forEach(value => {
    let col = document.createElement('td');
    col.innerHTML = value;
    row.appendChild(col);
  });

  return row;
}

function setFilter(e) {
  e.preventDefault();
  filter = e.target[0].value;
  renderReviews();
}

function renderReviews() {
  let list = document.querySelector('#reviewList');
  list.innerHTML = '';

  let filteredReviews = reviews.filter(review => review.tv_show === filter);
  console.log(filteredReviews);
  if (filteredReviews.length === 0) {
    filteredReviews = reviews;
  }

  filteredReviews.forEach(review => {
    list.appendChild(buildReviewRow(review.tv_show, review.review, review.review_date));
  });
}

loadAll();