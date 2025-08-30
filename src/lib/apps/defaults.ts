import { AppEntry } from "./types";

export const DEFAULT_APPS: AppEntry[] = [
  { id:"youtube", label:"YouTube", kind:"web_tv",
    url:"https://www.youtube.com/tv", fullscreen:true, zoom:2.0, ext:false, icon:"/icons/youtube.svg", order:1, enabled:true },

  { id:"plex", label:"Pleex", kind:"web_tv",
    url:"https://app.plex.tv/desktop", fullscreen:true, zoom:1.0, ext:false, icon:"/icons/plex.svg", order:2, enabled:true },

  { id:"twitch", label:"Twitch", kind:"web_tv",
    url:"https://www.twitch.tv", fullscreen:true, zoom:1.15, ext:true, icon:"/icons/twitch.svg", order:3, enabled:true },

  // DRM-heavy (run Chrome/Chromium with Widevine + our extension)
  { id:"netflix", label:"Netflix", kind:"web_drm",
    url:"https://www.netflix.com", fullscreen:true, zoom:1.15, ext:true, icon:"/icons/netflix.svg", order:4, enabled:true },

  { id:"prime", label:"Prime", kind:"web_drm",
    url:"https://www.primevideo.com", fullscreen:true, zoom:1.15, ext:true, icon:"/icons/prime.svg", order:5, enabled:true },

  { id:"hulu", label:"Hulu", kind:"web_drm",
    url:"https://www.hulu.com", fullscreen:true, zoom:1.15, ext:true, icon:"/icons/hulu.svg", order:6, enabled:true },
    
  { id:"launch", label:"Launch", kind:"web_tv",
    url:"launch.bmo.guru", fullscreen:true, zoom:1.0, ext:false, icon:"/icons/launch.svg", order:98, enabled:true },
  
  // Direct player (casting proxy)
  { id:"player", label:"Play URL", kind:"player",
    cmd:"mpv", args:["--fullscreen","--hwdec=auto"], icon:"/icons/play.svg", order:99, enabled:true },
];

