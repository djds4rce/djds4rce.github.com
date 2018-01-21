MinsweeperGame.Model = (function(){
	bombs:{}
	return {
	init:function(){
		this.generateBombLocation();
	},
	generateBombLocation:function(){
		bombs = {};
		var bombLocation;
		for(var i=0;i<MinsweeperGame.Config.bombs;i++){
			this.generateRandomBomb();
		}		
	},
	getBombs:function(){
		return bombs;
	},
	generateRandomBomb:function(){
		var bombLocation = this.randomNumberFromRange(1,MinsweeperGame.Config.total);
		if(!(bombs[bombLocation] == -1)){
			bombs[bombLocation] = -1;
		}else{
			this.generateRandomBomb();	
		}
	},
	randomNumberFromRange:function(min,max){
    	return Math.floor(Math.random()*(max-min+1)+min);
	},
	boxStatus:function(boxId){
		return this.isBombAtBox(boxId) ? -1 : this.getAdjacentBombCount(boxId);
	},
	isBombAtBox:function(boxId){
		return (bombs[boxId] === -1);
	},
	getAdjacentBombCount:function(boxId){
		var adjecentBombCount = this.getVertialBombCount(boxId) + this.getHorizontalBombCount(boxId) + this.getDiagnoalBombCount(boxId);
		bombs[boxId] = adjecentBombCount;
		return adjecentBombCount;
	},
	getVertialBombCount:function(boxId){
		return this.bombAboveCell(boxId) + this.bombBelowCell(boxId);
 	},
	getHorizontalBombCount:function(boxId){
		return this.bombleftCell(boxId) + this.bombrightCell(boxId);
	},
	getDiagnoalBombCount:function(boxId){
		var diagonalCount = 0;
		if(!(boxId <=  MinsweeperGame.Config.columns)){
			var diagonalAboveBombs = this.bombleftCell(boxId-MinsweeperGame.Config.columns) + this.bombrightCell(boxId-MinsweeperGame.Config.columns);
			diagonalCount +=  diagonalAboveBombs;
		}
		if(!((MinsweeperGame.Config.total-boxId) <= MinsweeperGame.Config.columns)){
			var diagonalBelowBombs = this.bombleftCell(boxId+MinsweeperGame.Config.columns) + this.bombrightCell(boxId+MinsweeperGame.Config.columns);
			diagonalCount += diagonalBelowBombs;
		}
		return diagonalCount;
		
	},
	bombAboveCell:function(boxId){
		return !(boxId <=  MinsweeperGame.Config.columns) && (bombs[boxId-MinsweeperGame.Config.columns] ===-1) ? 1 : 0;
	},
	bombBelowCell:function(boxId){		
		return !((MinsweeperGame.Config.total-boxId) <= MinsweeperGame.Config.columns) && (bombs[boxId+MinsweeperGame.Config.columns] ===-1) ? 1 : 0;
	},
	bombleftCell:function(boxId){
		return !(boxId%MinsweeperGame.Config.columns ===1) && (bombs[boxId-1] === -1 )? 1 : 0;
	},
	bombrightCell:function(boxId){
		return !(boxId%MinsweeperGame.Config.columns ===0) && (bombs[boxId+1]  === -1)? 1 : 0;
	}
}
})();