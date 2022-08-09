import React, { Component, useEffect, useRef } from "react";

const OpenViduVideo = ({ streamManager }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(this.videoRef.current);
    }
  }, []);

  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(this.videoRef.current);
    }
  }, [streamManager]);
  return <video autoPlay={true} ref={this.videoRef} />;
};

export default OpenViduVideo;
