import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function CreateUser(props) {
    const {user,setUser} = props
    const [error, setError] = useState('');
  const navigate = useNavigate();


    const onChange = (e) => {
        setUser((old) => ({...old,[e.target.name]: e.target.value}))
    }

    const submit = () => {
        if (user.firstName.trim().length <= 0) {
            setError("Please Enter First Name");
            return;
        }
        if (user.lastName.trim().length <= 0) {
            setError("Please Enter Last Name");
            return;
        }
        if (user.email.trim().length <= 0) {
            setError("Please Enter Email");
            return;
        }
        if (user.dob.trim().length <= 0) {
            setError("Please Enter Date of Birth");
            return;
        }
        props.submit(user);
        navigate("/")
    }
    return (
        <Form>
            {error && <p className='text-danger'>{error }</p>}
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter First Name" name="firstName" onChange={onChange} value={user.firstName} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter Last Name" name="lastName" onChange={onChange} value={user.lastName} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" placeholder='Enter Your Email' name="email" onChange={onChange} value={user.email} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label>DOB</Form.Label>
                        <Form.Control required type="date" name="dob" onChange={onChange} value={user.dob} />
                    </Form.Group>
                </Col>
            </Row>
            <Button type="button" variant="success" onClick={() => submit()}>Submit</Button>
        </Form>
    )
}

export default CreateUser