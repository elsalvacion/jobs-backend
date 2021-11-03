document.getElementById("menu").addEventListener("click", () => {
  document.getElementById("myDropdown").classList.toggle("showdrop");
});

const url = "https://jobs-backend-app.herokuapp.com";
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
if (!params.id) window.location.href = `${url}`;

const card = document.querySelector(".card");
// populate jobs
const populateJobs = async () => {
  const res = await fetch(`${url}/jobs/${params.id}`);
  const data = await res.json();
  console.log(data.msg);
  if (!data.msg) {
    card.innerHTML = `
    <h4 class="no-job">No open jobs for this category </h4>
    `;
  } else {
    const job = data.msg;
    card.innerHTML =
      `
        <div class="boxitem">
        <div
         class="boxheader">
            <h2 class="boxtitle">${job.title}</h2>
            <i class="fa fa-plus boxicon"></i>
        </div>
        <div class="boxcontent">
            <hr>
            <div class="content-item">
                <button class="btn-aply" data-id="${job._id}">Apply Now</button>
            </div>
            <hr>
            <div class="content-item">
                <div class="sub-content-des1 des1-job">
                    <ul>
                    <li><span>Organization Name:</span>${job.companyName}</li>
                        <li><span>Overview:</span>${job.overview}</li>
                        <li><span>Vacancies:</span>${job.numberofVacancies}</li>
                        <li><span>Salary:</span>${job.minSalary} - ${job.maxSalary}</li>
                        <li><span>Location:</span>${job.country} , ${job.location}.</li>
                        <li><span>Type:</span>${job.type}</li>
                        <li><span>Qualification:</span>
                         <ul> ` +
      job.qualifications
        .map((qualification) => {
          return `<li>${qualification}</li>`;
        })
        .join("") +
      ` 
                         </ul>
                        </li>
 
                        <li><span>Optional Qualifications:</span>
                        <ul>
                        ` +
      job.optionalQualifications
        .map((qualification) => {
          return `<li>${qualification}</li>`;
        })
        .join("") +
      ` 
                        </ul>
                       </li>
                       
                        <li><span>Reponsibilities:</span>
                         <ul> ` +
      job.reponsibilities
        .map((reponsibility) => {
          return `<li>${reponsibility}</li>`;
        })
        .join("") +
      ` 
                         </ul>
                        </li>
                        <li><span>Benefits:</span>
                        <ul> ` +
      job.benefits
        .map((benefit) => {
          return `<li>${benefit}</li>`;
        })
        .join("") +
      `
                        </ul>
                       </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
        `;
  }
  apply();
};

const apply = () => {
  const applyBtn = document.querySelectorAll(".btn-aply");

  applyBtn.forEach((job) => {
    job.addEventListener("click", () => {
      const id = job.getAttribute("data-id");

      window.location.href = `${url}/apply.html?id=${id}`;
    });
  });
};

populateJobs();
