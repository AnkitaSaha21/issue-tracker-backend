const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'open', enum: ['open', 'in-progress', 'resolved'] },
    priority: { type: String, default: 'medium', enum: ['low', 'medium', 'high'] },
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    attachments: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Issue', issueSchema);
