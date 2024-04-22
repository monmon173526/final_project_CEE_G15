import { createResult, getAllRankedResult, deleteResult } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
    fetchAndDrawTable();

    const backButton = document.getElementById("back-button");
    backButton.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  });
  function drawTable(results) {
    const table2player = document.getElementById("player2-table-body");
    const table3player = document.getElementById("player3-table-body");
    const table4player = document.getElementById("player4-table-body");
  
    table2player.innerHTML = "";
    table3player.innerHTML = "";
    table4player.innerHTML = "";
    let count2 = 0;
    for (const result of results) {
      if (result.board != 2) continue;
      const row = table2player.insertRow();
      row.insertCell().innerText = count2.toString();
      row.insertCell().innerText = result.name;
      row.insertCell().innerText = result.score;
      if (count2 == 10) break;
      count2++;
    }
    let count3 = 0;
    for (const result of results) {
      if (result.board != 3) continue;
      const row = table3player.insertRow();
      row.insertCell().innerText = count3.toString();
      row.insertCell().innerText = result.name;
      row.insertCell().innerText = result.score;
      if (count3 == 10) break;
      count3++;
    }
    let count4 = 0;
    for (const result of results) {
      if (result.board != 4) continue;
      const row = table4player.insertRow();
      row.insertCell().innerText = count4;
      row.insertCell().innerText = result.name;
      row.insertCell().innerText = result.score;
      if (count4 == 10) break;
      count4++;
    }
  }
  
  export async function fetchAndDrawTable() {
    const results = await getAllRankedResult();
    
    drawTable(results);
  }
// Function to fetch the data from a server or a local storage
/*
function fetchData() {
    // Fetch the data from a server or a local storage
    // You can modify this function to fetch the actual data
    var data = [
      { name: 'Player 1', move: 1 },
      { name: 'Player 2', move: 2 },
      { name: 'Player 3', move: 3 },
      { name: 'Player 4', move: 4 },
      { name: 'Player 5', move: 5 },
      { name: 'Player 6', move: 6 },
      { name: 'Player 7', move: 7 },
      { name: 'Player 8', move: 8 },
    ];
    return data;
  }
  */
  // Function to sort the data in ascending order based on a specific property
  /*
  function sortData(data, property) {
    // Sort the data in ascending order based on the specific property
    data.sort((a, b) => a[property] - b[property]);
  
    return data;
  }
  */
  // Function to add the sorted data to the corresponding table body
  /*
  function addDataToTable(data, tableBodyId) {
    // Add the sorted data to the corresponding table body
    var tableBody = document.getElementById(tableBodyId);
  
    data.forEach((item) => {
      var row = tableBody.insertRow();
  
      var cell1 = row.insertCell();
      var cell2 = row.insertCell();
  
      cell1.innerHTML = item.name;
      cell2.innerHTML = item.move;
    });
  }
  */
  // Function to fetch the data, sort it, and add it to the corresponding table bodies
  /*
  function fetchAndDrawTable() {
    var data = fetchData();
    var sortedData = sortData(data, 'move');
    addDataToTable(sortedData, 'player2-table-body');
    addDataToTable(sortedData, 'player3-table-body');
    addDataToTable(sortedData, 'player4-table-body');
  }
  */