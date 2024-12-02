const express = require('express');
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees
} = require('../controllers/EmployeeController');
const router = express.Router();

// Middleware to handle async errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes
router.get('/employees', asyncHandler(getEmployees)); // Get all employees
router.get('/employees/search', asyncHandler(searchEmployees)); // Search employees by query

router.get('/employees/:eid', asyncHandler(getEmployeeById)); // Get employee by ID
router.post('/employees', asyncHandler(createEmployee)); // Create a new employee
router.put('/employees/:eid', asyncHandler(updateEmployee)); // Update an employee by ID
router.delete('/employees/:eid', asyncHandler(deleteEmployee)); // Delete an employee by ID

module.exports = router;