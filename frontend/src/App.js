import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import EmployeeListPage from './components/EmployeeListPage';
import EmployeeDetailsPage from './components/EmployeeDetailsPage';
import UpdateEmployeePage from './components/UpdateEmployeePage';
import AddEmployeePage from './components/AddEmployeePage';
import SearchEmployeePage from './components/SearchEmployeePage'; // Import SearchEmployeePage

const App = () => {
  return (
    <Router>
      <div>
        <h1>Employee Handling App</h1>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/employees" element={<EmployeeListPage />} />
          <Route path="/employees/:eid" element={<EmployeeDetailsPage />} />
          <Route path="/employees/update/:eid" element={<UpdateEmployeePage />} />
          <Route path="/employees/add" element={<AddEmployeePage />} />
          <Route path="/employees/search" element={<SearchEmployeePage />} /> {/* New route for Search Employee */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
