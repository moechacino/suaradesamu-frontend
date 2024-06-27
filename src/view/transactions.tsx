import { useState, useEffect } from "preact/hooks";
import axios, { AxiosError } from "axios";

import { Transaction, VotedEvent } from "../types/Transaction";
import {
  API_TRANSACTIONS,
  API_TRANSACTIONS_VOTED,
  API_VOTING_GET_STATUS,
} from "../env";

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [votedEvents, setVotedEvents] = useState<VotedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [doesVotingRun, setDoesVotingRun] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsResponse, votedEventsResponse] = await Promise.all([
          axios.get(API_TRANSACTIONS, {
            headers: {
              "ngrok-skip-browser-warning": true,
            },
          }),
          axios.get(API_TRANSACTIONS_VOTED, {
            headers: {
              "ngrok-skip-browser-warning": true,
            },
          }),
        ]);

        setTransactions(transactionsResponse.data.data);
        setVotedEvents(votedEventsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchVotingStatus = async () => {
      try {
        const response = await axios.get(API_VOTING_GET_STATUS, {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });
        const data = response.data.data;
        const votingStatus = data.votingStatus;
        setDoesVotingRun(votingStatus);
      } catch (error: any) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.error);
        } else {
          alert(error.message);
        }
      }
    };
    // Fetch data initially
    fetchVotingStatus();
    if (!doesVotingRun) {
      fetchData();
    }

    // Fetch data every 5 seconds
    const interval = setInterval(() => {
      fetchVotingStatus();
      if (!doesVotingRun) {
        fetchData();
      }
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ backgroundColor: "#ECF8F7", minHeight: "100vh" }}>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#ECF8F7", minHeight: "100vh" }}>
      <section className="pb-5 d-flex justify-content-center align-items-center">
        <div
          className="card shadow-none mt-5"
          style={{ backgroundColor: "#ECF8F7", width: "90%" }}
        >
          <div className="row px-2 py-3">
            <div className="col-md-6">
              <div
                className="card shadow-none mt-1 text-center"
                style={{ backgroundColor: "#ECF8F7", width: "100%" }}
              >
                <h1>TRANSACTIONS</h1>
                <div className="list-group">
                  {doesVotingRun
                    ? "Pemilihan Sedang Dilakukan. Tidak Bisa Menampilkan Data Transaksi"
                    : transactions.map((transaction, index) => (
                        <div
                          key={index}
                          className={`list-group-item ${
                            index % 2 === 0 ? "bg-white" : "bg-custom"
                          }`}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "white" : "#00a58e",
                            color: index % 2 === 0 ? "black" : "white",
                          }}
                        >
                          <h5>Block Number {transaction.blockNumber}</h5>
                          <p>
                            <strong>From:</strong> {transaction.from}
                          </p>
                          <p>
                            <strong>To:</strong> {transaction.to}
                          </p>
                          <p>
                            <strong>Value:</strong> {transaction.value}
                          </p>
                          <p>
                            <strong>Gas:</strong> {transaction.gas}
                          </p>
                          <p>
                            <strong>Gas Price:</strong> {transaction.gasPrice}
                          </p>
                          <p>
                            <strong>Input:</strong>{" "}
                            {JSON.stringify(transaction.input)}
                          </p>
                          <p>
                            <strong>Contract Address:</strong>{" "}
                            {transaction.contractAddress}
                          </p>
                          <p>
                            <strong>Cumulative Gas Used:</strong>{" "}
                            {transaction.cumulativeGasUsed}
                          </p>
                          <p>
                            <strong>Gas Used:</strong> {transaction.gasUsed}
                          </p>
                        </div>
                      ))}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="card shadow-none mt-1 text-center"
                style={{ backgroundColor: "#ECF8F7", width: "100%" }}
              >
                <h1>VOTED EVENTS</h1>
                <div className="list-group">
                  {doesVotingRun
                    ? "Pemilihan Sedang Dilakukan. Tidak Dapat Menampilkan Data Pemilihan"
                    : votedEvents.map((event, index) => (
                        <div
                          key={index}
                          className={`list-group-item ${
                            index % 2 === 0 ? "bg-white" : "bg-custom"
                          }`}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "white" : "#00a58e",
                            color: index % 2 === 0 ? "black" : "white",
                          }}
                        >
                          <h5>BlockNumber {event.blockNumber}</h5>
                          <p>
                            <strong>Contract Name:</strong> {event.contractName}
                          </p>
                          <p>
                            <strong>Contract Address:</strong>{" "}
                            {event.contractAddress}
                          </p>
                          <p>
                            <strong>Signature:</strong> {event.signature}
                          </p>
                          <p>
                            <strong>Transaction Hash:</strong> {event.txHash}
                          </p>
                          <p>
                            <strong>Log Index:</strong> {event.logIndex}
                          </p>
                          <p>
                            <strong>Voter:</strong> {event.returnValues.voter}
                          </p>
                          <p>
                            <strong>Candidate ID:</strong>{" "}
                            {event.returnValues.candidateId}
                          </p>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transactions;
