const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
const container = document.getElementById('container');
let data = [];

// Fetch data using .then
function fetchDataWithThen() {
  fetch(apiUrl + '?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(responseData => {
      data = responseData;
      renderTable();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Fetch data using async/await
async function fetchDataWithAsyncAwait() {
  try {
    const response = await fetch(apiUrl + '?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data = await response.json();
    renderTable();
  } catch (error) {
    console.error('Error:', error);
  }
}

function renderTable() {
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Symbol</th>
        <th>Current Price</th>
        <th>Market Cap</th>
        <td>Market Cap Rank</td>
      </tr>
    </thead>
    <tbody>
      ${data.map(coin => `
        <tr>
          <td>${coin.id}</td>
          <td><img src="${coin.image}" alt="${coin.name}" width="20">${coin.name}</td>
          <td>${coin.symbol.toUpperCase()}</td>
          <td>$${coin.current_price}</td>
          <td>Mkt Cap : $${coin.market_cap}</td>
          <td>${coin.market_cap_rank}</td>
        </tr>
      `).join('')}
    </tbody>
  `;
  container.innerHTML = '';
  container.appendChild(table);
}

function search() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const filteredData = data.filter(coin => coin.name.toLowerCase().includes(searchTerm) || coin.symbol.toLowerCase().includes(searchTerm));
  renderTable(filteredData);
}

function sort(key) {
  const sortedData = data.slice().sort((a, b) => b[key] - a[key]);
  renderTable(sortedData);
}

// Initial data fetch using .then
fetchDataWithThen();