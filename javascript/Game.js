const Game = (function() {

    const actions = {
        UP_BUTTON_PRESSED: false,
        DOWN_BUTTON_PRESSED: false,
    }

    const CONSTANTS = {
        background: {
            x: 0,
            y: 60,
            heightOffs: 0,
        },
        sprite: {
            x: 70,
            y: 190,
            startSpriteIdx: [ 0 ],
            idx: 0,
        }
    }

    if ( !GameLoop || !Utils ) {
        throw new Error('Dependencies not defined');
    }

    const drawBackground = function drawBackground( props ) {
        const { ctx, data, canvas } = props;
        const { x, y, heightOffs, startMoving } = props.data.background;


        ctx.fillStyle = '#D9E11A';
        //ctx.fillStyle = 'gray';
        ctx.fillRect( 0, 0, canvas.width, canvas.height );
        ctx.drawImage( data.background.img, x, y, canvas.width, data.background.img.height+heightOffs );
        ctx.drawImage( data.background.img, x+canvas.width, y, canvas.width, data.background.img.height+heightOffs );

        if ( x <= -1*canvas.width ) {
            props.data.background.x = 0;
        }
    }

    const clearBg = function clearBg( props) {
        const { ctx, data, canvas, x, y } = props;

        const current = data.sprite.rest[ 0 ];

        const spriteIdxs = props.allowedSprites;
        const _idx = props.idx;
        let idx = spriteIdxs[ _idx ];


        ctx.clearRect( x, y, current[idx].width, current[idx].height );
    }

    const runningSprite = function runningSprite( props ) {
        const { ctx, data, canvas, x, y } = props;
        const current = data.sprite.rest[ 0 ];

        const spriteIdxs = props.allowedSprites;
        let _idx = props.idx;
        let idx = spriteIdxs[ _idx ];


        ctx.drawImage(
            data.sprite.img,
            current[idx].x,
            current[idx].y,
            current[idx].width,
            current[idx].height,
            x,
            y,
            current[idx].width,
            current[idx].height
        );

        ++_idx;

        if ( _idx === spriteIdxs.length ) _idx = 0;

        props.idx = _idx;
    }

    class Main {
        constructor( selector, resources ) {
            // grab ctx data
            this.verifyCtx( selector );

            // save the resources info
            this.data = resources;

            // set initial sprite values
            this.getSpriteInitialVals();

            // set initial bg vals
            this.getBgInitialVals();

            // set up sequence of methods to call
            this.states = [{
                method: clearBg,
                scope: null,
                args: [this],
            },{
                method: drawBackground,
                scope: null,
                args: [this],
            },{
                method: runningSprite,
                scope: null,
                args: [this]
            }];

            // start main render loop
            GameLoop.start( this.updateGameState.bind(this), this.render.bind( this ), 100000 );
            setTimeout(() => {
                //GameLoop.stop();
            }, 500);

            this.initEvents();
        }

        verifyCtx( selector ) {
            this.canvas = document.querySelector( selector );
            if ( this.canvas === null ) {
                throw new Error('Canvas not found!');
            }
            this.ctx = this.canvas.getContext('2d');
        }

        getSpriteInitialVals() {
            const { x, y, startSpriteIdx, idx } = CONSTANTS.sprite;

            this.allowedSprites = startSpriteIdx;
            this.idx = idx;
            this.x = x;
            this.y = y;
        }

        getBgInitialVals() {
            const { x, y, heightOffs } = CONSTANTS.background;

            this.data.background.x = x;
            this.data.background.y = y;
            this.data.background.heightOffs = heightOffs;

        }
        
        render() {
            this.states.forEach(( state ) => {
                const { method, scope, args } = state;
                if ( !scope ) {
                    method( ...args, state );
                }
                else {
                    method.apply( scope, args );
                }
            });
        } // render

        updateGameState() {
            if ( !this.keys ) return;

            const {
                upArrowPressed,
                rightArrowPressed,
                downArrowPressed,
                leftArrowPressed,
                shiftKeyPressed
            } = this.keys;

           if ( rightArrowPressed && !this.data.background.startMoving ) {
                this.idx = 0;
                this.allowedSprites = [1,2,3];

                if ( typeof moveBgLeft !== "undefined" ) {
                    this.data.background.startMoving = true;
                }
           }

           if ( downArrowPressed && !this.isJumping ) {
                this.idx = 0;
                this.allowedSprites = [0];

                this.data.background.startMoving = false;
           }

           if ( this.data.background.startMoving ) {
                this.data.background.x = moveBgLeft( this.data.background.x );
           }

           if ( upArrowPressed && !this.isJumping && this.data.background.startMoving) {
                this.cachedY = this.y;

                this.y = typeof shouldJumpNow !== "undefined" && shouldJumpNow( this.y ) || this.y;

                if ( this.cachedY !== this.y ) {

                    this.isJumping = true;
                    this.idx = 0;
                    this.allowedSprites = [4];

                    clearTimeout( this.upTimeout );
                    this.upTimeout = setTimeout(() => {
                        this.y = this.cachedY;
                        this.cachedY = null;
                        this.isJumping = false;

                        this.idx = 0;
                        this.allowedSprites = [1,2,3];
                    }, 1000);
                }
           } // if jumping up

        }

        initEvents() {
            window.addEventListener('keydown', ( e ) => {
                if ( typeof keyDownHandler !== "function" ) {
                    return;
                }

                this.keys = keyDownHandler( e.which );

                e.preventDefault();
            });

            window.addEventListener('keyup', ( e ) => {
                if ( typeof keyUpHandler !== "function" ) {
                    return;
                }

                this.keys = keyUpHandler(
                    e.which,
                    ...Object.keys(this.keys || []).map( key => {
                        return this.keys[ key ]
                    })
                );

                e.preventDefault();
            });
        }
    } // Main

    return Main;
})();
