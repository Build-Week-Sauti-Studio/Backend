const router = require('express').Router();

const Inputs = require('./inputs-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  Inputs.find()
  .then(inputs => {
    res.json(inputs);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get inputs' });
  });
});

router.get('/:id', restricted,(req, res) => {
  const { id } = req.params;

  Inputs.findById(id)
  .then(inputs => {
    if (inputs) {
      res.json(inputs);
    } else {
      res.status(404).json({ message: 'Could not find inputs with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get inputs' });
  });
});

router.post('/', restricted,(req, res) => {
  const schemeData = req.body;

  Inputs.add(schemeData)
  .then(inputs => {
    res.status(201).json(inputs);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new inputs' });
  });
});

router.post('/:id', restricted, (req, res) => {
  const stepData = req.body;
  const { id } = req.params;

  Inputs.findById(id)
  .then(inputs => {
    if (inputs) {
      Inputs.addStep(stepData, id)
      .then(step => {
        res.status(201).json(step);
      })
    } else {
      res.status(404).json({ message: 'Could not find inputs with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new step' });
  });
});

router.put('/:id', restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Inputs.findById(id)
  .then(inputs => {
    if (inputs) {
      Inputs.update(changes, id)
      .then(updatedScheme => {
        res.json({message: "Its been updated...", updatedScheme});
      });
    } else {
      res.status(404).json({ message: 'Could not find inputs with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update inputs' });
  });
});

router.delete('/:id', restricted, (req, res) => {
  const { id } = req.params;

  Inputs.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find inputs with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete inputs' });
  });
});

module.exports = router;
