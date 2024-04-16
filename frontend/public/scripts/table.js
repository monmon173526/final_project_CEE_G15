import { createItem, deleteItem, getItems, filterItems } from "./api.js";

function drawTable(items) {
  const table = document.getElementById("main-table-body");

  table.innerHTML = "";
  for (const item of items) {
    const row = table.insertRow();
    row.insertCell().innerText = item.item;
    row.insertCell().innerText = item.name;
    row.insertCell().innerText = item.price;

    const button = document.createElement("button");
    button.addEventListener("click", () => handleDeleteItem(item._id));
    button.innerText = "ลบ";

    row.insertCell().appendChild(button);
  }
}

export async function fetchAndDrawTable() {
  const items = await getItems();

  drawTable(items);
}

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