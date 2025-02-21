/**
 *
 * @param {视频的ID} id
 * @param {分集} episode
 * @param {进度条} progress
 */
function setParams(id, episode, progress) {
  const urlParams = new URLSearchParams(window.location.search);
   id = id ||urlParams.get("id");
  if (id) {
    let str = "video/content.html?id=" + id;

    if (episode) {
      str = str.concat("&episode=" + episode);
      if (progress) {
        str = str.concat("&progress=" + progress);
      }
    }
    window.location.href = str;
  }
}
