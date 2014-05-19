/*

	Animate Browser Window

	Version:
		1.6.3
		2nd February 2002
							
	Written By:
		Tim Booker
	
*/

function initializeUI() {
	
	var f = document.theForm;
	
	f.winWidth.focus();
	f.winWidth.select();
}

function canAcceptBehavior() {
	return true;
}

function windowDimensions( platform ) {
	if( platform == 'macintosh' ) {
		//return '200,351';
		return '200,360';
	} else {
	 	//return '200,380';
	 	return '200,400';
	}
}

function behaviorFunction() {
	return "TB_animateWindow";
}

function applyBehavior() {
	
	var f = document.theForm;
	
	var windowWidth 	= f.winWidth.value;
	var windowHeight	= f.winHeight.value;
	var targetWidth 	= f.targetWidth.value;
	var targetHeight 	= f.targetHeight.value;
	var widthMod 		= f.widthMod.value;
	var heightMod		= f.heightMod.value;

	var fullScreen = ( f.fullScreen.checked || ( !targetWidth || !targetHeight ) );

	if( windowWidth && windowHeight && widthMod && heightMod && ( ( targetWidth && targetHeight ) || ( fullScreen ) ) ) {
		return 'TB_animateWindow(' + windowWidth + ',' + windowHeight + ',' + targetWidth + ',' + targetHeight + ',' + widthMod + ',' + heightMod + ',' + fullScreen + ')';
	}  else {
		return 'Please complete the form.';
	}
}

function inspectBehavior( msgStr ) {
	
	var f = document.theForm;
	
	var startStr = msgStr.indexOf( "(" ) + 1;
	var endStr = msgStr.indexOf( ")" );

	if ( startStr > 0 && endStr > startStr ) {
		argString = msgStr.substring( startStr,endStr );
		var args = argString.split( ',' );

		f.winWidth.value 		= args[ 0 ];
		f.winHeight.value 		= args[ 1 ];
		f.targetWidth.value 	= args[ 2 ];
		f.targetHeight.value	= args[ 3 ];
		f.widthMod.value 		= args[ 4 ];
		f.heightMod.value 		= args[ 5 ];

		if ( args[ 6 ] == 'true' ) {
			f.fullScreen.checked = true;
			setSizeBoxes( true );
		} else {
			f.fullScreen.checked = false;
			setSizeBoxes( false );
		}
	}
}

function setSizeBoxes( bool ) {
	
	var f = document.theForm;
	
	f.targetWidth.disabled = bool;
	f.targetHeight.disabled = bool;
}

function TB_animateWindow( windowWidth, windowHeight, targetWidth, targetHeight, widthMod, heightMod, fullScreen ) {
// Animate Browser Window 1.6.2
// www.yaffle.org/projects/abw
    if( fullScreen ) {
        targetWidth = screen.availWidth;
        targetHeight = screen.availHeight;
    }
    if( windowWidth < targetWidth ) windowWidth += widthMod;
    if( windowHeight < targetHeight ) windowHeight += heightMod;
    if( windowWidth > targetWidth ) windowWidth = ( windowWidth - widthMod );
    if( windowHeight > targetHeight ) windowHeight = ( windowHeight - heightMod );
    windowLeft = ( screen.availWidth / 2 ) - ( windowWidth / 2 );
    windowTop = ( screen.availHeight / 2 ) - ( windowHeight / 2 );
    top.window.resizeTo( windowWidth, windowHeight );
    top.window.moveTo( windowLeft, windowTop );
    if ( windowWidth < targetWidth || windowHeight < targetHeight || windowWidth > targetWidth || windowHeight > targetHeight ) {
        setTimeout( 'TB_animateWindow(' + windowWidth + ', ' + windowHeight + ', ' + targetWidth + ', ' + targetHeight + ', ' + widthMod + ', ' + heightMod + ', ' + fullScreen + ');', 10 );
    }
}