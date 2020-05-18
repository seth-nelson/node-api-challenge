const express = require('express');
// Route info can be found in /data/helpers
// Data structure of into located in /data/lambda.db3
const actionData = require('../data/helpers/actionModel');
const router = express.Router();


router.get('/', (req, res) => {
    actionData
        .get()
        .then(projects => res.status(200).json(projects))
        .catch(() => res.status(500).json({ message: 'The actions could not be retrieved from the database.'}));
});

// test works? yes
router.get('/:id', (req, res) => {
    const { id } = req.params
    actionData.get(id)
        .then(action =>  {
            if(action.id > 0) res.status(200).json(action)
            else res.status(400).json({ message: 'The project id could not be retrieved from the database.'}) 
        .catch(() => res.status(404).json({ message: 'Actions could not be retrieved.'}))
        })
})

// almost works
router.post('/', (req, res) => {
    const newAction = req.body;
    if (newAction.description === '') {
        res.status(400).json({ message: 'Please provide a description of the action.'})
} else {
    actionData.insert(newAction)
        .then(action => res.status(200).json(action))
        .catch(() => res.status(500).json({ message: 'Could not post the action to the database.'}));
    }
});

// test works? yes
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    if (changes.description) {
        actionData.update(id, changes)
            .then(updatedAction => res.status(200).json(updatedAction))
            .catch(() => res.status(500).json({ message: 'The action information could not be modified.'}))
    } else res.status(400).json({message: 'Please modify name or description to update'});
})

// test works? yes
router.delete('/:id', (req, res) => {
    const { id } = req.params
    actionData.remove(id)
    .then(deleted => {
        if(deleted) res.status(200).json({ message: 'The action has been deleted.'})
        else res.status(404).json({ message: 'The action with this id does not exist'})
    })
    .catch(() => res.status(500).json({ message: 'The action could not be deleted.'}))
});


module.exports = router;