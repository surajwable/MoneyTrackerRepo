import React, { useEffect, useState } from "react";
import { Input, Modal, Form, message, Select } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AddEditTransaction({
  setshowAddEditTransactionModal,
  showAddEditTransactionModal,
  getTransactions,
}) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("moneytracker-user"));
      setLoading(true);
      await axios.post("/api/transactions/add-transaction", {
        ...values,
        userId: user._id,
      });
      getTransactions();
      message.success("Transaction Successful");
      setshowAddEditTransactionModal(false);
      setLoading(false);
    } catch (error) {
      message.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add transaction"
      open={showAddEditTransactionModal}
      onCancel={() => setshowAddEditTransactionModal(false)}
      footer={false}
    >
      <Form layout="vertical" className="transaction-form" onFinish={onFinish}>
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
            <Select.Option value="charity">Charity</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="rent">Rent</Select.Option>
            <Select.Option value="maintenance">Maintenance</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="travel">Travel</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="medical">Medical</Select.Option>
            <Select.Option value="tax">Tax</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Reference" name="reference">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>

        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditTransaction;
