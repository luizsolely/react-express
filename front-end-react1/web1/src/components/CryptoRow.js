import React from 'react'

const CryptoRow = ({ data }) => {

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

    const change24h = data.priceChange1d < 0 
    ? (<p className='ngtv'>{data.priceChange1d}%</p>) 
    : (<p className='pstv'>{data.priceChange1d}%</p>);

    const change1h = data.priceChange1h < 0 
    ? (<p className='ngtv'>{data.priceChange1h}%</p>) 
    : (<p className='pstv'>{data.priceChange1h}%</p>);

  return (
    <tr id='id'>
      <td className='rank'>{data.rank}</td>
      <td className='logo'>
        <div className='name-container'>
          <a href={data.websiteUrl}>
            <img src={data.icon} alt='logo' width='30px' />
          </a>
          <p className='coin-name'>{data.name}</p>
          <p>:</p>
          <p className='coin-symbol'>{data.symbol}</p>
        </div>
      </td>
      <td className='change-coin'>{change24h}</td>
      <td className='change-coin'>{change1h}</td>
      <td>${formatNumber(data.price.toFixed(2))}</td>
      <td>{Math.round(data.priceBtc * 100000000) / 100000000} BTC</td>
      <td>${formatNumber(data.marketCap)}</td>
    </tr>
  );
}

export default CryptoRow