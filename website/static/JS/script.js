
var timetag = document.querySelector(".time span"),
typingTest = document.querySelector(".mainContent p"),
mistaketag = document.querySelector(".mistake span"),
wpmtag = document.querySelector(".wpm span"),
cpmtag = document.querySelector(".cpm span"),
trytag = document.querySelector(".button"),
res = document.querySelector(".result1"), 
inputField =  document.querySelector("#input-field");
// words = document.querySelector(".mainContent p")

let timer, 
maxTime = 60, 
timeleft= maxTime,
charIndex = mistakes = isTyping = 0;



function paragraph(){
    let randIndex = Math.floor(Math.random()*paraList.length)
    const para = paraList[randIndex];
    words = para.split("");
    typingTest.innerHTML = '';
    
    words.forEach(element => {
        let spanTag = `<span>${element}</span>`;
        typingTest.innerHTML += spanTag;
    
});
typingTest.querySelectorAll("span")[0].classList.add('active');
document.addEventListener("keydown", () => inputField.focus());
typingTest.addEventListener('click', () => inputField.focus());

}




function initTyping() {
    const characters = typingTest.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];
    if(charIndex < characters.length -1 && timeleft >0){
        if(!isTyping){
            timer = setInterval(initTimer,1000);
            isTyping = true;
    
        }
        if (typedChar == null){
            charIndex --;
            if (characters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            
            characters[charIndex].classList.remove("correct", "incorrect");
    
        }else{
            if (characters[charIndex].innerText === typedChar){
                characters[charIndex].classList.add("correct");
            }else{
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex ++;
        }
    }else{
        inputField.value = '';
        clearInterval(timer);
    }
    
    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");
    mistaketag.innerText = mistakes;
    let wpm = Math.round((((charIndex -mistakes)/5)/(maxTime -timeleft))*60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 :wpm;
    cpmtag.innerText = charIndex - mistakes;
    wpmtag.innerText = wpm;   
}





function initTimer(){
    if(timeleft > 0){
        timeleft--;
        timetag.innerText = timeleft;
        if (timeleft ==0){
            isTyping =0;
            var wpmText = wpmtag.innerHTML;  
            var text1 = `You can type <span>${wpmText}</span> words per minute.`;   
            res.innerHTML = text1;
         }
       
    }else{
        clearInterval(timer);
    }
}


function resetgame(){
    paragraph();
    inputField.value = '';
    clearInterval(timer);
    timeleft= maxTime;
    charIndex = mistakes = isTyping = 0;
    timetag.innerText = timeleft;
    mistaketag.innerText = 0;
    cpmtag.innerText = 0;
    wpmtag.innerText = 0;
    res.innerHTML = "";

}

paragraph();
inputField.addEventListener('input', initTyping);
trytag.addEventListener('click', resetgame);

