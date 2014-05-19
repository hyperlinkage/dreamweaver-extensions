/*

	Strip Inline CSS

	Version:
		1.0.0
		16th March 2002

	Written By:
		Tim Booker

*/

function canAcceptCommand(){
	return true;
}

function stripInlineCss() {

	var docEl = dw.getDocumentDOM();

	var headEl = docEl.getElementsByTagName( 'HEAD' )[ 0 ];
	var bodyEl = docEl.getElementsByTagName( 'BODY' )[ 0 ];

	var divArr = bodyEl.getElementsByTagName( 'LAYER' );
	var divCss = new Array();

	for( var i = 0; i < divArr.length; i++ ) {
		if( divArr[ i ].getAttribute( 'STYLE' ) ) {
			divCss[ divArr[ i ].getAttribute( 'ID' ) ] = divArr[ i ].getAttribute( 'STYLE' );
			divArr[ i ].removeAttribute( 'STYLE' );
		}
	}

	var styleArr = headEl.getElementsByTagName( 'STYLE' );

	if( styleArr.length > 0 ) {
		styleEl = styleArr[ styleArr.length - 1 ];
		styleEl.innerHTML = updateCss( styleEl.innerHTML, divCss );
	} else {
		var newCss = '';
		
		for( div in divCss ) {
			newCss += '#' + div + ' { ' + divCss[ div ] + ' }\n';
		}
		
		if( newCss ) {
			var headHtm = headEl.innerHTML;
			headEl.innerHTML = headHtm + '\n\n<style type="text/css">\n<!--\n' + newCss + '-->\n<\/style>\n\n';
		}
	}
}

function updateCss( oldCss, newCss ) {

	for( lyr in newCss ) {

		var startPos = oldCss.indexOf( '#' + lyr );

		if( startPos != -1 ) {

			startPos = oldCss.indexOf( '{', startPos ) + 1;
			var endPos = oldCss.indexOf( '}', startPos );

			var oldRuleset = oldCss.substring( startPos, endPos );
			var oldCssStart = oldCss.substring( 0, startPos );
			var oldCssEnd = oldCss.substring( endPos );

			var oldCssArr = splitToObj( oldRuleset, ';', ':' );
			var newCssArr = splitToObj( newCss[ lyr ], ';', ':' );
			oldCssArr = updateArray( oldCssArr, newCssArr );

			var newCssStr = '';
			for( rule in oldCssArr ) {
				newCssStr += rule + ': ' + oldCssArr[ rule ] + '; ';
			}

			oldCss = oldCssStart + ' ' + newCssStr + oldCssEnd;
		} else {

			var insertPos = oldCss.lastIndexOf( '}' ) + 1;

			var oldCssStart = oldCss.substring( 0, insertPos );
			var oldCssEnd = oldCss.substring( insertPos );

			oldCss = oldCssStart + '\n' + '#' + lyr + ' { ' + newCss[ lyr ] + ' }' + oldCssEnd;
		}
	}
	return oldCss;
}

function updateArray( oldArr, newArr ) {

	for( el in newArr ) {
		oldArr[ el ] = newArr[ el ];
	}
	return oldArr;
}

function splitToObj( str, elementDel, valueDel ) {

	str = stripSpace( str );

	while( str.charAt( str.length - 1 ) == elementDel ) {
		str = str.substring( 0, str.length - 1 );
	}

	var obj = new Array();
	var	elementArr = str.split( elementDel );

	for( el in elementArr ) {
		var elName  = elementArr[ el ].substring( 0, elementArr[ el ].indexOf( valueDel ) );
		var elValue = elementArr[ el ].substring( elementArr[ el ].indexOf( valueDel ) + 1 );
		obj[ stripSpace( elName ) ] = stripSpace( elValue );
	}
	return obj;
}

function stripSpace( str ) {

	return str.replace( /^\s+/g, '' ).replace( /\s+$/g, '' );
}