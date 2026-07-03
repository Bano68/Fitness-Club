document.getElementById("memberForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const dob = document.getElementById("dob").value;
  const phone = document.getElementById("phone").value;
  const fees = document.getElementById("fees").value;
  const message = document.getElementById("message");

  if (!firstName || !lastName || !dob || !phone || !fees) {
    message.style.color = "red";
    message.textContent = "Please fill all fields!";
    return;
  }

  // Create member object
  const member = {
    firstName: firstName,
    lastName: lastName,
    dob: dob,
    phone: phone,
    fees: fees
  };

  // Get existing data from localStorage
  let members = JSON.parse(localStorage.getItem("members")) || [];

  // Add new member to array
  members.push(member);

  // Save back to localStorage
  localStorage.setItem("members", JSON.stringify(members));

  message.style.color = "green";
  message.textContent = `Member ${firstName} ${lastName} added successfully!`;

  // Clear form fields
  document.getElementById("memberForm").reset();
});
