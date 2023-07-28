import Teams from './Teams'
import TeamMembers from './TeamMembers'

const Employees = ({ employees, selectedTeam, handleEmployeeCardClick, handleTeamSelectionChange }) => {
  // Here the props are passed from the app.js file and destructed here by using the {} sign and now we can use this variables/functions normally.

  return (
    <main className="container">
      <div className="row justify-content-center mt-3 mb-3 ">
        <div className="col-6">
          <Teams selectedTeam={selectedTeam} handleTeamSelectionChange={handleTeamSelectionChange} />
        </div>
      </div>
      <div className="row justify-content-center mt-3 mb-3 ">
        <div className="col-8">
          <div className="card-collection">
              <TeamMembers employees ={employees} selectedTeam = {selectedTeam} handleEmployeeCardClick ={handleEmployeeCardClick} />
          </div>
          </div>
      </div>
    </main>
  );
}

export default Employees