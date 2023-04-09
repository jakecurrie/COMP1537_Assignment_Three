const app = require('./app.js');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

main().catch((err) => console.log(err));

async function main() {
  // Change the connection string to point to the 'unicorns' database instead of the default one
  await mongoose.connect('mongodb+srv://jakecurrie:MwvSjEvN3BcCNnYJ@cluster0.7yaerw4.mongodb.net/unicorns?retryWrites=true&w=majority');

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}
