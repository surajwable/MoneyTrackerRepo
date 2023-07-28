import { React, useEffect, useState } from "react";
import { Button, Form, Input, message, Table, Select } from "antd";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/transactions.css";
import AddEditTransaction from "../components/AddEditTransaction";
import Spinner from "../components/Spinner";
import axios from "axios";
import moment from "moment";
import { DatePicker, Space } from "antd";
import { AreaChartOutlined, UnorderedListOutlined } from "@ant-design/icons";
import Analatics from "../components/Analatics";
const { RangePicker } = DatePicker;

function Home() {
  const [showAddEditTransactionModal, setshowAddEditTransactionModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [selectedRange, setSelectedRange] = useState([]);
  const [viewType,setViewType] = useState('table');

  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("moneytracker-user"));
      setLoading(true);
      const response = await axios.post(
        "/api/transactions/get-all-transactions",
        {
          userId: user._id,
          frequency,
          ...(frequency === "custom" && { selectedRange }),
          type,
        }
      );

      console.log(response.data);
      setTransactionsData(response.data);
      console.log("data from transactionData  " + transactionsData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h6>Select Frequency</h6>
            <Select className="mr-3" value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>

            {frequency === "custom" && (
              <div className="mt-2">
                <RangePicker
                  value={selectedRange}
                  onChange={(values) => setSelectedRange(values)}
                />
              </div>
            )}
          </div>

          <div className="d-flex flex-column max-5">
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>
        </div>

        <div className="d-flex">
          <div>
            <div className="view-switch mx-5">
              <UnorderedListOutlined
                className={`mx-3 ${
                  viewType === "table" ? "active-icon" : "inactive-icon"
                }`}
                size={30}
                onClick={()=>setViewType('table')}
              />
              <AreaChartOutlined 
              className={`${
                viewType === "analytics" ? "active-icon" : "inactive-icon"
              }`}
              size={30}
              onClick={()=>setViewType('analytics')}
              />

            </div>
          </div>
          <button
            className="primary"
            onClick={() => setshowAddEditTransactionModal(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>

      <div className="table-analtics">
          {viewType==='table' ? <div className="table">
          <Table columns={columns} dataSource={transactionsData} />
        </div> : <Analatics transactions={transactionsData}/>}        
      </div>

      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setshowAddEditTransactionModal={setshowAddEditTransactionModal}
          getTransactions={getTransactions}
        />
      )}
    </DefaultLayout>
  );
}

export default Home;
