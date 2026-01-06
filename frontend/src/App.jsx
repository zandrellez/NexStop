import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './SignIn' 
import WaitingScreen from './WaitingScreen' 
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/waiting" element={<WaitingScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App