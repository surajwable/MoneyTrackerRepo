import React from "react";
import "../resources/analatics.css";
import { Progress } from "antd";

function Analatics({ transactions }) {
  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomeTransactionsPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpenseTransactionsPercentage =
    (totalExpenseTransactions.length / totalTransactions) * 100;

  //finding turnover using javascript reduce function to calculate sum of elements of array

  const totalTurnover = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  ); //0 is initial value

  const totalIncomeTurnover = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0); //if type = income then calculate

  const totalExpenseTurnover = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / totalTurnover) * 100;

  const totalExpenseTurnoverPercentage =
    (totalExpenseTurnover / totalTurnover) * 100;

  const categories = [
    "salary",
    "freelance",
    "investment",
    "charity",
    "food",
    "rent",
    "maintenance",
    "entertainment",
    "travel",
    "education",
    "medical",
    "tax",
  ];

  return (
    <div className="analytics">
      <div className="row">
        <div className="col-md-4 md-3 mt-3">
          <div className="transactions-count">
            <h4>Total transactions : {totalTransactions}</h4>
            <br />
            <h5>Income : {totalIncomeTransactions.length}</h5>
            <h5>Expense : {totalExpenseTransactions.length}</h5>

            <div className="progress-bars">
              <Progress
                className="mx-5"
                strokeColor="green"
                type="circle"
                percent={totalIncomeTransactionsPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="red"
                type="circle"
                percent={totalExpenseTransactionsPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>

        <div className="col-md-4 md-3 mt-3">
          <div className="transactions-count">
            <h4>Total Turnover : {totalTurnover}</h4>
            <br />
            <h5>Income : {totalIncomeTurnover}</h5>
            <h5>Expense : {totalExpenseTurnover}</h5>

            <div className="progress-bars">
              <Progress
                className="mx-5"
                strokeColor="green"
                type="circle"
                percent={totalIncomeTurnoverPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="red"
                type="circle"
                percent={totalExpenseTurnoverPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
  <div className="col-md-6">
    <div className="income-category-analysis">
      <h3>Income Category-Wise</h3>

      {categories.map((category) => {
        const amount = transactions
          .filter((t) => t.type === "income" && t.category === category)
          .reduce((acc, t) => acc + t.amount, 0);
        return (
          <div className="category-card">
            <h5>{category}</h5>
            <Progress
              percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
            />
          </div>
        );
      })}
    </div>
  </div>
</div>
    </div>
  );
}

export default Analatics;
