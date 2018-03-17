import  React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
            {" | "}
            <Link to="/about" activeClassName="active">About</Link>
            {" | "}
            <Link to="/signup" className="signup-header">Sign Up</Link>
        </nav>
    );
};
export default Header;