import React from 'react'
import { Form } from 'antd'
function Register() {
    return (
        <div className='h-screen d-flex justify-content-center align-items-center'>
            <div className='w-400 card p-3'>
                <h1 className='text-lg'> ANI-BUS - Register</h1>
                <hr />
                <Form layout='vertical'>
                    <Form.Item label='Name'>
                        <input type="text" />
                    </Form.Item>
                    <Form.Item label='Email'>
                        <input type="text" />
                    </Form.Item>
                    <Form.Item label='Password'>
                        <input type="text" />
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Register