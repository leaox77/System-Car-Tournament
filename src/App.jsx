import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import Standings from './pages/Standings';
import Tournaments from './pages/Tournaments';
import Gallery from './pages/Gallery';
import Customization from './pages/Customization';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-dark">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/customization" element={<Customization />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;