const isPhotoOrVideo = (filename: string) => {
  const photoExtensions = /\.(jpe?g|png|gif|bmp)$/i;
  const videoExtensions = /\.(mp4|mov|avi|wmv)$/i;

  if (photoExtensions.test(filename)) {
    return 'Photo';
  } else if (videoExtensions.test(filename)) {
    return 'Video';
  } else {
    return 'Unknown';
  }
};

export default {isPhotoOrVideo};
