import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Dashboard from "./pages/Dashboard"
import StudentsPage from "./pages/StudentsPage"
import ParentsPage from "./pages/ParentsPage"
import CoursePage from "./pages/CoursePage"


function App() {

  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/student' element={<StudentsPage/>}/>
      <Route path='/parents' element={<ParentsPage/>}/>
      <Route path='/course' element={<CoursePage/>}/>

    </Routes>
    
    </BrowserRouter>
      </>
  )
}

export default App