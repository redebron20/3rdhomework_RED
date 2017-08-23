(function() { // protect the lemmings!

    // kick start
    Promise.all([
        Utils.loadImage( 'assets/gotham8.png', 'background' ),
        Utils.loadImage( 'assets/batman_sprite_sheet.png', 'sprite', BatmanSprite() ),
    ]).then(( imgs ) => {
        const g = new Game(
            '.canvas',
            Utils.arrayToHash( imgs )
        );
    });

    function BatmanSprite() {
        return [{
            x: 540,
            y: 270,
            width: 68,
            height: 88,
        }, {
            x: 0,
            y: 270,
            width: 68,
            height: 88,
        }, {
            x: 70,
            y: 270,
            width: 68,
            height: 88,
        }, {
            x: 140,
            y: 270,
            width: 62,
            height: 88,
        }, {
            x: 340,
            y: 0,
            width: 68,
            height: 68,
        }];
    } // BatmanSprite 

})();
