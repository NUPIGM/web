// file1.js
export function loaded() {
    // 加载头部
    fetch('/html/header.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('header').innerHTML = data;
        console.log("<header>标签是由js实现分开的，所以需要加载...已完成。")
      });

    // 加载脚部
    fetch('/html/footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('footer').innerHTML = data;
        console.log("<footer>标签是由js实现分开的，所以需要加载...已完成。")
      });
  };
