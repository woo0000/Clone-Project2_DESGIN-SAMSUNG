window.addEventListener("load", function(){
	let isMobile;

	let header=document.querySelector("header");
	let dim=document.querySelector(".dim");
	let body=document.querySelector("body");
	let research=document.querySelector(".research");
	let form_close=document.querySelector(".form_close");
	let nav=document.querySelector("nav");
	let lang=document.querySelector(".lang");
	let pageList=document.querySelectorAll("section");

	let mo_menu=document.querySelector(".mobile_menu");
	let mo_txt_slide=document.querySelector(".mo_text_slider");
	let mo_lang=document.querySelector(".mo_lang");

	function checkMobile() {
		let newIsMobile = window.innerWidth < 760;

		if (newIsMobile !== isMobile) {
			isMobile = newIsMobile;

			if (isMobile) { //모바일 화면일 때
				header.classList.remove("active");
				dim.classList.remove("active");
				body.classList.add("scroll");

				if (research) research.classList.add("on");
				if (mo_menu) mo_menu.classList.remove("active");
				if (mo_txt_slide) mo_txt_slide.classList.add("on");
				if (mo_lang) mo_lang.classList.add("on");
			}
			else{ //데스크탑 화면일 때
				if (research) research.classList.add("on");
				if (mo_menu) mo_menu.classList.remove("active");
				if (mo_txt_slide) mo_txt_slide.classList.remove("on");
				if (mo_lang) mo_lang.classList.remove("on");
			}
		}
	};

	function debounce(func, delay) {
		let timeoutId;
		return function(...args) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				func.apply(this, args);
			}, delay);
		};
	}

	const debouncedCheckMobile = debounce(checkMobile, 100); // checkMobile 함수에 debounce 적용

	window.addEventListener("resize", debouncedCheckMobile);

	checkMobile();

	//gsap
	let main_image=document.querySelector("#main .image img");
	let main_txt=[
		document.querySelector("#main .text p"),
		document.querySelectorAll("#main .text ul li")
	];
	let la_left=document.querySelectorAll("#latest .left");
	let la_rightList=document.querySelectorAll("#latest .right > li");
	let sortBy_inner=document.querySelectorAll("#sort .inner_content ul li")
	let sortBy_p=document.querySelector("#sort .inner_content p");
	let more_image=document.querySelectorAll("#morestories .image img");
	let news=document.querySelectorAll("#news .swiper-slide img")

	gsap.set(main_txt, { y: 50, opacity: 0 });
	gsap.set(la_left, { opacity: 0 });
	gsap.set(la_rightList, { opacity: 0 });
	gsap.set(sortBy_inner, { y: 50, opacity: 0 });
	gsap.set(more_image, { transition: "none", y: 300, opacity: 0 });
	gsap.set(news, { transition: "none", y: 500, opacity: 0 });

	pageList.forEach(function(item, i){
		const tl=gsap.timeline({
			scrollTrigger: {
				trigger: item,
				start: "top 80%",
				end: "bottom 20%",
				onEnter: function(){
					if(item.classList.contains("active") == false){
						item.classList.add("active");
					}

					if (i === 0) {
						gsap.to(main_txt, {
							y: 0,
							opacity: 1,
							duration: 1,
							overwrite: true
						});
					}

					if (i === 1) {
						tl.fromTo(la_left, { y: 50, opacity: 0 },{ y: 0, opacity: 1, duration: 0.3, overwrite: true });
						la_rightList.forEach(function(innerItem, index) {
							tl.fromTo(innerItem,
								{ y: 50, opacity: 0 },
								{
									y: 0,
									opacity: 1,
									duration: 0.3,
									stagger: 0.1,
									overwrite: true
								}
							);
						});
					}

					if (i === 3) {
						let tl_sort = gsap.timeline({ overwrite: true });
						tl_sort.to(sortBy_p, { y: 0, opacity: 1, duration: 0.3 });
						sortBy_inner.forEach(function(innerItem, innerIndex) {
							tl_sort.fromTo(innerItem,
								{ y: 50, opacity: 0 },
								{
									y: 0,
									opacity: 1,
									duration: 0.3,
									stagger: 0.01
								}
							);
						});
					}

					if (i === 4) {
						let tl_more = gsap.timeline({ overwrite: true });
						gsap.set(more_image, { transition: "none", y: 100, opacity: 0 });
						more_image.forEach(function(imgItem, imgIndex) {
							tl_more.to(imgItem, {
								y: 0,
								opacity: 1,
								duration: 0.3,
								stagger: 0.01,
								ease: "sine.out"
							});
						});

						let more_elements = document.querySelectorAll("#morestories .swiper-slide h3, #morestories .swiper-slide p, #morestories .swiper-slide span");
						tl_more.fromTo(
							more_elements,
							{ opacity: 0 },
							{ opacity: 1, duration: 0.2, stagger: 0.1 },
							"-=1"
						);
					}

					if (i === 5) {
						let tl_news = gsap.timeline({ overwrite: true });
						gsap.set(news, { transition: "none", y: 100, opacity: 0 });
						news.forEach(function(imgItem, imgIndex) {
							tl_news.to(imgItem, {
								y: 0,
								opacity: 1,
								duration: 0.3,
								stagger: 0.01,
								ease: "sine.out"
							});
						});
					}
				},
				onEnterBack: function(){
					if(item.classList.contains("active") == false){
						item.classList.add("active");
					}

					if (i === 0) {
						gsap.to(main_txt, {
							y: 0,
							opacity: 1,
							duration: 1,
							overwrite: true
						});
					}

					if (i === 1) {
						tl.fromTo(la_left, { y: 50, opacity: 0 },{ y: 0, opacity: 1, duration: 0.3, overwrite: true });
						la_rightList.forEach(function(innerItem, index) {
							tl.fromTo(innerItem,
								{ y: 50, opacity: 0 },
								{
									y: 0,
									opacity: 1,
									duration: 0.3,
									stagger: 0.1,
									overwrite: true
								}
							);
						});
					}
				}
			}
		})
	});

	//textSlider
	function startTextSlider(selector) {
		const slider = document.querySelector(selector);

		if (!slider) return;

		setInterval(function () {
			const firstItem = slider.querySelector("li:first-child");
			const itemHeight = firstItem.offsetHeight;

			slider.style.transition = "top 0.5s";
			slider.style.top = `-${itemHeight}px`;

			// 애니메이션 후 처리
			setTimeout(function () {
				slider.appendChild(firstItem);
				slider.style.transition = "none";
				slider.style.top = "0";
			}, 500);
		}, 3000);
	}

	startTextSlider(".text_slider ul");
	startTextSlider(".mo_text_slider ul");

	// research click
	research.addEventListener("click", function(e){
		e.preventDefault();

		header.classList.add("active");
		dim.classList.add("active");
		body.classList.remove("scroll");

		if (mo_menu) mo_menu.classList.remove("active");
		if (research) research.classList.remove("on");
	});

	// form close
	form_close.addEventListener("click", function(e){
		e.preventDefault();

		header.classList.remove("active");
		dim.classList.remove("active");
		body.classList.add("scroll");

		if (research) research.classList.add("on");
		if (mo_menu) mo_menu.classList.remove("active");
	});

	//dim 
	dim.addEventListener("click", function(){
		if (isMobile) { //모바일 화면일 때
			header.classList.remove("active");
			dim.classList.remove("active");
			body.classList.add("scroll");

			if (research) research.classList.add("on");
			if (mo_menu) mo_menu.classList.remove("active");
		}
		else{ //데스크탑 화면일 때
			header.classList.remove("active");
			dim.classList.remove("active");
			body.classList.add("scroll");

			if (research) research.classList.add("on");
			if (mo_menu) mo_menu.classList.remove("active");
		}
	});

	//sortBy
	let sortBy_list = document.querySelectorAll(".inner_title");

	// 초기 상태 설정 (첫 번째 항목 열기 - 내용 보이도록)
	const firstTitle = sortBy_list[0];
	const firstContent = firstTitle?.nextElementSibling;

	if (firstContent) {
		firstContent.classList.add("active");

		const initialLiGroup = firstContent.querySelectorAll(".inner_content ul li");
		const initialParagraph = firstContent.querySelector("p");

		gsap.set(initialParagraph, { y: 0, opacity: 1 });
		gsap.set(initialLiGroup, { y: 0, opacity: 1, stagger: 0.1 });
		
		firstTitle?.querySelector("span")?.classList.add("active");
	}

	sortBy_list.forEach(function(title){
		title.addEventListener("click", function (e) {
			e.preventDefault();

			const span = title.querySelector("span");
			const nextElement = title.nextElementSibling;
			const liGroup = nextElement?.querySelectorAll(".inner_content ul li");
			const paragraph = nextElement?.querySelector("p");

		// 클릭한 요소 토글
		if (nextElement) {
			nextElement.classList.toggle("active");
		}
		if (span) {
			span.classList.toggle("active");
		}

		const isActive=nextElement?.classList.contains("active");

		gsap.killTweensOf(paragraph);
		liGroup.forEach(item => gsap.killTweensOf(item));

		gsap.set(paragraph, { y: 50, opacity: 0 });
		gsap.set(liGroup, { y: 50, opacity: 0 });

		ScrollTrigger.refresh();

		if (isActive) {
			nextElement.style.visibility = "hidden";

			requestAnimationFrame(() => {
				nextElement.style.visibility = "visible";

				let tl = gsap.timeline();
				tl.to(paragraph, { y: 0, opacity: 1, duration: 0.2 });
				liGroup.forEach((item, i) => {
					tl.to(item, {
						y: 0,
						opacity: 1,
						duration: 0.2,
						stagger: 0.1
					});
				});
			});
		}
	});
	});

	let langList = lang.nextElementSibling;

	//lang hover
	lang.addEventListener("mouseenter", function () {
		langList.classList.add("active");
	});

	langList.addEventListener("mouseleave", function () {
		langList.classList.remove("active");
	});

	// mo_menu
	mo_menu.addEventListener("click", function(e){
		e.preventDefault();

		if(mo_menu.classList.contains("active")){
			mo_menu.classList.remove("active");
			nav.classList.remove("active");
			body.classList.add("scroll");

			if (research) research.classList.add("on");
		}
		else{
			mo_menu.classList.add("active");
			nav.classList.add("active");
			body.classList.remove("scroll");

			if (research) research.classList.remove("on");
		}
	});

	//more stories_swiper
	let swiperInstance;

	function initSwiper() {
		const swiperContainer = document.querySelector('.cardSwiper');
		const swiperWrapper = document.querySelector('.swiper-wrapper');

		if (window.innerWidth < 760 && !swiperInstance) {
			swiperInstance = new Swiper(swiperContainer, {
				slidesPerView: 1.25,
				spaceBetween: 0,
				breakpoints: {
					760: {
						slidesPerView: 1,
						centerSlide: false,
					},
				},
				
			});
		} else if (window.innerWidth >= 760 && swiperInstance) {
			swiperInstance.destroy();
			swiperInstance = null;

			if (swiperWrapper) {
				swiperWrapper.style.transform = ''; // transform 속성 초기화
				const slides = swiperWrapper.querySelectorAll('.swiper-slide');
				slides.forEach(slide => {
					slide.style.transform = '';
				});
			}
			if (swiperContainer) {
				swiperContainer.style.transform = '';
			}
		}
	}

	initSwiper();
	window.addEventListener('resize', initSwiper);
});