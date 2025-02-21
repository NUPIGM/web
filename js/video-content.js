
document.addEventListener("DOMContentLoaded", getParams);
/**
 *
 * @param {视频的ID} id
 * @param {分集} episode
 * @param {进度条} progress
 */
export function setParams(id, episode, progress) {
  const urlParams = new URLSearchParams(window.location.search);
   id = id ||urlParams.get("id");
  if (id) {
    let str = "?id=" + id;

    if (episode) {
      str = str.concat("&episode=" + episode);
      if (progress) {
        str = str.concat("&progress=" + progress);
      }
    }
    window.location.href = str;
  }
}
window.setParams = setParams;

async function getParams() {
  const urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get("id");
  let regex = /^\d+$/;
  if (id ? id.match(regex) : false) {
    let data = await getDetail(id);
    let episode = urlParams.get("episode")||"";
    let progress="";
    if (data) {
      //处理数据函数
        episode =
        episode.match(regex) ? episode: false || localStorage.getItem("episode") || 1;
        progress = urlParams.get("progress");
 
      insertData(data, episode, progress);

    }
  }else{
    window.location.href = "/html/video.html";
  }
  return {
    id: urlParams.get("id"),
    episode: urlParams.get("episode") || 1,
    name: urlParams.get("name"),
  };
}
function progressTime(episode, progress) {
  let video = document.getElementById("vod-player");
  let savedTime = JSON.parse(localStorage.getItem("video_progress"));
  if (typeof savedTime === "object") {
    // 恢复播放进度
    if (progress) {
      savedTime[episode] = progress;
    }
    video.addEventListener("loadedmetadata", () => {
      if (savedTime[episode]) {
        video.currentTime = parseFloat(savedTime[episode]);
      }
    });
    // 保存播放进度
    video.addEventListener("timeupdate", () => {
      if (video.currentTime > 1) {
        savedTime[episode] = video.currentTime;
        localStorage.setItem("video_progress", JSON.stringify(savedTime));
      }
    });
  } else {
    localStorage.setItem("video_progress", "{}");
    progressTime(episode,null);
  }
}
//插入数据
function insertData(d, e, p) {
  //ID
  //标题
  //封面地址
  //播放地址
  //简介
  //播放列表是大字符串，用#分割，每个集数用$分割，第一个是集数，第二个是播放地址
  document.getElementById("vod-title").innerText = d.vod_name;
  document.getElementById("vod-hits").innerText = d.vod_hits;
  document.getElementById("vod-time").innerText = d.vod_time;
  document.getElementById("type-name").innerText = d.type_name;
  document.getElementById("vod-content").innerText = d.vod_content;
  let video = document.getElementById("vod-player");
  let episodes = d.vod_play_url.split("#");
  let vod_name = document
    .getElementById("vod-episodes")
    .children[0].cloneNode(true);
  document.getElementById("vod-episodes").innerHTML = "";

  episodes.forEach((i) => {
    let j = i.split("$");
    if (j[0] == parseInt(e)) {
      addHls(j[1], video);
      progressTime(j[0], p);
      localStorage.setItem("episode", j[0]);
    }
    vod_name.innerText = j[0];
    vod_name.href = "?id=" + d.vod_id + "&episode=" + j[0];
    document.getElementById("vod-episodes").appendChild(vod_name);
    vod_name = document
      .getElementById("vod-episodes")
      .children[0].cloneNode(true);
  });
}
function getDetail(id) {
  return fetch("/config/data.json?id=" + id)
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 1) {
        let detail = data.list[0];
        return detail; // 返回获取的 detail
      } else {
        return void 0; // 如果数据不符合条件，返回 undefined
      }
    })
    .catch((error) => {
      console.error("请求失败", error);
      return void 0; // 处理请求失败的情况
    });
}
function addHls(url, player) {
  if (player.canPlayType("application/vnd.apple.mpegurl")) {
    player.src = url;
  } else if (Hls.isSupported()) {
    const hls = new Hls({
      maxBufferLength: 60, // 缓冲60秒
      maxMaxBufferLength: 120, // 允许缓冲的最大长度
      maxBufferSize: 100 * 1000 * 1000, // 允许最多100MB缓冲
      maxBufferHole: 1, // 允许的播放空洞时间，避免跳帧卡顿
      liveSyncDurationCount: 10, // 直播时保持的同步片段数量
      enableWorker: true, // 启用Web Worker提升解码性能
      lowLatencyMode: false, // 关闭低延迟模式（低延迟模式可能会减少缓冲）
    });
    hls.loadSource(url);
    hls.attachMedia(player);
  }
}
function getdata() {
  // 获取当前页面的 URL 查询参数
  const urlParams = new URLSearchParams(window.location.search);
  let okzy = "https://okzyapi.com/api.php/provide/vod/";
  let cjhwba = "https://cjhwba.com/api.php/provide/vod/";
  let heimuer = "https://json02.heimuer.xyz/api.php/provide/vod/";

  fetch("/config/data.json")
    .then((response) => response.json())
    .then((data) => {
      let data2 = data.list[0].vod_play_url;
      let episode = parseInt(urlParams.get("episode") || 1);
      let arr = data2.split("#");
      let player = document.getElementById("video");
      console.log(arr[episode - 1].split("$")[1]);
      document.getElementById("video").src = arr[episode - 1].split("$")[1];
      arr.forEach((i) => {
        let j = i.split("$");
      });
      if (player.canPlayType("application/vnd.apple.mpegurl")) {
        player.src = arr[episode - 1].split("$")[1];
        player.addEventListener("canplay", function () {
          player.play();
        });
      } else if (Hls.isSupported()) {
        const hls = new Hls({
          maxBufferLength: 60, // 缓冲60秒
          maxMaxBufferLength: 120, // 允许缓冲的最大长度
          maxBufferSize: 100 * 1000 * 1000, // 允许最多100MB缓冲
          maxBufferHole: 1, // 允许的播放空洞时间，避免跳帧卡顿
          liveSyncDurationCount: 10, // 直播时保持的同步片段数量
          enableWorker: true, // 启用Web Worker提升解码性能
          lowLatencyMode: false, // 关闭低延迟模式（低延迟模式可能会减少缓冲）
        });
        hls.loadSource(arr[episode - 1].split("$")[1]);
        hls.attachMedia(player);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          player.play();
        });
      }

      console.log(arr[episode - 1].split("$")[1]);
    });
}
