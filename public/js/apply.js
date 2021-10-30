document.getElementById("menu").addEventListener("click", () => {
  document.getElementById("myDropdown").classList.toggle("showdrop");
});

const url = "http://localhost:5000";
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// if (!params.id) window.location.href = `${url}`;

const file = document.querySelector(".apply");
const btn = document.querySelector(".btn");
const result = document.querySelector(".result");

file.addEventListener("change", (e) => {
  const name = file.value.split(".");
  if (name[name.length - 1] !== "pdf") {
    result.innerHTML = `<p class="error">Upload only pdf files</p>`;
  }
});
// apply clickec
btn.addEventListener("click", async (e) => {
  if (file.value === "") {
    result.innerHTML = `<p class="error">File is required</p>`;
  } else {
    const name = file.value.split(".");
    if (name[name.length - 1] !== "pdf") {
      result.innerHTML = `<p class="error">Upload only pdf files</p>`;
    } else {
      result.innerHTML = `<img src="./images/spinner.gif" width="100%" height="100%" />`;
      const fileField = document.querySelector(".apply");
      const formData = new FormData();
      formData.append("file", fileField.files[0]);

      if (formData.get("file").size > 500000) {
        result.innerHTML = `<p class="error">File Size greater than 5MB</p>`;
      } else {
        const res = await fetch(`${url}/jobs/apply/${params.id}`, {
          method: "post",
          body: formData,
        });

        const data = await res.json();

        if (res.status !== 200) {
          result.innerHTML = `<p class="error">Server Error</p>`;
        } else {
          result.innerHTML = `<p class="success">${data.msg}</p>`;
        }
      }
    }
  }
});
