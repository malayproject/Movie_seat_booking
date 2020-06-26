const container = document.querySelector(".container");
const movie = document.getElementById("movie");
const el_count = document.getElementById("count");
const el_total = document.getElementById("total");
var availableSeats = document.querySelectorAll(".row .seats:not(.occupied)");
var selectedSeats = document.querySelectorAll(".row .seats.selected");
var count = selectedSeats.length;
var ticketPrice = Number(document.getElementById("movie").value);
var total = count * ticketPrice;
var sel_seat_indeces = [];
var sel_movie_index = 0;
var init = function () {
  movie.selectedIndex = Number(localStorage.getItem("sel_movie_index"));
  availableSeats.forEach((item, index) => {
    let sel_seats = JSON.parse(localStorage.getItem("sel_seat_indeces"));
    if (sel_seats != null && sel_seats.length != 0) {
      if (sel_seats.indexOf(index) > -1) {
        item.classList.add("selected");
      }
    }
  });
  count = Number(localStorage.getItem("count"));
  total = Number(localStorage.getItem("total"));
  el_count.innerText = count;
  el_total.innerText = total;
};
init();
var updateCountAndTotal = function () {
  count = selectedSeats.length;
  ticketPrice = Number(movie.value);
  total = count * ticketPrice;
  el_count.innerText = count;
  el_total.innerText = total;
};

var updateSelectedSeats = function () {
  selectedSeats = document.querySelectorAll(".row .seats.selected");
  console.log(availableSeats);
};
var updateSel_seat_indeces = function () {
  sel_seat_indeces = [...selectedSeats].map((item) => {
    return [...availableSeats].indexOf(item);
  });
};
var updateMovie = function () {
  sel_movie_index = movie.selectedIndex;
};
var updateElements = function () {
  updateSelectedSeats();
  updateCountAndTotal();
  updateSel_seat_indeces();
  updateMovie();
};
var storeElements = function () {
  localStorage.setItem("sel_seat_indeces", JSON.stringify(sel_seat_indeces));
  localStorage.setItem("sel_movie_index", sel_movie_index);
  localStorage.setItem("count", count);
  localStorage.setItem("total", total);
};

//seat click event
container.addEventListener("click", (e) => {
  let element = e.target;
  if (
    element.classList.contains("seats") &&
    !element.classList.contains("occupied")
  ) {
    element.classList.toggle("selected");
    updateElements();
    storeElements();
  }
});

//movie select event
movie.addEventListener("change", (e) => {
  updateElements();
  storeElements();
});
