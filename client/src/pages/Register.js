import {React,useEffect, useState} from "react";
import { Button, Form, Input, message } from "antd";
import { Link ,useNavigate} from "react-router-dom";
import lottie from "lottie-web";
import "../resources/authentication.css";
import axios from 'axios';
import Spinner from '../components/Spinner';

function Register() {
  const navigate = useNavigate();
  const[loading,setLoading] = useState(false)

  const onFinish = async(values) => {
    try{
      setLoading(true)
      await axios.post('/api/users/register', values)
      message.success('Registration Successful')
      navigate('/login')
      setLoading(false)
    }catch(error){
      message.error('Something went wrong')
      setLoading(false)
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
          <div className="lottie">
            <lottie-player
              src="https://lottie.host/9cf5f4bf-41b0-4470-acdd-66348dec012f/qpBGCvibVk.json"
              background="#2f495d"
              speed="1"
              direction="-1"
              mode="bounce"
              loop
              autoplay
              hover
            ></lottie-player>
          </div>
        </div>

        <div className="col-md-5">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>MoneyTracker / REGISTER</h1>
            <br />
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input type="password"/>
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already registered? Click here to login</Link>
              <Button className="primary" htmlType="submit">
                REGISTER
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
