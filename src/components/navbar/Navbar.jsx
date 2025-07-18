import React,{useContext} from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const {setCurrency, currency} = useContext(CoinContext);
  const currencyHandler=(event)=>{
    switch(event.target.value){
      case 'inr':
        setCurrency({
          name: 'inr',
          symbol: '₹'
        });
        break;
      case 'eur':
        setCurrency({
          name: 'eur',
          symbol: '€'
        });
        break;
      case 'usd':
        setCurrency({
          name: 'usd',
          symbol: '$'
        });
        break;
      default:
        setCurrency({
          name: 'usd',
          symbol: '$'
        });
    }
  }
  return (
    <div className='navbar'>
      <Link to={'/'}>
        <img className='logo' src={logo} alt="" />
      </Link>
      <ul>
        <Link to={'/'}>
          <li>Home</li> 
        </Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler} value={currency.name}>
            <option value="inr">INR</option>
            <option value="eur">EUR</option>
            <option value="usd">USD</option>
        </select>
        <button>Sign up <img src={arrow} alt=""/></button>
      </div>
    </div>
  )
}

export default Navbar
