import React from 'react'

const SearchData = ({ data, setFriends, amount, setAmount, handlePayment }) => {
  return (
    <ul>

      {data.map(({ _id, name, amount: amt, hidden}) => (
      

        <li key={_id}>
      <div>
        <span>{name}</span>
        <div className='side'>
          <span style={{backgroundColor: amt > 0 ? 'lightgreen' :  amt < 0 ? 'red' : 'gray'}}>{amt > 0 && '+'}{amt}</span>
          <p className='icon' onClick={() => setFriends((friends) => friends.map((f) => f._id == _id ? {...f, hidden: !hidden} : f))} style={{ transform: `rotate(${hidden ? '270deg' : '90deg' })`}}>&lt;</p>
        </div>
      </div>
        <hr />
      <div style={{ display: hidden ? 'none' : 'flex'}}>
        <input type="number" placeholder='enter amount' onChange={(e) => setAmount(Number(e.target.value))} value={amount} />
        <div>
          <button onClick={() => handlePayment(_id, name, 'pay')}>pay</button> 
          <button onClick={() => handlePayment(_id, name, 'receive')}>Recieve</button>
        </div>
      </div>
    </li>
    ))
  }
  </ul>
  )
}

export default SearchData