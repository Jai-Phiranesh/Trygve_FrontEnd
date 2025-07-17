import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './Pages/Onboarding';
import './App.css'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
      </Routes>
    </Router>
  )
}

export default App
