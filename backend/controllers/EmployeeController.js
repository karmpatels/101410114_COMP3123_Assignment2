const Employee = require('../models/EmployeeModel');

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employees', error });
  }
};

// Get an employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error });
  }
};

// Search employees by keyword
exports.searchEmployees = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ message: 'Search query is required' });

  try {
    const results = await Employee.find({ $text: { $search: query } });
    if (results.length === 0) return res.status(404).json({ message: 'No matching employees found' });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error searching employees', error });
  }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee_id: employee._id });
  } catch (error) {
    res.status(400).json({ message: 'Error creating employee', error });
  }
};

// Update employee details
exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee details updated successfully', employee: updatedEmployee });
  } catch (error) {
    res.status(400).json({ message: 'Error updating employee', error });
  }
};// Search employees by keyword (Case-Insensitive)
exports.searchEmployees = async (req, res) => {
  const { department, position } = req.query;

  if (!department && !position) {
    return res.status(400).json({ message: 'At least one search parameter (department or position) is required' });
  }

  // Create the query object
  let query = {};

  if (department) {
    query.department = { $regex: department, $options: 'i' }; // Case-insensitive search for department
  }

  if (position) {
    query.position = { $regex: position, $options: 'i' }; // Case-insensitive search for position
  }

  try {
    const results = await Employee.find(query);

    if (results.length === 0) {
      return res.status(404).json({ message: 'No matching employees found' });
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error searching employees', error });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.eid); // Use req.params.eid to get the ID
    if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
};
