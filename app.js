const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

const unicornModel = require('./models/unicorns.js');

app.post('/search', async (req, res) => {
  let selectionArgument = {};
  let projectionArgument = {};

  // Search logic
  if (req.body.type === 'nameSearch') {
    if (req.body.name) {
      selectionArgument = { name: req.body.name };
    }
  } else if (req.body.type === 'weightSearch') {
    const minWeight = parseInt(req.body.minWeight);
    const maxWeight = parseInt(req.body.maxWeight);

    if (req.body.minWeight && req.body.maxWeight) {
      selectionArgument = {
        weight: {
          $gte: minWeight,
          $lte: maxWeight,
        },
      };
    } else if (req.body.minWeight) {
      selectionArgument = { weight: { $gte: minWeight } };
    } else if (req.body.maxWeight) {
      selectionArgument = { weight: { $lte: maxWeight } };
    }
  } else if (req.body.type === 'foodSearch') {
    if (req.body.loves.length === 2) {
      selectionArgument = { loves: { $all: req.body.loves } };
    } else if (req.body.loves) {
      selectionArgument = { loves: req.body.loves };
    }
  }

  // Filter logic
  if (req.body.projectionFilters) {
    projectionArgument = req.body.projectionFilters;
  }

  // Execute the query
  const result = await unicornModel.find(selectionArgument, projectionArgument);
  res.json(result);
});

module.exports = app;
