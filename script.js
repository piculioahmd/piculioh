const API_URL = "https://script.google.com/macros/s/AKfycbzen7SuWbj6-Jkb5diq7Dl3nM5hyrsWkYQPA46KDeCVy-OP8xUusyLmYip8IxYw_wz2VA/exec";

document.getElementById("checkBtn").addEventListener("click", () => {
  const brand = document.getElementById("brand").value.trim();
  const invoice = document.getElementById("invoice").value.trim();

  if (!brand || !invoice) {
    document.getElementById("error").innerText = "Please fill both fields!";
    return;
  }

  document.querySelector("#resultTable tbody").innerHTML = `<tr><td colspan="8">Loading...</td></tr>`;

  fetch(`${API_URL}?brand=${encodeURIComponent(brand)}&invoice=${encodeURIComponent(invoice)}`)
    .then(res => res.json())
    .then(data => {
      if (!data.length) {
        document.querySelector("#resultTable tbody").innerHTML = `<tr><td colspan="8">No data found</td></tr>`;
        return;
      }
      const rows = data.map(item => `
        <tr>
          <td>${item.PO}</td>
          <td>${item.TYPE}</td>
          <td>${item.COLOR}</td>
          <td>${item.SIZE}</td>
          <td>${item.QTY}</td>
          <td>${item.REMAIN}</td>
          <td>${item.REWORK}</td>
          <td>${item.STATUS}</td>
        </tr>
      `).join("");
      document.querySelector("#resultTable tbody").innerHTML = rows;
    })
    .catch(err => {
      console.error(err);
      document.querySelector("#resultTable tbody").innerHTML = `<tr><td colspan="8">Error fetching data</td></tr>`;
    });
});
