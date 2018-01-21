MinsweeperGame.View = (function(){
	var viewPortWidth,viewPortHeight,main,game,box;
	return {
		init:function(){
			main = Handlebars.compile($('#main-template').html());
			game = Handlebars.compile($('#game-template').html());
			box = Handlebars.compile($('#box-template').html());
			Handlebars.registerPartial('box',box);

			viewPortWidth = MinsweeperGame.Config.columns* 50;
			viewPortHeight = MinsweeperGame.Config.rows * 50;
			$("#content").html(main({
				viewPortWidth:viewPortWidth,
				viewPortHeight: viewPortHeight
			}));
			this.loadInitialUI();
		},
		loadInitialUI:function(){
			$("#game-container").html(game({
				totalBoxes:MinsweeperGame.Config.total,
				isEndGame:false
			}));
		},
		gameOver:function(){
			$("#game-container").html(game({
				totalBoxes:MinsweeperGame.Config.total,
				isEndGame:true
			}));
		},
		showAdjecentBombs:function(boxDom,boxStatus){
			boxDom.removeClass("alert-dark");
			boxDom.addClass("alert-success");
			boxDom.find(".box-content").html(boxStatus);
		}
	}
})();