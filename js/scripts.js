/*!
* Start Bootstrap - Stylish Portfolio v6.0.6 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/

// 링크 복사
function copyLink(){
	var url = 'https://friedtigers.github.io';
	var textarea = document.createElement("textarea");
	document.body.appendChild(textarea);
	textarea.value = url;
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	alert("링크가 복사되었습니다. 널리널리 퍼뜨려주세요😊")
}

function toggleFoldable(selector, iconSelector) {
  const content = document.querySelector(selector);
  const toggleIcon = document.querySelector(iconSelector);

  if (content.style.maxHeight && content.style.maxHeight !== '0px') {
    content.style.maxHeight = '0';
    toggleIcon.innerText = '▼';
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
    toggleIcon.innerText = '▲';
  }
}

// ✅ 클립보드 복사 + 토스트 메시지
function copyAccount(accountNumber) {
  navigator.clipboard.writeText(accountNumber).then(() => {
    showToast('계좌번호가 복사되었습니다 ✓');
  }).catch(err => {
    showToast('복사 중 오류가 발생했습니다.');
    console.error('복사 오류:', err);
  });
}

// ✅ 토스트 표시 함수
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  // 2초 후 사라짐
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// 카카오톡 공유하기
function kakaoShare() {
    Kakao.init('7c96defb93355a299eed984f7f2cf82e');
    // SDK 초기화 여부를 판단합니다.
    Kakao.isInitialized();
    //Kakao.Link.createScrapButton({
    //    container: '#kakao-link-btn',
    //    requestUrl: 'https://friedtigers.github.io/',
    //    templateId: '124938'
    // });

    // 메세지 꾸미는 부분
    Kakao.Share.sendDefault({
        objectType: 'feed', // 이미지 + 텍스트의 경우 feed
        content: {
        title: '민준 ♥️ 서윤 결혼합니다💍', // 원하는 타이틀
        description: '2026.01.25 (일) \n오후 3시 30분 로얄파크컨벤션 3F 로얄홀', // 텍스트
        imageUrl: 'https://github.com/FriedTigers/friedtigers.github.io/blob/main/assets/img/kakaomain.png?raw=true', //이미지 링크
        link: {
            mobileWebUrl: 'https://friedtigers.github.io/', // 연결될 모바일 웹 링크
            webUrl: 'https://friedtigers.github.io/', // 연결될 pc 웹 링크
        },
        },
        buttons: [
        {
            title: '모바일 청첩장 보기', // 메세지 내에 버튼에 쓰여질 텍스트
            link: {
            mobileWebUrl: 'https://friedtigers.github.io/', // 연결될 모바일 웹 링크
            webUrl: 'https://friedtigers.github.io/', // 연결될 모바일 웹 링크
            },
        },
        ],
        // 카카오톡 미설치 시 카카오톡 설치 경로이동
        installTalk: true,
    })
}

function openTab(tabName) {
    const contents = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');

    contents.forEach((content) => content.style.display = 'none');
    buttons.forEach((btn) => btn.style.borderBottom = 'none');

    document.getElementById(tabName).style.display = 'block';
    event.currentTarget.style.borderBottom = '2px solid #c45b43';
}


// ✅ 1️⃣ 우클릭 방지
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

  // ✅ 2️⃣ 이미지 드래그 방지
  document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  // ✅ 3️⃣ 터치 오래 누르기 방지 (모바일)
  document.addEventListener('touchstart', function(e) {
    clearTimeout(window.touchTimer);
    window.touchTimer = setTimeout(function() {
      e.preventDefault();
    }, 400);
  });
  document.addEventListener('touchend', function(e) {
    clearTimeout(window.touchTimer);
  });

  // ✅ 4️⃣ 이미지 더블탭 확대 방지 (iOS)
  document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
  });

  // ✅ 5️⃣ 개발자도구 F12 감지 (일반인 방어 수준)
  document.addEventListener('keydown', function(e) {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
      (e.ctrlKey && e.key === "U")
    ) {
      e.preventDefault();
    }
  });






document.addEventListener("DOMContentLoaded", function() {
  /* ===============================
     📸 갤러리 섹션
  =============================== */
  const mainPhoto = document.getElementById("main-photo");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const gallery = document.getElementById("thumbnail-gallery");
  const progressFill = document.getElementById("progress-fill");
  const btnPrev = document.getElementById("thumb-prev");
  const btnNext = document.getElementById("thumb-next");

  // ✅ 썸네일 클릭 시 메인 이미지 변경 (페이드 효과 포함)
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      if (mainPhoto.src === thumb.src) return; // 같은 이미지면 무시

      // 페이드 아웃 → 이미지 변경 → 페이드 인
      mainPhoto.classList.add("fade-out");
      setTimeout(() => {
        mainPhoto.src = thumb.src;
        mainPhoto.classList.remove("fade-out");
      }, 250);

      // 썸네일 active 표시
      thumbnails.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");

      // 진행바 업데이트
      updateProgress(index);

      // 현재 index 저장 (라이트박스용)
      currentIndex = index;
    });
  });

  // ✅ 진행 바 업데이트
  function updateProgress(index) {
    const total = thumbnails.length;
    const percent = ((index + 1) / total) * 100;
    progressFill.style.width = `${percent}%`;
  }

  // ✅ 좌우 스크롤 버튼
  const scrollAmount = 120;
  btnPrev.addEventListener("click", () => {
    gallery.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    setTimeout(updateScrollProgress, 400);
  });
  btnNext.addEventListener("click", () => {
    gallery.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(updateScrollProgress, 400);
  });

  // ✅ 스크롤 시 진행바 업데이트
  function updateScrollProgress() {
    const scrollLeft = gallery.scrollLeft;
    const scrollWidth = gallery.scrollWidth - gallery.clientWidth;
    const percent = (scrollLeft / scrollWidth) * 100;
    progressFill.style.width = `${percent}%`;
  }
  gallery.addEventListener("scroll", updateScrollProgress);
  updateProgress(0);

  /* ===============================
     🌙 라이트박스(전체화면 보기)
  =============================== */
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.innerHTML = `
    <img id="lightbox-img" src="" alt="확대 이미지"
         style="max-width: 90%; max-height: 80%; border-radius: 10px; user-select: none; pointer-events: none;">
    <div style="margin-top: 20px; display: flex; gap: 25px;">
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
  });
  document.body.appendChild(lightbox);

  const lightboxImg = document.getElementById("lightbox-img");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const closeBtn = document.getElementById("close-btn");
  let currentIndex = 0;

  // ✅ 메인 사진 클릭 시 라이트박스 열기
  mainPhoto.addEventListener("click", () => {
    const activeThumb = document.querySelector(".thumbnail.active");
    currentIndex = Array.from(thumbnails).indexOf(activeThumb);
    openLightbox(thumbnails[currentIndex].src);
  });

  // ✅ 썸네일 클릭 시 현재 index 업데이트
  thumbnails.forEach((thumb, i) => {
    thumb.addEventListener("click", () => {
      currentIndex = i;
    });
  });

  // ✅ 라이트박스 열기
  function openLightbox(src) {
    lightbox.style.display = "flex";
    lightboxImg.src = src;
  }

  // ✅ 닫기
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // ✅ 좌우 이동
  prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
  nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

  function showImage(index) {
    if (index < 0) index = thumbnails.length - 1;
    if (index >= thumbnails.length) index = 0;
    currentIndex = index;
    lightboxImg.src = thumbnails[currentIndex].src;
  }

  // ✅ 배경 클릭 시 닫기
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });

  // ✅ 키보드 제어
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display !== "flex") return;
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "Escape") lightbox.style.display = "none";
  });

  /* ===============================
     🛡️ 이미지 스크랩 방지
  =============================== */
  const allImages = document.querySelectorAll("img");
  allImages.forEach(img => {
    img.addEventListener("contextmenu", e => e.preventDefault());
    img.addEventListener("dragstart", e => e.preventDefault());
    img.addEventListener("touchstart", e => e.preventDefault());
  });
});


