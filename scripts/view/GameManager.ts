import DynamicDiv from "./DynamicDiv";
import Game from "../game/Game";
import IBot from "../game/IBot";
import ColorGenerator from "./ColorGenerator";
import GuiManager from "./GuiManager";

class GameManager {
    private gameContainerId : string;
    private solutionContainerId : string;
    private divs : DynamicDiv[];
    private gameStarted : boolean;
    private game : Game;
    private divColors : string[];
    private player1 : IBot;
    private player2 : IBot;
    private playedSteps : number;

    public constructor(gameContainerId : string, solutionContainerId : string) {
        this.gameContainerId = gameContainerId;
        this.solutionContainerId = solutionContainerId;
        this.gameStarted = false;
        this.playedSteps = 0;
    }

    public startNewGame(n : number, k : number, c : number, player1 : IBot, player2 : IBot) {
        this.gameStarted = true;
        this.resetGame();
        this.generateDivs(n);
        this.generateDivColors(c);

        this.game = new Game(c,n,k);
        this.player1 = player1;
        this.player2 = player2; 
        this.game.setPlayers(this.player1, this.player2);
        this.game.startGame();
    }

    public startNonVisualGame(n : number, k : number, c : number, player1 : IBot, player2 : IBot) {
        this.gameStarted = true;
        this.resetGame();
        this.game = new Game(c,n,k);
        this.player1 = player1;
        this.player2 = player2; 
        this.game.setPlayers(this.player1, this.player2);
        this.game.startGame();
    }

    public getPlayedSteps() {
        return this.playedSteps;
    }

    public isGameFinished() {
        return !this.gameStarted ? !this.gameStarted : this.game.isGameFinished();
    }

    public resetGame() {
        $(this.getJqueryId(this.gameContainerId)).html("");
        this.playedSteps = 0;
    }

    public hasPlayer1Won() :boolean {
        if (!(this.game !== undefined && this.game.isGameFinished()))
            return false;
        
        let result = this.game.getResult();
        if (result == true) {
            return false;
        }
        else {
            return true;
        }
    }

    public nextStep() {
        let move = this.game.nextStep();
        let number = move.number;
        let color = move.color;
        this.divs[number].changeColor(this.divColors[color]);

        if (this.game.isGameFinished()) {
            this.gameStarted = false;
            this.updateLastGameResult();
        }
        this.playedSteps++;
    }

    public nextNonVisualStep() {
        let move = this.game.nextStep();
        
        if (this.game.isGameFinished()) {
            this.gameStarted = false;
        }
        this.playedSteps++;
    }

    public updateLastGameResult()  {
        let result = this.game.getResult();
        if (result == true) {
            GuiManager.displayWonInfo(2);
        }
        else {
            for (var i=0; i<result.length; i++) {
                this.divs[result[i]].changeBorder();
            }
            GuiManager.displayWonInfo(1);
        }
    }

    private getJqueryId(id : string) : string {
        return "#" + id;
    }

    private generateDivColors(count : number) {
        let cg = new ColorGenerator(count);
        this.divColors = cg.generate();
    }

    private generateDivs(count : number) {
        this.divs = [];
        for (var i=0; i<count; i++) {
            let div = new DynamicDiv(i+1);
            div.addToHtml(this.gameContainerId);
            this.divs.push(div);
        }
    }
}

export default GameManager;
