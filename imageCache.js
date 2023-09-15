function cacheImage(imageUrl){
    // Ellenőrizzük, hogy a kép már van-e a böngésző cache-ében
    if (localStorage.getItem("cachedImageURL") === imageUrl) {
        // Ha megtaláltuk a képet a cache-ben, használjuk azt
        var cachedImage = document.getElementById("cachedImage");
        cachedImage.src = localStorage.getItem("cachedImage");
    } else {
        // Ha a kép nincs a cache-ben, töltsük le és mentsük el
        var xhr = new XMLHttpRequest();
        xhr.open("GET", imageUrl, true);
        xhr.responseType = "blob";
  
        xhr.onload = function() {
            if (xhr.status === 200) {
                var blob = xhr.response;
  
                // A blob-ot átalakítjuk Data URL-é, és elmentjük a cache-be
                var reader = new FileReader();
                reader.onload = function() {
                    var dataUrl = reader.result;
                    localStorage.setItem("cachedImageURL", imageUrl);
                    localStorage.setItem("cachedImage", dataUrl);
  
                    // Beállítjuk a kép forrását a letöltött képre
                    var cachedImage = document.getElementById("cachedImage");
                    cachedImage.src = dataUrl;
                };
                reader.readAsDataURL(blob);
            }
        };
        xhr.send();
    }
}