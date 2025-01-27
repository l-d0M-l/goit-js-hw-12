import{a as b,S as L,i as h}from"./assets/vendor-D0cagnvz.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();const m=async(t,s)=>b.get("https://pixabay.com/api/",{params:{key:"48370446-8dcf2f9524038c25db09fe77e",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:s}}),g=t=>`<li class='js-gallery-item'>
  <a class="query-image-big" href="${t.largeImageURL}">
    <img
      class="query-image"
      src="${t.webformatURL}"
      alt="${t.tags}"
    />
    <ul class="gallery-details">
      <li class="gallery-details-section">
        <h3 class="gallery-details-heading">Likes</h3>
        <p class="gallery-details-text">${t.likes}</p>
      </li>
      <li>
        <h3 class="gallery-details-heading">Views</h3>
        <p class="gallery-details-text">${t.views}</p>
      </li>
      <li>
        <h3 class="gallery-details-heading">Comments</h3>
        <p class="gallery-details-text">${t.comments}</p>
      </li>
      <li>
        <h3 class="gallery-details-heading">Downloads</h3>
        <p class="gallery-details-text">${t.downloads}</p>
      </li>
    </ul>
  </a>
</li>`,u=document.querySelector(".js-search-form"),y=document.querySelector(".js-gallery"),o=document.querySelector(".loader"),i=document.querySelector(".js-show-more-btn");let n=1,c="";const v=async t=>{try{if(t.preventDefault(),c=t.currentTarget.elements.user_query.value.trim(),c===""){h.show({message:"Input has to be filled!",color:"red",position:"bottomLeft"});return}o.style.visibility="visible",n=1;const{data:s}=await m(c,n);if(s.total===0){h.show({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",position:"bottomLeft"}),u.reset(),y.innerHTML="",o.style.visibility="hidden",i.classList.add("is-hidden");return}s.totalHits>n*15&&(console.log("asas"),i.classList.remove("is-hidden"),i.addEventListener("click",f));const l=s.hits.map(a=>g(a)).join("");y.innerHTML=l,u.reset(),p.refresh(),o.style.visibility="hidden"}catch(s){o.style.visibility="hidden",console.log(s)}};u.addEventListener("submit",v);let p=new L(".query-image-big",{captions:!0,captionsData:"alt",captionDelay:250});const f=async()=>{try{const s=document.querySelector(".js-gallery-item").getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"}),o.style.visibility="visible",n++,i.classList.add("is-hidden");const{data:l}=await m(c,n),a=l.hits.map(e=>g(e)).join("");if(y.insertAdjacentHTML("beforeend",a),o.style.visibility="hidden",p.refresh(),l.totalHits<n*15){i.classList.add("is-hidden"),h.show({message:"We're sorry, but you've reached the end of search results.",color:"blue",position:"topRight"}),i.removeEventListener("click",f);return}i.classList.remove("is-hidden")}catch(t){console.log(t),i.classList.add("is-hidden")}};
//# sourceMappingURL=index.js.map
