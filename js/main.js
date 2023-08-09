const tripsArr = [
  {
    name: "Tropical Paradise Getaway",
    description:
      "Escape to sun-kissed shores, turquoise waters, and palm-fringed beaches in this tropical paradise cruise. Immerse yourself in vibrant local cultures, indulge in exotic cuisine, and bask in the warmth of the tropics.",
    price: 20999,
    image: "1.jpg",
  },
  {
    name: "Majestic Fjords Expedition",
    description:
      "Embark on a journey through breathtaking fjords, towering cliffs, and pristine glaciers. Discover the awe-inspiring beauty of nature as you explore remote landscapes and witness wildlife in its natural habitat.",
    price: 27199,
    image: "2.jpg",
  },
  {
    name: "Historical European Discovery",
    description:
      "Step back in time as you sail along the picturesque coastlines of Europe. Uncover the rich history, charming villages, and iconic landmarks that have shaped the continent. Immerse yourself in the Old World charm of Europe's most beloved cities.",
    price: 30599,
    image: "3.jpg",
  },
  {
    name: "Exotic Asian Odyssey",
    description:
      "Embark on a cultural immersion through the diverse and enchanting landscapes of Asia. From bustling metropolises to serene temples, experience the contrasts and beauty of this captivating continent.",
    price: 23049,
    image: "4.jpg",
  },
  {
    name: "Polar Expedition: Arctic Wonders",
    description:
      "Venture to the Arctic Circle and witness the enchanting world of icebergs, polar bears, and the mesmerizing Northern Lights. Explore the untouched wilderness of the Arctic and create memories of a lifetime.",
    price: 19999,
    image: "5.jpg",
  },
  {
    name: "Caribbean Rhythms Cruise",
    description:
      "Dive into the vibrant energy of the Caribbean as you visit multiple tropical islands. From reggae beats to pristine coral reefs, this cruise offers a perfect blend of relaxation and adventure.",
    price: 24499,
    image: "6.jpg",
  },
  {
    name: "Transatlantic Crossing",
    description:
      "Experience the classic elegance of ocean travel with a transatlantic crossing. Enjoy leisurely days at sea, engaging activities, and luxurious accommodations as you journey between continents.",
    price: 35999,
    image: "7.jpg",
  },
];

$(document).ready(function () {
  $("#card-description").hide();
  addTrips();
});

function addTrips() {
  for (let i = 0; i < tripsArr.length; i++) {
    const trip = tripsArr[i];
    $("#trips-container").append($("#tripTemplateCard").html());

    let cChild = $("#trips-container")
      .children()
      .eq(i + 1);

    $(cChild).find("#card-title").text(trip.name);
    $(cChild).find("#card-description").text(trip.description);
    $(cChild)
      .find("#card-price")
      .text("Starting at R" + trip.price + " per person.");
    $(cChild)
      .find(".card-img-top")
      .attr('src', '../assets/' + 'Trips/' + trip.image);
    $(cChild).find("#card-description").hide();
  }
}

$("#trips-container").on("click", ".card", function () {
  $(this).find("#card-description").toggle();
  $(this).find(".card").toggleClass("extend");
});
