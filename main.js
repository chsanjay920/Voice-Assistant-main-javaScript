function startRocket() {
    displayClock()
    move()
    startRecognization()
    frequency_bar()
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
            else if(text.includes('what is your name')||('your good name please')){
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
            else if(text.includes('Open gmail')||text.includes('gmail')){
                talking('Redirecting you')
                window.open('https://mail.google.com/mail/u/0/')
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
function frequency_bar() {
    var analyser, animationLoop, audioContext, buf, canvas, compressor, freq, getPitch, minSamples, noteFromPitch, pitchDisplay, samples, updatePitch, visualize, zoom;

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    audioContext = new window.AudioContext();

    compressor = audioContext.createDynamicsCompressor();

    analyser = audioContext.createAnalyser();

    canvas = document.querySelector('canvas');

    samples = 256;

    zoom = document.querySelector('.zoom');

    zoom.onchange = function () {
        switch (this.value) {
            case '1':
                samples = 128;
                break;
            case '2':
                samples = 256;
                break;
            case '3':
                samples = 512;
                break;
            case '4':
                samples = 1024;
                break;
            case '5':
                samples = 2048;
        }
        return console.log(samples);
    };

    pitchDisplay = document.querySelector('.pitch');

    freq = document.querySelector('.freq');

    minSamples = 0;

    buf = new Float32Array(1024);

    getPitch = function (buffer) {
        var bestCorrelation, bestOffset, correlation, correlations, foundGoodCorrelation, i, lastCorrelation, maxSamples, offset, rms, shift, size, val;
        size = buffer.length;
        maxSamples = Math.floor(size / 2);
        bestOffset = -1;
        bestCorrelation = 0;
        rms = 0;
        foundGoodCorrelation = false;
        correlations = [];
        i = 0;
        while (i < size) {
            val = buffer[i];
            rms += val * val;
            i++;
        }
        rms = Math.sqrt(rms / size);
        if (rms < 0.01) {
            // not enough signal
            return "-";
        }
        lastCorrelation = 1;
        offset = minSamples;
        while (offset < maxSamples) {
            correlation = 0;
            i = 0;
            while (i < maxSamples) {
                correlation += Math.abs(buffer[i] - buffer[i + offset]);
                i++;
            }
            correlation = 1 - (correlation / maxSamples);
            correlations[offset] = correlation;
            if (correlation > 0.9 && correlation > lastCorrelation) {
                foundGoodCorrelation = true;
                if (correlation > bestCorrelation) {
                    bestCorrelation = correlation;
                    bestOffset = offset;
                }
            } else if (foundGoodCorrelation) {
                shift = (correlations[bestOffset + 1] - correlations[bestOffset - 1]) / correlations[bestOffset];
                return audioContext.sampleRate / (bestOffset + (8 * shift));
            }
            lastCorrelation = correlation;
            offset++;
        }
        if (bestCorrelation > 0.01) {
            return audioContext.sampleRate / bestOffset;
        }
        // no good match
        return -1;
    };

    noteFromPitch = function (frequency) {
        var noteNum, noteStrings;
        noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
        noteNum = Math.round(noteNum) + 69;
        return noteStrings[noteNum % 12];
    };

    updatePitch = function () {
        var normalize, pitch;
        normalize = function (num) {
            var multiplier;
            multiplier = Math.pow(10, 2);
            return Math.round(num * multiplier) / multiplier;
        };
        analyser.getFloatTimeDomainData(buf);
        pitch = getPitch(buf);
        if (pitch > 0) {
            pitchDisplay.innerHTML = noteFromPitch(pitch);
        }
        return freq.innerHTML = "Frequency :  "+pitch;
    };

    visualize = function () {
        var drawContext, h, i, normalize, points, w;
        normalize = function (y, h) {
            return y / 256 * h;
        };
        w = canvas.width;
        h = canvas.height;
        points = new Uint8Array(samples);
        analyser.getByteTimeDomainData(points);
        drawContext = canvas.getContext('2d');
        drawContext.clearRect(0, 0, w, h);
        drawContext.strokeStyle = '#C2EDF2';
        drawContext.lineWidth = 3;
        drawContext.lineCap = 'butt';
        drawContext.lineJoin = 'miter';
        drawContext.beginPath();
        drawContext.moveTo(0, normalize(points[0], h));
        i = 0;
        while (i < points.length) {
            drawContext.lineTo(w * (i + 1) / points.length, normalize(points[i], h));
            i++;
        }
        return drawContext.stroke();
    };

    animationLoop = function () {
        visualize();
        updatePitch();
        return window.requestAnimationFrame(animationLoop);
    };

    navigator.getUserMedia({
        audio: true
    }, function (stream) {
        var microphone;
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(compressor);
        compressor.connect(analyser);
        return window.requestAnimationFrame(animationLoop);
    }, function (e) {
        return console.log(`error: ${e}`);
    });



    //   # sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLFFBQUEsRUFBQSxhQUFBLEVBQUEsWUFBQSxFQUFBLEdBQUEsRUFBQSxNQUFBLEVBQUEsVUFBQSxFQUFBLElBQUEsRUFBQSxRQUFBLEVBQUEsVUFBQSxFQUFBLGFBQUEsRUFBQSxZQUFBLEVBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxTQUFBLEVBQUE7O0VBQUEsU0FBUyxDQUFDLFlBQVYsR0FBeUIsU0FBUyxDQUFDLFlBQVYsSUFBMEIsU0FBUyxDQUFDLGtCQUFwQyxJQUEwRCxTQUFTLENBQUM7O0VBRTdGLFlBQUEsR0FBZSxJQUFJLE1BQU0sQ0FBQyxZQUFYLENBQUE7O0VBQ2YsVUFBQSxHQUFhLFlBQVksQ0FBQyx3QkFBYixDQUFBOztFQUNiLFFBQUEsR0FBVyxZQUFZLENBQUMsY0FBYixDQUFBOztFQUVYLE1BQUEsR0FBUyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2Qjs7RUFDVCxNQUFNLENBQUMsS0FBUCxHQUFlLFFBQVEsQ0FBQyxJQUFJLENBQUM7O0VBQzdCLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLFFBQVEsQ0FBQyxJQUFJLENBQUM7O0VBRTlCLE9BQUEsR0FBVTs7RUFDVixJQUFBLEdBQU8sUUFBUSxDQUFDLGFBQVQsQ0FBdUIsT0FBdkI7O0VBQ1AsSUFBSSxDQUFDLFFBQUwsR0FBZ0IsUUFBQSxDQUFBLENBQUE7QUFDZCxZQUFPLElBQUksQ0FBQyxLQUFaO0FBQUEsV0FDTyxHQURQO1FBQ2dCLE9BQUEsR0FBVTtBQUFuQjtBQURQLFdBRU8sR0FGUDtRQUVnQixPQUFBLEdBQVU7QUFBbkI7QUFGUCxXQUdPLEdBSFA7UUFHZ0IsT0FBQSxHQUFVO0FBQW5CO0FBSFAsV0FJTyxHQUpQO1FBSWdCLE9BQUEsR0FBVTtBQUFuQjtBQUpQLFdBS08sR0FMUDtRQUtnQixPQUFBLEdBQVU7QUFMMUI7V0FNQSxPQUFPLENB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Q0FBQyxPQUFaLEdBQXNCO0lBQ3RCLFdBQVcsQ0FBQyxRQUFaLEdBQXVCO0lBQ3ZCLFdBQVcsQ0FBQyxTQUFaLENBQUE7SUFDQSxXQUFXLENBQUMsTUFBWixDQUFtQixDQUFuQixFQUFzQixTQUFBLENBQVUsTUFBTSxDQUFDLENBQUQsQ0FBaEIsRUFBcUIsQ0FBckIsQ0FBdEI7SUFFQSxDQUFBLEdBQUU7QUFDRixXQUFNLENBQUEsR0FBSSxNQUFNLENBQUMsTUFBakI7TUFDRSxXQUFXLENBQUMsTUFBWixDQUFtQixDQUFBLEdBQUksQ0FBQyxDQUFBLEdBQUksQ0FBTCxDQUFKLEdBQWMsTUFBTSxDQUFDLE1BQXhDLEVBQ0UsU0FBQSxDQUFVLE1BQU0sQ0FBQyxDQUFELENBQWhCLEVBQXFCLENBQXJCLENBREY7TUFFQSxDQUFBO0lBSEY7V0FLQSxXQUFXLENBQUMsTUFBWixDQUFBO0VBeEJVOztFQTBCWixhQUFBLEdBQWdCLFFBQUEsQ0FBQSxDQUFBO0lBQ2QsU0FBQSxDQUFBO0lBQ0EsV0FBQSxDQUFBO1dBQ0EsTUFBTSxDQUFDLHFCQUFQLENBQTZCLGFBQTdCO0VBSGM7O0VBS2hCLFNBQVMsQ0FBQyxZQUFWLENBQ0U7SUFBQSxLQUFBLEVBQU87RUFBUCxDQURGLEVBRUUsUUFBQSxDQUFDLE1BQUQsQ0FBQTtBQUNGLFFBQUE7SUFBRSxVQUFBLEdBQWEsWUFBWSxDQUFDLHVCQUFiLENBQXFDLE1BQXJDO0lBQ2IsVUFBVSxDQUFDLE9BQVgsQ0FBbUIsVUFBbkI7SUFDQSxVQUFVLENBQUMsT0FBWCxDQUFtQixRQUFuQjtXQUVBLE1BQU0sQ0FBQyxxQkFBUCxDQUE2QixhQUE3QjtFQUxBLENBRkYsRUFRRSxRQUFBLENBQUMsQ0FBRCxDQUFBO1dBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxDQUFBLE9BQUEsQ0FBQSxDQUFVLENBQVYsQ0FBQSxDQUFaO0VBREEsQ0FSRjtBQTNIQSIsInNvdXJjZXNDb250ZW50IjpbIm5hdmlnYXRvci5nZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYVxuXG5hdWRpb0NvbnRleHQgPSBuZXcgd2luZG93LkF1ZGlvQ29udGV4dCgpXG5jb21wcmVzc29yID0gYXVkaW9Db250ZXh0LmNyZWF0ZUR5bmFtaWNzQ29tcHJlc3NvcigpXG5hbmFseXNlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVBbmFseXNlcigpXG4gIFxuY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciAnY2FudmFzJ1xuY2FudmFzLndpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aFxuY2FudmFzLmhlaWdodCA9IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0XG5cbnNhbXBsZXMgPSAyNTZcbnpvb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICcuem9vbSdcbnpvb20ub25jaGFuZ2UgPSAtPlxuICBzd2l0Y2ggdGhpcy52YWx1ZVxuICAgIHdoZW4gJzEnIHRoZW4gc2FtcGxlcyA9IDEyOFxuICAgIHdoZW4gJzInIHRoZW4gc2FtcGxlcyA9IDI1NlxuICAgIHdoZW4gJzMnIHRoZW4gc2FtcGxlcyA9IDUxMlxuICAgIHdoZW4gJzQnIHRoZW4gc2FtcGxlcyA9IDEwMjRcbiAgICB3aGVuICc1JyB0aGVuIHNhbXBsZXMgPSAyMDQ4XG4gIGNvbnNvbGUubG9nIHNhbXBsZXNcblxucGl0Y2hEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciAnLnBpdGNoJyBcbmZyZXEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICcuZnJlcSdcbiAgXG5taW5TYW1wbGVzID0gMFxuYnVmID0gbmV3IEZsb2F0MzJBcnJheSAxMDI0XG5nZXRQaXRjaCA9IChidWZmZXIpIC0+XG4gIHNpemUgPSBidWZmZXIubGVuZ3RoXG4gIG1heFNhbXBsZXMgPSBNYXRoLmZsb29yIHNpemUgLyAyXG4gIGJlc3RPZmZzZXQgPSAtMVxuICBiZXN0Q29ycmVsYXRpb24gPSAwXG4gIHJtcyA9IDBcbiAgZm91bmRHb29kQ29ycmVsYXRpb24gPSBmYWxzZVxuICBjb3JyZWxhdGlvbnMgPSBbXVxuICBcbiAgaSA9IDBcbiAgd2hpbGUgaSA8IHNpemVcbiAgICB2YWwgPSBidWZmZXJbaV1cbiAgICBybXMgKz0gdmFsICogdmFsXG4gICAgaSsrXG4gIHJtcyA9IE1hdGguc3FydChybXMgLyBzaXplKVxuICAjIG5vdCBlbm91Z2ggc2lnbmFsXG4gIHJldHVybiBcIi1cIiAgaWYgcm1zIDwgMC4wMVxuICBcbiAgbGFzdENvcnJlbGF0aW9uID0gMVxuICBcbiAgb2Zmc2V0ID0gbWluU2FtcGxlc1xuICB3aGlsZSBvZmZzZXQgPCBtYXhTYW1wbGVzXG4gICAgY29ycmVsYXRpb24gPSAwXG4gICAgXG4gICAgaSA9IDBcbiAgICB3aGlsZSBpIDwgbWF4U2FtcGxlc1xuICAgICAgY29ycmVsYXRpb24gKz0gTWF0aC5hYnMgYnVmZmVyW2ldIC0gYnVmZmVyW2kgKyBvZmZzZXRdXG4gICAgICBpKytcbiAgICAgIFxuICAgIGNvcnJlbGF0aW9uID0gMSAtIChjb3JyZWxhdGlvbiAvIG1heFNhbXBsZXMpXG4gICAgY29ycmVsYXRpb25zW29mZnNldF0gPSBjb3JyZWxhdGlvblxuICAgIFxuICAgIGlmIGNvcnJlbGF0aW9uID4gMC45IGFuZCBjb3JyZWxhdGlvbiA+IGxhc3RDb3JyZWxhdGlvblxuICAgICAgZm91bmRHb29kQ29ycmVsYXRpb24gPSB0cnVlXG4gICAgICBpZiBjb3JyZWxhdGlvbiA+IGJlc3RDb3JyZWxhdGlvblxuICAgICAgICBiZXN0Q29ycmVsYXRpb24gPSBjb3JyZWxhdGlvblxuICAgICAgICBiZXN0T2Zmc2V0ID0gb2Zmc2V0XG4gICAgZWxzZSBpZiBmb3VuZEdvb2RDb3JyZWxhdGlvblxuICAgICAgc2hpZnQgPSAoY29ycmVsYXRpb25zW2Jlc3RPZmZzZXQgKyAxXSAtIGNvcnJlbGF0aW9uc1tiZXN0T2Zmc2V0IC0gMV0pIC8gY29ycmVsYXRpb25zW2Jlc3RPZmZzZXRdXG4gICAgICByZXR1cm4gYXVkaW9Db250ZXh0LnNhbXBsZVJhdGUgLyAoYmVzdE9mZnNldCArICg4ICogc2hpZnQpKVxuICAgIFxuICAgIGxhc3RDb3JyZWxhdGlvbiA9IGNvcnJlbGF0aW9uXG4gICAgb2Zmc2V0KytcblxuICByZXR1cm4gYXVkaW9Db250ZXh0LnNhbXBsZVJhdGUgLyBiZXN0T2Zmc2V0ICBpZiBiZXN0Q29ycmVsYXRpb24gPiAwLjAxXG4gICMgbm8gZ29vZCBtYXRjaFxuICAtMVxuIFxubm90ZUZyb21QaXRjaCA9ICggZnJlcXVlbmN5ICkgLT5cbiAgbm90ZVN0cmluZ3MgPSBbXCJDXCIsIFwiQyNcIiwgXCJEXCIsIFwiRCNcIiwgXCJFXCIsIFwiRlwiLCBcIkYjXCIsIFwiR1wiLCBcIkcjXCIsIFwiQVwiLCBcIkEjXCIsIFwiQlwiXVxuICBub3RlTnVtID0gMTIgKiAoTWF0aC5sb2coZnJlcXVlbmN5IC8gNDQwKS9NYXRoLmxvZygyKSlcbiAgbm90ZU51bSA9IE1hdGgucm91bmQobm90ZU51bSkgKyA2OVxuICBub3RlU3RyaW5nc1tub3RlTnVtICUgMTJdXG5cbnVwZGF0ZVBpdGNoID0tPlxuICBub3JtYWxpemUgPSAobnVtKSAtPlxuICAgIG11bHRpcGxpZXIgPSBNYXRoLnBvdyAxMCwgMlxuICAgIE1hdGgucm91bmQobnVtICogbXVsdGlwbGllcikgLyBtdWx0aXBsaWVyXG4gICAgXG4gIGFuYWx5c2VyLmdldEZsb2F0VGltZURvbWFpbkRhdGEgYnVmXG4gIHBpdGNoID0gZ2V0UGl0Y2ggYnVmXG4gIFxuICBwaXRjaERpc3BsYXkuaW5uZXJIVE1MID0gbm90ZUZyb21QaXRjaChwaXRjaCkgIGlmIHBpdGNoID4gMFxuICBmcmVxLmlubmVySFRNTCA9IHBpdGNoXG5cbiAgXG52aXN1YWxpemUgPSAtPlxuICBub3JtYWxpemUgPSAoeSwgaCkgLT5cbiAgICB5IC8gMjU2ICogaFxuICB3ID0gY2FudmFzLndpZHRoXG4gIGggPSBjYW52YXMuaGVpZ2h0XG4gIHBvaW50cyA9IG5ldyBVaW50OEFycmF5IHNhbXBsZXNcbiAgYW5hbHlzZXIuZ2V0Qnl0ZVRpbWVEb21haW5EYXRhIHBvaW50c1xuICBcbiAgZHJhd0NvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCAnMmQnXG4gIGRyYXdDb250ZXh0LmNsZWFyUmVjdCAwLCAwLCB3LCBoXG4gIFxuICBkcmF3Q29udGV4dC5zdHJva2VTdHlsZSA9ICcjQzJFREYyJ1xuICBkcmF3Q29udGV4dC5saW5lV2lkdGggPSAzXG4gIGRyYXdDb250ZXh0LmxpbmVDYXAgPSAnYnV0dCdcbiAgZHJhd0NvbnRleHQubGluZUpvaW4gPSAnbWl0ZXInXG4gIGRyYXdDb250ZXh0LmJlZ2luUGF0aCgpXG4gIGRyYXdDb250ZXh0Lm1vdmVUbyAwLCBub3JtYWxpemUocG9pbnRzWzBdLCBoKVxuICBcbiAgaT0wXG4gIHdoaWxlIGkgPCBwb2ludHMubGVuZ3RoXG4gICAgZHJhd0NvbnRleHQubGluZVRvIHcgKiAoaSArIDEpIC8gcG9pbnRzLmxlbmd0aCwgXG4gICAgICBub3JtYWxpemUocG9pbnRzW2ldLCBoKVxuICAgIGkrK1xuICAgIFxuICBkcmF3Q29udGV4dC5zdHJva2UoKVxuXG5hbmltYXRpb25Mb29wID0gLT5cbiAgdmlzdWFsaXplKClcbiAgdXBkYXRlUGl0Y2goKVxuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIGFuaW1hdGlvbkxvb3BcbiAgXG5uYXZpZ2F0b3IuZ2V0VXNlck1lZGlhXG4gIGF1ZGlvOiB0cnVlXG4sIChzdHJlYW0pIC0+XG4gIG1pY3JvcGhvbmUgPSBhdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2Ugc3RyZWFtXG4gIG1pY3JvcGhvbmUuY29ubmVjdCBjb21wcmVzc29yXG4gIGNvbXByZXNzb3IuY29ubmVjdCBhbmFseXNlclxuICBcbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSBhbmltYXRpb25Mb29wXG4sIChlKSAtPlxuICBjb25zb2xlLmxvZyBcImVycm9yOiAje2V9XCJcbiJdfQ==
    //# sourceURL=coffeescript
}
