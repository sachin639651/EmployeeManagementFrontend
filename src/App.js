import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import Header from './components/header';
import Employee from './components/employee';
import Createemployee from './components/createemployee';
import Updateemployee from './components/updateemployee';

function App() {
 
  return (
    <>
 

    <Router>
   <Header></Header>
 
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/create" element={<Createemployee />} />
        <Route path="/update/:id" element={<Updateemployee />} />

      </Routes>
    </Router>
    </>
  );
}

export default App;
