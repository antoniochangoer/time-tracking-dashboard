const dashboard = document.querySelector('.dashboard');
const buttons = document.querySelectorAll('button');

function handleClick(e) {
  toggleActive(e.currentTarget);

  let stat = e.currentTarget.dataset.stat;
  fetchData(stat);
}

function toggleActive(el) {
  buttons.forEach((btn) => btn.classList.remove('active'));
  el.classList.add('active');
}

function renderDashboard(data, stat) {
  data.forEach((data) => {
    const cardElement = `
              <div class="dashboard__tile tile--${data.title.toLowerCase()}">
              <div class="dashboard__tile-content">
                  <div class="row">
                  <p class="dashboard__category">${data.title}</p>
                  <img
                      src="./images/icon-ellipsis.svg"
                      alt="three dots"
                      class="dashboard__elipses"
                  />
                  </div>
                  <div class="row">
                  <h2 class="h2" data-current>${
                    data.timeframes[stat].current
                  }</h2>
                  <span class="sub sub-clr-light" data-previous
                      >Last Week - ${data.timeframes[stat].previous}hrs</span
                  >
                  </div>
              </div>
              </div>
        `;
    dashboard.insertAdjacentHTML('beforeend', cardElement);
  });
}

async function fetchData(stat) {
  try {
    const res = await fetch('./data.json');
    const data = await res.json();
    renderDashboard(data, stat);
  } catch (error) {
    console.log(error);
  }
}

buttons.forEach((btn) => {
  btn.addEventListener('click', handleClick);
});

// On window load fire initial call to load dom otherwise it would only have one tile
window.onload = () => {
  document.querySelector('[data-stat="daily"]').click();
};
