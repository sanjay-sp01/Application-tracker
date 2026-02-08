const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");
const filter = document.getElementById("filter");

let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

function displayJobs(statusFilter = "All") {
  jobList.innerHTML = "";

  jobs
    .filter(job => statusFilter === "All" || job.status === statusFilter)
    .forEach((job, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${job.company}</strong><br>
        Role: ${job.role}<br>
        Date: ${job.date}<br>
        Status: ${job.status}<br>
        <button onclick="deleteJob(${index})">Delete</button>
      `;
      jobList.appendChild(li);
    });
}

jobForm.addEventListener("submit", e => {
  e.preventDefault();

  const job = {
    company: company.value,
    role: role.value,
    date: date.value,
    status: status.value
  };

  jobs.push(job);
  localStorage.setItem("jobs", JSON.stringify(jobs));
  jobForm.reset();
  displayJobs(filter.value);
});

function deleteJob(index) {
  jobs.splice(index, 1);
  localStorage.setItem("jobs", JSON.stringify(jobs));
  displayJobs(filter.value);
}

filter.addEventListener("change", () => {
  displayJobs(filter.value);
});

displayJobs();
