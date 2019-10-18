console.log("linked");

$(() => {
  // variables here
  const endpoint = "https://api.thecatapi.com/v1/images/search?";

  const endpoint2 =
    "https://api.giphy.com/v1/stickers/search?api_key=8VJTRcjSYCnl2h7MQxOwwSCqBnp7LeJi&q=winner cat &limit=25&offset=0&rating=G&lang=en";

  const endpoint3 =
    "https://api.giphy.com/v1/stickers/search?api_key=8VJTRcjSYCnl2h7MQxOwwSCqBnp7LeJi&q=snake&limit=25&offset=0&rating=G&lang=en";

  const endpoint4 =
    "https://api.giphy.com/v1/gifs/search?api_key=8VJTRcjSYCnl2h7MQxOwwSCqBnp7LeJi&q=cat climbing ladder&limit=25&offset=0&rating=G&lang=en";

  let diceNum1 = 0;
  let diceNum2 = 0;
  let playerName = "";
  let currentPosition = 0;
  let catImg = "";
  let winnerImg = "";
  let snakeImg = "";

  //  callback functions here:

  //  get cat picture for player function
  const pullCat = table => {
    catImg = $("<img>")
      .addClass("catpix")
      .attr("src", table[0].url);
    $("body").append(catImg);
  };

  //   get winner stickery on click of trophy
  const pullSticker = data => {
    console.log(data);
    console.log(data.data[0].url);
    winnerImg = $("<img>")
      .addClass("winner")
      .attr("src", data.data[0].images.original.url);
    $("#main-grid").append(winnerImg);
    $("#trophy").hide();
  };

  // get snake sticker
  const pullSnake = image => {
    snakeImg = $("<img>")
      .addClass("snake")
      .attr("src", image.data[0].images.original.url);
    $(`#${currentPosition}`).append(snakeImg);
  };

  //   get snake climbing ladder giphy
  const pullLadder = giphy => {
    ladderImg = $("<img>")
      .addClass("ladder")
      .attr("src", giphy.data[0].images.original.url);
    $(`#${currentPosition}`).append(ladderImg);
  };

  // generate random numbers from 1 to 6 inclusive for dice 1

  const rollDice1 = () => {
    diceNum1 = Math.floor(Math.random() * 6 + 1);
    console.log(diceNum1);
    // hide the current dice
    $("#dice1").hide();

    // now display the roll
    $("#placedice1").append(
      $(".diceface")
        .children()
        .eq(diceNum1 - 1)
        .clone()
        .css("display", "block")
    );
  };

  const rollDice2 = () => {
    diceNum2 = Math.floor(Math.random() * 6 + 1);
    console.log(diceNum2);
    // hide the current dice
    $("#dice2").hide();
    // now display the roll
    $("#placedice2").append(
      $(".diceface")
        .children()
        .eq(diceNum2 - 1)
        .clone()
        .css("display", "block")
    );
    // remind the player to answer question
    $("#myModal").css("display", "flex");

    $("#player-name").text(
      `${playerName}, please enter the square number you should move forward to.`
    );
  };

  const resetDice = () => {
    $(".dices").show();
    $(".faces").hide();
    $("#input-box2").val("");
  };

  const resetGame = () => {
    diceNum1 = 0;
    diceNum2 = 0;
    playerName = "";
    currentPosition = 0;
    catImg = "";
    $.ajax({ url: endpoint }).then(pullCat);
    // $("100").detach(catImg);
  };

  const convert = () => {
    for (i = 0; i < 100; i++) {
      let type = $("#main-grid").children()[i].id;
      //   .children()
      //   .eq(5)[0].id;
      //
      //console.log(typeof $("#main-grid").children()[0].id);
      //   console.log(typeof type);
      type = Number(type);
    }
  };

  const checkAnswer = () => {
    let change = diceNum1 + diceNum2;
    let correctAnswer = currentPosition + change;
    if (correctAnswer > 100) {
      correctAnswer = Math.min(correctAnswer, 100);
    } else {
      correctAnswer = Math.max(correctAnswer, 0);
    }
    console.log(correctAnswer);

    const playerAnswer = Math.min(Number($("#input-box2").val()), 100);
    // playerAnswer = Math.min(playerAnswer, 100);
    console.log(playerAnswer);
    // set conditions:
    if (playerAnswer === correctAnswer && correctAnswer < 100) {
      currentPosition = correctAnswer;
      //   insert modal
      $("#myModal").css("display", "flex");

      $("#player-name").text(
        `Correct! ${playerName} can move forward to box #${currentPosition}`
      );
      $.ajax({ url: endpoint4 }).then(pullLadder);
      $(`#${currentPosition}`).append(catImg);
    } else if (playerAnswer === correctAnswer && correctAnswer === 100) {
      currentPosition = Math.min(correctAnswer, 100);
      //   insert modal
      $("#myModal").css("display", "flex");

      $("#player-name").text(
        `Congratulations ${playerName}!! You reached the finish line! Go ahead and click on the trophy to reveal your prize!`
      );
      $.ajax({ url: endpoint4 }).then(pullLadder);
      $(`#${currentPosition}`).append(catImg);

      $("#trophy").on("click", event => {
        catImg.detach();
        $.ajax({ url: endpoint2 }).then(data => {
          console.log(data);
          pullSticker(data);
        });
      });
      // resetGame();
      // $.ajax({ url: endpoint }).then(pullCat);
    } else if (playerAnswer !== correctAnswer && currentPosition > change) {
      //   insert modal
      $("#myModal").css("display", "flex");
      $("#player-name").text(
        `Sorry ${playerName}, the answer is incorrect, the snake got you and you move back to box #${currentPosition}`
      );
      $.ajax({ url: endpoint3 }).then(pullSnake);
      currentPosition -= change;
      $(`#${currentPosition}`).append(catImg);
    } else if (playerAnswer !== correctAnswer && currentPosition < change) {
      $("#myModal").css("display", "flex");
      $("#player-name").text(
        `Sorry ${playerName}, the answer is incorrect, the snake got you and you move back to box #${currentPosition}`
      );
      $.ajax({ url: endpoint3 }).then(pullSnake);
      currentPosition = 1;
      $(`#${currentPosition}`).append(catImg);
    }
  };

  //   event handlers here
  $.ajax({ url: endpoint }).then(pullCat);

  // Game starts below:
  $("#button1").on("click", event => {
    event.preventDefault();
    playerName = $("#input-box1").val();
    console.log(playerName);
    if (playerName === "") {
      //insert modal
      $("#myModal").css("display", "flex");

      $("#player-name").text("Please enter your name first!");
    } else {
      $("#myModal").css("display", "flex");

      $("#player-name").text(
        `Hello ${playerName}. Let's begin by clicking each dice one by one.`
      );
      $("#input-box1").val("");
    }
  });

  $(".close").on("click", event => {
    $("#myModal").css("display", "none");
    $(".snake").hide();
    $(".ladder").hide();
  });

  $("#dice1").on("click", rollDice1);
  $("#dice2").on("click", rollDice2);

  $("#button2").on("click", event => {
    event.preventDefault();
    convert();
    checkAnswer();
    resetDice();
  });

  $("#button3").on("click", event => {
    resetGame();
  });

  //   $.ajax({ url: endpoint3 }).then(pullSnake);
});
