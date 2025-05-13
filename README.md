## 반응형 웹 UI CLONE 프로젝트 (DESIGN SAMSUNG)

삼성 공식 웹사이트를 참조하여 제작한 반응형 랜딩 페이지입니다.
기존 CSS를 이용한 코드와는 달리 Vanilla JavaScript, Swiper, GSAP를 활용해 인터랙션으로 구현하였으며,
PC와 모바일 환경 모두에서 일관된 사용자 경험(UX)을 제공할 수 있도록 설계하였습니다.
디자인과 개발 간의 흐름을 고려한 UI 구성과 부드러운 애니메이션 처리에 중점을 두었습니다.

<br/>

### 🎯 주요 기능

- 반응형 내비게이션 구조
- 모바일 이미지 슬라이더
- 스크롤 트리거 애니메이션
- 텍스트 롤링 슬라이더 (setInterval)
- 데스크탑 커스텀 호버 효과
- 디바이스별 이미지 및 UI 최적화
- 접힘/펼침 애니메이션 (Sort By)

<br/>

### 🛠️ 사용 기술

| 기술 | 설명 |
|------|------|
| ![HTML](https://img.shields.io/badge/HTML5-F05032?logo=html5&logoColor=white&style=flat-square) | HTML5 마크업 구조 |
| ![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white&style=flat-square) | CSS3 반응형 스타일 처리 |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=flat-square) | JavaScript DOM 제어, Swiper & GSAP 연동 |
| ![Swiper](https://img.shields.io/badge/Swiper-6332F6?logo=swiper&logoColor=white&style=flat-square) | Swiper.js 모바일 슬라이더 구현 |
| ![GSAP](https://img.shields.io/badge/GSAP-88CE02?logo=greensock&logoColor=white&style=flat-square) | GSAP 고급 스크롤 애니메이션 |

<br/>

### 📸 데모 이미지

| 모바일 메뉴 | 메인 슬라이더 | 커스텀 커서 |
|-------------|----------------|-------------|
| ![](images/ss2.jpg) | ![](images/ss6.jpg) | ![](images/ss10.jpg) |



<br/>

### ⚙️ 기능 상세 설명

### 1. 화면 크기 확인 (`checkMobile`)

- checkMobile 함수는 화면 너비가 760px 미만일 경우 모바일 화면으로 간주하고, 그에 맞게 레이아웃을 조정합니다.

```javascript
function checkMobile(){
    let winWidth = window.innerWidth;
    if(winWidth < 760){
        isMobile = true;
    } else {
        isMobile = false;
    }

    if(isMobile){
        header.classList.add('mobile');
        darkLayer.classList.add('show');
    } else {
        header.classList.remove('mobile');
        darkLayer.classList.remove('show');
    }
}

---

### ✅ 2. 디바운스 처리 (debounce)

- 화면 크기 조정 (resize) 이벤트에 디바운스를 적용하여, 화면 크기 조정이 끝난 후 한 번만 함수가 실행되도록 합니다.

<img src="images/ss2.jpg" width="300px" alt="모바일 메뉴 상호작용">

```javascript
let resizeTimeout;
function debounceResize(){
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function(){
        checkMobile();
    }, 200); // 200ms 후에 실행
}

window.addEventListener('resize', debounceResize);
```

---

### ✅  3. GSAP 애니메이션 (gsap)

- gsap.set을 사용하여 초기 상태를 설정한 뒤, scrollTrigger를 이용해 각 섹션을 스크롤할 때마다 애니메이션을 적용합니다.
- main_txt, la_left, sortBy_inner 등의 요소는 스크롤할 때 나타나도록 설정되어 있습니다.

<img src="images/ss3.jpg" alt="모바일 메뉴 2depth">

```javascript
gsap.set('.main_txt', { opacity: 0, y: 50 });

gsap.to('.main_txt', {
    scrollTrigger: {
        trigger: '.main_txt',
        start: 'top bottom',
        end: 'top center',
        scrub: true,
    },
    opacity: 1,
    y: 0,
    duration: 1
});
```

---

### ✅ 4. GNB 메뉴 호버 시 메뉴 열림(PC 전용)

- 메뉴 hover 시 헤더 높이 증가(=메뉴 열림), 마우스가 빠져나가면 원복합니다.

<img src="images/ss4.jpg" alt="데스크탑 GNB 호버">

```javascript
item1.addEventListener("mouseenter", function(){
	if(!desktopFlag) return;
	header.classList.add("on");
	header.style.height = "300px";
});

item1.addEventListener("mouseleave", function(){
	if(!desktopFlag) return;
	header.classList.remove("on");
	header.removeAttribute("style");
});
```

---

### ✅ 5. 이미지 백그라운드 JS로 넣기 (반응형)

- 반응형을 목적으로 .pc, .mobile 요소 각각에 JS로 backgroundImage 삽입합니다.

<img src="images/ss5.jpg" alt="스와이퍼 반응형 이미지 변경">

```javascript
const imageData = [
	{ pc: "visual_pc1.jpg", mobile: "visual_mobile1.jpg" },
	{ pc: "visual_pc2.jpg", mobile: "visual_mobile2.jpg" }
];

let swiperSlides = document.querySelectorAll(".main-slider .swiper-slide");

swiperSlides.forEach(function(item, i){
	let pc = item.querySelector(".pc");
	let mobile = item.querySelector(".mobile");

	pc.style.backgroundImage = `url(images/${imageData[i].pc})`;
	mobile.style.backgroundImage = `url(images/${imageData[i].mobile})`;
});
```

---

### ✅ 6. 메인 Swiper

- 페이드 효과가 적용된 루프형 메인 슬라이더입니다.

<img src="images/ss6.jpg" alt="메인 슬라이더">

```javascript
new Swiper(".main-slider .mainSwiper", {
	loop: true,
	speed: 1000,
	effect: "fade",
	fadeEffect: { crossFade: true },
	autoplay: { delay: 5000 },
	pagination: {
		el: ".main-slider .swiper-pagination",
		clickable: true,
		renderBullet: function(index, className){
			return `<span class="${className}">0${index+1}</span>`;
		}
	}
});
```

---

### ✅ 7. 다중 Swiper

- 반응형으로 슬라이드 수가 바뀌는 다중 슬라이더입니다.
- autoplay가 적용되어 있어 기본적으로 자동으로 넘어가는 형태입니다.

<img src="images/ss7.jpg" alt="다중 슬라이더">

```javascript
const productSwiper = new Swiper(".main-product .productSwiper", {
	loop: true,
	speed: 2000,
	slidesPerView: 1.5,
	centeredSlides: true,
	spaceBetween: 20,
	autoplay: { delay: 2000 },
	breakpoints: {
		769: {
			slidesPerView: 3,
			spaceBetween: 20
		},
		1025: {
			slidesPerView: 4.5,
			spaceBetween: 50
		}
	}
});
```

---

### ✅ 8. 텍스트를 좌우로 움직이는 애니메이션(GSAP)

- .main-typo 내부 텍스트 요소를 좌우로 움직이게 해 사용자의 시선을 끕니다.

<img src="images/ss8_1.jpg" alt="텍스트 이동 전">
<img src="images/ss8_2.jpg" alt="텍스트 이동 후">

```javascript
function checkDevice(){
	if(window.matchMedia("(max-width: 768px)").matches){
		if(device == "mobile") return;
		device = "mobile";
		xoffset = 7;
	} else {
		if(device == "pc") return;
		device = "pc";
		xoffset = 15;
	}

	gsap.utils.toArray(".main-typo").forEach(function(item){
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: item,
				scrub: 1,
				start: "top bottom"
			}
		});

		tl.to(item.querySelector("div:nth-child(1)"), {
			x: -1 * xoffset + "%",
			duration: 1
		});
		tl.to(item.querySelector("div:nth-child(2)"), {
			x: xoffset + "%",
			duration: 1,
			delay: -1
		});
	});
}
```

---

### ✅ 9. 특정 페이지 영역 진입 시 이미지 스케일 조절 (GSAP)

- .scale-ani 요소가 화면 안에 들어오면 .active 클래스 추가 및 제거(scale(0.8) <-> scale(1.5))합니다.

<img src="images/ss9.jpg" alt="이미지 크기 조절">

```javascript
gsap.utils.toArray(".scale-ani").forEach(function(item){
	gsap.timeline({
		scrollTrigger: {
			trigger: item,
			start: "top bottom",
			end: "bottom top",
			onEnter: function(){
				item.classList.add("active");
			},
			onLeave: function(){
				item.classList.remove("active");
			},
			onLeaveBack: function(){
				item.classList.remove("active");
			}
		},
		delay: 2
	});
});
```

---

### ✅ 10. 마우스 따라다니는 커서

- 마우스 움직임에 따라 .custom-cursor, .custom-cursor-text가 따라다니게 설정했습니다.

<img src="images/ss10.jpg" alt="슬라이더 위에선 따라다니는 마우스 커서 생성">

```javascript
document.body.addEventListener("mousemove", function(e){
	gsap.to("#custom-cursor, #custom-cursor-text", {
		x: e.clientX,
		y: e.clientY,
		duration: 1.2,
		ease: Power3.easeOut
	});
});
```

+ hover 시 텍스트와 원이 커짐

- .custom-hover에 마우스가 올라가면 애니메이션 효과가 발생합니다.

```javascript
customHover.forEach(function(item){
	item.addEventListener("mouseenter", function(){
		gsap.to(".custom-hover-circle, .custom-hover-text", {
			width: "100%",
			height: "100%",
			opacity: 1,
			duration: 0.3,
			ease: Power3.easeOut
		});
	});

	item.addEventListener("mouseleave", function(){
		gsap.to(".custom-hover-circle, .custom-hover-text", {
			width: 0,
			height: 0,
			opacity: 0,
			duration: 0.3,
			ease: Power3.easeOut
		});
	});
});
```

---

### ✅ 11. page-top 버튼 보이기 / 숨기기
- window.scrollY가 내려가면 #page-top 버튼이 나타남.

<img src="images/ss11.jpg" alt="fiexd top 버튼">

```javascript
window.addEventListener("scroll", function(){
	let winH = window.innerHeight;
	if(window.scrollY > winH){
		pageTop.classList.add("show");
	} else {
		pageTop.classList.remove("show");
	}
});
```

+ page-top 버튼 클릭 시 부드러운 이동 (GSAP)

- 클릭 시 맨 위로 스무스하게 스크롤됩니다.

```javascript
pageTop.addEventListener("click", function(){
	gsap.to(window, { scrollTo: 0, duration: 0.3, ease: Power3.easeOut });
});
```
