// const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
// const container = document.getElementById('container');
// let data = [];

// // Fetch data using .then
// function fetchDataWithThen() {
//   fetch(apiUrl + '?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(responseData => {
//       data = responseData;
//       renderTable();
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }

// // Fetch data using async/await
// async function fetchDataWithAsyncAwait() {
//   try {
//     const response = await fetch(apiUrl + '?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     data = await response.json();
//     renderTable();
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// function renderTable() {
//   const table = document.createElement('table');
//   table.innerHTML = `
//     <thead>
//       <tr>
//         <th>ID</th>
//         <th>Name</th>
//         <th>Symbol</th>
//         <th>Current Price</th>
//         <th>Market Cap</th>
//         <td>Market Cap Rank</td>
//       </tr>
//     </thead>
//     <tbody>
//       ${data.map(coin => `
//         <tr>
//           <td>${coin.id}</td>
//           <td><img src="${coin.image}" alt="${coin.name}" width="20">${coin.name}</td>
//           <td>${coin.symbol.toUpperCase()}</td>
//           <td>$${coin.current_price}</td>
//           <td>Mkt Cap : $${coin.market_cap}</td>
//           <td>${coin.market_cap_rank}</td>
//         </tr>
//       `).join('')}
//     </tbody>
//   `;
//   container.innerHTML = '';
//   container.appendChild(table);
// }

// function search() {
//   const searchTerm = document.getElementById('searchInput').value.toLowerCase();
//   const filteredData = data.filter(coin => coin.name.toLowerCase().includes(searchTerm) || coin.symbol.toLowerCase().includes(searchTerm));
//   renderTable(filteredData);
// }

// function sort(key) {
//   const sortedData = data.slice().sort((a, b) => b[key] - a[key]);
//   renderTable(sortedData);
// }

// // Initial data fetch using .then
// fetchDataWithThen();


// let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

// async function fetchData() {
//   try {
//     let response = await fetch(url);
//     let data = await response.json();
//     console.log(data);
//     return data; // Add this line to return the fetched data
//   } catch (error) {
//     console.error('Error in fetchData:', error);
//     throw error;  // Propagate the error for further handling if needed
//   }
// }

// function insertData(data) {
//   let container = document.querySelector("#container");
//   let table = document.createElement("table");
//   table.innerHTML = `
//     ${data.map(coin => `
//       <tr>
//         <td>${coin.id}</td>
//         <td><img src="${coin.image}" alt="${coin.name}" width="20">${coin.name}</td>
//         <td>${coin.symbol.toUpperCase()}</td>
//         <td>$${coin.current_price}</td>
//         <td>$${coin.total_volume}</td>
//         <td>${coin.atl_change_percentage}</td>
//         <td>Mkt Cap: $${coin.market_cap}</td>
//       </tr>
//     `).join('')}
//   `;
//   container.innerHTML = '';
//   container.appendChild(table);
// }

// async function searchItem() {
//   try {
//     let searchInput = document.querySelector("#searchInput").value.toLowerCase();
//     let data = await fetchData();
//     let filteredData = data.filter(coin => coin.name.toLowerCase().includes(searchInput) || coin.symbol.toLowerCase().includes(searchInput));
//     insertData(filteredData);
//   } catch (error) {
//     console.error('Error in searchItem:', error);
//   }
// }

// async function sort(key) {
//   try {
//     let data = await fetchData();
//     let sortedData = data.slice().sort((a, b) => b[key] - a[key]);
//     insertData(sortedData);
//   } catch (error) {
//     console.error('Error in sort:', error);
//   }
// }

// // Initial fetch and display
// fetchData().then(data => insertData(data));



let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

async function fetchData() {
  try {
    let response = await fetch(url);
    let data = await response.json();
    
    // Sort the data by market_cap in descending order initially
    data.sort((a, b) => b.market_cap - a.market_cap);

    return data;
  } catch (error) {
    console.error('Error in fetchData:', error);
    throw error;
  }
}

function insertData(data) {
  let container = document.querySelector("#container");
  let table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Symbol</th>
      <th>Price</th>
      <th>Total Volume</th>
      <th>24h Change Percentage</th>
      <th>Market Cap</th>
    </tr>
    ${data.map(coin => `
      <tr>
        <td>${coin.id}</td>
        <td><img src="${coin.image}" alt="${coin.name}" width="20">${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>$${coin.current_price}</td>
        <td>$${coin.total_volume}</td>
        <td>${coin.atl_change_percentage}</td>
        <td>Mkt Cap: $${coin.market_cap}</td>
      </tr>
    `).join('')}
  `;
  container.innerHTML = '';
  container.appendChild(table);
}

async function searchItem() {
  try {
    let searchInput = document.querySelector("#searchInput").value.toLowerCase();
    let data = await fetchData();
    let filteredData = data.filter(coin => coin.name.toLowerCase().includes(searchInput) || coin.symbol.toLowerCase().includes(searchInput));
    insertData(filteredData);
  } catch (error) {
    console.error('Error in searchItem:', error);
  }
}

async function sort(key) {
  try {
    let data = await fetchData();
    
    // Sort the data based on the specified key
    if (key === 'percentage') {
      data.sort((a, b) => b.atl_change_percentage - a.atl_change_percentage);
    } else if (key === 'market_cap') {
      data.sort((a, b) => b.market_cap - a.market_cap);
    }

    insertData(data);
  } catch (error) {
    console.error('Error in sort:', error);
  }
}

// Initial fetch and display
fetchData().then(data => insertData(data));
