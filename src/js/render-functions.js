export const createMarkUp = imgINfo => {
  return `<li class='js-gallery-item'>
  <a class="query-image-big" href="${imgINfo.largeImageURL}">
    <img
      class="query-image"
      src="${imgINfo.webformatURL}"
      alt="${imgINfo.tags}"
    />
    <ul class="gallery-details">
      <li class="gallery-details-section">
        <h3 class="gallery-details-heading">Likes</h3>
        <p class="gallery-details-text">${imgINfo.likes}</p>
      </li>
      <li>
        <h3 class="gallery-details-heading">Views</h3>
        <p class="gallery-details-text">${imgINfo.views}</p>
      </li>
      <li>
        <h3 class="gallery-details-heading">Comments</h3>
        <p class="gallery-details-text">${imgINfo.comments}</p>
      </li>
      <li>
        <h3 class="gallery-details-heading">Downloads</h3>
        <p class="gallery-details-text">${imgINfo.downloads}</p>
      </li>
    </ul>
  </a>
</li>`;
};
