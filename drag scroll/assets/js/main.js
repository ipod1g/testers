const slider = document.querySelector('.slider-container');
let isDown = false;
let startX;
let scrollLeft;


var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));


if (isTouch === true)
{
  // content for touch-screen (mobile) devices
  slider.addEventListener('touchstart', (e) => {
    isDown = true;
    //adding touches[0] defined the pageX
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('touchend', () => {
    isDown = false;
    if (slider.scrollLeft % 333 !== 0) {
      let lockSlide = Math.round(slider.scrollLeft / 333) * 345;
      console.log(`slider.offsetLeft = ${slider.offsetLeft}`);
      return slider.scrollTo({left:lockSlide, behavior:'smooth'});
      }
  });
  
  slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;  // stop the fn from running
    e.preventDefault();
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;

    console.log(`slider.offsetLeft = ${slider.offsetLeft}`);

    console.log(`slider.scrollLeft = ${slider.scrollLeft}`);
  });
}
else
{
  // everything else (desktop)
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
  });
}

