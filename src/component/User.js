import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const User = (props) => {
    const navigate = useNavigate();
    const clickUser = (user) => {
        props.setUser(user);
        navigate('/create')
    }
    const deleteUser = (user) => {
        const updatedUser = props.users.filter(u => user.firstName !== u.firstName)
        props.setUsers(updatedUser)
    }
  return (
      <div className='d-flex justify-content-center'>
          <Button className='position-absolute' style={{ "top": "10px", "right": "10px" }} onClick={() => navigate("/create")}>Create User</Button>
          <div className='d-flex gap-3 flex-wrap my-3'>
          {props.users.length <= 0 ? <p className='mt-2'>No Users</p> : props.users.map((user, index) => <div className='border p-2 border-primary rounded' key={index} >
              <p className='text-capitalize mb-2'>Name: {user.firstName} {user.lastName}</p>
              <p>dob: {user.dob}</p>
              <p>Email: {user.email}</p>
              <div className='d-flex gap-3'>
                  <Button onClick={() => clickUser(user)}>Edit</Button>
                  <Button onClick={() => deleteUser(user)}>Delete</Button>
              </div>
          </div>)} 
          </div>
    </div>
  )
}

export default User