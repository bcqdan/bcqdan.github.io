document.addEventListener('DOMContentLoaded', function() {
  const cursor = document.getElementById('cursor');
  let mouseX = 0, mouseY = 0, posX = 0, posY = 0;
  let maxVelocity = 100;
  let velocityX = 0, velocityY = 0;
  let lastX, lastY;
  
  document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (lastX !== undefined && lastY !== undefined) {
          velocityX = Math.max(-maxVelocity, Math.min(maxVelocity, velocityX + (mouseX - lastX) * 0.5));
          velocityY = Math.max(-maxVelocity, Math.min(maxVelocity, velocityY + (mouseY - lastY) * 0.5));
      }
      lastX = mouseX;
      lastY = mouseY;
  });

  function updatePosition() {
      posX += velocityX;
      posY += velocityY;

      // Implement damping to eventually stop the cursor
      velocityX *= 0.96;
      velocityY *= 0.96;

      // Boundary checking for the window, reverse direction if it hits the edge
      if (posX <= 10 || posX >= window.innerWidth - cursor.offsetWidth - 10) {
          velocityX *= -1;
      }
      if (posY <= 10 || posY >= window.innerHeight - cursor.offsetHeight - 10) {
          velocityY *= -1;
      }

      // Update cursor position
      cursor.style.left = posX + 'px';
      cursor.style.top = posY + 'px';

      requestAnimationFrame(updatePosition);
  }

  updatePosition();
});
