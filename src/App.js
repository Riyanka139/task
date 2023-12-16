import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateUser from './component/CreateUser';
import User from './component/User';
import { useState } from 'react';
import Payment from './component/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51ONqRcSHnHxVT03XwPPoUxMrUFsy4nx2LGn74IN6lQfg5nBkFkbA9llSQqAYPNd6WEMdsO0p0ktSSfEER7YNZB3A009YyKjRDk');

function App() {
  const initial = { firstName: '', lastName: '', email: '', dob: '' }
  const [users,setUsers] = useState([]);
  const [user, setUser] = useState(initial);

  const submit = (user,id) => {
    setUser(initial)
    if (id !== undefined) {
      setUsers((old) => {
        old[id] = user;
        return old;
      })
    } else {
      
      setUsers((old) => [...old,user])
    }
  }



  return (
    <div className='app '>
      <div className='box position-relative overflow-auto'>
      <Elements stripe={stripePromise} >

      <BrowserRouter basename='/'>
      <Routes>
          <Route path="/" element={<User users={users} setUser={setUser} setUsers={setUsers} />} /> 
            <Route path="/create" element={<CreateUser user={user} setUser={setUser} submit={submit} />} /> 
              <Route path="/pay" element={<Payment user={user} />}/>
            <Route path="/:id" element={<CreateUser user={user} setUser={setUser} submit={submit} />} /> 
      </Routes>
          </BrowserRouter>
          </Elements>
      </div>
    </div>
  );
}

export default App;
