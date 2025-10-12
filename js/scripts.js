/*!
 * Wedding Invitation Custom JS (Final Stable Version)
 * Compatible with HTML onclick calls (toggleFoldable, kakaoShare, copyLink)
 */

//////////////////////////////////////
// 📎 링크 복사
//////////////////////////////////////
function copyLink() {
  const url = 'https://friedtigers.github.io';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url)
      .then(() => showToast("링크가 복사되었습니다. 널리널리 퍼뜨려주세요 😊"))
      .catch(() => alert("복사 실패. 브라우저를 확인해주세요."));
  } else {
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showToast("링크가 복사되었습니다. 널리널리 퍼뜨려주세요 😊");
  }
}

//////////////////////////////////////
// 💳 접기/펼치기 (신랑·신부측 계좌)
//////////////////////////////////////
function toggleFoldable(selector, iconSelector) {
  const content = document.querySelector(selector);
  const icon = document.querySelector(iconSelector);
  if (content.style.maxHeight && content.style.maxHeight !== '0px') {
    content.style.maxHeight = '0';
    icon.innerText = '▼';
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
    icon.innerText = '▲';
  }
}

//////////////////////////////////////
// 💰 계좌번호 복사
//////////////////////////////////////
function copyAccount(accountNumber) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(accountNumber)
      .then(() => showToast('계좌번호가 복사되었습니다 ✓'))
      .catch(() => showToast('복사 중 오류가 발생했습니다.'));
  } else {
    const temp = document.createElement("textarea");
    document.body.appendChild(temp);
    temp.value = accountNumber;
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    showToast('계좌번호가 복사되었습니다 ✓');
  }
}

//////////////////////////////////////
// 🔔 토스트 메시지
//////////////////////////////////////
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

//////////////////////////////////////
// 💬 카카오톡 공유
//////////////////////////////////////
function kakaoShare() {
  // SDK 준비 여부 확인
  if (typeof Kakao === "undefined") {
    showToast("카카오 SDK가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요 🙏");
    return;
  }

  if (!Kakao.isInitialized()) {
    showToast("카카오 준비 중입니다... 잠시만 기다려주세요 🙏");
    return;
  }

  // 사용자 피드백 (느리게 느껴질 때 대비)
  showToast("카카오톡을 여는 중입니다...");

  try {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '민준 ♥️ 서윤 결혼합니다💍',
        description: '2026.01.25 (일) 오후 3시 30분 로얄파크컨벤션 3F 로얄홀',
        imageUrl: 'https://github.com/FriedTigers/friedtigers.github.io/blob/main/assets/img/kakaomain.png?raw=true',
        link: {
          mobileWebUrl: 'https://friedtigers.github.io/',
          webUrl: 'https://friedtigers.github.io/',
        },
      },
      buttons: [
        {
          title: '모바일 청첩장 보기',
          link: {
            mobileWebUrl: 'https://friedtigers.github.io/',
            webUrl: 'https://friedtigers.github.io/',
          },
        },
      ],
      installTalk: true,
    });
  } catch (err) {
    console.error("❌ Kakao share failed:", err);
    showToast("카카오톡을 여는 중 오류가 발생했습니다 😢");
  }
}

//////////////////////////////////////
// 🗂 탭 전환 (예식정보/식사/주차)
//////////////////////////////////////
function openTab(tabName) {
  const contents = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-btn');
  contents.forEach(c => c.style.display = 'none');
  buttons.forEach(b => b.style.borderBottom = 'none');
  document.getElementById(tabName).style.display = 'block';
  event.currentTarget.style.borderBottom = '2px solid #c45b43';
}

//////////////////////////////////////
// 📸 갤러리 + 라이트박스
//////////////////////////////////////
document.addEventListener("DOMContentLoaded", function() {

  const mainPhoto = document.getElementById("main-photo");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const gallery = document.getElementById("thumbnail-gallery");
  const progressFill = document.getElementById("progress-fill");
  const btnPrev = document.getElementById("thumb-prev");
  const btnNext = document.getElementById("thumb-next");
    
    // SDK 스크립트가 로드되었는지 확인
    if (typeof window.Kakao !== "undefined" && !window.Kakao.isInitialized()) {
      window.Kakao.init('7c96defb93355a299eed984f7f2cf82e');
      console.log('✅ Kakao SDK initialized');
    } else {
      console.warn("⚠️ Kakao SDK not found. Check script tag or network.");
    }
  // ✅ 썸네일 클릭 시 메인 이미지 변경
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      if (mainPhoto.style.backgroundImage === `url("${thumb.src}")`) return;
      mainPhoto.classList.add("fade-out");
      setTimeout(() => {
          mainPhoto.style.backgroundImage = `url("${thumb.src}")`;
          mainPhoto.classList.remove("fade-out");
      }, 250);
      thumbnails.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      updateProgress(index);
      currentIndex = index;
    });
      const fadeSections = document.querySelectorAll('.fade-in-section');

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // ✅ 한 번만 실행 (불필요한 연산 제거)
          }
        });
      }, {
        threshold: 0.15,  // 15% 노출될 때 작동
        rootMargin: "0px 0px -10% 0px" // 약간 미리 시작
      });

      fadeSections.forEach(section => observer.observe(section));
  });

  function updateProgress(index) {
    const total = thumbnails.length;
    const percent = ((index + 1) / total) * 100;
    progressFill.style.width = `${percent}%`;
  }

  btnPrev.addEventListener("click", () => {
    gallery.scrollBy({ left: -120, behavior: "smooth" });
  });
  btnNext.addEventListener("click", () => {
    gallery.scrollBy({ left: 120, behavior: "smooth" });
  });

  // ✅ 라이트박스 생성
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.innerHTML = `
    <img id="lightbox-img" src="" alt="확대 이미지"
         style="max-width:90%; max-height:80%; border-radius:10px; user-select:none; opacity:0; transition:opacity 0.4s ease;">
    <div style="margin-top:20px; display:flex; gap:25px;">
      <button id="prev-btn" style="background:none; border:none; color:white; font-size:30px; cursor:pointer;">&#10094;</button>
      <button id="close-btn" style="background:none; border:none; color:white; font-size:30px; cursor:pointer;">&#10005;</button>
      <button id="next-btn" style="background:none; border:none; color:white; font-size:30px; cursor:pointer;">&#10095;</button>
    </div>
  `;
  Object.assign(lightbox.style, {
    display: "none",
    position: "fixed",
    top: "0", left: "0",
    width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "9999",
    flexDirection: "column",
    opacity: "0",
    transition: "opacity 0.4s ease"
  });
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("#lightbox-img");
  const prevBtn = lightbox.querySelector("#prev-btn");
  const nextBtn = lightbox.querySelector("#next-btn");
  const closeBtn = lightbox.querySelector("#close-btn");
  let currentIndex = 0;

  // ✅ 메인 사진 클릭 시 라이트박스 열기
    mainPhoto.addEventListener("click", () => {
      const activeThumb = document.querySelector(".thumbnail.active");
      currentIndex = Array.from(thumbnails).indexOf(activeThumb);
      const src = thumbnails[currentIndex].src; // 썸네일 이미지 경로 그대로 사용
      openLightbox(src);
    });

  function openLightbox(src) {
    lightbox.style.display = "flex";
    lightbox.style.pointerEvents = "auto";
    lightboxImg.style.opacity = "0";
    lightboxImg.src = src;
    requestAnimationFrame(() => {
      lightbox.style.opacity = "1";
      lightboxImg.style.opacity = "1";
    });
  }

  // ✅ 닫기 (페이드아웃)
  function closeLightbox() {
    lightbox.style.opacity = "0";
    lightboxImg.style.opacity = "0";
    lightbox.style.pointerEvents = "none";
    setTimeout(() => {
      lightbox.style.display = "none";
    }, 400);
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
  nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

  function showImage(index) {
    if (index < 0) index = thumbnails.length - 1;
    if (index >= thumbnails.length) index = 0;
    currentIndex = index;
    lightboxImg.style.opacity = "0";
    setTimeout(() => {
      lightboxImg.src = thumbnails[currentIndex].src;
      lightboxImg.style.opacity = "1";
    }, 200);
  }

  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display !== "flex") return;
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "Escape") closeLightbox();
  });

  // 🛡️ 스크랩 방지 (모바일 친화)
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('dragstart', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });
  document.addEventListener('touchstart', (e) => {
    clearTimeout(window.touchTimer);
    window.touchTimer = setTimeout(() => {
      e.preventDefault(); // 길게 눌렀을 때만 방지
    }, 700);
  }, { passive: true });
  document.addEventListener('touchend', () => clearTimeout(window.touchTimer), { passive: true });
  document.addEventListener('gesturestart', e => e.preventDefault());

}); // ✅ ← DOMContentLoaded 완전히 닫힘


//////////////////////////////////////
// 🌍 HTML onclick 함수 전역 등록
//////////////////////////////////////
window.copyLink = copyLink;
window.copyAccount = copyAccount;
window.toggleFoldable = toggleFoldable;
window.kakaoShare = kakaoShare;
window.openTab = openTab;
