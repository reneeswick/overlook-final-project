export function fetchCustomersData() {
  return fetch('http://localhost:3001/api/v1/customers')
  .then(response => response.json())
  .then(data => data)
  .catch(error => )
}
