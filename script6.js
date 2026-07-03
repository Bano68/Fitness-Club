window.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#membersTable tbody");
  const message = document.getElementById("message");

  // Load members from localStorage
  let members = JSON.parse(localStorage.getItem("members")) || [];

  if (members.length === 0) {
    message.style.color = "red";
    message.textContent = "No members found!";
    return;
  }

  // Populate table
  members.forEach(member => {
    let row = tableBody.insertRow();
    row.insertCell(0).innerText = member.firstName;
    row.insertCell(1).innerText = member.lastName;
    row.insertCell(2).innerText = member.dob;
    row.insertCell(3).innerText = member.phone;
    row.insertCell(4).innerText = member.fees;
  });

  message.style.color = "green";
  message.textContent = `Loaded ${members.length} members successfully!`;
});
