import React, {useState, useEffect} from 'react'

function CryptoCurrency() {

  const [currency, setCurrency] = useState();
  const [loading, setLoading] = useState(true)   

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
      const data = await response.json();
    //   console.log("Hel", data.bpi)
      setCurrency(data.bpi)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching population data:', error);
      setLoading(false)
    }
  }

  return (
    <div className='mt-4 text-white w-3/4'>
      <h1>Bitcoin Prices</h1>
      {!loading ? <ul className='flex mt-4 justify-between'>
        {Object.values(currency).map(data => (
          <li key={data.code} className='bg-heavy-metal p-4 rounded-md flex flex-col items-center justify-center space-y-2'>
            <p>{data.description}</p>
            <span>{data.rate}</span>
          </li>
        ))}
      </ul> : <div>loading...</div>}
    </div>
  )
}

export default CryptoCurrency