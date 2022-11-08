class Video {
  source;
  poster;
  title;
  watchedCount = 233;
  ratingCount = 233;
  favoriteCount = 233;
  commentCount = 233;
  
  constructor(title, source, poster) {
    this.title = title;
    this.source = source;
    this.poster = poster;
  }
  
  static list = {
    1: new Video("きゅうくらりん / Covered by Binkales「Kyu-kurarin」", "//video_api.kms233.com/bili/av685657049"),
    5: new Video("柴又", "//video_api.kms233.com/bili/av670706740"),
  };
}

const UrlParam = {
  get(name) {
    return this.usp.get(name);
  },
  set(name, value) {
    const usp = this.usp;
    if (value) usp.set(name, value);
    else usp.delete(name);
    this.pushState("?" + usp.toString());
  },
  has(name) {
    return this.usp.has(name);
  },
  clear() {
    this.pushState(location.href.replace(/[\?#].*/g, ""));
  },
  get usp() {
    return new URLSearchParams(location.search);
  },
  disablePushState: false,
  pushState(state) {
    if (!this.disablePushState)
      history.pushState(null, "", state);
  },
};

const app = {
  data() {
    return {
      isShownLoginWindow: false,
      isLogining: false,
      isShownPassword: false,
      currentPage: "Mainpage",
    };
  },
  methods: {
    setIsShownLoginWindow(shown) {
      this.isShownLoginWindow = shown;
      if (!shown)
        setTimeout(() => this.isLogining = false, 400);
    },
    backToMainpage() {
      this.currentPage = "Mainpage";
      UrlParam.clear();
    },
    async watch(cav) {
      this.currentPage = "PlayerPage";
      await new Promise(resolve => Vue.nextTick(resolve));
      this.$refs.content.watch(cav);
    },
    async processState() {
      UrlParam.disablePushState = true;
      if (UrlParam.has("cav")) {
        const cav = UrlParam.get("cav");
        await this.watch(cav);
      } else this.backToMainpage();
      UrlParam.disablePushState = false;
    },
  },
  mounted() {
    window.addEventListener("load", () => this.processState());
    window.addEventListener("popstate", () => this.processState());
  },
  components: {
    Mainpage: {
      template: "#mainpage",
      components: {
        HomeVideoCard: {
          template: "#home-video-card",
          props: {
            img: String,
            title: String,
            tooltip: String,
            author: String,
            datetime: String,
            video: String,
            cav: String,
          },
          methods: {
            async watch() {
              this.$parent.$parent.watch(this.cav);
            },
          },
        },
      },
    },
    PlayerPage: {
      data() {
        return {
          video: new Video(),
          player: undefined,
        };
      },
      methods: {
        async watch(cav) {
          if (!(cav in Video.list))
            alert("未找到该影片！");
          UrlParam.set("cav", cav);
          this.video = Video.list[cav];
          await new Promise(resolve => Vue.nextTick(resolve));
          this.init();
        },
        init() {
          this.player = videojs(this.$refs.myVideo.id, {
            controlBar: {
              volumePanel: {
                inline: false,
              },
            },
            playbackRates: [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4],
            sources: [{
              src: this.video.source,
              type: "video/mp4",
            }],
          });
          document.querySelectorAll(".vjs-control-bar button").forEach(button => button.classList.add("mdui-ripple"));
        },
      },
      template: "#player-page",
      unmounted() {
        this.player.dispose();
      },
    },
  },
};
Vue.createApp(app).mount("#app");

document.querySelectorAll(".sidebar-icon, .sidebar-user").forEach(button => button.classList.add("mdui-ripple"));

