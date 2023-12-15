import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateUser from './component/CreateUser';
import User from './component/User';
import { useState } from 'react';
import Payment from './component/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

function App() {
  const [users,setUsers] = useState([]);
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', dob: '' });

  const submit = (user) => {
    setUsers((old) => [...old,user])
  }

const stripePromise = loadStripe('{{test_key}}');
const options = {
  // passing the client secret obtained from the server
  clientSecret: '{{CLIENT_SECRET}}',
};

  return (
    <div className='app '>
      <div className='box position-relative'>
      <Elements stripe={stripePromise} options={options} >

      <BrowserRouter basename='/'>
      <Routes>
          <Route path="/" element={<User users={users} setUser={setUser} setUsers={setUsers} />} /> 
            <Route path="/create" element={<CreateUser user={user} setUser={setUser} submit={submit} />} /> 
            <Route path="/pay" element={<Payment/>}/>
      </Routes>
          </BrowserRouter>
          </Elements>
      </div>
    </div>
  );
}

export default App;
