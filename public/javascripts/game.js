class Game {
    /*
     * Description: The constructor of this class;
     * 
     * input:
     *  (int)players - the number of players
    */
    constructor(players) {
        if (!isNaN(length) || typeof length != "number" ) { throw new Error("Invalid players"); }

        this.GameChars = chars;
        this.BoardHeight = 20;
        this.BoardWidth = 10;
        this.Speed = 4;
        this.Running = true;
        this.Queue = newQueue(5);

        this.Players = [];

        // Generates players
        for (let i = 0; i < players; i++) {
            let player = new Player(i, this.BoardWidth, this.BoardHeight, this.Speed);
            
            this.Players.push(player);
        }

        document.addEventListener('keydown', (key) => {
            this.Players.forEach(player => {
                player.keyDownCheck(key.code);
            });
        });
    }
    /*
     * Description: Generates a new queue
     *
     * input:
     *  (int)length - This is the length of the queue
     * 
     * returns:
     *  (int[])queue - Returns a queue with the specified length
    */
    newQueue(length) {
        if (!isNaN(length) || typeof length != "number" ) { throw new Error("Invalid length"); }
        let elements = [];

        for (let i = 0; i < length; i++) {
            elements.push(randomChar());
        }

        return elements;
    }

    addElementToQueue() {
        this.Queue.push(randomChar());
    }

    randomChar() {
        return this.chars[Math.random() * this.chars.length];
    }
}