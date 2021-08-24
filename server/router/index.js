const express = require('express');
const router = express.Router();
const employee = require('../controllers/employees.controllers');

router.get('/', (req, res) => {
  res.send('Welcome to node');
});

router.get('/employees', employee.getAllEmployees);
router.post('/employees', employee.createEmployee);
router.delete('/employees', employee.deleteEmployee);
router.put('/employees', employee.updateEmployee);

module.exports = router;