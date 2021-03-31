const scenes = document.getElementsByClassName('scroll-section')

const sceneInfo = [
  {
    // 0
    type: 'sticky',
    heightNum: 4,
    scrollHeight: 0,
    objs: {
      container: document.querySelector('#scroll-section-0')
    }
  },
  {
    // 1
    type: 'sticky',
    heightNum: 4,
    scrollHeight: 0,
    objs: {
      container: scenes[1]
    }
  },
  {
    // 2
    type: 'sticky',
    heightNum: 4,
    scrollHeight: 0,
    objs: {
      container: scenes[2]
    }
  },
  {
    // 3
    type: 'sticky',
    heightNum: 4,
    scrollHeight: 0,
    objs: {
      container: scenes[3]
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

function scrollLoop() {
  console.log(window.pageYOffset)
}

setLayout()
// setLayout doesn't change when web width resize.
window.addEventListener('resize', () => {
  console.log("resize")
  setLayout()
})
window.addEventListener('scroll', () => {
  scrollLoop()
})