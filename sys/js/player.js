var player = videojs('main-video-player', {
    controlBar: {
      volumePanel: {
        inline: false
      }
    },
    playbackRates: [0.10, 0.25, 0.5, 1, 1.5, 2]
});

$( ".vjs-control-bar button" ).addClass( "mdui-ripple" );
