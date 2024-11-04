import { NavLink } from "react-router-dom";

const ToolBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className=" container row">
          <div className="nav-item col-5 ms-5 ps-5">
            <h2>
              <NavLink className="nav-link" to="/">
                Calorie tracker
              </NavLink>
            </h2>
          </div>
          <button className="btn btn-primary bg-white col-2 text-black">
            <NavLink className="nav-link" to="/newMeal">
              Add new meal
            </NavLink>
          </button>
        </div>
      </nav>
    </>
  );
};

export default ToolBar;
