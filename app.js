console.log("linked");

$(() => {
  // variables here
  const endpoint = "https://api.thecatapi.com/v1/images/search?";

  //  callback functions here:
  const pullCat = table => {
    const catImg = $("<img>")
      .addClass("catpix")
      .attr("src", table[0].url);
    $("body").append(catImg);
  };

  //   event handlers here
  $.ajax({ url: endpoint }).then(pullCat);

  $("button").on("click", event => {
    event.preventDefault();
    let playerName = $("#input-box").val();
    console.log(playerName);
    if (playerName === "") {
      //insert modal
      $("#myModal").css("display", "flex");

      $("#player-name").text("Please enter your name first!");
    } else {
      $("#myModal").css("display", "flex");

      $("#player-name").text(
        `Hello ${playerName}. Let's begin by clicking the dice.`
      );
    }
  });

  $(".close").on("click", event => {
    $("#myModal").css("display", "none");
  });
});
