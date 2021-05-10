const scenes = document.getElementsByClassName('scroll-section')
let currentScene = 0;
let prevScrollHeight = 0;
let yOffset = 0;
let enterNewScene = false; // (역)스크롤하다가 음수 나오는 경우 예방.

// video 
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event
const videoElem = document.querySelector('.sample-video')
let videoDuration;
videoElem.addEventListener('loadeddata', function() {
  console.log('video load done');
  videoDuration = videoElem.duration;
  init();
})

const sceneInfo = [
  {
    // 0
    type: 'sticky',
    heightNum: 3,
    scrollHeight: 0,
    objs: {
      container: document.querySelector('#scroll-section-0'),
      messages: [
        document.querySelector('#scroll-section-0 .sticky-elem.a'),
        document.querySelector('#scroll-section-0 .sticky-elem.b'),
        document.querySelector('#scroll-section-0 .sticky-elem.c')
      ]
    },
    // 스크롤 값에 따라서 메시지의 opacity values
    // 각 array 길이는 messages 와 동일해야 한다.
    opacity: {
      in: [ 
        [0, 1, {start: 0.02, end: 0.2}],
        [0, 1, {start: 0.3, end: 0.5}], 
        [0, 1, {start: 0.7, end: 0.85}], 
      ],
      out: [ 
        [1, 0, {start: 0.22, end: 0.3}],  
        [1, 0, {start: 0.52, end: 0.7}],  
        [1, 0, {start: 0.87, end: 0.95}],  
      ]
    },
    translate: {
      in : [
        [40, 0, { start: 0.02, end: 0.2}], 
        [40, 0, { start: 0.3, end: 0.5}], 
        [40, 0, { start: 0.7, end: 0.85}], 
      ],
      out: [
        [0, -120, { start: 0.22, end: 0.3}],
        [0, -120, { start: 0.52, end: 0.7}],
        [0, -120, { start: 0.87, end: 0.95}],
      ]
    } 
  },
  {
    // 1
    type: 'sticky',
    heightNum: 8,
    scrollHeight: 0,
    objs: {
      container: document.querySelector('#scroll-section-1'),
      messages: [
        document.querySelector('#scroll-section-1 .sticky-elem.a'),
        document.querySelector('#scroll-section-1 .sticky-elem.b'),
        document.querySelector('#scroll-section-1 .sticky-elem.c'),
        document.querySelector('#scroll-section-1 .sticky-elem.d'),
        document.querySelector('#scroll-section-1 .sticky-elem.e'),
        document.querySelector('#scroll-section-1 .sticky-elem.f'),
        document.querySelector('#scroll-section-1 .sticky-elem.g'),
        document.querySelector('#scroll-section-1 .sticky-elem.h'),
        document.querySelector('#scroll-section-1 .sticky-elem.i'),
        document.querySelector('#scroll-section-1 .sticky-elem.j'),
        document.querySelector('#scroll-section-1 .sticky-elem.k')
      ]
    },
    opacity: {
      in: [ 
        [0, 1, {start: 0.01, end: 0.06}], // a
        [0, 1, {start: 0.10, end: 0.16}], // b
        [0, 1, {start: 0.20, end: 0.23}], // c
        [0, 1, {start: 0.26, end: 0.29}], // d
        [0, 1, {start: 0.32, end: 0.35}], // e
        [0, 1, {start: 0.38, end: 0.41}], // f

        [0, 1, {start: 0.44, end: 0.50}], // g
        [0, 1, {start: 0.54, end: 0.68}], // h
        [0, 1, {start: 0.63, end: 0.68}], // i
        [0, 1, {start: 0.71, end: 0.84}], // j
        [0, 1, {start: 0.77, end: 0.90}], // k

      ],
      out: [  // 2 seconds
        [1, 0, {start: 0.07, end: 0.09}], // a
        [1, 0, {start: 0.17, end: 0.19}], // b
        [1, 0, {start: 0.24, end: 0.25}], // c
        [1, 0, {start: 0.30, end: 0.31}], // d
        [1, 0, {start: 0.36, end: 0.37}], // e
        [1, 0, {start: 0.42, end: 0.43}],  // f

        [1, 0, {start: 0.51, end: 0.53}], // g
        [1, 0, {start: 0.68, end: 0.70}], // h
        [1, 0, {start: 0.69, end: 0.71}], // i
        [1, 0, {start: 0.84, end: 0.90}], // j
        [1, 0, {start: 0.91, end: 0.95}], // k
      ]
    },
  },
  {
    // 2
    type: 'normal',
    heightNum: 4,
    scrollHeight: 0,
    objs: {
      container: scenes[2],
      messages: [
        document.querySelector('#scroll-section-2 .a'),
        document.querySelector('#scroll-section-2 .b'),
        document.querySelector('#scroll-section-2 .c')
      ]
    }
  },
  {
    // 3
    type: 'sticky',
    heightNum: 4,
    scrollHeight: 0,
    objs: {
      container: scenes[3],
      messages: [
        document.querySelector('#scroll-section-3 .sticky-elem.a'),
        document.querySelector('#scroll-section-3 .sticky-elem.b'),
        document.querySelector('#scroll-section-3 .sticky-elem.c'),
        document.querySelector('#scroll-section-3 .sticky-elem.d'),
        document.querySelector('#scroll-section-3 .sticky-elem.e'),
        document.querySelector('#scroll-section-3 .sticky-elem.f'),
        document.querySelector('#scroll-section-3 .sticky-elem.g')
      ]
    },
    opacity: {
      in: [  // +8
        [0, 1, {start: 0.01, end: 0.08}], // a
        [0, 1, {start: 0.11, end: 0.19}], // b
        [0, 1, {start: 0.21, end: 0.29}], // c
        [0, 1, {start: 0.31, end: 0.39}], // d
        [0, 1, {start: 0.41, end: 0.49}], // e
        [0, 1, {start: 0.51, end: 0.60}], // f

        [0, 1, {start: 0.63, end: 0.70}], // g
      ],
      out: [  // 2 seconds
        [1, 0, {start: 0.08, end: 0.10}], // a
        [1, 0, {start: 0.19, end: 0.21}], // b
        [1, 0, {start: 0.29, end: 0.31}], // c
        [1, 0, {start: 0.39, end: 0.41}], // d
        [1, 0, {start: 0.49, end: 0.51}], // e
        [1, 0, {start: 0.60, end: 0.62}],  // f
        [1, 0, {start: 0.71, end: 0.75}], // g
      ]
    },
  },
]


function setLayout() {
  // 각 스크롤 섹션의 높이 세팅
  for(let i = 0; i < sceneInfo.length; i++){
    if(sceneInfo[i].type === 'sticky') {
      // 내용 비율에 맞춰서 높이 늘어나게끔
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
    } else if (sceneInfo[i].type === 'normal' ) {
      // 일반적인 높인
      sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
    }
    sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;      
  }
}

// 현재 scene (scroll-section)이 어딘지 업데이트한다
function scrollLoop() {
  prevScrollHeight = 0;
  enterNewScene = false;
  // 현재 스크롤 좌표값을 기준으로 scene # 체크하고 업데이트한다
  for(let i = 0; i < currentScene; i++){
    prevScrollHeight += sceneInfo[i].scrollHeight;
  }
  if (yOffset > (prevScrollHeight + sceneInfo[currentScene].scrollHeight)) {
    enterNewScene = true
    currentScene++;
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  } else if (yOffset < prevScrollHeight) {
    enterNewScene = true
    if(currentScene === 0) return;  // 브라우저 바운스 효과 마이너스 방지
    currentScene--;
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  if(enterNewScene) return;

  playTextAnimation()
}

setLayout()
// bug: setLayout doesn't change when web width resize.
window.addEventListener('resize', () => {
  setLayout()
})
window.addEventListener('scroll', () => {
  yOffset = window.pageYOffset;
  scrollLoop()
})

function playTextAnimation() {
  // 현재 scene (scroll-section-#)에 있는 애들만 opacity 변화 및 보이기
  // totalYOffset - prevScrollHeight = currentYOffset
  const currentY = yOffset - prevScrollHeight
  const currentSceneInfo = sceneInfo[currentScene]
  const fadeInArr = currentSceneInfo.opacity?.in
  const fadeOutArr = currentSceneInfo.opacity?.out
  const translateInArr = currentSceneInfo.translate?.in
  const translateOutArr = currentSceneInfo.translate?.out

  // const objs = currentSceneInfo.objs
  const messages = currentSceneInfo.objs.messages
  // fade in, out 위해서 scrollRatio 계산 및 응용
  const scrollRatio = currentY / currentSceneInfo.scrollHeight
  // const messagesNum = messages.length
  // const eachStickyHeight = currentSceneInfo.scrollHeight / messagesNum

  if(currentScene == 0 || currentScene == 1 || currentScene == 3) {
    const inIdx = fadeInArr.findIndex((arr) => (scrollRatio < arr[2].end+0.005))
    if(inIdx >= 0 && (inIdx < messages.length)) {
      messages[inIdx].style.opacity = calcValues(fadeInArr[inIdx], currentY)
      if(translateInArr && translateInArr.length > 0) {
        messages[inIdx].style.transform = `translate3d(0, ${calcValues(translateInArr[inIdx], currentY)}px, 0)`;
      }
    }
    // fade in -  fix bug, 가끔 오류로 보이는 opacity : 0 으로 고치기
    messages.forEach((message, idx) => {
      if (scrollRatio < fadeInArr[idx][2].start) {
        message.style.opacity = 0
        console.log(idx, ": ", message)
      }
    })
    // fade out
    messages.forEach((message, idx) => {
      if(scrollRatio > (fadeOutArr[idx][2].start-0.005)) { 
        console.log("fade out index: " , idx)

        message.style.opacity = calcValues(fadeOutArr[idx], currentY)
        if(translateOutArr && translateOutArr.length > 0) {
          message.style.transform = `translateY(${calcValues(translateOutArr[idx], currentY)}px)`;
        }
      }
    })
  }

  /*
  switch (currentScene) {
    case 0:
      // fade in , apply only when scrollRatio is smaller than end+0.01
      const inIdx = fadeInArr.findIndex((arr) => (scrollRatio < arr[2].end+0.01))
      if(inIdx >= 0 && (inIdx < messages.length)) {
        messages[inIdx].style.opacity = calcValues(fadeInArr[inIdx], currentY)
        messages[inIdx].style.transform = `translateY(${calcValues(translateInArr[inIdx], currentY)}px)`;
      }
      // fade out
      messages.forEach((message, idx) => {
        if(scrollRatio > (fadeOutArr[idx][2].start-0.01)) { 
          message.style.opacity = calcValues(fadeOutArr[idx], currentY)
          message.style.transform = `translateY(${calcValues(translateOutArr[idx], currentY)}px)`;
        }
      })
      break;
    case 1:
      // console.log(sceneInfo[currentScene].opacity)

      break;
    case 2:
      // console.log(sceneInfo[currentScene].opacity)

      break;
    case 3:
      // console.log(sceneInfo[currentScene].opacity)

      break;
  }
  */
}

// calculating text opacity value relative to current y coordinate
function calcValues(opacityArr, currentYCoord) {
  let rv; 
  const scrollHeight = sceneInfo[currentScene].scrollHeight
  const scrollRatio = currentYCoord / scrollHeight

  // opacityArr[2]: {start: xx, end: xx} 있는 경우
  if(opacityArr.length === 3) {
    // 현재 씬 내에서도, opacity start, end 특정 좌표 지점 계산
    const start = opacityArr[2].start * scrollHeight // 실제 시작 좌표
    const end = opacityArr[2].end * scrollHeight  // 실제 끝 좌표
    // 재생 구간 계산
    const partScrollHeight = (end - start) 

    // 1. currentY < start
    if(currentYCoord < start) {
      rv = opacityArr[0]
    } else if(currentYCoord >= start && currentYCoord <= end) {
      // 2. start < currentY < end
      rv = (currentYCoord - start) / partScrollHeight * (opacityArr[1] - opacityArr[0]) + opacityArr[0]
    } else if(currentYCoord > end) {
      // 3. end < currentY
      rv = opacityArr[1]
    }
  } else {
    // 전체 스크롤 구간 계산
    rv = scrollRatio * (opacityArr[1] - opacityArr[0]) + opacityArr[0]
  }

  return rv
}