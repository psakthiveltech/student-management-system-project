
import './App.css'
import StudentForm from './studentManagementSystem/StudentForm'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import EditStudent from './studentManagementSystem/EditStudent'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<StudentForm/>} />
      <Route path="/edit/:id" element={<EditStudent/>} />
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
