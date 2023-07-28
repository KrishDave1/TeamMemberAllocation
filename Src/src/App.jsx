import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Employees from './Employees';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GroupedTeamMembers from './GroupedTeamMembers';
import Nav from './Nav';
import NotFound from './NotFound';

function App() {
  const [selectedTeam, setTeam] = useState(JSON.parse(localStorage.getItem('selectedTeam')) || "TeamB");
  // Here we use || as a conditional operator and if first is true it will execute without the second expression,thereby we created a if else condition with a logical operator.THis is called short circuit evaluation.
  const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem('employeeList')) || [
    // employees take the first value of all objects and setEmployees take the second value.Here useState is a hook and is used to avoid class structure.

    {
      id: 1,
      fullName: "Bob Jones",
      designation: "JavaScript Developer",
      gender: "male",
      teamName: "TeamA"
    },
    {
      id: 2,
      fullName: "Jill Bailey",
      designation: "Node Developer",
      gender: "female",
      teamName: "TeamA"
    },
    {
      id: 3,
      fullName: "Gail Shepherd",
      designation: "Java Developer",
      gender: "female",
      teamName: "TeamA"
    },
    {
      id: 4,
      fullName: "Sam Reynolds",
      designation: "React Developer",
      gender: "male",
      teamName: "TeamB"
    },
    {
      id: 5,
      fullName: "David Henry",
      designation: "DotNet Developer",
      gender: "male",
      teamName: "TeamB"
    },
    {
      id: 6,
      fullName: "Sarah Blake",
      designation: "SQL Server DBA",
      gender: "female",
      teamName: "TeamB"
    },
    {
      id: 7,
      fullName: "James Bennet",
      designation: "Angular Developer",
      gender: "male",
      teamName: "TeamC"
    },
    {
      id: 8,
      fullName: "Jessica Faye",
      designation: "API Developer",
      gender: "female",
      teamName: "TeamC"
    },
    {
      id: 9,
      fullName: "Lita Stone",
      designation: "C++ Developer",
      gender: "female",
      teamName: "TeamC"
    },
    {
      id: 10,
      fullName: "Daniel Young",
      designation: "Python Developer",
      gender: "male",
      teamName: "TeamD"
    },
    {
      id: 11,
      fullName: "Adrian Jacobs",
      designation: "Vue Developer",
      gender: "male",
      teamName: "TeamD"
    },
    {
      id: 12,
      fullName: "Devin Monroe",
      designation: "Graphic Designer",
      gender: "male",
      teamName: "TeamD"
    }]);

  // Local storage is useful for various purposes, such as caching user preferences, saving user settings, or preserving the state of the application across sessions.The useEffect hook is used to store the employees and selectedTeam data in local storage whenever these values change.
  useEffect(() => {

    localStorage.setItem('employeeList', JSON.stringify(employees));

  }, [employees]);

  useEffect(() => {

    localStorage.setItem('selectedTeam', JSON.stringify(selectedTeam));

  }, [selectedTeam]);
  // useEffect needs 2 arguments,one is the setup function and 2nd is the object/array which we want the function to work

  function handleTeamSelectionChange(event) {
    console.log(event.target.value);
    setTeam(event.target.value);
  }

  function handleEmployeeCardClick(event) {
    const transformedEmployees = employees.map((employee) => employee.id === parseInt(event.currentTarget.id) ? (employee.teamName === selectedTeam) ? { ...employee, teamName: '' } : { ...employee, teamName: selectedTeam } : employee);
    setEmployees(transformedEmployees);
  }
  return (
    <div>
      <Router>
        <Nav />
        <Header selectedTeam={selectedTeam}
          teamMemberCount={employees.filter((employee) => employee.teamName === selectedTeam).length} />
        <Routes>
          {/*  Each component that we want to navigate to will have its own route element./ */}
          <Route path="/" element={
            /* Here '/' means by default when one renders this page the employees component will open */
            <Employees employees={employees}
              selectedTeam={selectedTeam}
              handleEmployeeCardClick={handleEmployeeCardClick}
              handleTeamSelectionChange={handleTeamSelectionChange}
            // Here the props are passed in the employees file by the app file.
            />}>
          </Route>
          <Route path="/GroupedTeamMembers" element={<GroupedTeamMembers
            employees={employees}
            selectedTeam={selectedTeam}
            setTeam={setTeam} />}>
          </Route>
          <Route path="*" element={<NotFound />}>
            {/* the asterisk '*' in the path prop is used as a wildcard, representing a catch-all route. It is used to match any URL path that does not match any of the specific routes defined in other <Route> components. */}
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
