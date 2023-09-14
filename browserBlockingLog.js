function browserBlockCheck(){
    // Ellenőrizzük, hogy a böngésző blokkolta-e az automatikus hanglejátszást
    if (typeof window.AudioContext === 'undefined' && typeof window.webkitAudioContext === 'undefined') {
    console.log('A böngésző blokkolja az automatikus hanglejátszást.');
    }
  
    // Ellenőrizzük, hogy a böngésző blokkolt-e pop-up ablakokat
    if (window.innerWidth > 0 && window.innerHeight > 0) {
    if (document.documentElement && document.documentElement.clientHeight === 0) {
      console.log('A böngésző blokkolja a pop-up ablakokat.');
    }
}
}

