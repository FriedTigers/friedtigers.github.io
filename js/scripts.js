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

const thumbnails = document.querySelectorAll('.thumbnail');
const mainPhoto = document.getElementById('main-photo');
const gallery = document.getElementById('thumbnail-gallery');
const progressFill = document.getElementById('progress-fill');

// ✅ 썸네일 클릭 → 메인 사진 변경
thumbnails.forEach(thumb => {
thumb.addEventListener('click', () => {
    thumbnails.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    mainPhoto.src = thumb.src;
});
});

  // ✅ 스크롤 시 진행 막대 업데이트
gallery.addEventListener('scroll', () => {
const scrollLeft = gallery.scrollLeft;
const scrollWidth = gallery.scrollWidth - gallery.clientWidth;
const progress = (scrollLeft / scrollWidth) * 100;
progressFill.style.width = `${progress}%`;
});

  // ✅ 좌우 버튼
document.getElementById('thumb-prev').addEventListener('click', () => {
gallery.scrollBy({ left: -150, behavior: 'smooth' });
});
document.getElementById('thumb-next').addEventListener('click', () => {
gallery.scrollBy({ left: 150, behavior: 'smooth' });
});

// ✅ 1️⃣ 마우스 오른쪽 클릭 방지
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

  // ✅ 2️⃣ 드래그로 이미지 끌기 방지
  document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  // ✅ 3️⃣ 이미지 선택 방지 (더블클릭/드래그 선택 등)
  document.addEventListener('selectstart', function(e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  // ✅ 4️⃣ 모바일에서 ‘길게 눌러 저장’ 방지
  document.addEventListener('touchstart', function(e) {
    if (e.target.tagName === 'IMG') {
      e.target.style.pointerEvents = 'none';
      setTimeout(() => {
        e.target.style.pointerEvents = 'auto';
      }, 300);
    }
  });
