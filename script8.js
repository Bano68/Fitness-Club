window.addEventListener("DOMContentLoaded", () => {
  const feeForm = document.getElementById("feeForm");
  const message = document.getElementById("message");
  const slipContainer = document.getElementById("slipContainer");
  const slipName = document.getElementById("slipName");
  const slipPhone = document.getElementById("slipPhone");
  const slipDate = document.getElementById("slipDate");
  const slipAmount = document.getElementById("slipAmount");
  const saveSlipBtn = document.getElementById("saveSlip");

  feeForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const phone = document.getElementById("phone").value.trim();
    const amount = document.getElementById("amount").value.trim();

    let members = JSON.parse(localStorage.getItem("members")) || [];
    let member = members.find(m => m.phone === phone);

    if (!member) {
      message.style.color = "red";
      message.textContent = "Member not found!";
      slipContainer.classList.add("hidden");
      return;
    }

    // Generate slip
    slipName.textContent = `${member.firstName} ${member.lastName}`;
    slipPhone.textContent = member.phone;
    slipDate.textContent = new Date().toLocaleString();
    slipAmount.textContent = amount;

    slipContainer.classList.remove("hidden");
    message.style.color = "green";
    message.textContent = "Slip generated successfully!";
  });

  saveSlipBtn.addEventListener("click", () => {
    const slipData = {
      name: slipName.textContent,
      phone: slipPhone.textContent,
      date: slipDate.textContent,
      amount: slipAmount.textContent
    };

    let slips = JSON.parse(localStorage.getItem("slips")) || [];
    slips.push(slipData);
    localStorage.setItem("slips", JSON.stringify(slips));

    message.style.color = "blue";
    message.textContent = "Slip saved successfully!";
  });
});
