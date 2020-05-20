const express = require('express');
// Route info can be found in /data/helpers
// Data structure of into located in /data/lambda.db3
const actionData = require('../data/helpers/actionModel');
const router = express.Router();


// GET actions with .get()
//test works? yes
router.get('/', validateActionParams, (req, res) => {
    actionData
        .get()
        .then(projects => res.status(200).json(projects))
        .catch(() => res.status(500).json({ message: 'The actions could not be retrieved from the database.'}));
});


// GET actions by id with .get(id)
// test works? yes
router.get('/:id', validateActionParams, (req, res) => {
    const { id } = req.params
    actionData.get(id)
        .then(action =>  {
            if(action.id > 0) res.status(200).json(action)
            else res.status(400).json({ message: 'The project id is invalid.'}) 
        .catch(() => res.status(404).json({ message: 'Actions could not be retrieved.'}))
        })
})


// POST actions with .insert()
// almost works
router.post('/', validateActionParams, (req, res) => {
    const newAction = req.body;
    if (newAction. === '') {
        res.status(400).json({ message: 'Please provide a description of the action.'})
} else {
    actionData.insert(newAction)
        .then(action => res.status(200).json(action))
        .catch(() => res.status(500).json({ message: 'Could not post the action to the database.'}));
    // }
});


// PUT actions by id
// test works? yes
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    if (changes.description) {
        actionData.update(id, changes)
            .then(updatedAction => res.status(200).json(updatedAction))
            .catch(() => res.status(500).json({ message: 'The action information could not be modified.'}))
    } else res.status(400).json({message: 'Please modify the action description to update.'});
})


// DELETE actions by id
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


// Middleware project verify
function validateActionParams(req, res,next){
    const actionPostData = req.body;
    if(actionPostData.description === ''){
        res.status(400).json({message:"The project needs a name and description."})
    }else{
        next();
    }
}


module.exports = router;