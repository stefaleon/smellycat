const fs = require('fs');

fs.copyFile('./docs/index.html', './docs/404.html', (err) => {
  if (err) throw err;
  console.log('index.html copied to 404.html');
});