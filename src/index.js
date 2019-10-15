const express = require('express');

const server = express();

let projects = [];
let requests_count = 0;

server.use(express.json());

function checkProjectId (req, res, next) {
  const { id } = req.params;

  const project = projects.find(project => project.id === id);

  if(!project) {
    return res.status(400).json({ error: `Project with id ${id} does not exist`});
  }

  req.project = project;

  return next();
}

function LogRequestCount (req, res, next) {
  console.log(`Request count: ${++requests_count}`);
  return next();
}

server.use(LogRequestCount);

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

server.put('/projects/:id', checkProjectId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { project } = req;

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', checkProjectId, (req, res) => {
  const { id } = req.params;

  projects = projects.filter(project => project.id !== id);

  return res.json({ ok: true });
});

server.post('/projects/:id/tasks', checkProjectId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const { project } = req;

  project.tasks.push(title);

  return res.json(project);
})

server.listen(3333);