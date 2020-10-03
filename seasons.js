'use strict';

//Declarations
const calculateBtn = document.getElementById('calculate');
const daysInput = document.getElementById('daysInput');
const outputField = document.getElementById('outputField');

//Event listener
calculateBtn.addEventListener('click', function () {
  outputField.textContent = determineSeason(daysInput.value);
});

//Function Declarations
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
      output = `Day ${day}. You're ${daysInto} day/s into ${season}. There are ${daysLeft} days left in the season. The next one is ${nextSeason} and starts at day ${nextSeasonDay}`;

      if (daysLeft === 0) {
        output = `Day ${day}. You're ${daysInto} day/s into ${season}. This is the last day of the season. The next one is ${nextSeason} and starts tomorrow.`;
      }
    }
  });

  return output;
}

function range(size, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}
