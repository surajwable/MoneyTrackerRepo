import { React, useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/transactions.css";
import AddEditTransaction from "../components/AddEditTransaction";
import Spinner from "../components/Spinner";

function Home() {
  const [showAddEditTransactionModal, setshowAddEditTransactionModal] =
    useState(false);
    const [loading,setLoading] = useState(false)

    const getTransactions=()=>{

    }

    useEffect(()=>{
      getTransactions();
    },[])

  return (
    <DefaultLayout>
      {loading && <Spinner/>}
      <div className="filter d-flex justify-content-between align-items-center">
        <div></div>

        <div>
          <button
            className="primary"
            onClick={() => setshowAddEditTransactionModal(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>

      <div className="table-analytics"></div>

      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setshowAddEditTransactionModal={setshowAddEditTransactionModal}
        />
      )}
    </DefaultLayout>
  );
}

export default Home;
