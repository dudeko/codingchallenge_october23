const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');

const search_history_model = require('./search_history_model')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});
app.use(cors())

app.get('/', cors(), async (req, res) => {
  try {
    const response = await search_history_model.getAllSearchHistory()
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }


})

app.post('/searchHistory', cors(), (req, res) => {
  search_history_model.createSearchHistory(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.delete('/searchHistory', (req, res) => {
  search_history_model.deleteAllSearchHistory()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      console.error(error)
      res.status(500).send(error);
    })
})
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})