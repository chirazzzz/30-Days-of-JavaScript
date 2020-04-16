/** Full explaination for alternative here 
 * https://medium.com/javascript-in-plain-english/how-to-detect-a-sequence-of-keystrokes-in-javascript-83ec6ffd8e93 **/

const keysPressedGithub = [];
const githubCode = 'chirazzzz';

window.addEventListener('keyup', (e) => {
  console.log(e.key);
  keysPressedGithub.push(e.key);
  // console.log(-keysPressed.length);
  keysPressedGithub.splice(-githubCode.length - 1, keysPressedGithub.length - githubCode.length);
  if (keysPressedGithub.join('').includes(githubCode)) {
    console.log('You did it!');
    cornify_add();
  }
  console.log(keysPressedGithub);
});