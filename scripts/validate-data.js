const dataFiles = [
  "./data/restaurant-profile.json",
  "./data/content-calendar.json",
  "./data/hiring-roles.json",
  "./data/faq.json"
];

for (const filePath of dataFiles) {
  require(filePath);
  console.log(`OK ${filePath}`);
}

console.log("Papai data validation passed.");
