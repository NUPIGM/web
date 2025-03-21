window.addEventListener("resize", function () {});

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
