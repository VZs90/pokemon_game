function stopAllAnimations() {
    // const elements = document.querySelectorAll('*');
    const movingText=document.getElementById("mozgokep");
    
    const computedStyle=getComputedStyle(movingText);
    const animationName = computedStyle.animationName;

    if (animationName !== 'none' && movingText) {
      movingText.style.animationPlayState = 'paused';
    }
    /* elements.forEach(element => {
      const computedStyle = getComputedStyle(element);
      const animationName = computedStyle.animationName;
  
      if (animationName !== 'none') {
        element.style.animationPlayState = 'paused';
      }
    }); */
  }
  
  // Használat példája:
  // stopAllAnimations();
  