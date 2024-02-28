import React, { useState, useEffect } from 'react';
import './index.css'; 

function Pagination() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setEmployees(data);
      setLoading(false);
    } catch (error) {
      alert('Failed to fetch data');
    }
  };

  const indexOfLastEmployee = currentPage * 10;
  const indexOfFirstEmployee = indexOfLastEmployee - 10;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const nextPage = () => {
    if (currentPage < Math.ceil(employees.length / 10)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Employee Data Table</h1>
      <div className="table-container">
        <table className="full-width">
          <thead>
            <tr>
              <th className="green">ID</th>
              <th className="green">Name</th>
              <th className="green">Email</th>
              <th className="green">Role</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-buttons">
        <button className="green" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <button className="green" disabled>{currentPage}</button>
        <button className="green" onClick={nextPage} disabled={currentPage === Math.ceil(employees.length / 10)}>Next</button>
      </div>
    </div>
  );
}

export default Pagination;
