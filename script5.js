document.getElementById("removeForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const phoneRemove = document.getElementById("phoneRemove").value.trim();
  const message = document.getElementById("message");

  // Get existing members from localStorage
  let members = JSON.parse(localStorage.getItem("members")) || [];

  // Find index of member with matching phone
  const index = members.findIndex(member => member.phone === phoneRemove);

  if (index === -1) {
    message.style.color = "red";
    message.textContent = "No member found with this phone number!";
    return;
  }

  // Remove member
  members.splice(index, 1);

  // Save updated list back to localStorage
  localStorage.setItem("members", JSON.stringify(members));

  message.style.color = "green";
  message.textContent = "Member removed successfully!";
  
  // Clear form
  document.getElementById("removeForm").reset();
});
