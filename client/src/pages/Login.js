import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import "../resources/authentication.css";
import axios from 'axios';
import Spinner from "../components/Spinner";



function Login() {
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try{
      setLoading(true)
      const response = await axios.post('/api/users/login', values)
      localStorage.setItem('moneytracker-user',JSON.stringify({...response.data, password:''}))
      setLoading(false)
      message.success('Login Successful')
      navigate('/')
    }catch(error){
      setLoading(false);
      message.error('Login failed');
    }
};

  useEffect(()=>{
    if(localStorage.getItem('moneytracker-user')){
      navigate("/")
    }
  },[]);

  return (
    <div className="register">
      {loading && <Spinner/>}
      <div className="row justify-content-center align-items-center w-100 h-100">
       
      <div className="col-md-5">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>MoneyTracker / LOGIN</h1>
            <br />
            
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input type="password"/>
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already registered? Click here to login</Link>
              <Button className="primary" htmlType="submit">
                LOGIN
              </Button>
            </div>
          </Form>
        </div>
        
        <div className="col-md-5">
          <div className="lottie">
            <lottie-player
              src="https://lottie.host/9cf5f4bf-41b0-4470-acdd-66348dec012f/qpBGCvibVk.json"
              background="#2f495d" speed="1" direction="-1" mode="bounce" loop autoplay hover ></lottie-player>
          </div>
        </div>

       
      </div>
    </div>
  );
}

export default Login;
