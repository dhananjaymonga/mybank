import React, { useState, useEffect, useContext } from 'react'
import SearchData from './SearchData'
import { Link, useNavigate } from 'react-router-dom'


const App = () => {

  const [newFriend, setNewFriend] = useState('')
  const [myAmount, setMyAmount] = useState({
    pay: 0,
    receive: 0
  })
  const [searchFriends, setSearchFriends] = useState([])
  const [amount, setAmount] = useState('')
  const [friends, setFriends] = useState([])
  const [query, setQuery] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://mybank-d04s.onrender.com/users/check', {
      credentials: 'include'
    })
    .then((res) => {
      if(!res.ok) {
        navigate('/login')
      }
    })
    .catch(err => {
      console.log(err)
      navigate('/login')
    })
  }, [])

  
  useEffect(() => {
    let val = query.trim().toLowerCase();
    setSearchFriends(friends.filter(f => f.name.includes(val)))
    console.log(searchFriends)
  }, [query])

  useEffect(() => {
    fetch('https://mybank-d04s.onrender.com/contacts', { credentials: 'include' })
    .then(res => res.json())
    .then(data => {
      setFriends(data.map(c => ({ ...c, hidden: true })));
      let p = 0, r = 0;
      data.forEach(f => {
        if(f.amount < 0) {
          p += f.amount;
        }
        else {
          r += f.amount;
        }
      })

      setMyAmount({ pay: p, receive: r });
    })
    .catch(err => console.log('err', err))
  }, [])

  const handlePayment =  async (id, name, decision) => {
    if(amount > 0) {
      // setFriends(friends.map((f, idx) => i == idx ? {...f, money: decision == 'r' ? f.money + amount : f.money-amount} : f))

      try {
        const res = await fetch(`https://mybank-d04s.onrender.com/contacts/payment/${decision}/${id}?amount=${amount}&name=${name}`, {
          credentials: 'include'
        });

        if(res.ok) {
          let p = 0, r = 0;
          setFriends(friends.map(f => {
            if(f._id == id) {
              let curr_a =  decision == 'pay' ? f.amount-Number(amount) : f.amount+Number(amount);
              if(curr_a < 0) {
                p += curr_a;
              } 
              else {
                r += curr_a;
              }
            } else {
              if(f.amount < 0) {
                p += f.amount;
              }
              else {
                r += f.amount;
              }
            }
            return f._id == id ? { ...f, amount: decision == 'pay' ? f.amount-Number(amount) : f.amount+Number(amount)} : f
        }))

        setMyAmount({ pay: p, receive: r });
        }
        else {
          alert('could not' +  decision);
        }
      }
      catch(err) {
        alert('internal server error while ' +  decision);
        console.log(err)
      }
    }
    else if(amount < 0) {
      alert('please enter a valid amount');
    }
      
    setAmount('')
  }

  const handleLogout = async () => {
    try {

      const res = await fetch('https://mybank-d04s.onrender.com/users/logout', {
        credentials: "include"
      });
      if(res.ok) {
        navigate('/login');
      }
      else {
        alert('there is some internal issue at our backend')
      }
    }
    catch(err) {
      console.log(err)
      alert('there is some internal issue at our backend')
    }
  }

  const createContact = () => {
    if(newFriend.trim() == '') {
      alert('please enter a valid name')
      return;
    }
    
    fetch('https://mybank-d04s.onrender.com/contacts', {
      method: 'POST',
      body: JSON.stringify({name: newFriend}),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      setFriends([ ...friends, {...data, hidden: true }])
      setNewFriend('')
    })
    .catch(err => console.log('something went wrong', err))
    
  }

  return (
    <>
      <header>
        <span>Pay: {myAmount.pay}</span>
        <span></span>
        <span>Recieve: {myAmount.receive}</span>
      </header>

      <main>

        <section>
          <div>
            <input type="text" placeholder='add person' onChange={(e) => setNewFriend(e.target.value)} value={newFriend} />
            <button onClick={createContact}>Add</button>
          </div>

          <div>
            <input type="text" placeholder='search user' onChange={(e) => {setQuery(e.target.value)}} />
          </div>
        </section>

        <hr />

        <section>
        {
          <SearchData 
            data={query.trim() != '' ? searchFriends : friends}
            setFriends={setFriends}
            amount={amount}
            setAmount={setAmount}
            handlePayment={handlePayment}
          />
        }
        </section>
      </main>
      <footer>
        <Link to="/history">Transactions</Link>
        <button style={{marginLeft: '30px'}} onClick={handleLogout}>Logout</button>
      </footer>
    </>
  )
}

export default App