"use client"
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource('http://127.0.0.1:8000/stream/output.m3u8');
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });

      // Error Handling
      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          console.error("Fatal error:", data.type);
          hls.destroy();
        }
      });

    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = 'http://127.0.0.1:8000/stream/output.m3u8';
      video.addEventListener('loadedmetadata', function () {
        video.play();
      });
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="relative">
        <video ref={videoRef} className="h-auto w-full" muted autoPlay></video>
        <div className="absolute top-2 right-2 bg-red-500 text-white text-sm rounded-full px-2 py-1 z-10 shadow-md">
          LIVE
        </div>
      </div>
    </div>
  );
  
}


