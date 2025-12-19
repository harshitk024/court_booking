import {BrowserRouter,Routes,Route} from "react-router-dom"
import BookingHistoryPage from './pages/BookingHistoryPage'
import BookingPage from './pages/BookingPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<BookingPage/>} />
        <Route path = "/history" element = {<BookingHistoryPage/>} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
