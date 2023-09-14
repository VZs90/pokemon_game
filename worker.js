// worker.js
self.onmessage = function (e) {
    // Az üzenet feldolgozása és válasz küldése
    const result = e.data * 2;
    self.postMessage(result);
};