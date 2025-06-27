export function partnersCarousel() {
  const wrapper = document.getElementById('carousel-wrapper');
  const carousel = document.getElementById('carousel');

  let isDown = false;
  let startX;
  let scrollLeft;

  // 🖱️ Події мишки
  wrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
    wrapper.classList.add('active');
  });

  wrapper.addEventListener('mouseleave', () => {
    isDown = false;
    wrapper.classList.remove('active');
  });

  wrapper.addEventListener('mouseup', () => {
    isDown = false;
    wrapper.classList.remove('active');
  });

  wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 2;
    wrapper.scrollLeft = scrollLeft - walk;
  });

  // 📱 Події для тачскріну
  wrapper.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener('touchend', () => {
    isDown = false;
  });

  wrapper.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 2;
    wrapper.scrollLeft = scrollLeft - walk;
  });

  // 🛑 Зупинка/відновлення автоанімації при наведенні (або торканні)
  const pause = () => { carousel.style.animationPlayState = 'paused'; };
  const resume = () => { carousel.style.animationPlayState = 'running'; };

  wrapper.addEventListener('mouseenter', pause);
  wrapper.addEventListener('mouseleave', resume);
  wrapper.addEventListener('touchstart', pause);
  wrapper.addEventListener('touchend', resume);
}
