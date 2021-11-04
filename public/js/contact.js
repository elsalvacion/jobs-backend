document.getElementById("menu").addEventListener("click", () => {
  document.getElementById("myDropdown").classList.toggle("showdrop");
});

const url = "http://localhost:5000";

const form = document.querySelector("form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");
const result = document.querySelector(".result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  window.scrollTo({ top: 30 });

  result.innerHTML = `<p>Sending ...</p>`;
  const data = {
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
  };

  const res = await fetch(`${url}/jobs/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (res.status !== 200) {
    result.innerHTML = `<p class="error">Server Error</p>`;
  } else {
    result.innerHTML = `<p class="success">${json.msg}</p>`;
  }
});
