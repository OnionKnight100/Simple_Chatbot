const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");

const infoSlides = document.querySelectorAll(".info-content");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

console.log(infoSlides);

let currentSlide = 0;
infoSlides[currentSlide].classList.add("active");

// navigation buttons
nextBtn.addEventListener("click", () => {
    infoSlides[currentSlide].classList.remove("active");
    currentSlide++;
    if(currentSlide >= infoSlides.length){
        currentSlide = 0;        
    }
    infoSlides[currentSlide].classList.add("active");
});
prevBtn.addEventListener("click", () => {
    infoSlides[currentSlide].classList.remove("active");
    currentSlide--;
    if(currentSlide < 0){
        currentSlide = infoSlides.length - 1; 
        // console.log(currentSlide);
    }
    infoSlides[currentSlide].classList.add("active");
});


sendBtn.addEventListener("click", function(){
    console.log(userInput.value);
    appendMessage(userInput.value, "user");
    
});

userInput.addEventListener("keypress", function(event){
    if(event.key === "Enter") {
        console.log("enter pressed");
        console.log(userInput.value);
        appendMessage(userInput.value, "user");

    }
});

// sender type: "bot" and "user"
function appendMessage(text, sender) {
    if(text == ""){
        return;
    }
    const message_div = document.createElement("div");
    message_div.classList.add("message", sender);
    message_div.innerText = text;
    chatBox.appendChild(message_div);
    userInput.value = "";

    // scrollTop is the current vertical scroll position and scroll height is the total 
    // scrollble height of the div including part not visible, saying scroll all way down to bottom
    // so if set top: 0 it will scroll to the top
    // chatBox.scrollTop = chatBox.scrollHeight; instant scroll no smoothness
    chatBox.scrollTo({
        top: chatBox.scrollHeight, behavior: "smooth"
    })

    if(sender == "user") {
        displayBotResponse(text);
    }
}

async function displayBotResponse(text) {
    appendMessage(await getBotResponse(text), "bot");
}

function getBotResponse(text) { // will call the backend response from here
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userText = text.toLowerCase();
            let reply;
            if(userText.includes("hello") || userText.includes("hi")) {
                reply = "Hi Im floatchat, you can ask about ARGO ocean data from me";
            }
            else if(userText.includes("how are you")) {
                reply = "Im fine thanks";
            }
            else {
                reply = "idk what that means";
            }
            resolve(reply);

        }, 1000); // waits for 1000ms to simulate bot thinking
    });
    
}


