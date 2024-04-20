import { createResult, getAllRankedResult, deleteResult } from "./api.js";

function drawTable(results, board) {
  table2player = document.getElementById("player2-table-body");
  table3player = document.getElementById("player3-table-body");
  table4player = document.getElementById("player4-table-body");

  table2player.innerHTML = "";
  table3player.innerHTML = "";
  table4player.innerHTML = "";
  let count = 0;
  for (const result of results) {
    if (result.board != board) continue;
    const row = table.insertRow();
    row.insertCell().innerText = result.name;
    row.insertCell().innerText = result.score;
    if (count == 10) break;
    count++;
  }
}

export async function fetchAndDrawTable(board) {
  const results = await getAllRankedResult();
  
  drawTable(results, board);
}
/*
export async function handleDeleteItem(id) {
  await deleteItem(id);
  await fetchAndDrawTable();
  clearFilter();
}

export async function handleCreateItem() {
  const nameToAdd = document.getElementById("name-to-add");
  const moveToAdd = document.getElementById("move-to-add");
  const tableToAdd = document.getElementById("table-to-add");

  const payload = {
    name: nameToAdd.value,
    item: itemToAdd.value,
    table: tableToAdd.value,
  };

  await createItem(payload);
  await fetchAndDrawTable();

  nameToAdd.value = "Annonymous";
  moveToAdd.value = "0";
  tableToAdd.value = "";
  clearFilter();
}

export async function clearFilter() {
  document.getElementById("filter-name").value = "-- ทั้งหมด --";
  document.getElementById("lower-price").value = "";
  document.getElementById("upper-price").value = "";
}

export async function handleFilterItem() {
  const name = document.getElementById("filter-name").value;
  let lowerPrice = document.getElementById("lower-price").value;
  let upperPrice = document.getElementById("upper-price").value;
  
  if (lowerPrice === "") lowerPrice = 0;
  else lowerPrice = parseInt(lowerPrice);

  if (upperPrice === "") upperPrice = 1000000000;
  else upperPrice = parseInt(upperPrice);

  const items = await filterItems(name, lowerPrice, upperPrice);
  await drawTable(items);
}
*/