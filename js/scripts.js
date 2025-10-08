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

// 신부 계좌번호 복사
function brideAccountNumber(){
	var bride_account = '00000000 카카오뱅크';
	var textarea = document.createElement("textarea");
	document.body.appendChild(textarea);
	textarea.value = bride_account;
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	alert("신부의 계좌번호가 복사되었습니다.\n00000000 카카오뱅크")
}

// 신랑 계좌번호 복사
function groomAccountNumber(){
	var groom_account = '00000000 카카오뱅크';
	var textarea = document.createElement("textarea");
	document.body.appendChild(textarea);
	textarea.value = groom_account;
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	alert("신랑의 계좌번호가 복사되었습니다.\n00000000 카카오뱅크")
}

// 아버님 계좌번호 복사 
function groomsFatherAccountNumber(){
    var grooms_father_account = '00000000 국민은행';
	var textarea = document.createElement("textarea");
	document.body.appendChild(textarea);
	textarea.value = grooms_father_account;
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	alert("계좌번호가 복사되었습니다.\n00000000 국민은행")
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
        title: '민준 🤍 서윤 결혼합니다.', // 원하는 타이틀
        description: '2026.01.25 (일) \n오후 3시 30분 로얄파크컨벤션 3F 로얄홀', // 텍스트
        imageUrl: 'https://github.com/FriedTigers/friedtigers.github.io/blob/main/assets/img/compress_2.png?raw=true', //이미지 링크
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

function toggleFoldable() {
    var content = document.querySelector('.foldable-content');
    var toggleIcon = document.getElementById('toggleIcon');

    // 펼치기/접기 상태 변경
    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggleIcon.innerText = '▲';
        // 추가로 펼쳐진 상태에서 수행할 동작 추가 가능
    } else {
        content.style.display = 'none';
        toggleIcon.innerText = '▼';
        // 추가로 접힌 상태에서 수행할 동작 추가 가능
    }
}

function toggleFoldable2() {
    var content = document.querySelector('.foldable-content2');
    var toggleIcon = document.getElementById('toggleIcon2');

    // 펼치기/접기 상태 변경
    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggleIcon.innerText = '▲';
        // 추가로 펼쳐진 상태에서 수행할 동작 추가 가능
    } else {
        content.style.display = 'none';
        toggleIcon.innerText = '▼';
        // 추가로 접힌 상태에서 수행할 동작 추가 가능
    }
}

function toggleFoldable3() {
    var content = document.querySelector('.foldable-content3');
    var toggleIcon = document.getElementById('toggleIcon3');

    // 펼치기/접기 상태 변경
    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggleIcon.innerText = '▲';
        // 추가로 펼쳐진 상태에서 수행할 동작 추가 가능
    } else {
        content.style.display = 'none';
        toggleIcon.innerText = '▼';
        // 추가로 접힌 상태에서 수행할 동작 추가 가능
    }
}

function openTab(tabName) {
    const contents = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');

    contents.forEach((content) => content.style.display = 'none');
    buttons.forEach((btn) => btn.style.borderBottom = 'none');

    document.getElementById(tabName).style.display = 'block';
    event.currentTarget.style.borderBottom = '2px solid #c45b43';
  }
