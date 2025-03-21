function loaded() {
  // 加载头部
  fetch("/html/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
      console.log("<header>标签是由js实现分开的，所以需要加载...已完成。");
    });
function loaded() {
  // 加载头部
  fetch("/html/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
      console.log("<header>标签是由js实现分开的，所以需要加载...已完成。");
    });

  // 加载边栏
  fetch("/html/mySide.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("mySide").innerHTML = data;
      console.log("<mySide>标签是由js实现分开的，所以需要加载...已完成。");
    });
  // 加载边栏
  fetch("/html/mySide.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("mySide").innerHTML = data;
      console.log("<mySide>标签是由js实现分开的，所以需要加载...已完成。");
    });

  // 加载脚部
  fetch("/html/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
      console.log("<footer>标签是由js实现分开的，所以需要加载...已完成。");
    });
}
//聊天表单控件
document.getElementById("chat-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    //提交表单
    e.value = "";
  }
});
document.getElementById("chat-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const chatInput = document.getElementById("chat-input");
  const chatSub = document.getElementById("chat-sub");
  if (ws && ws.readyState === WebSocket.OPEN) {
    chatInput.removeAttribute("disabled");
    chatSub.innerText = "发送";
  } else if (connectWS()) {
    chatInput.removeAttribute("disabled");
    chatSub.innerText = "发送";
    console.log("连接成功");
  }
  let msg = chatInput.value;
  sendWS(msg);
  chatInput.value = "";
  chatInput.setAttribute("rows", "1");
  console.log("表单已经提交", msg);
});
// 连接websocket
let ws;

async function connectWS() {
  ws = new WebSocket("ws://127.0.0.1:5000/ws");
  ws.onmessage = function (event) {
    let newMessage = document
      .getElementsByClassName("other-message")[0]
      .cloneNode(true);
    newMessage.children[1].children[0].innerHTML = "对方";
    newMessage.children[1].children[1].innerHTML = event.data;
    document.getElementById("chat-content").appendChild(newMessage);
  };
  if (ws.readyState === WebSocket.OPEN) {
    console.log("连接true",ws.readyState === WebSocket.OPEN);
     return true;
  } else {
    console.log("连接false",ws.readyState === WebSocket.OPEN);
    return false;
  }
}

function sendWS(data) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(data);
  }
}
//动画
function rise() {
  let now = new Date();
  let hours = now.getHours();
  let min = now.getMinutes();
  let t = hours.toString() + "." + min.toString();
  let x = 160 * Math.sin(0.263 * t);
  let y = 50 * Math.sin(0.263 * t - 23.5);

  if (6 < t && t < 18) {
    document.getElementById(
      "avatar"
    ).style.boxShadow = `${-x}px ${y}px 10px 0px rgba(255, 32, 32, 0.82)`;
  }

  //12点 x= 0，y= -100
  //6点  x= -200，y= 0
}
rise();
