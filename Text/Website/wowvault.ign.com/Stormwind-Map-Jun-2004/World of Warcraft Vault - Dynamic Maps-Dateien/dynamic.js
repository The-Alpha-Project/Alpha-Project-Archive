var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

// Comment

var zIndexes = new Array();
zIndexes['map'] = 0;
zIndexes['map_icons'] = 5;
zIndexes['map_cover'] = 3;
zIndexes['tooltip'] = 6;
zIndexes['map_lines'] = 4;
zIndexes['legend'] = 2;

var optionsTypes = new Array();
var optionsVisibility = new Array();
var optionsEnabled = new Array();
var locationDetailsWindow = null;
var searchWindow = null;
var useVML = true;

var lineWidth = 1;
var pointerLineWidth = 3;
var arrowWidth = "medium";
var pointerArrowWidth = "wide";
var pointerArrowColor = "#FF0000";
var pointerArrowLength = 50.0;

var xOrigin = mapInfo[mapDataXOriginIndex] * 1.0;
var yOrigin = mapInfo[mapDataYOriginIndex] * 1.0;
var xOffset = 0;
var yOffset = 0;
var legendPadding = 10;
var markerSize = 9;

var imageDir = "https://web.archive.org/web/20040603133236/http://vnscripts.ign.com/locations/images/";

var markerImage = new Image();
var plusImage = new Image();
var minusImage = new Image();
var mapIcons = new Array();

//var browser = checkBrowserType();
//if(browser != true)
//{
//    document.write("<p>You must be using Internet Explorer 5.0 or higher to view this map.</p>");
//    exit();
//}

document.write("<div id='oToolTip' style='text-align: center; border: solid black 1px; padding: 3px; color: black; position: absolute; visibility: hidden; z-index: " + zIndexes['tooltip'] + "'></div>");

loadImages();

legendWidth = config['legend_width'];

// Display the map image and invisible layer for mouse events
document.write("<img src='" + mapInfo[mapDataImageIndex] + "' name='map_image' style='position: " +
    "absolute; left: " + legendWidth + "; top: 0; z-index: " + zIndexes['map'] + "' onMouseMove=\"showCoords()\"");
if(config['show_coords'])
{
	document.write("onClick=\"moveMarker()\"");
}
document.write(">");
document.write("<div style='position: absolute; left: " + legendWidth + "; top: 0; z-index: " + zIndexes['map_cover'] +
    "' onMouseMove=\"showCoords()\" onClick=\"moveMarker()\"><img src=\"" + imageDir + "blank.gif\" width=1 height=1" + 
    " id='map_cover'></div>");
document.write("<div id='marker' style='visibility: hidden; position: absolute; left: -100; top: -100; z-index: " + zIndexes['map_icons'] + "' " +
    "onMouseOver=\"showMarkerCoords()\" onMouseOut=\"hideLandmark()\">" +
    "<img src=\"" + imageDir + "marker.gif\"></div>");

// Draw legend
createLegend();
drawLegend(true);

xOffset = legendWidth;
//    yOffset = legendPadding;
//xOrigin += legendWidth;
//    yOrigin += legendWidth;

// Create locations
createAllLocations();

//    var legendDiv = document.getElementById("legendDiv");
//    var legendWidth = legendDiv.offsetWidth + legendPadding * 2.0;

//    var mapDiv = document.getElementById("map_image");
//    mapDiv.runtimeStyle.left = legendWidth;
//    mapDiv.runtimeStyle.top = legendPadding;
//    mapDiv.src = mapInfo[mapDataImageIndex];

//    var mapCover = document.getElementById("map_cover");
//    mapCover.runtimeStyle.left = legendWidth;
//    mapCover.runtimeStyle.top = legendPadding;
//    mapCover.runtimeStyle.width = mapDiv.runtimeStyle.width + legendPadding * 2.0;
//    mapCover.runtimeStyle.height = mapDiv.runtimeStyle.height + legendPadding * 2.0;



}
/*
     FILE ARCHIVED ON 13:32:36 Jun 03, 2004 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:40:37 Dec 30, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 338.414
  exclusion.robots: 0.086
  exclusion.robots.policy: 0.079
  cdx.remote: 0.055
  esindex: 0.008
  LoadShardBlock: 267.944 (3)
  PetaboxLoader3.datanode: 217.238 (4)
  CDXLines.iter: 14.249 (3)
  PetaboxLoader3.resolve: 353.139 (2)
  load_resource: 313.262
*/