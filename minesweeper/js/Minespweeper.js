
MinsweeperGame.Controller =(function () { 
	return {
	    init: function() {
	    	this.boostrapConfig();
	       	MinsweeperGame.Model.init();
	       	MinsweeperGame.View.init();
	        this.handleGameEvents();
	        this.handleAppEvents();
	   	},
	    handleGameEvents:function(){
	    	var that = this;
	    	$(".box").off('click');
	        $(".box").on('click',function(){
	        	var boxId = $(this).data("boxid");
	        	var boxStatus = MinsweeperGame.Model.boxStatus(boxId+1);
	        	if(boxStatus === -1){
	        		that.removeGameEvents();
	        		MinsweeperGame.View.gameOver();
	        	}else{
	        		MinsweeperGame.View.showAdjecentBombs($(this),boxStatus);
	        	}
	        	
	        });
	    },
	    handleAppEvents:function(){
	    	var that = this;
	    	$(".new-game-button").on('click',function(e){
	    		MinsweeperGame.Model.init();
	       		MinsweeperGame.View.loadInitialUI();
	        	that.handleGameEvents();
	    	});
	    },
	    boostrapConfig:function(){
	    	MinsweeperGame.Config.rows = parseInt($.urlParam("rows")|| MinsweeperGame.Config.rows);
	    	MinsweeperGame.Config.columns = parseInt($.urlParam("columns")|| MinsweeperGame.Config.columns);
	    	MinsweeperGame.Config.bombs = parseInt($.urlParam("bombs")|| MinsweeperGame.Config.bombs);
	    	MinsweeperGame.Config.total = MinsweeperGame.Config.rows*MinsweeperGame.Config.columns;
	    },
	    removeGameEvents:function(){
	    	$(".box").off('click');
	    }
	}
})();
