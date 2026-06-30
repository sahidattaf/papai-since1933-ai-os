const path = require('path');

const dataFiles = [
  'data/restaurant-profile.json',
  'data/content-calendar.json',
  'data/hiring-roles.json',
  'data/faq.json'
];

for (const relativePath of dataFiles) {
  const filePath = path.join(__dirname, '..', relativePath);
  require(filePath);
  console.log(`OK ${relativePath}`);
}

console.log('Papai data validation passed.');
