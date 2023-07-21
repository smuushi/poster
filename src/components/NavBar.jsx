
import { NavLink } from "react-router-dom";

function NavBar() {

    return (
      <div className="loggedin-nav-box">
  
  
        <div className="links-nav">
          {/* <NavLink onClick={handleClick} to="/" isActive={() => location.pathname === "/"}>
            Home
          </NavLink> */}
          <NavLink to="/generate">Generate</NavLink>

          {/* <NavLink to="/history">History</NavLink> */}
        </div>

      </div>
    );
  }
  
  export default NavBar;