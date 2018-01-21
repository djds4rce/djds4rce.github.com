var MinsweeperGame = {};

MinsweeperGame.Config = {
		rows:10,
		columns : 10,
		bombs :15
}

jQuery(function ($) {
	MinsweeperGame.Controller.init();
});