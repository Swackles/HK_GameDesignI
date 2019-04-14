// THis handles the controls for players
class Controls {
    constructor(playerNr) {
        const defaultControls = [
            {
                Left: "KeyA",
                Down: "KeyS",
                Right: "KeyD",
                Jump: "Space"
            }
        ]

        this.Left = defaultControls[playerNr].left;
        this.Down = defaultControls[playerNr].Down;
        this.Right = defaultControls[playerNr].Right;
        this.Jump = defaultControls[playerNr].Jump;
    }

    /*
     * Description: This checks if the key pressed should do some action
     *
     * Input: 
     *  (string)key - The string value of the key pressed
     * 
     * Return:
     *  (string)left - Move player left
     *  (string)down - Move player down
     *  (string)right - Move player right
     *  (string)jump - Jump player to the bottom
     *  (string)void - No action has to be done
    */
    ifKeyPressed(key) {
        if (key == this.Left) {
            return "left";
        } else if (key == this.Down) {
            return "down";
        } else if (key == this.Right) {
            return "right";
        } else if (key == this.Jump) {
            return "jump";
        } else {
            return "void";
        }
    }
}