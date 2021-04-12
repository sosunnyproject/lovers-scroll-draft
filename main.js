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
    opacity: [
      [0, 1, {start: 0.1, end: 0.2}], // in
      [1, 0, {start: 0.23, end: 0.3}], // out
      [0, 1, {start: 0.3, end: 0.4}], // in
      [1, 0, {start: 0.43, end: 0.5}], // out
      [0, 1, {start: 0.5, end: 0.6}], // in 
      [1, 0, {start: 0.63, end: 0.7}], // out
    ],
    translate: [
      [40, 0, { start: 0.1, end: 0.2}],
      [0, -40, { start: 0.23, end: 0.3}],

    ]
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
  },
  {
    // 2
    type: 'sticky',
    heightNum: 4,
    scrollHeight: 0,
    objs: {
      container: scenes[2],
      messages: [
        document.querySelector('#scroll-section-2 .sticky-elem.a'),
        document.querySelector('#scroll-section-2 .sticky-elem.b'),
        document.querySelector('#scroll-section-2 .sticky-elem.c')
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
    sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
    sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
  }
}

// 현재 scene (scroll-section)이 어딘지 업데이트한다
function scrollLoop() {
  // 새로고침했을때, prevScrollHeight 가 무조건 0으로 뜨는 버그.
  prevScrollHeight = 0;
  enterNewScene = false;
  
  // 현재 스크롤 좌표값을 기준으로 scene # 체크하고 업데이트한다
  for(let i = 0; i < currentScene; i++){
    prevScrollHeight += sceneInfo[i].scrollHeight;
  }
  if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
    enterNewScene = true
    currentScene++;
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  } else if (yOffset < prevScrollHeight) {
    enterNewScene = true
    if(currentScene !== 0) {
      currentScene--;
    }
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
  const opacityArr = currentSceneInfo.opacity
  const trasnlateArr = currentSceneInfo.translate
  const objs = currentSceneInfo.objs
  const messages = currentSceneInfo.objs.messages
  // fade in, out 위해서 scrollRatio 계산 및 응용
  const scrollRatio = currentY / currentSceneInfo.scrollHeight
  // const messagesNum = messages.length
  // const eachStickyHeight = currentSceneInfo.scrollHeight / messagesNum

  console.log("currentscene? ", currentScene)

  switch (currentScene) {
    case 0:
      const opacityInA = calcValues(opacityArr[0], currentY)
      const opacityOutA = calcValues(opacityArr[1], currentY)
      const translateInA = calcValues(trasnlateArr[0], currentY)
      const translateOutA = calcValues(trasnlateArr[1], currentY)

      if(scrollRatio <= 0.22) {  // FADE IN
        messages[0].style.opacity = opacityInA
        messages[0].style.transform = `translateY(${translateInA}%)`;
      } else { // fade out
        messages[0].style.opacity = opacityOutA
        messages[0].style.transform = `translateY(${translateOutA}%)`;
      }

      const opacityInB = calcValues(opacityArr[2], currentY)
      const opacityOutB = calcValues(opacityArr[3], currentY)

      if(scrollRatio <= 0.42) {  // FADE IN
        messages[1].style.opacity = opacityInB
      } else { // fade out
        messages[1].style.opacity = opacityOutB
      }

      const opacityInC = calcValues(opacityArr[4], currentY)
      const opacityOutC = calcValues(opacityArr[5], currentY)

      if(scrollRatio <= 0.62) {  // FADE IN
        messages[2].style.opacity = opacityInC
      } else { // fade out
        messages[2].style.opacity = opacityOutC
      }

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