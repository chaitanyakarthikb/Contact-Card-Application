import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <header>
      <div className='left'>
        <h1>CK Contact Application</h1>
      </div>

      <div className='right'>
        <Link to={"/login"}>
          <span>Login</span>
        </Link>

        <Link to={"/signup"}>
          <span>Signup</span>
        </Link>
      </div>

    </header>
  )
}

export default Header
