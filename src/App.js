import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './screens/login';
import Dashboard from './screens/dashboard';
import { useSelector } from 'react-redux'

function App() {
  const data = useSelector((state) => state.users)
  return (
    <div>
      {data.isLoading && <div className='loader-component'>
        <div className="loader"></div>
      </div>}
      {data.error && <div className='error-message'>{data.errorMessage}</div>}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
export default App;

