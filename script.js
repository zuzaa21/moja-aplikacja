const messages = document.getElementById("messages");
const input = document.getElementById("input");

const API_KEY = "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"

let chatHistory = [
  {
    role: "system",
    content: "Jesteś miłą, empatyczną postacią jak w Character.AI. Odpowiadasz po polsku."
  }
];

function addMessage(text, cls) {
  const div = document.createElement("div");
  div.className = "msg " + cls;
  div.innerText = text;
  messages.appendChild(div);
}

async function send() {
  const text = input.value;
  if (!text) return;

  addMessage("Ty: " + text, "user");
  input.value = "";

  chatHistory.push({ role: "user", content: text });

  addMessage("AI: ...", "bot");

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": Bearer ${API_KEY},
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: chatHistory
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;

  messages.lastChild.innerText = "AI: " + reply;
  chatHistory.push({ role: "assistant", content: reply });
}
