import React from 'react';
import { Form } from 'antd';
import { Link } from "react-router-dom";
function Register() {


    const onFinish = (values) => {
        console.log(values)
    }
    return (
        <div className='h-screen d-flex justify-content-center align-items-center'>
            <div className='w-400 card p-3'>
                <h1 className='text-lg'> ANI-BUS - Register</h1>
                <hr />
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Name' name='Name'>
                        <input type="text" />
                    </Form.Item>
                    <Form.Item label='Email' name='email'>
                        <input type="text" />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <input type="password" />
                    </Form.Item>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Link to="/login">Click Here to Login</Link>
                        <button className='secondary-btn' type='submit'>Register</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register