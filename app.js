console.log("linked");

$(() => {
  // variables here
  const endpoint = "https://api.thecatapi.com/v1/images/search?";

  let diceNum1 = 0;
  let diceNum2 = 0;
  let playerName = "";
  let currentPosition = 0;
  let catImg = "";

  //  callback functions here:

  //  get cat picture function
  const pullCat = table => {
    catImg = $("<img>")
      .addClass("catpix")
      .attr("src", table[0].url);
    $("body").append(catImg);
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
      `${playerName}, please enter, in the box below, the square number you should move forward to.`
    );
  };

  //   event handlers here
  $.ajax({ url: endpoint }).then(pullCat);

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
    }
  });

  const convert = () => {
    for (i = 0; i < 100; i++) {
      let type = $("#main-grid").children()[i].id;
      //   .children()
      //   .eq(5)[0].id;
      //
      //   console.log(typeof $("#main-grid").children()[0].id);
      type = Number(type);
      //   console.log(typeof type);
    }
  };

  const checkAnswer = () => {
    let correctAnswer = currentPosition + diceNum1 + diceNum2;
    if (correctAnswer > 100) {
      correctAnswer = Math.min(correctAnswer, 100);
    } else {
      correctAnswer = Math.max(correctAnswer, 0);
    }
    console.log(correctAnswer);

    const playerAnswer = Number($("#input-box2").val());
    console.log(playerAnswer);
    // set conditions:
    if (playerAnswer === correctAnswer && correctAnswer <= 100) {
      currentPosition = correctAnswer;
      //   insert modal
      $("#myModal").css("display", "flex");

      $("#player-name").text(
        `Correct! ${playerName} can move forward to box #${currentPosition}`
      );
      $(`#${currentPosition}`).append(catImg);
    } else if (playerAnswer === correctAnswer && correctAnswer > 100) {
      currentPosition = Math.min(correctAnswer, 100);
      //   insert modal
      $("#myModal").css("display", "flex");

      $("#player-name").text(
        `Congratulations ${playerName}!! You reached the finish line!`
      );
      $(`#${currentPosition}`).append(catImg);
    } else if (playerAnswer !== correctAnswer) {
      if ((currentPosition -= correctAnswer > 0)) {
        currentPosition -= correctAnswer;
        //   insert modal
        $("#myModal").css("display", "flex");
        $("#player-name").text(
          `Sorry ${playerName}, the answer is incorrect, the snake got you and you move back to box #${currentPosition}`
        );
        $(`#${currentPosition}`).append(catImg);
      } else {
        currentPosition = 1;
        $("#myModal").css("display", "flex");
        $("#player-name").text(
          `Sorry ${playerName}, the answer is incorrect, the snake got you and you move back to box #${currentPosition}`
        );
        $(`#${currentPosition}`).append(catImg);
      }
    }
    // } else if (
    //   playerAnswer !== correctAnswer &&
    //   currentPosition < correctAnswer
    // ) {
    //   currentPosition -= correctAnswer;
    //   //   insert modal
    //   $("#myModal").css("display", "flex");

    //   $("#player-name").text(
    //     `Sorry ${playerName}, the answer is incorrect, the snake got you and you move back to box #${currentPosition}`
    //   );
    //   $(`#${currentPosition}`).append(catImg);
    // }
  };

  const resetDice = () => {
    $(".dices").show();
    $(".faces").hide();
    $("#input-box2").val("");
  };

  // Game starts below:

  $(".close").on("click", event => {
    $("#myModal").css("display", "none");
  });

  $("#dice1").on("click", rollDice1);
  $("#dice2").on("click", rollDice2);

  $("#button2").on("click", event => {
    event.preventDefault();
    convert();
    checkAnswer();
    resetDice();
  });
});
