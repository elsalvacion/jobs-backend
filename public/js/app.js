document.getElementById("menu").addEventListener("click", () => {
  document.getElementById("myDropdown").classList.toggle("showdrop");
});

const url = "http://localhost:5000";
const slide = document.querySelector(".slide");

// fetch data for the slide

const fetchSlideData = async () => {
  const res = await fetch(`${url}/jobs`);
  const data = await res.json();
  // console.log(data.msg);
  data.msg.forEach((job) => {
    slide.innerHTML += ` <div class="feature">

    <span> <sup>$</sup>${job.minSalary} - ${job.maxSalary} </span>

    <h4>${job.title}</h4>

    <p>${
      job.category === "computerscience"
        ? "Computer Science"
        : job.category.charAt(0).toUpperCase() + job.category.slice(1)
    }</p>

    <div class="social-icons" >
        <button class="view" data-job="${job._id}">View <span>></span></button>
    </div>

</div>`;
  });

  redirectToJob();
  loadSlick();
};

// load slick

const loadSlick = () => {
  $(".slide").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });
};

fetchSlideData();

const redirectToJob = () => {
  const url = "http://localhost:5000";
  const views = document.querySelectorAll(".view");

  Array.from(views).forEach((view) => {
    view.addEventListener("click", () => {
      window.location.href = `${url}/job.html?id=${view.getAttribute(
        "data-job"
      )}`;
    });
  });
};
