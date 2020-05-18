const express = require('express');
// Route info can be found in /data/helpers
// Data structure of into located in /data/lambda.db3
const projectData = require('../data/helpers/projectModel');
const router = express.Router();


router.get('/', (req, res) => {
    projectData
        .get()
        .then(projects => res.status(200).json(projects))
        .catch(() => res.status(500).json({ message: 'The projects could not be retrieved from the database.'}));
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    projectData.get(id)
        .then(project =>  {
            if(project.length > 0) res.status(200).json(project)
            else res.status(400).json({ message: 'The project id could not be retrieved from the database.'}) 
        .catch(() => res.status(404).json({ message: 'Projects could not be retrieved from the'}))
        })
})


router.post('/', (req, res) => {
    
})


router.put('/:id', (req, res) => {
    
})


router.delete('/:id', (req, res) => {
    
})


module.exports = router;