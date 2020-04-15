/** Get our elements **/
const player = document.querySelector('.player');  
//get the elements within the player
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
//get the elements with multiple instances
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/** Build our functions **/
function togglePlay() {  
  // const method = video.paused ? 'play' : 'pause'
  // video[method]()
  if(video.paused) {
    video.play()
  } else {
    video.pause();
  }
}

// This toggle play/pause whenever the video is paused not just user interaction! 
function updateButton() {
  const buttonIcon = this.paused ? '▶' : '❚ ❚';
  console.log(buttonIcon);
  toggle.textContent = buttonIcon;
}

function skip() {
  // const currentDuration = video.currentTime;
  // console.log(currentDuration); // to show how far video has been played
  // console.log(this.dataset.skip); // .dataset allows you to create custom attributes 
  // video.currentTime = this.dataset.skip === '-10' ? currentDuration - 10 : currentDuration + 20;
  // Teacher Solution
  video.currentTime += parseFloat(this.dataset.skip); // DRY CODE - parseFloat converts string to num
}

function adjustSlider() {
  // My solution
  // if (this.name === 'volume') {
  //   video.volume = this.value;
  // }
  // if (this.name === 'playbackRate') {
  //   video.playbackRate = this.value;
  // }
  // Teacher solution
  video[this.name] = this.value;
}

// I didn't code this functionality because you can easily use video.js to import progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/** Hook up event listeners **/
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);


toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(slider => slider.addEventListener('change', adjustSlider));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);