import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

const Transactions = () => {
  const [history, setHistory] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pageNo, setPageNo] = useState(1);

  const limit = 5;

  useEffect(() => {
    let myID = localStorage.getItem('myID');
    console.log(offset)
    fetch(`https://mybank-d04s.onrender.com/contacts/history/${myID}?offset=${offset}&limit=${limit}`)
    .then((res) => res.json())
    .then(data => {
      setHistory(data.history)
    })
  }, [offset, limit]);


  return (
    <div>
      <header>
        Transactions
        <Link to="/">Home</Link>
      </header>

      <main id="transaction-main">

        <ul>
          {
            history.map(({ _id, name, amount, date }) => (
              <li key={_id}>
                <div>
                  <p>{name}</p>
                  <p>{date.split('T')[0]}</p>
                </div>
                <div style={{color: amount > 0 ? 'green' :  'red'}}>
                  {amount}
                </div>
              </li>
            ))
          }
        </ul>

      </main>
    <footer>
      <button disabled={pageNo == 1} onClick={() => {
        setOffset(prev => prev-limit)
        setPageNo(prev => prev-1)
      }}>&lt;</button>
      <span>{pageNo}</span>
      <button disabled={history.length < limit} onClick={() => {
        setOffset(prev => prev+limit)
        setPageNo(prev => prev+1)
      }}>&gt;</button>
    </footer>
    </div>
  )
}

export default Transactions