const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
export const getImageUrl = (path: string | null, size: string = 'w500') => {
  if (!path) {
    return `https://via.placeholder.com/${size === 'w500' ? '500x750' : '1280x720'}?text=No+Image`;
  }
  
  return `${IMAGE_BASE_URL}${size}${path}`;
};