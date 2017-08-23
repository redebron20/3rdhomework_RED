const GameLoop = (function() { // protect the lemmings!
    // main game loop
    const GameLoop = {};

    GameLoop.main = function main() {
        if ( GameLoop.updateGameState ) {
            GameLoop.updateGameState();
        }

        if ( GameLoop.renderGame ) {
            GameLoop.renderGame();
        }
    }

    GameLoop.recursiveRenderLoop = function recursiveRenderLoop() {
        GameLoop.main();

        if ( GameLoop.running ) {
            setTimeout(() => {
                window.requestAnimationFrame( GameLoop.recursiveRenderLoop );
            }, GameLoop.timeout/1000);
        }
    }

    GameLoop.start = function start( update, renderer, timeout = 0 ) {
        GameLoop.running = true;
        GameLoop.timeout = timeout;

        GameLoop.setUpdateFunction( update );
        GameLoop.setRenderer( renderer );

        window.requestAnimationFrame( GameLoop.recursiveRenderLoop );
    }

    GameLoop.stop = function stop() {
        GameLoop.running = false;
    }

    GameLoop.setUpdateFunction = function setUpdateFunction( update ) {
        GameLoop.updateGameState = update;
    }

    GameLoop.setRenderer = function setRenderer( renderer ) {
        GameLoop.renderGame = renderer;
    }

    return GameLoop;
})();
