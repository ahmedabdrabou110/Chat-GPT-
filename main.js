import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.querySelector("form");

const chatContainer = document.querySelector("#chat_container");

let loadInterval;

//! Loader Function

const loader = (element) => {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";
    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
};

//! type Text Function

const typeText = (element, text) => {
  let index = 0;
  let interval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
};

//! Generate Unique Id

const generateUniqueId = () => {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);
  return `id-${timestamp}-${hexadecimalString}`;
};

//! Generate Chat Stripe
const chatStrip = (isAi, value, uniqueId) => {
  return `
      <div class="wrapper ${isAi && "ai"}">
        <div class="chat">
          <div class="profile">
            <img src="${isAi ? bot : user}" alt="${isAi ? "bot" : "user"}" />
          </div>
          <div class="message" id=${uniqueId}>${value}</div>
        </div>
      </div>
    `;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // user's chat strip
  chatContainer.innerHTML += chatStrip(false, data.get("ask_text"));
  form.reset();

  // Ai Chat strip
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStrip(true, "", uniqueId);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  const messageDiv = document.getElementById(uniqueId);
  loader(messageDiv);
};

//!Submit with on click
form.addEventListener("submit", handleSubmit);

//! subit with press on Enter button
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
