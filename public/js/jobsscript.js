const url = "http://localhost:5000";
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
if (!params.category) window.location.href = `${url}`;
const boxContainer = document.querySelector(".boxcontainer");

// populate jobs
const populateJobs = async () => {
  const res = await fetch(`${url}/jobs?category=${params.category}`);
  const data = await res.json();
  console.log(data.msg);
  if (data.msg.length === 0) {
    boxContainer.innerHTML = `
    <h4 class="no-job">No open jobs for this category </h4>
    `;
  } else {
    data.msg.forEach((job) => {
      boxContainer.innerHTML +=
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
                        <ul> `;
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
    });
  }
  useAccordion();
  apply();
};

populateJobs();

const apply = () => {
  const applyBtn = document.querySelectorAll(".btn-aply");

  applyBtn.forEach((job) => {
    job.addEventListener("click", () => {
      const id = job.getAttribute("data-id");

      window.location.href = `${url}/apply.html?id=${id}`;
    });
  });
};

const useAccordion = () => {
  const accordionItems = document.querySelectorAll(".boxitem");
  accordionItems.forEach((item) => {
    const accordionHeader = item.querySelector(".boxheader");
    accordionHeader.addEventListener("click", () => {
      const openItem = document.querySelector(".accordion-open");
      toggleItem(item);
      if (openItem && openItem !== item) {
        toggleItem(openItem);
      }
    });
  });
  const toggleItem = (item) => {
    const accordionContent = item.querySelector(".boxcontent");
    if (item.classList.contains("accordion-open")) {
      accordionContent.removeAttribute("style");
      item.classList.remove("accordion-open");
    } else {
      accordionContent.style.height = accordionContent.scrollHeight + "px";
      item.classList.add("accordion-open");
    }
  };
};
