// const {COUNT_USER} = require("../server");

const status = document.getElementById("status");
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const dotOnOff = document.getElementById("dotOnOff");


const ws = new WebSocket("ws://localhost:3000");

function setStatus(value) {
  status.innerHTML = value;
}

setCountUserOnline = (value) => {
  dotOnOff.innerHTML = value;
}


function printMessage(value) {
  const li = document.createElement("li");
  li.classList.add("oneMessage");

  li.innerHTML = value;
  messages.appendChild(li);

//   console.log();
}
form.addEventListener("submit", e => {
  e.preventDefault();

  ws.send(input.value);
  input.value = "";
});

ws.onopen = () => {
  setStatus("ONLINE");
  // user connection must be <= 2
//   console.log(ws);
  //   setCountUserOnline(ws._socket._server._connections);
};

ws.onclose = () => setStatus("DISCONNECTED");

ws.onmessage = response => {
  printMessage(response.data);
};
