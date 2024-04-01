import React, {useState, useEffect} from 'react';
import Chart from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

function Population() {

  const [populationData, setPopulationData] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
      const data = await response.json();
    //   console.log("Hel", data.data[0].Year)
      setPopulationData(data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching population data:', error);
      setLoading(false)
    }
  }

  return (
    <div className='bg-heavy-metal rounded-md w-1/2 p-4 h-500'>
    {!loading ? <Line
       data={{
        labels: populationData.map((data) => data.Year),
        datasets: [
            {
              label: "Population",
              data: populationData.map((data) => data.Population),
              backgroundColor: "#2ab42a",
              borderColor: "#2ab42a",
            },
    ]
       }}
       options={{
        scales: {
            x: {
              grid: {
                color: '#393939', // Color of the x-axis grid lines
              },
            },
            y: {
              grid: {
                color: '#393939', // Color of the y-axis grid lines
              },
            },
          },
       }}
      /> : <div>loading...</div>}
    </div>
  )
}

export default Population