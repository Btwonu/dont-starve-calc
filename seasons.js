'use strict';

// Declarations
const app = document.getElementById('app');
const calculateBtn = document.getElementById('calculate');
const daysInput = document.getElementById('days-input');
// const outputField = document.getElementById('outputField');
// const fullMoonOutput = document.getElementById('full-moon');
// const newMoonOutput = document.getElementById('new-moon');

// Event listener
calculateBtn.addEventListener('click', render);

// Function Declarations
function determineSeason(day) {
  const seasons = {
    autumn: range(20, 1),
    winter: range(15, 21),
    spring: range(20, 36),
    summer: range(15, 56),
  };

  if (!isNaN(Number(day))) {
    day = Number(day);
  }

  let subDay = day;
  while (subDay > 70) {
    subDay -= 70;
  }

  let seasonKeys = Object.keys(seasons);

  let output = '';

  seasonKeys.forEach((season, index) => {
    if (seasons[season].includes(subDay)) {
      let seasonDaysArr = seasons[season];
      let daysInto = seasonDaysArr.indexOf(subDay) + 1;
      let nextSeason = seasonKeys[index + 1] || seasonKeys[0];
      let daysLeft = seasons[season].length - daysInto;
      let nextSeasonDay = day + daysLeft;

      //Output
      output = `
      <section class="info section-season">
        <header class="section-title">
          <div class="icon icon-sun"></div>
          <h2>Day ${day}</h2>
        </header>
        <ul>
          <li>You're <strong>${daysInto}</strong> day/s into <strong>${season}</strong></li>
          <li>There are <strong>${daysLeft}</strong> days left in the season</li>
          <li>Next season is <strong>${nextSeason}</strong>
            and it starts at day <strong>${nextSeasonDay}</strong></li>
        </ul>
      </section>
      `;
    }
  });

  return output;
}

function range(size, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

function fullMoon(day) {
  let nextMoon = 11;

  while (nextMoon < day) {
    nextMoon += 20;
  }

  if (nextMoon == day) {
    return 'The full moon is <strong>TONIGHT!</strong>';
  }

  return `The next full moon is going to be on day <strong>${nextMoon}</strong>.`;
}

function newMoon(day) {
  let nextMoon = 1;

  while (nextMoon < day) {
    nextMoon += 20;
  }

  if (nextMoon == day) {
    return 'The new moon is <strong>TONIGHT!</strong>';
  }

  return `The next new moon is going to be on day <strong>${nextMoon}</strong>.`;
}

function determineMoons(day) {
  return `
  <section class="info section-moon">
    <header class="section-title">
      <div class="icon icon-moon"></div>
      <h2>Moon Cycle</h2>
    </header>
    <ul>
      <li>${fullMoon(day)}</li>
      <li>${newMoon(day)}</li>
    </ul>
  </section>
  `;
}

function render() {
  app.innerHTML = determineSeason(daysInput.value);
  app.innerHTML += determineMoons(daysInput.value);
}
