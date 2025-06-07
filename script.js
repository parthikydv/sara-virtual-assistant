// Check if the browser supports Speech Recognition API
if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
    alert('Speech Recognition API not supported in this browser');
}

// Access the content
let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")

// Function to use SpeechSynthesis API to speak text
function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="hi-GB"
    window.speechSynthesis.speak(text_speak)
}

function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning Sir")
    }
    else if(hours>=12 && hours <16){
        speak("Good afternoon Sir")
    }else{
        speak("Good Evening Sir")
    }
}


// window.addEventListener('load',()=>{
//     wishMe()
// })
let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition 
let recognition =new speechRecognition()
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
   takeCommand(transcript.toLowerCase())
}

// Error handling for recognition
recognition.onerror = (event) => {
    // Handle different error types
    if (event.error === 'no-speech') {
        speak("Sorry, I didn't hear anything. Please try again.");
    } else if (event.error === 'audio-capture') {
        speak("There was an issue capturing audio. Please check your microphone.");
    } else if (event.error === 'not-allowed') {
        speak("You have denied microphone access. Please enable microphone permissions.");
    } else {
        speak("An error occurred with speech recognition.");
    }
};

btn.addEventListener("click",()=>{
    if (recognition.state === "running") return; // Check if recognition is already running
    recognition.start()
    voice.style.display="block"
    btn.style.display="none"
})


// Function to handle commands
function takeCommand(message){
   voice.style.display="none"
    btn.style.display="flex"
    if(message.includes("hello")||message.includes("hey")){
        speak("hello sir,what can i help you?")
    }
    else if(message.includes("who are you")){
        speak("i am virtual assistant ")
    }else if(message.includes("open youtube")){
        speak("opening youtube...")
        window.open("https://youtube.com/","_blank")
    }
    else if(message.includes("open google")){
        speak("opening google...")
        window.open("https://google.com/","_blank")
    }
    else if(message.includes("open facebook")){
        speak("opening facebook...")
        window.open("https://facebook.com/","_blank")
    }
    else if(message.includes("open instagram")){
        speak("opening instagram...")
        window.open("https://instagram.com/","_blank")
    }
    else if(message.includes("open calculator")){
        speak("opening calculator..")
        window.open("calculator://")
    }
    else if(message.includes("open whatsapp")){
        speak("opening whatsapp..")
        window.open("whatsapp://")
    }
    else if(message.includes("time")){
      let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
      speak(time)
    }
    else if(message.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
      }
    else{
        let finalText="this is what i found on internet regarding" + message.replace("Sara","") || message.replace("Sara","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("Sara","")}`,"_blank")  //search on internet
    }
}