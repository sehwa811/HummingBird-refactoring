export const isMobileDeviceByUserAgent = (): boolean => {
  if (typeof navigator === "undefined") {
    return false;
  }
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isMobileDevice = (): boolean => {
  return isMobileDeviceByUserAgent();
};

export const isDesktopDevice = (): boolean => {
  return !isMobileDevice();
};
