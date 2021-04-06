const scenes = document.getElementsByClassName('scroll-section')
let currentScene = 0;
let prevScrollHeight = 0;
let yOffset = 0;

const sceneInfo = [
  {
    // 0
    type: 'sticky',
    heightNum: 4,
    scrollHeight: 0,
    objs: {
      container: document.querySelector('#scroll-section-0'),
      messages: [
        document.querySelector('#scroll-section-0 .sticky-elem .a'),
        document.querySelector('#scroll-section-0 .sticky-elem .b'),
        document.querySelector('#scroll-section-0 .sticky-elem .c')
      ]
    },
    // 스크롤 값에 따라서 메시지의 opacity values
    opacity: [
      [0, 1],
      [0.3, 1],
      [0.3, 1]
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
        document.querySelector('#scroll-section-1 .sticky-elem .a'),
        document.querySelector('#scroll-section-1 .sticky-elem .b'),
        document.querySelector('#scroll-section-1 .sticky-elem .c'),
        document.querySelector('#scroll-section-1 .sticky-elem .d'),
        document.querySelector('#scroll-section-1 .sticky-elem .e')

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
        document.querySelector('#scroll-section-2 .sticky-elem .a'),
        document.querySelector('#scroll-section-2 .sticky-elem .b'),
        document.querySelector('#scroll-section-2 .sticky-elem .c')
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
        document.querySelector('#scroll-section-3 .sticky-elem .a'),
        document.querySelector('#scroll-section-3 .sticky-elem .b'),
        document.querySelector('#scroll-section-3 .sticky-elem .c'),
        document.querySelector('#scroll-section-3 .sticky-elem .d'),
        document.querySelector('#scroll-section-3 .sticky-elem .e')
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
  
  // 현재 스크롤 좌표값을 기준으로 scene # 체크하고 업데이트한다
  for(let i = 0; i < currentScene; i++){
    prevScrollHeight += sceneInfo[i].scrollHeight;
  }
  if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
    currentScene++;
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  } else if (yOffset < prevScrollHeight) {
    if(currentScene !== 0) {
      currentScene--;
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

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
  const messagesNum = currentSceneInfo.objs.messages.length
  const eachStickyHeight = currentSceneInfo.scrollHeight / messagesNum
  console.log(eachStickyHeight)

  switch (currentScene) {
    case 0:
      console.log('scene 0, 3 sticky elems');
      // map(scrollRatio, opacityArr[start], opacityArr[end])
      calcValues(opacityArr, currentY)
      break;
    case 1:
      console.log('scene 1');
      // console.log(sceneInfo[currentScene].opacity)

      break;
    case 2:
      console.log('scene 2');
      // console.log(sceneInfo[currentScene].opacity)

      break;
    case 3:
      console.log('scene 3');
      // console.log(sceneInfo[currentScene].opacity)

      break;
  }
}

// calculating text opacity value relative to current y coordinate
function calcValues(opacityVal, currentYCoord) {
  const currentSceneInfo = sceneInfo[currentScene]
  const scrollRatio = currentYCoord / currentSceneInfo.scrollHeight
}