import { BACKEND_URL } from "./config.js";
/*
export async function getItems() {
  const items = await fetch(`${BACKEND_URL}/items`).then((r) => r.json());

  return items;
}
*/
export async function createResult(result) {
  await fetch(`${BACKEND_URL}/results`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  });
}

export async function getAllRankedResult(size) {
  try {
    const response = await fetch(`${BACKEND_URL}/results`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const players = await response.json();
    return players;  
  } catch (error) {
    console.error('Error fetching data:', error);
    }
}
export async function filterResult() {
  // may not need, will implement later
}
export async function deleteResult(id, item) {
  // may not need, will implement later
}