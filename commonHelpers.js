import{a as L,S as b,i as u}from"./assets/vendor-b11e2a50.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&d(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();function f(t){if(t.length===0)c(),iziToast.warning({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight"}),form.reset();else{const r=t.map(s=>`<li class="gallery-item">
        <a href="${s.largeImageURL}">
        <img class="photo" src="${s.webformatURL}" alt="${s.tags}" />
        </a>
        <ul class="info-list">
          <li class="info-list-item">
            Likes
            <p>${s.likes}</p>
          </li>
          <li class="info-list-item">
            Views
            <p>${s.views}</p>
          </li>
          <li class="info-list-item">
            Comments
            <p>${s.comments}</p>
          </li>
          <li class="info-list-item">
            Downloads
            <p>${s.downloads}</p>
          </li>
        </ul>
      </li>`).join("");i.gallery.insertAdjacentHTML("beforeend",r),w.refresh()}c()}async function m(t,r){const e="https://pixabay.com"+"/api/",o={key:"44405455-dc304595c2bd7cb59ead2c04f",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15};return(await L.get(e,{params:o})).data}const w=new b(".gallery a",{captionsData:"alt",captionDelay:250}),i={gallery:document.querySelector(".gallery"),formEl:document.querySelector(".form"),searchBtn:document.querySelector(".search-btn"),loadMoreBtn:document.querySelector(".load-more-btn"),loaderBox:document.querySelector(".loader")};let l,n=1;const S=15;let h=0;function B(){i.loadMoreBtn.classList.remove("visually-hidden")}function p(){i.loadMoreBtn.classList.add("visually-hidden")}function y(){i.loaderBox.classList.remove("visually-hidden")}function c(){i.loaderBox.classList.add("visually-hidden")}function g(){n>=h?(u.success({color:"blue",position:"topRight",message:"We're sorry, but you've reached the end of search results."}),p()):B()}function v(){const t=i.gallery.firstChild.getBoundingClientRect().height;scrollBy({top:t*2,behavior:"smooth"})}i.formEl.addEventListener("submit",M);i.loadMoreBtn.addEventListener("click",q);async function M(t){if(t.preventDefault(),i.gallery.innerHTML="",l=t.target.elements.inputname.value.trim(),y(),n=1,l!=="")try{const r=await m(l,n);h=Math.ceil(r.totalHits/S),f(r.hits)}catch{u.warning({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight"})}t.target.reset(),c(),g()}async function q(){n+=1,p(),y();try{const t=await m(l,n);f(t.hits)}catch{u.show({message:"Error",color:"red",position:"topRight"})}c(),g(),v()}
//# sourceMappingURL=commonHelpers.js.map
