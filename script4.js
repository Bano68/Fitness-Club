document.getElementById("searchBtn").addEventListener("click", function() {
  const phoneSearch = document.getElementById("phoneSearch").value;
  const message = document.getElementById("message");
  let members = JSON.parse(localStorage.getItem("members")) || [];

  // Find member by phone
  const memberIndex = members.findIndex(m => m.phone === phoneSearch);

  if (memberIndex === -1) {
    message.style.color = "red";
    message.textContent = "Member not found!";
    document.getElementById("updateFields").style.display = "none";
  } else {
    message.style.color = "green";
    message.textContent = "Member found! Update details below.";
    document.getElementById("updateFields").style.display = "block";

    // Pre-fill current data
    const member = members[memberIndex];
    document.getElementById("firstName").value = member.firstName;
    document.getElementById("lastName").value = member.lastName;
    document.getElementById("dob").value = member.dob;
    document.getElementById("phone").value = member.phone;
    document.getElementById("fees").value = member.fees;

    // Handle update
    document.getElementById("updateForm").onsubmit = function(event) {
      event.preventDefault();

      members[memberIndex] = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        dob: document.getElementById("dob").value,
        phone: document.getElementById("phone").value,
        fees: document.getElementById("fees").value
      };

      localStorage.setItem("members", JSON.stringify(members));

      message.style.color = "green";
      message.textContent = "Member updated successfully!";
      document.getElementById("updateFields").style.display = "none";
      document.getElementById("updateForm").reset();
    };
  }
});
