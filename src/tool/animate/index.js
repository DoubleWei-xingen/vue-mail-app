import Vue from 'vue';
import com from './index.vue';

const Animate = Vue.extend(com);

export default function ({
  startX, startY, src, endY, endX, width, height,
}) {
  const app = new Animate({
    el: document.createElement('div'),
    data() {
      return {
        moveX: startX,
        moveY: startY,
        src,
        width,
        height,
        opacity: 1,
        sx: 1,
        sy: 1,
        exsit: true,
      };
    },
  });
  document.body.append(app.$el);

  setTimeout(() => {
    app.moveX = endX;
    app.moveY = endY;
    app.opacity = 0;
    app.sx = 0.1;
    app.sy = 0.1;
  }, 0);
  setTimeout(() => {
    app.exsit = false;
  }, 1300);
}
