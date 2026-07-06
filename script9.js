window.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#membersTable tbody");
  const message = document.getElementById("message");

  let members = JSON.parse(localStorage.getItem("members")) || [];
  let slips = JSON.parse(localStorage.getItem("slips")) || [];

  // 🔄 Reset slips only once at midnight on the 25th
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth(); // 0-based (0 = January)
  const year = today.getFullYear();

  // Build a reset key for this month/year
  const resetKey = `${year}-${month + 1}-25`;
  const lastReset = localStorage.getItem("lastReset");

  // If today is 25th AND we haven't reset yet this month
  if (day === 25 && lastReset !== resetKey) {
    localStorage.setItem("slips", JSON.stringify([]));
    slips = []; // clear in memory too
    localStorage.setItem("lastReset", resetKey);
    console.log("Slips reset at midnight on the 25th!");
  }

  if (members.length === 0) {
    message.style.color = "red";
    message.textContent = "No members found!";
    return;
  }

  members.forEach(member => {
    let row = tableBody.insertRow();
    row.insertCell(0).innerText = `${member.firstName} ${member.lastName}`;
    row.insertCell(1).innerText = member.phone;
    row.insertCell(2).innerText = member.fees;

    // Check if slip exists for this member
    let paidSlip = slips.find(slip => slip.phone === member.phone);

    let statusCell = row.insertCell(3);
    if (paidSlip) {
      statusCell.innerText = "Paid";
      statusCell.classList.add("status-paid");
    } else {
      statusCell.innerText = "Unpaid";
      statusCell.classList.add("status-unpaid");
    }
  });

  message.style.color = "green";
  message.textContent = `Loaded ${members.length} members successfully!`;
});
