
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
            if (text.includes('hello')||text.includes('Hello')||text.includes('hai')||text.includes('Hai')) {
                talking('hai boss how are you');
                if(text.includes('fine')||text.includes('Fine')||text.includes('good')||text.includes('Good')||text.includes('Great')){
                talking('Its good to know that you are fine boss')
                }
            }
            else if(text.includes('how are you')||('How are you')||('how are you doing')){
                talking('I am doing great boss. Thank you')
            }
            else if(text.includes('Open YouTube')||text.includes('open Youtube')||text.includes('play videos')){

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
            else if(text.includes('Open twitter')||text.includes('Tweet')){
                talking('opening twitter')
                window.open('https://twitter.com/home?lang=en')
            }
            else if(text.includes('Wikipedia')||text.includes('open wikipedia')){
                talking('wikipedia the free encyclopedia')
                window.open('https://www.wikipedia.org/')
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
  
