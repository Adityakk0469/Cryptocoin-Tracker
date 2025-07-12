import React from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';
import { Link } from 'react-router-dom';

const Coin = () => {
  const{coinId}=useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const {currency} = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-CjdKfSDLfDyCGghf2P5Xzgtu'}
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));

  }
  
  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-CjdKfSDLfDyCGghf2P5Xzgtu'}
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if(coinData && historicalData){
    return (
      <div className='coin'>
        <div className="nav">
          <div className="coin-name">
            <h2>{coinData.name} ({coinData.symbol.toUpperCase()})</h2>
            <img src={coinData.image.large} alt="" />
          </div>
          <span>
            <a href="/">Back</a>
            <span className='arrow'> &gt; </span>
          </span>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData}/>
        </div>
        <div className="coin-info">
          <ul>
            <li>Current Price</li>
            <li>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Total Market Cap</li>
            <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>   
          </ul>
          <ul>
            <li>Market Cap Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>All Time High</li>
            <li>{currency.symbol} {coinData.market_data.ath[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 hour Low</li>
            <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Price Change in 24 hr</li>
            <li>{coinData.market_data.price_change_percentage_24h}%</li>
          </ul>
          <ul>
            <li>Price Change in 7 days</li>
            <li>{coinData.market_data.price_change_percentage_7d}%</li>
          </ul>
          <ul>
            <li>Price Change in 30 days</li>
            <li>{coinData.market_data.price_change_percentage_30d}%</li>
          </ul>
          <ul>
            <li>Price Change in 1 year</li>
            <li>{coinData.market_data.price_change_percentage_1y}%</li>
          </ul>
          
        </div>
      </div>
    )
  }
  else{
    return(
      <div className="spinner">
        <div className="spin">

        </div>
      </div>
    )
  }
}
export default Coin
