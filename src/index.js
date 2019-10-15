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
    return res.status(400).json({error: "Project id already exists"})
  }

  const project = req.body;
  project.tasks = [];

  projects.push(project);

  return res.json(req.body);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const [project] = projects.filter(project => project.id === id);

  if(!project) {
    res.status(400).json({ error: `Project with id ${id} does not exist`});
  }

  project.title = title;

  return res.json(project);
});

server.listen(3333);