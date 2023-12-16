import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const User = (props) => {
    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState();
    const navigate = useNavigate();
    const clickUser = (user, index) => {
        props.setUser(user);
        if (index !== undefined) {
            
            navigate(`/${index}`)
        } else {
            navigate('/pay')
        }
    }
    const deleteUser = () => {
        const updatedUser = [...props.users]
        updatedUser.splice(selectedUser,1)
        props.setUsers(updatedUser)
        setShow(false)
    }
    return (
        <>
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you wanna delete user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => deleteUser()}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='d-flex justify-content-center'>
                <Button className='position-absolute' style={{ "top": "10px", "right": "10px" }} onClick={() => navigate("/create")}>Create User</Button>
                <div className='d-flex gap-3 flex-wrap my-3 justify-content-center'>
                    {props.users.length <= 0 ? <p className='mt-2'>No Users</p> : props.users.map((user, index) => <div className='border p-3 border-primary rounded d-flex align-items-center flex-column' style={{width: "16rem"}} key={index} >
                        <p className='text-capitalize mb-2'>Name: {user.firstName} {user.lastName}</p>
                        <p className='mb-2'>DOB: {user.dob}</p>
                        <p>Email: {user.email}</p>
                        <div className='d-flex gap-3'>
                            <Button className='btn-info' onClick={() => clickUser(user, index)}>Edit</Button>
                            <Button className='btn-warning' onClick={() => clickUser(user)}>Pay</Button>
                            <Button className='btn-danger' onClick={() => { setSelectedUser(index); setShow(true) }}>Delete</Button>
                        </div>
                    </div>)}
                </div>
            </div>
        </>
    )
}

export default User