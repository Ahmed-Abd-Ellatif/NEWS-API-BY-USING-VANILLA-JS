var allData = [];
var category = 'general';
getData(category);

var links = document.querySelectorAll('.nav-link');

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function (e) {
    category = e.target.text;
    getData(category);
  });
}

function getData(category) {
  var httpReq = new XMLHttpRequest();
  httpReq.open(
    'GET',
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=131ed15b89f3490d802075a3e317cc78`
  );
  httpReq.send();
  httpReq.onreadystatechange = function () {
    if (httpReq.readyState == 4 && httpReq.status == 200) {
      allData = JSON.parse(httpReq.response).articles;
      displayData();
    }
  };
}
function displayData() {
  var temp = ``;
  for (var i = 0; i < allData.length; i++) {
    temp += `
      <div class="col-md-3 mb-3 shadow">
      <div class="card" >
        <img src="${allData[i].urlToImage}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h3 class="card-title">${allData[i].title}</h3>
          <p class="card-text">
          ${allData[i].description}
          </p>
          <a href="${allData[i].url}" class="btn btn-dark">Read More...</a>
        </div>
      </div>
    </div>
      `;
  }
  document.getElementById('content').innerHTML = temp;
}
