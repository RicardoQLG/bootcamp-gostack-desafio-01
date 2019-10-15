const express = require('express');

const server = express();

const projects = [];

server.use(express.json());

server.post('/projects', (req, res) => {
  const { id } = req.body;
  const useExists = projects.filter(project => {
    return project.id === id
  });

  if (useExists.length) {
    return res.status(401).json({error: 'Project id already exists'})
  }

  const project = req.body;
  project.tasks = [];

  projects.push(project);

  return res.json(req.body);
});

server.listen(3333);