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
  let previousPosition = "";
  let catImg = "";
  let winnerImg = "";
  let snakeImg = "";
  const colors = ["#42f569", "#425df5", "#f54242", "#fff04f"];

  //  callback functions here:
  //   color the squares:
  const color = () => {
    for (i = 0; i < 100; i++) {
      $(".square")
        .eq(i)
        .css("background-color", colors[Math.floor(Math.random() * 4)]);
    }
  };

  const greet = () => {
    $("#myModal").css("display", "flex");
    $("#player-name").text(`Hello, enter your name to get started.`);
  };
  //  get cat picture for player function
  // const pullCat = table => {
  //   catImg = $("<img>")
  //     .addClass("draggable")
  //     .addClass("catpix")
  //     .attr("src", table[0].url);
  //   catImg.appendTo($("#startbox")).draggable();
  // };

  const pullCat = table => {
    catImg = $("<img>")
      .addClass("catpix")
      .attr("src", table[0].url);
    $("#startbox").append(catImg);
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
    $(`#${previousPosition}`).append(snakeImg);
  };

  //   get snake climbing ladder giphy
  const pullLadder = giphy => {
    ladderImg = $("<img>")
      .addClass("ladder")
      .attr("src", giphy.data[0].images.original.url);
    $(`#${previousPosition}`).append(ladderImg);
  };

  // rotate the dice
  const rotateDice = () => {
    $(".dice").on("click", event => {
      event.preventDefault();
      $(".dices").addClass("rotate");
      setTimeout(function() {
        rollDice();
      }, 1500);
      setTimeout(function() {
        $(".dices").removeClass("rotate");
      }, 1500);
    });
  };

  // generate random numbers from 1 to 6 inclusive for dice 1

  const rollDice = () => {
    diceNum1 = Math.floor(Math.random() * 6 + 1);
    console.log(diceNum1);

    diceNum2 = Math.floor(Math.random() * 6 + 1);
    console.log(diceNum2);

    // hide the current dice
    $("#dice1").hide();
    $("#dice2").hide();

    // clear out dice face if any
    $("#placedice1")
      .children()
      .eq(1)
      .remove();

    $("#placedice2")
      .children()
      .eq(1)
      .remove();

    // now display the roll
    $("#placedice1").append(
      $(".diceface")
        .children()
        .eq(diceNum1 - 1)
        .clone()
        .css("display", "inline")
    );
    // now display the roll
    $("#placedice2").append(
      $(".diceface")
        .children()
        .eq(diceNum2 - 1)
        .clone()
        .css("display", "inline")
    );
    // remind the player to answer question
    $("#myModal").css("display", "flex");

    $("#player-name").text(
      `${playerName}, please enter the square number you should move forward to.`
    );
  };

  // tooltip function

  $(function() {
    $("#trophy").tooltip();
    $(".dices").tooltip();
  });

  // Make the element draggable
  // const initDrag = event => {
  //   $("#makeDraggable").draggable({
  //     // containment: $(`#main-grid`),
  //     cursor: "move",
  //     snap: $(`#${currentPosition}`),
  //     stop: handleDragStop
  //   });
  // };
  // $(".container").on("click", ".catpix", event => {
  //   $(event.currentTarget).draggable({
  //     containment: $(`#${currentPosition}`),
  //     cursor: "move",
  //     snap: $(`#${currentPosition}`),
  //     stop: handleDragStop
  //   });
  // });
  // };

  // function handleDragStop(event, ui) {
  //   var offsetXPos = parseInt(ui.offset.left);
  //   var offsetYPos = parseInt(ui.offset.top);
  //   // $("#myModal").css("display", "flex");

  //   // $("#player-name").text(`Completed dragging.`);
  //   console.log("stopped dragging");
  // }

  // const initDrop = grid => {
  //   $(`#${grid}`).droppable({
  //     accept: "#makeDraggable",
  //     drop: function(ev, ui) {
  //       let droppedItem = $(ui.draggable);
  //       $(this).append(droppedItem);

  //       console.log("You dropped it correctly!");
  //     }
  //   });
  // };

  // function handleDropEvent(event, ui) {
  //   var draggable = ui.draggable;
  //   $("#myModal").css("display", "flex");

  //   $("#player-name").text(
  //     `Drop is completed. ${playerName}, let's continue by clicking on the dice.`
  //   );
  // }

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
    previousPosition = 0;
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

    // Make the element draggable
    const initDrag = event => {
      $("#makeDraggable").draggable({
        // containment: $(`#main-grid`),
        cursor: "move",
        snap: $(`#${currentPosition}`),
        stop: handleDragStop
      });
    };

    function handleDragStop(event, ui) {
      var offsetXPos = parseInt(ui.offset.left);
      var offsetYPos = parseInt(ui.offset.top);
      // $("#myModal").css("display", "flex");

      // $("#player-name").text(`Completed dragging.`);
      console.log("stopped dragging");
    }

    const initDrop = grid => {
      $(`#${currentPosition}`).droppable({
        accept: "#makeDraggable",
        drop: function(ev, ui) {
          let droppedItem = $(ui.draggable);
          $(this).append(droppedItem);

          console.log("You dropped it correctly!");
        }
      });
    };

    function handleDropEvent(event, ui) {
      var draggable = ui.draggable;
      $("#myModal").css("display", "flex");

      $("#player-name").text(
        `Drop is completed. ${playerName}, let's continue by clicking on the dice.`
      );
    }
    // set conditions:
    if (playerAnswer === correctAnswer && correctAnswer < 100) {
      previousPosition = currentPosition;
      currentPosition = correctAnswer;

      //   insert modal
      $("#myModal").css("display", "flex");

      $("#player-name").text(
        `Correct! ${playerName} your avatar will move to box #${currentPosition} and then go ahead click on the dice to continue.`
      );
      // }, 5000);

      // initDrag();
      // initDrop();

      $.ajax({ url: endpoint4 }).then(pullLadder);
      setTimeout(function() {
        $(`#${currentPosition}`).append(catImg);
        // $(`#makeDraggable`).append(catImg);
        // initDrag();
        // initDrop(currentPosition);
      }, 5000);
    } else if (playerAnswer === correctAnswer && correctAnswer === 100) {
      previousPosition = currentPosition;
      currentPosition = Math.min(correctAnswer, 100);
      //   insert modal
      $("#myModal").css("display", "flex");

      $("#player-name").text(
        `Congratulations ${playerName}!! You reached the finish line! Go ahead and click on the trophy to reveal your prize!`
      );
      $.ajax({ url: endpoint4 }).then(pullLadder);

      setTimeout(function() {
        $(`#${currentPosition}`).append(catImg);
      }, 5000);

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
      previousPosition = currentPosition;
      //   insert modal
      $("#myModal").css("display", "flex");
      $("#player-name").text(
        `Sorry ${playerName}, the answer is incorrect, the snake got you and you move back to box #${currentPosition}`
      );
      $.ajax({ url: endpoint3 }).then(pullSnake);
      currentPosition -= change;

      setTimeout(function() {
        $(`#${currentPosition}`).append(catImg);
      }, 2000);

      //   insert another prompt
      $("#myModal").css("display", "flex");
      $("#player-name").text(`${playerName}, click on the dice to continue.`);
    } else if (playerAnswer !== correctAnswer && currentPosition < change) {
      previousPosition = currentPosition;
      $("#myModal").css("display", "flex");
      $("#player-name").text(
        `Sorry ${playerName}, the answer is incorrect, the snake got you and you move back to box #${currentPosition}`
      );
      $.ajax({ url: endpoint3 }).then(pullSnake);
      currentPosition = 1;
      setTimeout(function() {
        $(`#${currentPosition}`).append(catImg);
      }, 2000);

      //   insert another prompt
      $("#myModal").css("display", "flex");
      $("#player-name").text(`${playerName}, click on the dice to continue.`);
    }
  };

  //   event handlers here
  $("#startbox").on("click", event => {
    // first color the grid
    color();
    // then pull cat image
    $.ajax({ url: endpoint }).then(pullCat);
    // greet the player
    greet();
    // hide the dialogue
    // $(".close").on("click", event => {
    //   $("#myModal").css("display", "none");
    // });

    // Game starts below:
    // on submitting name
    $("#button1").on("click", event => {
      event.preventDefault();
      playerName = $("#input-box1").val();
      console.log(playerName);
      if (playerName === "") {
        //insert modal
        $("#myModal").css("display", "flex");

        $("#player-name").text("Please enter your name first!");

        // $(".close").on("click", event => {
        //   $("#myModal").css("display", "none");
        // });
      } else {
        $("#myModal").css("display", "flex");

        $("#player-name").text(
          `Hello ${playerName}. Please click on the dice.`
        );
      }
      // $(".close").on("click", event => {
      //   $("#myModal").css("display", "none");
      // });
      $("#input-box1").val("");
    });

    $(".close").on("click", event => {
      $("#myModal").css("display", "none");
      $(".snake").hide();
      $(".ladder").hide();
    });

    // $(".dice").on("click", () => {
    //   $(".dice").toggleClass("rotate");
    // });

    // setTimeout(function() {
    //   rollDice();
    // }, 2000);
    // $("#dice2").on("click", rollDice2);

    rotateDice();
    // if ($(".dice").hasClass("rotate")) {
    //   $(".dice").removeClass("rotate");
    // }

    $("#button2").on("click", event => {
      // $(".dice").removeClass("rotate");
      event.preventDefault();
      convert();
      checkAnswer();
      resetDice();
      // $("#myModal").css("display", "flex");

      // $("#player-name").text(
      //   `${playerName}. Please click on the dices to continue.`
      // );
      rotateDice();
      // $(".dice").removeClass("rotate");
      // setTimeout(function() {
      //   rollDice();
      // }, 2000);
    });

    $("#button3").on("click", event => {
      resetGame();
    });
  });
  //   $.ajax({ url: endpoint3 }).then(pullSnake);
});
