function startRocket() {
    displayClock()
    move()
    startRecognization()
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
            if (text.includes('hello') || text.includes('Hello') || text.includes('hai') || text.includes('Hai')) {
                talking('hai boss how are you');
            }
            else if (text.includes('fine') || text.includes('Fine') || text.includes('good') || text.includes('Good') || text.includes('Great')) {
                talking('Ready to assist yor sir')
            }
            else if (text.includes('how are you') || text.includes('How are you')) {
                talking('I am doing great boss. Thank you')
            }
            else if(text.includes('What is your name')|| text.includes('your good name please')){
                talking('I am Rocket. I am your personal voice assistant')
            }
            else if (text.includes('Open YouTube') || text.includes('open YouTube') || text.includes('play videos') || text.includes('open Youtube') || text.includes('Youtube')) {
                talking('Executing command')
                window.open('https://www.youtube.com/');
            }
            else if (text.includes('Open WhatsApp') || text.includes('open WhatsApp') || text.includes('WhatsApp') || text.includes('messages')) {
                talking('Executing command')
                window.open('https://www.whatsapp.com/?lang=en', '_blank');
            }
            else if (text.includes('Open Instagram') || text.includes('open Instagram') || text.includes('Reels') || text.includes('Instagram')) {
                talking('opening insta grammer')
                window.open('https://www.instagram.com/', '_blank')
            }
            else if (text.includes('Open Twitter') || text.includes('Tweet') || text.includes('open Twitter')) {
                talking('opening tweetter')
                window.open('https://twitter.com/home?lang=en')
            }
            else if (text.includes('Wikipedia') || text.includes('open wikipedia')) {
                talking('Search the free encyclopedia')
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

