import React from "react";
import "../resources/default-layout.css";
import { Button, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("moneytracker-user"));
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: (
        <li onClick={()=>{
            localStorage.removeItem('moneytracker-user')
            navigate('/login');
        }}>Logout</li>
      ),
    },
  ];

  return (
    <div>
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">MoneyTracker</h1>
        </div>
        <div>
          <Dropdown menu={{ items }} placement="bottomLeft">
            <Button className="primary">{user.name}</Button>
          </Dropdown>
        </div>
      </div>

      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
