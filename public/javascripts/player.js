class Player {
    /*
     * Description: The constructor of this class;
     * 
     * input:
     *  (int)playerNr - the number of player
     *  (int)x - how many blocks fit on x axis
     *  (int)y - how many blocks fit on y axis
     *  (int)speed - how many loops has to be made untill game refreshes
    */
    constructor(playerNr, x, y, speed) {
        if (!isNaN(playerNr) || typeof playerNr != "number" ) { throw new Error("Invalid playerNr"); }
        if (!isNaN(x) || typeof x != "number" ) { throw new Error("Invalid x"); }
        if (!isNaN(y) || typeof y != "number" ) { throw new Error("Invalid y"); }
        if (!isNaN(speed) || typeof speed != "number" ) { throw new Error("Invalid speed"); }

        this.id = playerNr
        this.Controls = new Controls(playerNr);
        this.Map = generateNewMap();
        this.Player = [];
        this.LinesCleared = 0;
        this.Level = 1;
        this.Height = y + 1;
        this.Score = 0;
        this.Speed = speed;
        this.Delay = speed;

        function generateNewMap() {
            let newMap = [];

            for (let i = 0; i < y; i++) {
                newMap.push(0);
            }

            return newMap;
        }
    }

    
    /*
     * Descrtiption: Checks if game can be updated
     * 
     * input:
     *  void
     * 
     * returns:
     *  (bool)true - If game has to be refreshed
     *  (bool)false - If game can't be refreshed
    */
    delayCheck() {
        if (this.Delay <= 0) {
            this.Delay = this.Speed;
            return true;
        } else {
            return false;
        }
    }

    /*
     * Description: Checks if the key pressed must do some action if it does it also commits the action
     *
     * input:
     *  (string)key - the key that has to be checked
     * 
     * returns:
     *  void
    */
    keyDownCheck(key) {    
        console.log("key: " + key);
        const value = this.Controls.ifKeyPressed(key);

        if (value == "void") { return; }
        else {
            switch(value) {
                case "down":
                    this.down();
                    break;
                case "jump":
                    this.jump();
                    break;
                case "left":
                    this.left();
                    break;
                case "right":
                    this.right();
                    break;
                default:
                    throw new Error("Invalid keypress character: " + value);
            }
        }
    }

    /*
     * Description: This moves the player down by one heigh
     * 
     * Input:
     *  void
     * 
     * Returns:
     *  void
    */
    down() {
        this.Height--;
    }

    /*
     * Description: This moves the player right by one heigh
     * 
     * Input:
     *  void
     * 
     * Returns:
     *  void
    */
    right() {
    }

    /*
     * Description: This moves the player left by one heigh
     * 
     * Input:
     *  void
     * 
     * Returns:
     *  void
    */
    left() {
    }

    /*
     * Description: This moves the player down as much as possible
     * 
     * Input:
     *  void
     * 
     * Returns:
     *  void
    */
    jump() {
    }

    /*
     * Description: This Rotates the player right
     * 
     * Input:
     *  void
     * 
     * Returns:
     *  void
    */
    RotateRight() {

    }

    /*
     * Description: This rotates the player left
     * 
     * Input:
     *  void
     * 
     * Returns:
     *  void
    */
    RotateLeft() {

    }
    
    /*
     * description: This handles the collision for the game and gets called every time an movement action is made
     * 
     * Input: 
     *  
     * 
     * returns: 
     *  (bool)true  - if the action performed can be done
     *  (bool)false - if the action performed cannot be done due to collision
    */
    Collision() {
    }

    /*
     * Description: This handles the progression wheneve a line is cleared
     *
     * Input: 
     *  (int)count - The number of lines cleared
     * 
     * returns:
     *  void
    */
    LineCleared(count) {
        if (!isNaN(count) || typeof count != "number" ) { throw new Error("Invalid count"); }

        //Changes the score of the user based on the need
        if (count == 1) { this.Score += 40 * ( this.level + 1); }
        if (count == 2) { this.Score += 100 * ( this.level + 1); }
        if (count == 3) { this.Score += 400 * ( this.level + 1); }
        if (count == 4) { this.Score += 1200 * ( this.level + 1); }

        this.LinesCleared += count;

        if (this.LinesCleared >= 5 * this.level) {
            this.Level++;
            this.LinesCleared -= 10;
        }

        // Dispatches a new event that users status has changed
        Window.dispatchEvent(new CustomEvent('StatusChange'), this);
    }

    /*
     * Description: Draws the map of the player
     *
     * input:
     *  (Element)canvas - the canvas the game will be drawn into
     * 
     * returns:
     *  void
    */
    DrawBoard(canvas) {
        //game = JSON.parse(sessionStorage.getItem("game"));
    
        var clear = canvas.getContext("2d");
    
        clear.clearRect(0, 0, canvas.width, canvas.height);
        
        if (!this.map) throw new Error("Missing map");
    
        for (let i = 0; i < this.map.length; i++) {
            const row = String(this.map[i]).split("").reverse();            
            for (let x = 0; x < row.length; x++) {
                var rect = canvas.getContext("2d");
                if (row[x] == 1) {
                    rect.fillStyle = "#000000";                
                    rect.fillRect(30 * (9 - x), 30 * i, 30, 30);
                } 
            }            
        }
    
        for (let i = 0; i < this.player.length; i++) {
            const row = String(this.player[i]).split("").reverse();            
            for (let x = 0; x < row.length; x++) {
                var rect = canvas.getContext("2d");
                if (row[x] == 1) {
                    rect.fillStyle = "#000000";                
                    rect.fillRect(30 * (9 - x), 30 * i, 30, 30);
                } 
            }            
        }
    
        if (document.getElementById("drawGrid").checked) {
            for(let i = 1; i < 10; i++) {
                let line = canvas.getContext("2d");
                line.beginPath();
                line.moveTo(30 * i, 0);
                line.lineTo(30 * i, canvas.height);
                line.stroke();
            }
    
            for(let i = 1; i < 20; i++) {
                let line = canvas.getContext("2d");
    
                line.beginPath();
                line.moveTo(0, 30 * i);
                line.lineTo(canvas.width, 30* i);
                line.stroke();
            }
        }
    }
}