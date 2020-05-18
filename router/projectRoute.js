const express = require('express');
// Route info can be found in /data/helpers
// Data structure of into located in /data/lambda.db3
const projectData = require('../data/helpers/projectModel');
const router = express.Router();

// GET projects
// test passes? yes
router.get('/', (req, res) => {
    projectData
        .get()
        .then(projects => res.status(200).json(projects))
        .catch(() => res.status(500).json({ message: 'The projects could not be retrieved from the database.'}));
});

//GET projects by id
// test passes? yes, sort of
router.get('/:id', (req, res) => {
    const { id } = req.params
    projectData.get(id)
        .then(project =>  {
            if(project.id > 0) res.status(200).json(project)
            else res.status(400).json({ message: 'The project id could not be retrieved from the database.'}) 
        .catch(() => res.status(404).json({ message: 'Projects could not be retrieved from the'}))
        })
})

// POST a project
// test passes? yes
router.post('/', (req, res) => {
    const newProject = req.body;
    if (newProject.name === '' || newProject.description === '') {
        res.status(400).json({ messgae: 'Please provide a name and description of the project.'})
} else {
    projectData.insert(newProject)
        .then(project => res.status(200).json(project))
        .catch(() => res.status(500).json({ message: 'Could not post project to database'}));
    }
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    if (changes.name || changes.description) {
        projectData.update(id, changes)
            .then(updatedProject => res.status(200).json(updatedProject))
            .catch(() => res.status(500).json({ message: 'The project information could not be modified.'}))
    } else res.status(400).json({message: 'Please modify name or description to update'});
})


router.delete('/:id', (req, res) => {
    const { id } = req.params
    projectData.remove(id)
    .then(deleted => {
        if(deleted) res.status(200).json({ message: 'The project has been deleted.'})
        else res.status(404).json({ message: 'The project with this id does not exist'})
    })
    .catch(() => res.status(500).json({ message: 'The project could not be deleted.'}))
});


module.exports = router;