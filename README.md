# snake-ladder math addition game

The goal of the game is for the player to reach the finish line which is square number 100. To advance, the player must answer the correct square number based on the roll of two dice.

There are two dice which give out random numbers. The result of the two dice will be the number of squares that the player advances to, if his/her answer is correct. If the answer is incorrect, the player will move back by the numbers from the dices.

The player repeat the process above until he/she reacheas the finish line,or the player has the option to reset the game.

## Getting Started

The player press the start button and input his or her name and submit. A cat image to represent the player will appear at the start game button.

Prompts for the player will pop-up, using a modal dialogue that pops up next to the dog gif in the aside column.

## Game Conditions

If the player enters the right answer,a gif of a cat climbing a ladder will appear. The player will be able to advance by the numbers shown on both dice. If the answer is incorrect, a snake image appears and the player will retreat by the numbers shown on the dice or at maximum back to square #1. If the correct answer is greater than 100, the game will limit the player's forward move to square #100. When the player reaches square #100, he/she can then click the trophy to reveal the 'prize.'

### Game Layout

Game is setup into two main parts. The first part consists of the game board containing 10 x 10 squares; squares #1 through #100.

The second part is a form column to hold the game features including:

1. A start game button.
2. An an input field and submit button to store the player's name.
3. A second input field and submit button to store the player's answer.
4. A reset game button.
5. A gif of a dog to represent the game master giving prompts to the player.
6. A 3D image of two dice that the player can click to toggle random dice faces .

### Game Steps

This is a step by step sequence of events how the game runs:

1. Upon pressing the start game button, each square on the game board will get a random color from a color palette array of four colors. The player's avatar will appear on the start game button. A greeting dialogue box will appear to prompt the player to enter his/her name.

2. The player enters his/her name in the name input field and submit. If the player presses a submit button without any value, a dialogue box will appear to remind the player to enter his/her name.

3. Upon submitting the name, a prompt box pops up to address the player's by name and urge him/her to start the game by clicking on the dice.

4. Upon clicking on the image of the 3D dice, the image will rotate twice and then toggle to random dice faces.

5. A prompt dialogue will appears to prompt the player to enter the square number that he/she moves into based on the roll of the dice.

6. When the player enters the answer and presses the submit button, a checkAnswer function runs. There are 4 conditions to the checkAnswer. The correct answer is the sum of the player's current position plus the the number on dice 1 and dice 2.

- If the correct answer is less than square number 100, and the player's answer matches the correct answer, a dialogue box appears to confirm that the answer is correct and to prompt the player to drag the avatar into the correct square. A gif of a cat climbing the ladder appears. When the player drags the avatar into the correct box, a prompt will appear to confirm the drop, otherwise the avatar will revert to the original box.

- If the correct answer is equal to or more than square 100, and the player's answer matches the correct answer, a dialogue box appears to congratulate the player for reaching the finish line and prompt the player to click on the trophy to reveal the prize. The player's avatar will disappear.

- If the player's answer is wrong and the player is currently on square number that is greater than the sum shown on the both dice 1 and dice 2, a dialogue box will show up to tell the player that the answer is incorrect. A snake image appears on the current square and the player is urged to drag the avatar back. The number of square to move back is the sum of dice 1 and dice 2. When the player drops the avatar onto the right box, a dialogue will show to confirm. Otherwise the avatar will revert back to the original box.

-If the player's answer is wrong and the player's current position is on the square that is less than the numbers shown on the dice faces,then a dialogue box appears to notify the player that his/her answer is incorrect and that he/she will have to drag the avatar back to square 1. When the player drops the avatar onto the right box, a dialogue will show to confirm. Otherwise the avatar will revert back to the original box.

7. The player will repeat step 4 to step 6 above until the player reaches the finish line. The player can always press the reset game button at any point in time.

8. Upon clicking the trophy in square 100, a gif of a cat holding a trophy pops up.

### APIs used

1. Player's avatar is a random cat image pulled from (the catImage API)[https://docs.thecatapi.com/]. The player's avatar is the same throughout the game however the avatar changes randomly upon game reset.

2. The gif of a cat climbing a ladder is pulled from (GIPHY)[https://giphy.com/]

3. The image of a snake is pulled from (GIPHY)[https://giphy.com/]

4. The gif of a cat holding a trophy is pulled from (GIPHY)[https://giphy.com/]

### Mobile Responsiveness

When the screen width is 800px or smaller, the game layout changes to column view. The game control panel is stacked on top of the game board. Both the game board and the panel fit into the view width port so that any overflow will only be vertical scrolls.

![ScreenShot Small](https://github.com/jencwong/snake-ladder/issues/1#issue-511332831)

When the screen width is 800px or wider, the game layout is row reverse with the panel on the right side of the game board. Likewise, the game board and the panel fit into the view width port.

![ScreenShot Large](https://github.com/jencwong/snake-ladder/issues/2#issue-511337385)

### User Interface

- Drag and drop feature for user to move the avatar forward and backward.
- Clicking on the image of the 3D dice to reveal random dice numbers.
- Inputing name and math answers in the respective input fields.
- Clicking on the trophy to toggle a gif.
- Start and reset game buttons.

### Game Image Resources

Besides the images and gif pulled from the APIs discussed above, I downloaded free images from the following sites:

1. Dog gif is embedded from (GIPHY)[https://giphy.com/]

2. The 3D dice and the dice face images are from (free-icons).[https://www.flaticon.com/free-icons/dice]

3. The image of the trophy is from (free-icons).[https://www.flaticon.com/free-icons/dice]

4. The graphic of the snake, dice and ladder is from (pngfly)[https://www.pngfly.com/png-00kll8/]

### Deployment

Add additional notes about how to deploy this on a live system

## Versioning

Use gitHub for versioning. For the versions available, see the [the project repository](https://github.com/jencwong/snake-ladder).

## Authors

- **Jen C Wong** -

## Acknowledgments

- Thanks to project instructor Leo for guiding with scope, milestones, and APIs.
- Thans to Brian and Joem for helping along with CSS, jQuery and game logic.
- Hat tip to anyone whose code was used, including GA SEI instructors' notes, w3 schools, jQuery, Stack Overflow.
- Inspiration is from the Snake and Ladder Game Board.
