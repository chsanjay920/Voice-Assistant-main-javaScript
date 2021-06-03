
displayClock()
function startRocket() {
    move()
    startRecognization()
    // frequency_bar()
}

function startRecognization() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    
    recognition.addEventListener('result', (e) => {
        const text = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
        console.log('------------------------**');
        console.log(text);

        if (e.results[0].isFinal) {
            if (text.includes('Hello','hello','hai')) {
                talking('hai boss how are you');
            }
            else if(text.includes('Open YouTube','open youtube','YouTube','play videos')){

              talking('Executing command')
              window.open('https://www.youtube.com/');
            }
            else if(text.includes('Open WhatsApp')){
              talking('Executing whatsapp')
              window.open('https://www.whatsapp.com/?lang=en','_blank');
            }
            else if(text.includes('Open Instagram')){
              talking('opening insta grammer')
              window.open('https://www.instagram.com/','_blank')
            }
        }
    })
    recognition.addEventListener('end', () => {
        recognition.start();
    })
    recognition.start();
}

function talking(speechToSpeek) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(speechToSpeek));
}

var i = 0;

function move() {
    talking(' .... initializing voice assistant .......... checking internet connection..')
    talking('All set aready to launch   ....  hai i am rocket a personal voice assistant ')
    // setTimeout(() => {
    //     hideProgressBar()
    // }, 7000);
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 1;
        var id = setInterval(frame, 70);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
            } else {
                width++;
                elem.style.width = width + "%";
            }
        }
    }
}

// function hideProgressBar(){
//     document.getElementById('progress_bar').style.display = "none";
//     // document.getElementById('initialization').style.display = "";
// }

// function frequency_bar() {
//     var analyser, animationLoop, audioContext, buf, canvas, compressor, freq, getPitch, minSamples, noteFromPitch, pitchDisplay, samples, updatePitch, visualize, zoom;
  
//     navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  
//     audioContext = new window.AudioContext();
  
//     compressor = audioContext.createDynamicsCompressor();
  
//     analyser = audioContext.createAnalyser();
  

//     canvas = document.querySelector('canvas');
  
//     // canvas.width = 350%;
  
//     // canvas.height = 80%;
  
//     samples = 256;
  
//     zoom = document.querySelector('.zoom');
  
//     zoom.onchange = function() {
//       switch (this.value) {
//         case '1':
//           samples = 128;
//           break;
//         case '2':
//           samples = 256;
//           break;
//         case '3':
//           samples = 512;
//           break;
//         case '4':
//           samples = 1024;
//           break;
//         case '5':
//           samples = 2048;
//       }
//       return console.log(samples);
//     };
  
//     pitchDisplay = document.querySelector('.pitch');
  
//     freq = document.querySelector('.freq');
  
//     minSamples = 0;
  
//     buf = new Float32Array(1024);
  
//     getPitch = function(buffer) {
//       var bestCorrelation, bestOffset, correlation, correlations, foundGoodCorrelation, i, lastCorrelation, maxSamples, offset, rms, shift, size, val;
//       size = buffer.length;
//       maxSamples = Math.floor(size / 2);
//       bestOffset = -1;
//       bestCorrelation = 0;
//       rms = 0;
//       foundGoodCorrelation = false;
//       correlations = [];
//       i = 0;
//       while (i < size) {
//         val = buffer[i];
//         rms += val * val;
//         i++;
//       }
//       rms = Math.sqrt(rms / size);
//       if (rms < 0.01) {
//         // not enough signal
//         return "-";
//       }
//       lastCorrelation = 1;
//       offset = minSamples;
//       while (offset < maxSamples) {
//         correlation = 0;
//         i = 0;
//         while (i < maxSamples) {
//           correlation += Math.abs(buffer[i] - buffer[i + offset]);
//           i++;
//         }
//         correlation = 1 - (correlation / maxSamples);
//         correlations[offset] = correlation;
//         if (correlation > 0.9 && correlation > lastCorrelation) {
//           foundGoodCorrelation = true;
//           if (correlation > bestCorrelation) {
//             bestCorrelation = correlation;
//             bestOffset = offset;
//           }
//         } else if (foundGoodCorrelation) {
//           shift = (correlations[bestOffset + 1] - correlations[bestOffset - 1]) / correlations[bestOffset];
//           return audioContext.sampleRate / (bestOffset + (8 * shift));
//         }
//         lastCorrelation = correlation;
//         offset++;
//       }
//       if (bestCorrelation > 0.01) {
//         return audioContext.sampleRate / bestOffset;
//       }
//       // no good match
//       return -1;
//     };
  
//     noteFromPitch = function(frequency) {
//       var noteNum, noteStrings;
//       noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
//       noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
//       noteNum = Math.round(noteNum) + 69;
//       return noteStrings[noteNum % 12];
//     };
  
//     updatePitch = function() {
//       var normalize, pitch;
//       normalize = function(num) {
//         var multiplier;
//         multiplier = Math.pow(10, 2);
//         return Math.round(num * multiplier) / multiplier;
//       };
//       analyser.getFloatTimeDomainData(buf);
//       pitch = getPitch(buf);
//       if (pitch > 0) {
//         pitchDisplay.innerHTML = noteFromPitch(pitch);
//       }
//       var s = "Frequency : "
//       return freq.innerHTML = s + pitch;
//     };
  
//     visualize = function() {
//       var drawContext, h, i, normalize, points, w;
//       normalize = function(y, h) {
//         return y / 256 * h;
//       };
//       w = canvas.width;
//       h = canvas.height;
//       points = new Uint8Array(samples);
//       analyser.getByteTimeDomainData(points);
//       drawContext = canvas.getContext('2d');
//       drawContext.clearRect(0, 0, w, h);
//       drawContext.strokeStyle = '#C2EDF2';
//       drawContext.lineWidth = 3;
//       drawContext.lineCap = 'butt';
//       drawContext.lineJoin = 'miter';
//       drawContext.beginPath();
//       drawContext.moveTo(0, normalize(points[0], h));
//       i = 0;
//       while (i < points.length) {
//         drawContext.lineTo(w * (i + 1) / points.length, normalize(points[i], h));
//         i++;
//       }
//       return drawContext.stroke();
//     };
  
//     animationLoop = function() {
//       visualize();
//       updatePitch();
//       return window.requestAnimationFrame(animationLoop);
//     };
  
//     navigator.getUserMedia({
//       audio: true
//     }, function(stream) {
//       var microphone;
//       microphone = audioContext.createMediaStreamSource(stream);
//       microphone.connect(compressor);
//       compressor.connect(analyser);
//       return window.requestAnimationFrame(animationLoop);
//     }, function(e) {
//       return console.log(`error: ${e}`);
//     });
  
//   }

  function displayClock() {
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let clock = document.querySelector(".clock");
    let session = "AM";
    if (hours > 12) session = "PM";
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    let time = hours + ":" + minutes + ":" + seconds + " " + session;
    clock.innerHTML = time;
  }
  
