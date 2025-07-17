import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './Pages/Onboarding';
import HomePage from './Pages/Home';
import './App.css'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/home-Page" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
