window.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("attendanceTable");
  const tableHeadRow = table.querySelector("thead tr");
  const tableBody = table.querySelector("tbody");
  const message = document.getElementById("message");
  const monthYear = document.getElementById("monthYear");
  const prevBtn = document.getElementById("prevMonth");
  const nextBtn = document.getElementById("nextMonth");

  let today = new Date();
  let currentMonthIndex = today.getMonth(); // 0-11
  let currentYear = today.getFullYear();

  // Load members
  let members = JSON.parse(localStorage.getItem("members")) || [];
  if (members.length === 0) {
    message.style.color = "red";
    message.textContent = "No members found!";
    return;
  }

  // Attendance data
  let attendanceData = JSON.parse(localStorage.getItem("attendance")) || {};

  function renderTable(monthIndex, year) {
    // Clear old table
    tableHeadRow.innerHTML = "<th>First Name</th><th>Last Name</th>";
    tableBody.innerHTML = "";

    const monthName = new Date(year, monthIndex).toLocaleString("default", { month: "long" });
    monthYear.textContent = `${monthName} ${year} Attendance`;

    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const todayDay = (monthIndex === today.getMonth() && year === today.getFullYear()) ? today.getDate() : null;

    // Build header
    for (let day = 1; day <= daysInMonth; day++) {
      let th = document.createElement("th");
      th.colSpan = 2;
      th.textContent = day;
      tableHeadRow.appendChild(th);
    }

    // Build rows
    members.forEach(member => {
      let row = document.createElement("tr");

      let fnCell = document.createElement("td");
      fnCell.textContent = member.firstName;
      row.appendChild(fnCell);

      let lnCell = document.createElement("td");
      lnCell.textContent = member.lastName;
      row.appendChild(lnCell);

      for (let day = 1; day <= daysInMonth; day++) {
        let morningCell = document.createElement("td");
        let eveningCell = document.createElement("td");

        let morningCheckbox = document.createElement("input");
        morningCheckbox.type = "checkbox";

        let eveningCheckbox = document.createElement("input");
        eveningCheckbox.type = "checkbox";

        // Disable unless it's today in current month
        if (day !== todayDay) {
          morningCheckbox.disabled = true;
          eveningCheckbox.disabled = true;
        }

        // Restore saved attendance
        let key = `${member.firstName}_${member.lastName}_${monthName}_${year}_${day}`;
        if (attendanceData[key]) {
          morningCheckbox.checked = attendanceData[key].morning;
          eveningCheckbox.checked = attendanceData[key].evening;
        }

        // Save on change
        morningCheckbox.addEventListener("change", () => {
          attendanceData[key] = {
            morning: morningCheckbox.checked,
            evening: eveningCheckbox.checked
          };
          localStorage.setItem("attendance", JSON.stringify(attendanceData));
        });

        eveningCheckbox.addEventListener("change", () => {
          attendanceData[key] = {
            morning: morningCheckbox.checked,
            evening: eveningCheckbox.checked
          };
          localStorage.setItem("attendance", JSON.stringify(attendanceData));
        });

        morningCell.appendChild(morningCheckbox);
        eveningCell.appendChild(eveningCheckbox);

        row.appendChild(morningCell);
        row.appendChild(eveningCell);
      }

      tableBody.appendChild(row);
    });

    message.style.color = "green";
    message.textContent = `Loaded ${members.length} members successfully!`;
  }

  // Initial render
  renderTable(currentMonthIndex, currentYear);

  // Navigation
  prevBtn.addEventListener("click", () => {
    currentMonthIndex--;
    if (currentMonthIndex < 0) {
      currentMonthIndex = 11;
      currentYear--;
    }
    renderTable(currentMonthIndex, currentYear);
  });

  nextBtn.addEventListener("click", () => {
    currentMonthIndex++;
    if (currentMonthIndex > 11) {
      currentMonthIndex = 0;
      currentYear++;
    }
    renderTable(currentMonthIndex, currentYear);
  });
});
