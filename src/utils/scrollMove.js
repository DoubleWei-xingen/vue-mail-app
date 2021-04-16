/* eslint-disable  no-param-reassign */
function scrollMove(start, end, dom, prop) {
  let dis = 0;
  let speed = 5;
  if (end < 0) {
    speed *= -1;
  }
  const timer = setInterval(() => {
    dis += speed;
    dom[prop] = start + dis;
    if (Math.abs(dis) >= Math.abs(end)) {
      dom[prop] = start + end;
      clearInterval(timer);
    }
  }, 4);
}

export default scrollMove;
