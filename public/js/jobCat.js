document.getElementById("menu").addEventListener("click", () => {
  document.getElementById("myDropdown").classList.toggle("showdrop");
});
const jobItems = document.querySelectorAll(".job-item");
// listen for job category click
jobItems.forEach((jobItem) => {
  jobItem.addEventListener("click", (e) => {
    const category = jobItem.getAttribute("data-category");
    window.location.href = `http://localhost:5000/jobdetails.html?category=${category}`;
  });
});
