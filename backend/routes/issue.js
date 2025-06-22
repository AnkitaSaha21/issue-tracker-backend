const express = require('express')
const { createIssue, getIssues, updateIssue, deleteIssue, getIssuesByProjectId } = require('../controllers/issueController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()
const upload = require('../middlewares/upload');
const checkRole = require('../middlewares/checkRole');

router.post(
    '/',
    authMiddleware,
    upload.array('attachments'),
    createIssue
  );
router.get('/', authMiddleware,getIssues)
router.put(
    '/:id',
    authMiddleware,
    upload.array('attachments'),
    updateIssue
  );
  
router.delete('/:id',authMiddleware,deleteIssue)


module.exports = router
