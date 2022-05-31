import { useState } from "react";
import { ethers } from "ethers";
import { FaSpinner } from "react-icons/fa";

function PaymentModal(props) {
  let [amount, setAmount] = useState(1);
  let [loading, setLoading] = useState();

  const PRECISION = 10 ** 18;

  // sets the modalShow state to false to disable rendering of modal
  function closeModal() {
    props.setModalShow(false);
  }

  // set the value of input element to state variable upon change
  function handleChange(e) {
    setAmount(e.target.value);
  }

  // call function in the smart contract to send MATIC token
  // to fund the project
  async function sendFund() {
    console.log("Sending fund...");
    if (amount <= 0) {
      alert("Amount is less than or equal to 0");
      return;
    }
    try {
      let fund = { value: ethers.utils.parseEther(amount.toString()) };
      let txn = await props.contract.fundProject(props.index, fund);
      setLoading(true);
      await txn.wait();
      setLoading(false);
      alert(`${amount} MATIC Succesfully funded`);
      setAmount(1);
      closeModal();
    } catch (error) {
      console.log("Funding error: ");
      console.log(error);
      console.log("................");
      alert("Error Sending MATIC, Try again");
    }
  }

  return (
    <div className="modal">
      <div className="modalHeader">
        <h1>
          Payment{" "}
          <span className="closeBtn" onClick={() => closeModal()}>
            &times;
          </span>
        </h1>
      </div>
      <div className="modalContent">
        <div className="paymentForm">
          <label className="paymentLabel">Amount (MATIC)</label>
          <input
            type="number"
            name="payment"
            id="payment"
            className="payment"
            placeholder="Enter MATIC amount"
            min="1"
            step="1"
            value={amount}
            onChange={handleChange}
            required
          />
          <button
            className="submit"
            disabled={loading}
            onClick={() => sendFund()}
          >
            {loading ? (
              <FaSpinner icon="spinner" className="spinner" />
            ) : (
              "Fund"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
