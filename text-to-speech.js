    
      function textToSpeech() {
            if ('speechSynthesis' in window) {
                const synth = window.speechSynthesis;
                const text = document.getElementById('textInput').value;
                const utterThis = new SpeechSynthesisUtterance(text);
                utterThis.pitch = 1.2; 
                utterThis.rate = 1.0;  
                utterThis.volume = 1.0; 

                synth.speak(utterThis);
            } else {
                console.error('Speech synthesis not supported in this browser.');
            }
        }

        function downloadSpeech() {
            if ('speechSynthesis' in window) {
                document.getElementById('downloadButton').disabled ="true";
                document.getElementsByClassName('warning-text')[0].innerText="Longer the text, Longer it takes to download"
                const text = document.getElementById('textInput').value;
                const utterThis = new SpeechSynthesisUtterance(text);
 
                utterThis.pitch = 1.2; 
                utterThis.rate = 1.0;  
                utterThis.volume = 1.0; 

                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const destination = audioContext.createMediaStreamDestination();
                const mediaRecorder = new MediaRecorder(destination.stream);
                const synth = window.speechSynthesis;

                synth.onvoiceschanged = () => {
                    const voices = synth.getVoices();
                    utterThis.voice = voices[0];
                    const source = audioContext.createMediaElementSource(new Audio());
                    source.connect(destination);
                    mediaRecorder.start();
                    synth.speak(utterThis);
                };

                utterThis.onend = function() {
                    mediaRecorder.stop();
                };

                mediaRecorder.ondataavailable = function(event) {
                    const blob = new Blob([event.data], { type: 'audio/wav' });
                    console.log(blob)
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = 'speech.wav';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.getElementById('downloadButton').disabled = false;
                    document.getElementsByClassName('warning-text')[0].innerText="";
                };
 
 
            } else {
                console.error('Speech synthesis not supported in this browser.');
            }
        }