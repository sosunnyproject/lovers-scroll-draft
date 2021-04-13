const scenes = document.getElementsByClassName('scroll-section')
let currentScene = 0;
let prevScrollHeight = 0;
let yOffset = 0;
let enterNewScene = false; // (역)스크롤하다가 음수 나오는 경우 예방.

const sceneInfo = [
  {
    // 0
    type: 'sticky',
    heightNum: 4,
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
    heightNum: 4,
    scrollHeight: 0,
    objs: {
      container: document.querySelector('#scroll-section-1'),
      messages: [
        document.querySelector('#scroll-section-1 .sticky-elem.a'),
        document.querySelector('#scroll-section-1 .sticky-elem.b'),
        document.querySelector('#scroll-section-1 .sticky-elem.c'),
        document.querySelector('#scroll-section-1 .sticky-elem.d'),
        document.querySelector('#scroll-section-1 .sticky-elem.e'),
        document.querySelector('#scroll-section-1 .sticky-elem.f')
      ]
    },
    opacity: {
      in: [ 
        [0, 1, {start: 0.02, end: 0.2}],
        [0, 1, {start: 0.2, end: 0.35}], 
        [0, 1, {start: 0.3, end: 0.4}], 
        [0, 1, {start: 0.35, end: 0.45}],
        [0, 1, {start: 0.4, end: 0.55}], 
        [0, 1, {start: 0.5, end: 0.65}], 
      ],
      out: [ 
        [1, 0, {start: 0.21, end: 0.3}],  
        [1, 0, {start: 0.36, end: 0.4}],  
        [1, 0, {start: 0.41, end: 0.5}], 
        [1, 0, {start: 0.46, end: 0.55}],  
        [1, 0, {start: 0.56, end: 0.65}],  
        [1, 0, {start: 0.66, end: 0.75}],  
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
        document.querySelector('#scroll-section-3 .sticky-elem.e')
      ]
    }
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

  console.log("currentscene? ", currentScene)

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