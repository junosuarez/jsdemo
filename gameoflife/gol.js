(function (Watchable){
	var array = new Watchable([[]]),
		started = new Watchable(false),
		timeout,
		opts = {},
		fn = {},
		rule = {
			fn: {}
		};

	/* rules */
	rule.conway = function (x, y){
		var n = rule.fn.countNeighbors(array.get(), x, y);
		return !(n < 2 || n >3);
	};

	rule.fn.countNeighbors = function (a, x, y){
		var rows = [a[y-1], a[y], a[y+1]],
			n = 0;

		for(var r = 0; r < rows.length; r++){
			var row = rows[r];
			if(row === undefined || row.length === undefined) continue;
			if(row[x-1] === true) n++;
			if(r !== x && row[x] === true) n++;
			if(row[x+1] === true) n++;
		}
		return n;
	}

	fn.generate = function (rule){
		var nextGen = [];
		for(var y = 0; y < opts.rows; y++){
			var row = [];
			for(var x = 0; x < opts.cols; x++){
				row.push(rule(x, y));
			}
			nextGen.push(row);
		}
		return nextGen;
	};

	/* return a 2d array rows*cols in size of random boolean values */
	fn.fill = function (rows, cols, density){
		var arr = [];
		for(var y = 0; y < rows; y++){
			var row = []

			for(var x = 0; x < cols; x++){
				row.push(Math.random() <= density);
			}

			arr.push(row);
		}
		return arr;
	};

	fn.init = function (golOpts){
		opts = golOpts;
		array.watch(fn.draw);
		fn.reset();
		fn.start();
		started.watch(function(val){
			if(!val){
				clearTimeout(timeout);
			}
		});
	};

	fn.tick = function (once){
		var board = fn.generate(rule.conway);
		array.set(board);

		if(started && once !== true){
			timeout = setTimeout(fn.tick, opts.speed);
		}
	};

	/* draw table based on 2-dimensional array of booleans */
	fn.draw = function (gameArray){
		var table = ['<table><tbody>'];

		for(var y = 0; y < gameArray.length; y++){
			var row = gameArray[y];
			table.push('<tr>');
			for(var x = 0; x < row.length; x++){
				var cssClass = row[x] ? 'alive' : 'dead';
				table.push('<td class="'+ cssClass +'">&nbsp;</td>');
			}
			table.push('</tr>');
		}

		table.push('</tbody></table>');
		opts.$board.innerHTML = table.join('');
	};

	/* controls */
	fn.start = function(){
		if(!started.get()){
			started.set(true);
			fn.tick();
		}
	};
	fn.stop = function(){
		started.set(false);
	};
	fn.playPause = function(){
		if(started.get()){
			fn.stop();
		}else{
			fn.start();
		}
	};
	fn.reset = function(){
		var board = fn.fill(opts.rows, opts.cols, opts.density);
		array.set(board);
	};
	fn.clear = function(){
		var board = fn.fill(opts.rows, opts.cols, 0);
		array.set(board);
	};
	fn.step = function(){
		fn.tick(true);
	}


	/* public */
	gol = {
		started: started,
		init: fn.init,
		start: fn.start,
		stop: fn.stop,
		playPause: fn.playPause,
		reset: fn.reset,
		clear: fn.clear,
		step: fn.step
	};
})(Watchable);