const video = document.querySelector('.player');
const canvas = document.querySelector('.photo'); // needed for any canvas project
const ctx = canvas.getContext('2d');             // must have ctx with canvas
const strip = document.querySelector('.strip');  // where we keep photos

function getVideo() {// getUserMedia must have MediaStreamConstraints
  navigator.mediaDevices.getUserMedia({ video: true, audio: false}) // returns promise
    .then(MediaStream => {
      console.log(MediaStream); // MediaStream is an object
      video.srcObject = MediaStream; // video.srcObject is different to teacher video
      video.play();
    }).catch(err => {
      console.error(`Oh no!! You need to allow the site to use your webcam, ${err}`);
      alert(`Please reload and allow the site to access your webcam`);
    })
}

function frameToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  console.log(width, height);
  canvas.width = width; // want width and height to
  canvas.height = height;  // match what webcam outputs

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height); // 0, 0 is for x, y axis. width/height
  }, 15);
}

function takePhoto() {
  // get data from canvas
  const data = canvas.toDataURL('image/jpg');
  // console.log(data);  returns a text based version of photo
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome" />`;
  strip.insertBefore(link, strip.firstChild); // how to prepend in vanilla JS
}

getVideo();

video.addEventListener('canplay', frameToCanvas); // canplay event is emitted by video