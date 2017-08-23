const Utils = (function() { // protect the lemmings!
    // Utils
    const Utils = {};

    Utils.loadImage = function loadImage( url, key, ...rest ) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = function() {
                resolve( {img, key, rest: rest} );
            }
            img.src = url;
        });
    }

    Utils.arrayToHash = function arrayToHash( arrs ) {
        return arrs.reduce(( hash, current ) => {
            const { key, img, rest } = current;

            hash[ key ] = {
                img,
                rest
            };

            return hash;
        }, {});
    }

    return Utils;
})();
