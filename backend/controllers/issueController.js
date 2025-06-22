const Issue = require('../models/Issue')

exports.createIssue = async (req, res) => {
    try {
      const filePaths = req.files ? req.files.map(file => file.path) : [];
      const issueData = {
        ...req.body,
        reporter: req.user.id,
        attachments: filePaths
      };
      const issue = await Issue.create(issueData);
      res.status(201).json(issue);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  

// controllers/issueController.js
// controllers/issueController.js
exports.getIssues = async (req, res) => {
    try {
      const { project, status, priority, search, sort, page = 1, limit = 10 } = req.query;
  
      const filter = {};
      console.log(search)
      if (project) filter.project = project;
      if (status) filter.status = status;
      if (priority) filter.priority = priority;
      if (search) filter.title = { $regex: search, $options: 'i' }; // title search
  
      const skip = (parseInt(page) - 1) * parseInt(limit);
  
      // sort can be like "createdAt,-priority"
      const sortBy = sort ? sort.split(',').join(' ') : '-createdAt';
  
      const [issues, total] = await Promise.all([
        Issue.find(filter)
          .populate('reporter assignee project')
          .sort(sortBy)
          .skip(skip)
          .limit(parseInt(limit)),
        Issue.countDocuments(filter)
      ]);
  
      res.status(200).json({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
        issues
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  

exports.updateIssue = async (req, res) => {
    try {
      const filePaths = req.files ? req.files.map(file => file.path) : [];
      const issue = await Issue.findByIdAndUpdate(
        req.params.id,
        { ...req.body, $push: { attachments: { $each: filePaths } } },
        { new: true }
      );
      res.status(200).json(issue);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

exports.deleteIssue = async (req, res) => {
    try {
        const issue = await Issue.findByIdAndDelete(req.params.id)
        if (!issue) return res.status(404).json({ message: 'Issue not found' })
        res.status(200).json({ message: 'Issue deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


  
