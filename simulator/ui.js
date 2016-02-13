/*
 * Copyright (c) 2016 FirstBuild
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

/**
 * constructor
 */
var UI = function (oven) {
	
	var format = {};
	var term = require( 'terminal-kit' ).terminal ;
	var options = {
	    y: 1 , 
	    style: term.inverse ,
	    selectedStyle: term.dim.blue.bgGreen
	} ;

	var LINE_MENU_ITEM_SELECTED_LABEL = 3;
	var lineDataCounter = 4;
	var LINE_DISPLAY_TEMP = lineDataCounter++;

	/**
	 * this draws the main header of the menu, add new features here
	 */
	function drawTopMenu()
	{
		var items = [ 'Display Temp' ,'|Exit'] ;
		term.moveTo(1,LINE_MENU_ITEM_SELECTED_LABEL);
		term.singleLineMenu( items , options , function( error , response ) {
	   
		    if (response.selectedText == '|Exit')
		    {
		    	term.clear();
		    	process.exit(0);
		    }
		    else if (response.selectedText == 'Display Temp')
		    {
		    	drawDisplayTempMenu();
		    }	    
		}) ;
	}

	/**
	 * draw the display temperature sub menu
	 */
	function drawDisplayTempMenu()
	{
		var items = [ '150','650' , '750' , '|Exit'] ;
		term.moveTo(1,LINE_MENU_ITEM_SELECTED_LABEL);
		term.singleLineMenu( items , options , function( error , response ) {
			drawTopMenu();
		    if (response.selectedText == '|Exit')
		    {
		    	term.clear();
		    	process.exit(0);
		    } 
		    else if (response.selectedText == '150')
		    {
		    	module.displayDisplayTemp(150);
		    	oven.displayTemperature = 150;
		    }
		    else if (response.selectedText == '650')
		    {
		    	module.displayDisplayTemp(650);
		    	oven.displayTemperature = 650;
		    }
		    else if (response.selectedText == '750')
		    {
		    	module.displayDisplayTemp(750);
		    	oven.displayTemperature = 750;
		    }
		}) ;
	}

	module.displayDisplayTemp = function(value)
	{
		term.moveTo(1,LINE_DISPLAY_TEMP).eraseLine().blue('displayTemp:\t' + value);
	}
	
	format.width = 300;
	format.format = "twos";
	format.annotate = "none";

	term.clear();

	drawTopMenu();

}

module.exports = UI;
