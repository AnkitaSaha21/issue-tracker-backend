const Project = require("../models/Project");

exports.createProject = async (req, res) => {
    try {
      const issueData = {
        ...req.body,
        createdBy: req.user.id // comes from authMiddleware
      };
      const project = await Project.create(issueData);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.getProjects = async (req, res) => {
    try {
      const { id, role } = req.user; // id and role from authMiddleware
  
      let filter = {};
  
      if (role !== 'admin') {
        // User is not admin → restrict
        filter = {
          $or: [
            { projectManager: id },
            { projectTeam: id }
          ]
        };
      }
  
      const projects = await Project.find(filter)
        .populate('projectManager projectTeam createdBy')
        .sort('-createdAt'); // optional sort
  
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(project)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id)
        if (!project) return res.status(404).json({ message: 'Project not found' })
        res.status(200).json({ message: 'Project deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('projectManager projectTeam createdBy')
        if (!project) return res.status(404).json({ message: 'Project not found' })
        res.status(200).json(project)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
