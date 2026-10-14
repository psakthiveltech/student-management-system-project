import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Dashboard from "./pages/Dashboard"
import StudentsPage from "./pages/StudentsPage"
import ParentsPage from "./pages/ParentsPage"
import CoursePage from "./pages/CoursePage"
import SubjectPage from "./pages/SubjectPage"
import MarksPage from "./pages/MarksPage"


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
      <Route path="/subject" element={<SubjectPage/>}/>
      <Route path="/mark" element={<MarksPage/>}/>

    </Routes>
    
    </BrowserRouter>
      </>
  )
}

export default App