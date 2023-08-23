const tripsArr = [
  {
    name: "Tropical Paradise Getaway",
    description:
      "Escape to sun-kissed shores, turquoise waters, and palm-fringed beaches in this tropical paradise cruise. Immerse yourself in vibrant local cultures, indulge in exotic cuisine, and bask in the warmth of the tropics.",
    price: 20999,
    image: "1.jpg",
    duration: 7,
    location: "Male",
    special: "true",
  },
  {
    name: "Majestic Fjords Expedition",
    description:
      "Embark on a journey through breathtaking fjords, towering cliffs, and pristine glaciers. Discover the awe-inspiring beauty of nature as you explore remote landscapes and witness wildlife in its natural habitat.",
    price: 27199,
    image: "2.jpg",
    duration: 10,
    location: "Bergen",
    special: "false",
  },
  {
    name: "Historical European Discovery",
    description:
      "Step back in time as you sail along the picturesque coastlines of Europe. Uncover the rich history, charming villages, and iconic landmarks that have shaped the continent. Immerse yourself in the Old World charm of Europe's most beloved cities.",
    price: 30599,
    image: "3.jpg",
    duration: 14,
    location: "Rome",
    special: "false",
  },
  {
    name: "Exotic Asian Odyssey",
    description:
      "Embark on a cultural immersion through the diverse and enchanting landscapes of Asia. From bustling metropolises to serene temples, experience the contrasts and beauty of this captivating continent.",
    price: 23049,
    image: "4.jpg",
    duration: 12,
    location: "Bangkok",
    special: "true",
  },
  {
    name: "Polar Expedition: Arctic Wonders",
    description:
      "Venture to the Arctic Circle and witness the enchanting world of icebergs, polar bears, and the mesmerizing Northern Lights. Explore the untouched wilderness of the Arctic and create memories of a lifetime.",
    price: 19999,
    image: "5.jpg",
    duration: 9,
    location: "Longyearbyen",
    special: "true",
  },
  {
    name: "Caribbean Rhythms Cruise",
    description:
      "Dive into the vibrant energy of the Caribbean as you visit multiple tropical islands. From reggae beats to pristine coral reefs, this cruise offers a perfect blend of relaxation and adventure.",
    price: 24499,
    image: "6.jpg",
    duration: 7,
    location: "Montego Bay",
    special: "false",
  },
  {
    name: "Transatlantic Crossing",
    description:
      "Experience the classic elegance of ocean travel with a transatlantic crossing. Enjoy leisurely days at sea, engaging activities, and luxurious accommodations as you journey between continents.",
    price: 35999,
    image: "7.jpg",
    duration: 15,
    location: "New York City",
    special: "false",
  },
];

let applFilter = "";
let applSort = "low to high price";

//Doc Ready--------------------------------------------------------------------
$(document).ready(function () {
  sortingFilting();
  $("#card-description").hide();
  loadCarouselSlides();
});
//END OF Doc Ready--------------------------------------------------------------------

function addTrips(dispTrips) {
  //CLR

  $("#trips-container").empty();

  for (let i = 0; i < dispTrips.length; i++) {
    const trip = dispTrips[i];

    $.ajax({
      type: "GET",
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        trip.location +
        "&appid=0c8a911e5c7f8e5a03991afe2075de21",
      success: function (data) {
        tempData = data;
      },
    }).done(function () {
      //Set temp in Card body
      $(cChild)
        .find("#temp")
        .text(
          "Location: " +
            trip.location +
            ", Temp: " +
            Math.round(tempData.main.temp - 273) +
            "°C"
        );

      //Make the first letter caps
      let weatherDescription = tempData.weather[0].description;
      let capitalizedWeather =
        weatherDescription.charAt(0).toUpperCase() +
        weatherDescription.slice(1);

      //Add to top of the card
      $(cChild)
        .find("#top-temp")
        .text(
          capitalizedWeather +
            ", " +
            Math.round(tempData.main.temp - 273) +
            "°C"
        );
    });

    $("#trips-container").append($("#tripTemplateCard").html());

    let cChild = $("#trips-container").children().eq(i);

    $(cChild).find("#card-title").text(trip.name);
    $(cChild).find("#card-description").text(trip.description);
    $(cChild)
      .find("#card-price")
      .text("Starting at R" + trip.price + " per person.");
    $(cChild)
      .find(".card-img-top")
      .attr("src", "../assets/home/" + trip.image);
    $(cChild).find("#card-description").hide();
  }
}

// Add carousel slide to home page

function loadCarouselSlides() {
  const carousel = $("#carouselTrips .carousel-inner");

  for (let i = 0; i < tripsArr.length; i++) {
    const trip = tripsArr[i];

    const slide = $($("#tripTemplateSlide").html());
    if (i === 0) {
      slide.addClass("active"); // Add active class to the first slide
    }

    $.ajax({
      type: "GET",
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        trip.location +
        "&appid=0c8a911e5c7f8e5a03991afe2075de21",
      success: function (data) {
        tempData = data;
      },
    }).done(function () {
      //Make the first letter caps
      let weatherDescription = tempData.weather[0].description;
      let capitalizedWeather =
        weatherDescription.charAt(0).toUpperCase() +
        weatherDescription.slice(1);

      //Add to top of the card
      slide
        .find("#destination-weather")
        .text(
          capitalizedWeather +
            ", " +
            Math.round(tempData.main.temp - 273) +
            "°C"
        );
    });

    slide.find("#destination-title").text(trip.name);
    slide.find("#destination-description").text(trip.description);
    slide
      .find("#description-price")
      .text("Starting at R" + trip.price + " per person.");
    slide.find("#slide-img").attr("src", "assets/home/" + trip.image);

    carousel.append(slide);
  }
}

//----------------------------------------------------------
// Filter and Sorting

$("input[name='filteringRadio']").click(function () {
  applFilter = $(this).attr("value");

  sortingFilting();
});

$("input[name='sortingRadio']").click(function () {
  applSort = $(this).attr("value");

  sortingFilting();
});

//----------------------------------------------------------
//The load function

function sortingFilting() {
  let completed = [];

  if (applFilter == "special") {
    completed = tripsArr.filter((trip) => trip.special == "true");
  } else {
    completed = tripsArr;
  }
  //Sort price LOW TO HIGH
  if (applSort == "low to high price") {
    completed = completed.sort((a, b) => {
      return a.price - b.price;
    });
  } else if (applSort == "high to low price") {
    completed = completed.sort((a, b) => {
      return b.price - a.price;
    });
    // Sort Duration
  } else if (applSort == "high to low duration") {
    completed = completed.sort((a, b) => {
      return a.duration - b.duration;
    });
  } else if (applSort == "high to low duration") {
    completed = completed.sort((a, b) => {
      return b.duration - a.duration;
    });
  }

  addTrips(completed);
}

$("#trips-container").on("click", ".card", function () {
  $(this).find("#card-description").toggle();
  $(this).find(".card").toggleClass("extend");
});
