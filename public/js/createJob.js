function myFunction() {
  document.getElementById("myDropdown").classList.toggle("showdrop");
}

// create job

const form = document.querySelector("form");
const addReponsibilities = document.querySelector(".addReponsibilities");
const reponsibilitiesInput = document.querySelector(".reponsibilitiesInput");
const addQualifications = document.querySelector(".addQualifications");
const qualificationsInput = document.querySelector(".qualificationsInput");
const addOptionalQualifications = document.querySelector(
  ".addOptionalQualifications"
);
const optionalQualificationsInput = document.querySelector(
  ".optionalQualificationsInput"
);
const addBenefits = document.querySelector(".addBenefits");
const benefitsInput = document.querySelector(".benefitsInput");

// delete dynamic input

document
  .querySelectorAll("button[type='button']")
  .forEach((btn) => btn.addEventListener("click", (e) => e.preventDefault()));

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const reponsibilities = Array.from(
    document.querySelectorAll(".reponsibilitiesInput input")
  );
  const qualifications = Array.from(
    document.querySelectorAll(".qualificationsInput input")
  );
  const optionalQualifications = Array.from(
    document.querySelectorAll(".optionalQualificationsInput input")
  );
  const benefits = Array.from(
    document.querySelectorAll(".benefitsInput input")
  );
  const inputs = Array.from(document.querySelectorAll("input"));
  let error = false;
  const errors = document.querySelector(".errors");
  inputs.forEach((input) => {
    if (input.value === "") {
      window.scrollTo({ top: 30 });
      errors.innerHTML = `<p class="errors">All fields are required</p>`;
      error = true;
    }
  });

  const title = document.querySelector(".title");
  const overview = document.querySelector(".overview");
  const country = document.querySelector(".country");
  const location = document.querySelector(".location");
  const type = document.querySelector(".type");
  const minSalary = document.querySelector(".minSalary");
  const maxSalary = document.querySelector(".maxSalary");
  const companyName = document.querySelector(".companyName");
  const numberofVacancies = document.querySelector(".numberofVacancies");
  const category = document.querySelector(".category");
  const email = document.querySelector(".email");
  const deadline = document.querySelector("#deadline");

  if (error === false) {
    const data = {
      title: title.value,
      overview: overview.value,
      location: location.value,
      country: country.value,
      type: type.value,
      reponsibilities: reponsibilities.map((reson) => reson.value),
      qualifications: qualifications.map((qua) => qua.value),
      optionalQualifications: optionalQualifications.map((opt) => opt.value),
      benefits: benefits.map((ben) => ben.value),
      minSalary: minSalary.value,
      maxSalary: maxSalary.value,
      companyName: companyName.value,
      numberofVacancies: Number(numberofVacancies.value),
      category: category.value,
      email: email.value,
      deadline: deadline.value,
    };

    // console.log(data);
    const res = await fetch(`http://localhost:5000/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    console.log(json);
    if (res.status !== 200) {
      errors.innerHTML = "";
      json.errors.forEach((msg) => {
        errors.innerHTML += `<p class="errors">${msg}</p>`;
      });
    } else {
      errors.innerHTML = `<p class="success"> Job added successfuly</p>`;
    }
  }
});

const deleteDynamicInput = () => {
  const del = document.querySelectorAll(".del");
  del.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      btn.parentElement.remove();
    });
  });
};

// create new input
const createNewInput = (mainComponent) => {
  const div = document.createElement("div");
  div.className = "newInput";
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "qualification");
  const button = document.createElement("button");
  button.className = "del";
  button.innerText = "X";
  div.appendChild(input);
  div.appendChild(button);

  mainComponent.appendChild(div);
};

// responsibilities input
addReponsibilities.addEventListener("click", (e) => {
  createNewInput(reponsibilitiesInput);
  deleteDynamicInput();
});

// qualifications input
addQualifications.addEventListener("click", (e) => {
  createNewInput(qualificationsInput);

  deleteDynamicInput();
});

// optional qualifications input
addOptionalQualifications.addEventListener("click", (e) => {
  createNewInput(optionalQualificationsInput);

  deleteDynamicInput();
});

// qualifications input
addBenefits.addEventListener("click", (e) => {
  createNewInput(benefitsInput);

  deleteDynamicInput();
});

// deleteDynamicInput();
