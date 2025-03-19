import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      className="bg-primary py-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-accent text-2xl font-bold">
            Car Tournament
          </Link>
          <div className="flex space-x-6">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/standings">Standings</NavLink>
            <NavLink to="/tournaments">Tournaments</NavLink>
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/customization">Customize</NavLink>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link 
    to={to}
    className="text-white hover:text-accent transition-colors duration-200"
  >
    {children}
  </Link>
);

export default Navbar;