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

  // 加载脚部
  fetch("/html/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
      console.log("<footer>标签是由js实现分开的，所以需要加载...已完成。");
    });
}

function rise() {
  let now = new Date();
  let hours = now.getHours();
  let min = now.getMinutes();
  let t=hours.toString()+"."+min.toString();
  let x = 160 * Math.sin(0.263 * t);
  let y = 100 * Math.sin(0.263 * t - 23.5);
  
  if (6<t && t<18) {
    console.log(6<t<18)
    document.getElementById(
      "avatar"
    ).style.boxShadow = `${-x}px ${y}px 10px 0pxrgba(255, 32, 32, 0.3)`;
  }

  //12点 x= 0，y= -100
  //6点  x= -200，y= 0
}
rise()