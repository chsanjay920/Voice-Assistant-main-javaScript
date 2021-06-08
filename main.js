let count = 0
function Animation_Control() {
    // this function starts animation and inistilize the speech recognize function
    if(count %2 != 0){
        Speek("Rocket shutdown.")
        document.getElementById("coilcontainer").style.animationName = "none";
        stopRocket();
    }
    else{
        Speek("Rocket started.")
        document.getElementById("coilcontainer").style.animationName = "reactor-anim";
        startRecognization();
    }
    count += 1
}

function Speek(speechToSpeek) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(speechToSpeek));
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();

function startRecognization() {
    recognition.interimResults = true;
    recognition.addEventListener('result', (e) => {
        let text = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
        console.log(text);
        if (e.results[0].isFinal) {
            text = text.toLowerCase()
            if (text.includes('rocket')) {
                document.getElementById("text_box").innerHTML = text;
                console.log(text);
                switch (true) {
                    case text.indexOf('open') != -1:
                        if (text.includes("whatsapp")) {
                            Speek("opening whatsapp")
                            window.open("https://www.whatsapp.com/","_blank");
                        }
                        else if (text.includes('instagram') || text.includes('insta') || text.includes('reels')) {
                            Speek("Openig Instagram")
                            window.open("https://www.instagram.com/","_blank");
                        }
                        else if (text.includes('youtube') || text.includes('videos')) {
                            Speek("Opening Youtube")
                            window.open("https://youtube.com/","_blank");
                        }
                        else{
                            Speek("These are the Results i found")
                            idx = text.indexOf('open')
                            tosearch = text.slice(idx+5)
                            window.open('https://www.google.com/search?q='+tosearch);
                            
                        }
                        break;
                    case text.indexOf('search') != -1:
                        idx = text.indexOf('search')
                        tosearch = text.slice(idx+7)
                        Speek("searching "+tosearch)
                        window.open('https://www.google.com/search?q='+tosearch);
                        break
                    case text.indexOf('help') != -1 || text.indexOf('show commands'):
                        document.getElementById("help").click();
                        break
                    default:
                        Speek('Command not found .. please follow these commands');
                        document.getElementById("help").click();
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
