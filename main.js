displayClock()
function startRocket() {
//     displayClock()
    move()
    startRecognization()
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();
function startRecognization() {

    recognition.interimResults = true;
    recognition.addEventListener('result', (e) => {
        const text = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
        console.log('------------------------**');
        console.log(text);

        if (e.results[0].isFinal) {
            if (text.includes('rocket') || text.includes("Rocket")) {
                document.getElementById("speech").innerHTML = text;
                console.log(text);
                switch (true) {
                    case text.indexOf('Open') != -1 || text.indexOf('open') != -1:
                        if (text.includes("WhatsApp") || text.includes("whatsapp")) {
                            talking("Invoking whatsapp command")
                            window.open(https://api.whatsapp.com/, '_blank').focus();
                        }
                        else if (text.includes('Instagram') || text.includes('instagram') || text.includes('insta') || text.includes('reels')) {
                            talking("Invoking Instagram command")
                        }
                        else if (text.includes('YouTube') || text.includes('youtube') || text.includes('videos')) {
                            talking("Invoking Youtube command")
                        }
                        break;
                    case text.indexOf('search') != -1:
                        idx = text.indexOf('search')
                        tosearch = text.slice(idx+7)
                        talking("searching "+tosearch)
                        window.open('https://www.google.com/search?q='+tosearch);
                        break
                    default:
                        talking('Iam Activated command me by my name')
                        break
                }
            }
        }
    })
    recognition.addEventListener('end', () => {
        recognition.start();
    })
    recognition.start();
}
function stopRocket() {
    recognition.stop();
    location.reload();
}

function talking(speechToSpeek) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(speechToSpeek));
}


var i = 0;

function move() {
    talking('initializing voice assistant')
    talking('All set aready to launch   ....  hai i am rocket a personal voice assistant ')
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
