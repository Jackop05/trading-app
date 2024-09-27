import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const MainCrypto = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [dailyData, setDailyData] = useState({});

  // Function to calculate Unix timestamps
  const getUnixTimestamps = (daysAgo) => {
    const now = Date.now(); // Current timestamp in milliseconds
    const past = now - daysAgo * 24 * 60 * 60 * 1000; // Calculate timestamp for 'daysAgo'
    return { from: Math.floor(past / 1000), to: Math.floor(now / 1000) }; // Convert to seconds (Unix format)
  };

  // Fetch cryptocurrency data from CoinGecko API
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        // Fetch top 20 cryptocurrencies
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
        );
        const data = await response.json();
        setCryptoData(data); // Set state with fetched data

        // Get Unix timestamps for the last 10 days
        const { from, to } = getUnixTimestamps(10);

        // Fetch daily data for the last 10 days for each coin using from and to timestamps
        

        setDailyData(dailyPrices); // Set daily prices in state
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchCryptoData();
  }, []);

  // Convert UNIX timestamp to a readable date format
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <div className="flex w-screen h-screen bg-darker text-light josefin-sans p-6">
      {/* Left Side: Crypto Data */}
      <div className="w-1/2 overflow-y-auto pr-4">
        <h2 className="text-2xl font-bold mb-6">Top 20 Cryptocurrencies</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="p-2">Coin</th>
              <th className="p-2">Symbol</th>
              <th className="p-2">Price (USD)</th>
              <th className="p-2">24h Change (%)</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.length > 0 ? (
              cryptoData.map((coin) => (
                <tr key={coin.id} className="hover:bg-gray-700">
                  <td className="p-2">{coin.name}</td>
                  <td className="p-2">{coin.symbol.toUpperCase()}</td>
                  <td className="p-2">${coin.current_price.toFixed(2)}</td>
                  <td className={`p-2 ${coin.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-2 text-center">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Right Side: Charts */}
      <div className="w-1/2 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Last 10 Days Price Charts</h2>
        {cryptoData.map((coin) => {
          const data = dailyData[coin.id] || [];
          const chartData = {
            labels: data.map((price) => formatDate(price.time)), // Format the time to display date
            datasets: [
              {
                label: coin.name,
                data: data.map((price) => price.value), // Only show price values
                fill: true,
                borderColor: 'rgba(75, 192, 192, 1)', // Line color
                backgroundColor: 'rgba(75, 192, 192, 0.3)', // Background fill color
                tension: 0.4, // Smooth line
                borderWidth: 2,
              },
            ],
          };

          const chartOptions = {
            responsive: true,
            plugins: {
              legend: {
                display: false, // Hide legend for individual charts
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `$${tooltipItem.raw.toFixed(2)}`,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: false, // Start y-axis from 0
                ticks: {
                  callback: function (value) {
                    return `$${value}`; // Add $ symbol to the y-axis labels
                  },
                },
              },
            },
          };

          return (
            <div key={coin.id} className="mb-8">
              <h3 className="text-lg font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h3>
              <Line data={chartData} options={chartOptions} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainCrypto;
