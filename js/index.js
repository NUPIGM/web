const urlParams = new URLSearchParams(window.location.search);

// 获取所有参数名和值
let query = "?";
for (const [key, value] of urlParams.entries()) {
  query = query + key + "=" + value + "&";
}
//删除最后一个&
query = query.substring(0, query.length - 1);

const textarea = document.getElementById("chat-input");
textarea.addEventListener("input", function () {
  this.setAttribute("rows", "1");
  const lineCount = Math.floor(
    textarea.scrollHeight /
      parseInt(window.getComputedStyle(textarea).lineHeight, 10)
  );
  if (lineCount > 5) {
    this.setAttribute("rows", 5);
    return;
  } else {
    this.setAttribute("rows", lineCount);
  }
  let a = 1;
});
