const stopVideo = (index: number) => {
  const iframe = document.getElementById(
    `iframe-${index}`
  ) as HTMLIFrameElement | null;
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
  }
};

export { stopVideo };
