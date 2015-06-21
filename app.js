angular.module("AudioTrackr",[]).config(function(){window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,window.AudioContext=window.AudioContext||window.webkitAudioContext}),angular.module("AudioTrackr").run(["$templateCache",function(t){t.put("track/track.htm",'<div class="track" ng-class="{loading:loading==true}">\n    <h2>{{trackName}}<span ng-show="status"> ({{status}})</span></h2>\n    <input type="range" ng-model="trackVolume" />\n    <canvas></canvas>\n    <div class="spinner" ng-show="loading"></div>\n</div>')}]),angular.module("AudioTrackr").factory("songFactory",function(){return[{name:"Battery",band:"Metallica",link:"http://muzmania.org.ua/download.php?id=7959&source=0&key=725c9fd2c8089d4d6cbaf6e062a4e265",tracks:[{name:"guitar",url:"files/Metallica/Battery/guitar.mp3"},{name:"drums",url:"files/Metallica/Battery/drums.mp3"},{name:"vocals",url:"files/Metallica/Battery/vocals.mp3"}]},{name:"Painkiller",band:"Judas Priest",link:"http://muzmania.org.ua/download.php?id=35027&source=0&key=182060773e24f9adeef7efd5f6bc7b7f",tracks:[{name:"guitar",url:"files/JudasPriest/Painkiller/guitar.mp3"},{name:"drums",url:"files/JudasPriest/Painkiller/drums.mp3"},{name:"vocals",url:"files/JudasPriest/Painkiller/vocals.mp3"},{name:"bass",url:"files/JudasPriest/Painkiller/bass.mp3"}]}]}),angular.module("AudioTrackr").controller("MainController",["$scope","songFactory",function(t,a){function e(){angular.forEach(t.currentSong.tracks,function(t){t.draw&&t.draw()}),window.requestAnimationFrame(e)}function n(t){angular.forEach(t,function(t){t.clear()})}function r(){t.aCtx=new window.AudioContext,t.aCtx.createGain=t.aCtx.createGain||t.aCtx.createGainNode,t.master.gainNode=t.aCtx.createGain(),t.master.gainNode.connect(t.aCtx.destination),(!t.aCtx.createMediaElementSource||o)&&(t.useAudioTag=!1)}function i(){t.trackWidth=document.querySelector(".track-container").offsetWidth,t.trackWidth>1200?t.trackWidth/=3:t.trackWidth>800&&(t.trackWidth/=2),t.trackWidth-=22}var o=navigator.userAgent.match(/(iPad|iPhone|iPod)/g)?!0:!1,c=0;t.currentSong,t.songs=a,t.ready=!1,t.playing=!1,t.trackWidth,t.aCtx,t.master={},t.useAudioTag=!0,function(){return window.AudioContext?(i(),r(),void 0):(t.error=!0,void 0)}(),t.playTracks=function(a){a||(a=t.currentSong.tracks),angular.forEach(a,function(t){t.play()}),t.playing=!0},t.stopTracks=function(a){a||(a=t.currentSong.tracks),angular.forEach(a,function(t){t.stop()}),t.playing=!1},t.$watch("currentSong",function(a,e){t.playing&&t.stopTracks(e.tracks),e&&(n(e.tracks),t.ready=!1,c=0)}),t.trackLoad=function(){++c>=t.currentSong.tracks.length&&(t.ready=!0,t.$$phase||t.$apply(),e())}}]),angular.module("AudioTrackr").factory("audioTrackFactory",["$http",function(t){function a(t){this.ctx=t.ctx,this.useAudioTag=t.useAudioTag,this.url=t.url,this.outNode=t.outNode,this.fftSize=t.fftSize}return a.prototype.addGainNode=function(t){var a=this.ctx.createGain();return t.connect(a),a.connect(this.outNode),a},a.prototype.createAnalyser=function(t){var a=this.ctx.createAnalyser();return a.smoothingTimeConstant=.6,a.fftSize=this.fftSize,t.connect(a),a},a.prototype.loadAndDecode=function(a){var e=this;if(e.useAudioTag){var n=new Audio(e.url);n.addEventListener("canplaythrough",function(){e.node=e.ctx.createMediaElementSource(n),e.gainNode=e.addGainNode(e.node),e.analyser=e.createAnalyser(e.gainNode),a("ready")}),e.audio=n}else{if(e.buffer)return e.pauseTime=null,a("ready"),void 0;a("loading"),t.get(this.url,{responseType:"arraybuffer"}).then(function(t){a("decoding"),e.ctx.decodeAudioData(t.data,function(t){e.buffer=t,a("ready")})})}},a.prototype.play=function(){this.useAudioTag?this.audio.play():this.playBuffer()},a.prototype.stop=function(){this.useAudioTag?this.audio.pause():(this.bsNode.stop(0),this.pauseTime=this.ctx.currentTime-this.startTime)},a.prototype.setVolume=function(t){this.gainNode&&(this.gainNode.gain.value=t)},a.prototype.playBuffer=function(){this.bsNode=this.ctx.createBufferSource(),this.bsNode.buffer=this.buffer;var t=this.pauseTime||0;this.startTime=this.ctx.currentTime,this.pauseTime&&(this.startTime-=this.pauseTime),this.bsNode.start(0,t),this.gainNode=this.addGainNode(this.bsNode,this.outNode),this.analyser=this.createAnalyser(this.gainNode,this.fftSize)},a.prototype.clear=function(){this.audio&&(this.audio.src="")},{getNewAudioTrack:function(){var t=Object.create(a.prototype);return a.apply(t,arguments),t}}}]),angular.module("AudioTrackr").directive("track",function(){function t(t,a,e,n){function r(a){"ready"===a&&(t.loading=!1,a="",t.$parent.trackLoad(t.key,u)),e(function(){t.status=a})}function i(t){u.canvas=t,u.canvas.width=d,u.canvas.height=l,u.cCtx=u.canvas.getContext("2d");var a=u.cCtx.createLinearGradient(0,0,0,l);a.addColorStop(.15,"#e81717"),a.addColorStop(.75,"#7943cb"),a.addColorStop(1,"#005392"),u.cCtx.fillStyle=a,u.cCtx.strokeStyle="#AAA"}t.trackVolume=100,t.loading=!0;var o,c,u=t.track,s=a[0].querySelector("canvas"),d=t.$parent.trackWidth,l=200,f=.75,p=256,h=p/2,m=d/(h*f),g=d/h;!function(){o=n.getNewAudioTrack({ctx:t.$parent.aCtx,useAudioTag:t.$parent.useAudioTag,url:u.url,outNode:t.$parent.master.gainNode,fftSize:p}),o.loadAndDecode(r),i(s),t.$watch("trackVolume",function(t){t/=100,o.setVolume(t)})}(),u.play=function(){o.play(),c=o.analyser},u.stop=function(){o.stop()},u.clear=function(){o.clear()},u.draw=function(){var t=u.cCtx;if(c){var a=new Uint8Array(c.frequencyBinCount);c.getByteFrequencyData(a);var e=new Uint8Array(c.frequencyBinCount);c.getByteTimeDomainData(e),t.clearRect(0,0,d,l),t.beginPath();for(var n=0,r=a.length;r>n;n++){t.fillRect(n*m,l-a[n]/256*l,m-2,l);var i=e[n]/256,o=l-i*l-1;t.lineTo(n*g,o)}t.stroke()}}}return t.$inject=["$scope","$element","$timeout","audioTrackFactory"],{restrict:"EA",replace:!0,scope:{track:"=",trackName:"@"},link:function(){},templateUrl:"track/track.htm",controller:t}});