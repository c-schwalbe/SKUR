const carousel = document.querySelector('.carousel')
const slider = carousel.querySelector('.carousel_track')
let slides = [...slider.children]

// Initial slides position, so user can go from first to last slide (click to the left first)
slider.prepend(slides[slides.length - 1])

// Creating dot for each slide
const createDots = (carousel, initSlides) => {
  const dotsContainer = document.createElement('div')
  dotsContainer.classList.add('carousel_nav')

  initSlides.forEach((slide, index) => {
    const dot = document.createElement('button')
    dot.type = 'button'
    dot.classList.add('carousel_dot')
    dot.setAttribute('aria-label', `Slide number ${index + 1}`)
    slide.dataset.position = index
    slide.classList.contains('is-selected') && dot.classList.add('is-selected')
    dotsContainer.appendChild(dot)
  })

  carousel.appendChild(dotsContainer)

  return dotsContainer
}

// Updating relevant dot
const updateDot = slide => {
  const currDot = dotNav.querySelector('.is-selected')
  const targetDot = slide.dataset.position

  currDot.classList.remove('is-selected')
  dots[targetDot].classList.add('is-selected')
}

// Handling arrow buttons
const handleArrowClick = arrow => {
  arrow.addEventListener('click', () => {
    slides = [...slider.children]
    const currSlide = slider.querySelector('.is-selected')
    currSlide.classList.remove('is-selected')
    let targetSlide

    if (arrow.classList.contains('jsPrev')) {
      targetSlide = currSlide.previousElementSibling
      slider.prepend(slides[slides.length - 1])
    }

    if (arrow.classList.contains('jsNext')) {
      targetSlide = currSlide.nextElementSibling
      slider.append(slides[0])
    }

    targetSlide.classList.add('is-selected')
    updateDot(targetSlide)
  })
}

const buttons = carousel.querySelectorAll('.carousel_btn')
buttons.forEach(handleArrowClick)

// Handling dot buttons
const handleDotClick = dot => {
  const dotIndex = dots.indexOf(dot)
  const currSlidePos = slider.querySelector('.is-selected').dataset.position
  const targetSlidePos = slider.querySelector(`[data-position='${dotIndex}']`).dataset.position

  if (currSlidePos < targetSlidePos) {
    const count = targetSlidePos - currSlidePos
    for (let i = count; i > 0; i--) nextBtn.click()
  }

  if (currSlidePos > targetSlidePos) {
    const count = currSlidePos - targetSlidePos
    for (let i = count; i > 0; i--) prevBtn.click()
  }
}

const dotNav = createDots(carousel, slides)
const dots = [...dotNav.children]
const prevBtn = buttons[0]
const nextBtn = buttons[1]

dotNav.addEventListener('click', e => {
  const dot = e.target.closest('button')
  if (!dot) return
  handleDotClick(dot)
})

// Move the slider when arrow keys are pressed
document.onkeydown = checkKey;

function checkKey(e) {
    
  e = e || window.Event;
  
  if (e.keyCode == '37') {
    prevBtn.click()
    console.log("left arrow");
  }
  else if (e.keyCode == '39') {
    nextBtn.click()
    console.log("right arrow");
  }
    
}



// Add touch function
console.log(slides);

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img')
  slideImage.addEventListener('dragstart', (e) =>e.preventDefault())

  console.log(slideImage);

  // Touch events
  slide.addEventListener('touchstart', touchStart(index))
  slide.addEventListener('touchend', touchEnd)
  slide.addEventListener('touchmove', touchMove)

  // Mouse events
  slide.addEventListener('mousedown', touchStart(index))
  slide.addEventListener('mouseup', touchEnd)
  slide.addEventListener('mouseleave', touchEnd)
  slide.addEventListener('mousemove', touchMove)
})

window.oncontextmenu = function(event) {
  event.preventDefault()
  event.stopPropagation()
  return false
}

function touchStart(index) {
  return function(event) {
    currentIndex = index
    startPos = getPositionX(event)
    isDragging = true
    // https://css-tricks.com/using-requestanimationframe/
    animationID = requestAnimationFrame(animation)

    console.log('start')
    console.log(startPos)
  }
}

function touchEnd() {
  isDragging = false
  cancelAnimationFrame(animationID)
  slider.classList.remove('grabbing')
  console.log('end')
}

function touchMove(event) {
  if(isDragging) {
    const currentPosition = getPositionX(event)
    currentTranslate = prevTranslate + currentPosition - startPos
    console.log('move')
  }
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

function animation() {
  setSliderPosition()
  if(isDragging) requestAnimationFrame(animation)
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`
}
