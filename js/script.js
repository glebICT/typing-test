let person = prompt("Please enter your full name", "");
let grade = prompt("Please enter your grade", "");
let wpm = 0;
let mistakes = 0;
let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = (mistakes = isTyping = 0);

function loadParagraph(index) {
  console.log(index);
  const typingText =  document.querySelector(".typing-text p");
  const inpField = document.querySelector(".wrapper .input-field");
  // const ranIndex = Math.floor(Math.random() * paragraphs.length);
  const ranIndex = index;
  typingText.innerHTML = "";
  paragraphs[ranIndex].split("").forEach((char) => {
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });
    typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}


function initTyping() {
  let characters = document.querySelector(".typing-text p").querySelectorAll("span");
  const inpField = document.querySelector(".wrapper .input-field");
  const wpmTag = document.querySelector(".wpm span");
  const  mistakeTag = document.querySelector(".mistake span");
  const cpmTag = document.querySelector(".cpm span");
  let typedChar = inpField.value.split("")[charIndex];
  console.log(charIndex, characters.length);
  if (charIndex == characters.length - 1 && timeLeft > 0) {
    alert("You've done it!")
    // store to LS
    localStorage.setItem("person", person);
    localStorage.setItem("grade", grade);
    localStorage.setItem("mistakes", mistakes);
    localStorage.setItem("wpm", wpm);
    window.location.replace(`certificate.html?name=${person}&grade=${grade}&mistakes=${mistakes}&wpm=${wpm}`)
  }
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if (typedChar == null) {
      if (charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
          mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      if (characters[charIndex].innerText == typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    
    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
  } else {
 
    clearInterval(timer);
    inpField.value = "";
  }
}

function initTimer() {
  const  timeTag = document.querySelector(".time span b");
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
    wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpmTag = document.querySelector(".wpm span");
    wpmTag.innerText = wpm;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  const  timeTag = document.querySelector(".time span b");
  const wpmTag = document.querySelector(".wpm span");
  const  mistakeTag = document.querySelector(".mistake span");
  const cpmTag = document.querySelector(".cpm span");
  loadParagraph(Number(parseInt(grade)));
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  inpField.value = "";
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeTag.innerText = 0;
  cpmTag.innerText = 0;
}

function init(){
  if (person != null && grade != null) {
    document.getElementById("name").innerHTML = `Hello ${person} from ${grade}`;
    const level = Number(parseInt(grade))
    maxTime = (maxTime * level) + 1;
    timeLeft = maxTime;
    console.log(maxTime);
    loadParagraph(level);
  }
}

