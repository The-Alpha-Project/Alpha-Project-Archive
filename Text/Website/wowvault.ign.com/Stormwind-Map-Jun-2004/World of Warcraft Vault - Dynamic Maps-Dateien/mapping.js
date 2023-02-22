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

function checkBrowserType()
{
    if(navigator.appName == "Microsoft Internet Explorer")
    {
        var re = "MSIE ([0-9\.]+)";
        var regexp = new RegExp(re, "i");
        var appVersion = navigator.appVersion;
        var matches = appVersion.match(regexp);
        
        if(matches.length > 0)
        {
            var version = RegExp.$1;
            if(version >= 5)
            {
                return true;
//                useVML = true;
            }
        }
    }
    
    return false;
}

function loadImages()
{
    // Preload built in images
    markerImage.src = imageDir + "marker.gif";
    plusImage.src = imageDir + "plus.gif";
    minusImage.src = imageDir + "minus.gif";
    
    // Preload map
    var mapImage = new Image();
    mapImage.src = mapInfo[mapDataImageIndex];
    
    // Preload logo
//    if(config['map_logo_url'] != "")
//    {
        var logoImage = new Image();
        logoImage.src = config['map_logo_url'];
//    }

    // Preload icons
    for(var index in mapTypes)
    {
        if(mapTypes[index][mapTypeIconIndex] != "")
        {
            var i = "type_" + mapTypes[index][mapTypeIdIndex];
            mapIcons[i] = new Image();
            mapIcons[i].src = mapTypes[index][mapTypeIconIndex];
        }
    }
    for(var index in mapSubtypes)
    {
        if(mapSubtypes[index][mapSubtypeIconIndex] != "")
        {
            var i = "subtype_" + mapSubtypes[index][mapSubtypeIdIndex];
            mapIcons[i] = new Image();
            mapIcons[i].src = mapSubtypes[index][mapSubtypeIconIndex];
        }
    }
}

function getMapXPosition()
{
//    var legendDiv = document.getElementById("legendDiv");
//    var legendWidth = legendDiv.offsetWidth + legendPadding * 2.0;
	
	return xOffset;
}

function getMapYPosition()
{
	return yOffset;
}

function checkBrowserType()
{
    if(navigator.appName == "Microsoft Internet Explorer")
    {
        var re = "MSIE ([0-9\.]+)";
        var regexp = new RegExp(re, "i");
        var appVersion = navigator.appVersion;
        var matches = appVersion.match(regexp);
        
        if(matches.length > 0)
        {
            var version = RegExp.$1;
            if(version >= 5)
            {
                useVML = true;
            }
        }
    }
}

function showAllLocations(map, show)
{
    console.log("WE SHOW LOC")
    if(show && !doesArrayContain(mapsShown, map))
    {
        createAllLocations();
        return;
    }

    for(var i in mapTypes)
    {
        var locations = document.getElementsByName("type_" + i + "_" + map);
        if(show && (locations != null))
        {
            if(optionsEnabled["type_" + i])
            {
                for(var j = 0; j < locations.length; j++)
                {
                    locations[j].style.visibility = "visible";
                }
            }
        }
        else if(locations != null)
        {
            for(var j = 0; j < locations.length; j++)
            {
                locations[j].style.visibility = "hidden";
            }
        }
    }

    for(var i in mapSubtypes)
    {
        var locations = document.getElementsByName("subtype_" + i + "_" + map);
        if(show && (locations != null))
        {
            if(optionsEnabled["subtype_" + i])
            {
                for(var j = 0; j < locations.length; j++)
                {
                    locations[j].style.visibility = "visible";
                }
            }
        }
        else if(locations != null)
        {
            for(var j = 0; j < locations.length; j++)
            {
                locations[j].style.visibility = "hidden";
            }
        }
    }


}

function createAllLocations()
{
    var lines = new Array();
    lines['x1'] = new Array();
    lines['y1'] = new Array();
    lines['x2'] = new Array();
    lines['y2'] = new Array();
    lines['color'] = new Array();
    lines['type'] = new Array();
    lines['style'] = new Array();
    
    var xMin = 0;
    var xMax = mapInfo[mapDataImageWidthIndex] * 1.0;
    var yMin = 0;
    var yMax = mapInfo[mapDataImageHeightIndex] * 1.0;
    
    for(var i in mapLocations)
    {
        var mainType, mainTypeID, iconWidth, iconHeight, iconUrl, lineColor;
        var location = mapLocations[i];
        var locationId = location[mapLocationIdIndex];
        var name = location[mapLocationNameIndex];
        var type = location[mapLocationTypeIndex];
        var subType = location[mapLocationSubtypeIndex];
        var xCoord = location[mapLocationXCoordIndex];
        var yCoord = location[mapLocationYCoordIndex];
        var zCoord = location[mapLocationZCoordIndex];
        var coords = formatCoords(xCoord, yCoord, zCoord);
		var points = location[mapLocationRoutePointIndex];
        
        if(isValidLandmarkType(type) || isValidLandmarkSubType(subType))
        {
            if(isValidLandmarkSubType(subType))
            {
                mainType = subType;
                mainTypeID = "subtype_" + mainType;
                iconUrl = mapSubtypes[mainType][mapSubtypeIconIndex];
                iconWidth = mapSubtypes[mainType][mapSubtypeIconWidthIndex];
                iconHeight = mapSubtypes[mainType][mapSubtypeIconHeightIndex];
                lineColor = mapSubtypes[mainType][mapSubtypeLineColorIndex];
            }
            else
            {
                mainType = type;
                mainTypeID = "type_" + mainType;
                iconUrl = mapTypes[mainType][mapTypeIconIndex];
                iconWidth = mapTypes[mainType][mapTypeIconWidthIndex];
                iconHeight = mapTypes[mainType][mapTypeIconHeightIndex];
                lineColor = mapTypes[mainType][mapTypeLineColorIndex];
            }

            var xCoordPixel = getXPixel(xCoord) * 1.0;
            var yCoordPixel = getYPixel(yCoord) * 1.0;
            
            var imageX = (xCoordPixel - Math.round(iconWidth / 2.0)) * 1.0;
            var imageY = (yCoordPixel - Math.round(iconHeight / 2.0)) * 1.0;
            
            if(iconUrl != "")
            {
                var xPos = imageX + xOffset;
                var yPos = imageY + yOffset;
//                var image = new Image;
                var imageHTML = "<img src='" + iconUrl + "'" +
                        " onMouseOver=\"showLandmark('" + hidequotes(name) + "', '" + coords + "', '" + 
                        type + "', '" + subType + "', " + eval("xPos") + ", " + eval("yPos") + ")\"" +
                        " onMouseOut='hideLandmark()' onClick=\"popupInfo('" + 
                        locationId + "')\">";
                
                var locationHtml = "<div id='" + mainTypeID + "' style='position: absolute; " +
                    " left: " + xPos + "; top: " + yPos + "; visibility: visible; z-index: " + zIndexes['map_icons'] +
                    "; cursor: hand'>";
                
                if(points.length == 0 || isPointInBounds(xMin, xMax, yMin, yMax, imageX, imageY))
                {
                    // var oDiv = document.createElement(locationHtml);
                    // oDiv.innerHTML = imageHTML;
                    
//                    var oImg = new Image();
//                    alert(mapIcons);
//                    alert(mapIcons[mainTypeID]);
//                    if(mapIcons[mainTypeID] != null)
//                    {
//                        oImg.src = mapIcons[mainTypeID].src;
//                    }
//                    oImg.src = mapIcons[mainTypeID].src;
//                    oImg.name = mainTypeID;
//                    image.style.position = "absolute";
//                    image.style.left = xPos;
//                    image.style.top = yPos;
//                    image.style.zIndex = zIndexes['map_icons'];
//                    image.style.visibility = "visible";
//                    image.onMouseOver = function()
//                    {
//                        showLandmark(hidequotes(name), coords, type, subType, xPos, yPos);
//                    }
//                    image.onMouseOut = function()
//                    {
//                        hideLandmark();
//                    }
//                    image.onClick = function()
//                    {
//                        popupInfo(locationId);
//                    }
//                    oDiv.appendChild(oImg);
                    document.write(locationHtml + imageHTML + "</div>");
//                    var mapLocationsDiv = document.getElementById("mapLocationsDiv");
//                    mapLocationsDiv.appendChild(image);
//                    mapLocationsDiv.appendChild(oDiv);
                }
                
                if(locID == i)
                {
                    lines['x1'].push(xCoordPixel - pointerArrowLength);
                    lines['y1'].push(yCoordPixel);
                    lines['x2'].push(xCoordPixel);
                    lines['y2'].push(yCoordPixel);
                    lines['color'].push(pointerArrowColor);
                    lines['type'].push(mainTypeID);
                    lines['style'].push("pointer");
                }
				
				if(points.length > 0)
				{
					var curX = xCoord;
					var curY = yCoord;
					for(var index in points)
					{
						var x1Pixel = getXPixel(curX) * 1.0;
						var y1Pixel = getYPixel(curY) * 1.0;
						var x2Pixel = getXPixel(points[index][0]) * 1.0;
						var y2Pixel = getYPixel(points[index][1]) * 1.0;
						
						var p1InBounds = isPointInBounds(xMin, xMax, yMin, yMax, x1Pixel, y1Pixel);
						var p2InBounds = isPointInBounds(xMin, xMax, yMin, yMax, x2Pixel, y2Pixel);
						
						if(p1InBounds || p2InBounds)
						{
						    if(p1InBounds && !p2InBounds)
						    {
						        var intersect = getMapIntersection(xMin, xMax, yMin, yMax, x1Pixel, y1Pixel, x2Pixel, y2Pixel);
						        x2Pixel = intersect['x'];
						        y2Pixel = intersect['y'];
						    }
						    else if(p2InBounds && !p1InBounds)
						    {
						        var intersect = getMapIntersection(xMin, xMax, yMin, yMax, x1Pixel, y1Pixel, x2Pixel, y2Pixel);
						        x1Pixel = intersect['x'];
						        y1Pixel = intersect['y'];
						    }

						    lines['x1'].push(x1Pixel);
						    lines['y1'].push(y1Pixel);
						    lines['x2'].push(x2Pixel);
						    lines['y2'].push(y2Pixel);
						    if(lineColor != "")
						    {
							    lines['color'].push(lineColor);
						    }
						    else
						    {
							    lines['color'].push("white");
						    }
						    lines['type'].push(mainTypeID);
						    lines['style'].push("");
						}
    						
						curX = points[index][0];
						curY = points[index][1];
					}
				}
			}
        }
    }
    
    drawLines(lines['x1'], lines['y1'], lines['x2'], lines['y2'], lines['color'], lines['type'], lines['style']);
}

function isPointInBounds(xMin, xMax, yMin, yMax, xPixel, yPixel)
{
    if((xPixel > xMin) && (xPixel < xMax) && (yPixel > yMin) && (yPixel < yMax))
    {
        return true;
    }
    
    return false;
}

function hidequotes(name)
{
    name.replace("\"", "\\\"");
    return name.replace("'", "_");
}

function showquotes(name)
{
    name.replace("\\\"", "\"");
    return name.replace("_", "'");
}

function readLocations()
{
    for(var n = 0; n < mapLocations.length; n++)
    {
        var location = mapLocations[n];
        for(var index in location)
        {
            var text = translate(location[index]);
            location[index] = text;
        }
    }
}

function translate(text)
{
    var j = 2;
    var res = "";

    for(var i = 0; i < text.length; i += 2)
    {
        var temp = text.substring(i, j);
        if(temp.length < 2)
        {
            temp = '0' + temp;
        }
        var t = unescape('%'+temp);

        if(t == '%d' || t == '%a')
        {
            res = res + ' ';
        }
        else
        {
            res = res + t;
        }

        j += 2;
    }

    return res;
}

function isValidLandmarkType(type)
{
    var isValid = false;
    for(var i = 0; i < mapTypes.length; i++)
    {
        if((mapTypes[i]) != null && (mapTypes[i][mapTypeIdIndex] == type))
        {
            isValid = true;
        }
    }
    
    return isValid;
}

function isValidLandmarkSubType(subType)
{
    var isValid = false;
    for(var j = 0; j < mapSubtypes.length; j++)
    {
        if((mapSubtypes[j] != null) && (mapSubtypes[j][mapSubtypeIdIndex] == subType))
        {
            isValid = true;
        }
    }
    
    return isValid;
}

function getXPixel(xCoord)
{
    if(xCoord == null)
    {
        return 0;
    }

    var scale = mapInfo[mapDataScaleIndex];
    var xLocation = (mapInfo[mapDataXOriginIndex] + (scale * xCoord)).toFixed(0);

    return xLocation;
}

function getYPixel(yCoord)
{
    if(yCoord == null)
    {
        return 0;
    }

    var scale = mapInfo[mapDataScaleIndex];
    var yLocation = (mapInfo[mapDataYOriginIndex] + (scale * yCoord)).toFixed(0);
    
    return yLocation;
}

function formatCoords(xCoord, yCoord, zCoord)
{
    var xCoordFormatted = formatXCoord(xCoord);
    var yCoordFormatted = formatYCoord(yCoord);
    var zCoordFormatted = formatZCoord(zCoord);
    
    var formatted = "";
    
    if(config['x_coord_first'] == 1)
    {
        formatted += xCoordFormatted + ", " + yCoordFormatted;
    }
    else
    {
        formatted += yCoordFormatted + ", " + xCoordFormatted;
    }
    
    if(config['use_z_coord'] == 1)
    {
        formatted += ", " + zCoordFormatted;
    }
    
    return formatted;
}

function formatXCoord(xCoord)
{
    var coord_num = 0;
    var text = "";
    
    if(config['show_neg_coords'] == 1)
    {
        coord_num = xCoord.toFixed(config['coord_precision']);
    }
    else
    {
        var absXCoord = Math.abs(xCoord);
        coord_num = absXCoord.toFixed(config['coord_precision']);
    }

    if(xCoord >= 0)
    {
        text = config['x_coord_pos_text'];
    }
    else
    {
        text = config['x_coord_neg_text'];
    }
    
    if(config['coord_text_loc'] == 1)
    {
        return coord_num + text;
    }
    else
    {
        return text + coord_num;
    }
}

function formatYCoord(yCoord)
{
    var coord_num = 0;
    var text = "";
    
    if(config['show_neg_coords'] == 1)
    {
        coord_num = yCoord.toFixed(config['coord_precision']);
    }
    else
    {
        var absYCoord = Math.abs(yCoord);
        coord_num = absYCoord.toFixed(config['coord_precision']);
    }

    if(yCoord >= 0)
    {
        text = config['y_coord_pos_text'];
    }
    else
    {
        text = config['y_coord_neg_text'];
    }
    
    if(config['coord_text_loc'] == 1)
    {
        return coord_num + text;
    }
    else
    {
        return text + coord_num;
    }
}

function formatZCoord(zCoord)
{
    var coord_num = 0;
    var text = "";
    
    if(config['show_neg_coords'] == 1)
    {
        coord_num = zCoord.toFixed(config['coord_precision']);
    }
    else
    {
        var absZCoord = Math.abs(zCoord);
        coord_num = absZCoord.toFixed(config['coord_precision']);
    }

    if(zCoord >= 0)
    {
        text = config['z_coord_pos_text'];
    }
    else
    {
        text = config['z_coord_neg_text'];
    }
    
    if(config['coord_text_loc'] == 1)
    {
        return coord_num + text;
    }
    else
    {
        return text + coord_num;
    }
}

function showLandmark(name, coords, type, subtype, x, y)
{
    var backgroundColor, textColor;
    if((subtype == null) || (subtype == "") || (subtype == 0) || mapSubtypes[subtype] == null || mapSubtypes[subtype][mapSubtypeIconIndex] == "")
    {
        if(mapTypes[type] == null)
        {
            backgroundColor = "white";
            textColor = "black";
        }
        else
        {
            if(mapTypes[type][mapTypeBackgroundColorIndex] == "")
            {
                backgroundColor = "white";
            }
            else
            {
                backgroundColor = mapTypes[type][mapTypeBackgroundColorIndex];
            }

            if(mapTypes[type][mapTypeTextColorIndex] == "")
            {
                textColor = "black";
            }
            else
            {
                textColor = mapTypes[type][mapTypeTextColorIndex];
            }
        }
    }
    else
    {
        if(mapSubtypes[subtype] == null)
        {
            backgroundColor = "white";
            textColor = "black";
        }
        else
        {
            if(mapSubtypes[subtype][mapSubtypeBackgroundColorIndex] == "")
            {
                backgroundColor = "white";
            }
            else
            {
                backgroundColor = mapSubtypes[subtype][mapSubtypeBackgroundColorIndex];
            }

            if(mapSubtypes[subtype][mapSubtypeTextColorIndex] == "")
            {
                textColor = "black";
            }
            else
            {
                textColor = mapSubtypes[subtype][mapSubtypeTextColorIndex];
            }
        }
    }
    
    name = showquotes(name);

    if(oToolTip != undefined)
    {
        oToolTip.innerHTML = "<nobr><b>" + name + "</b>";
		if(config['show_coords'])
		{
			oToolTip.innerHTML += "(" + coords + ")";
		}
		oToolTip.innerHTML += "</nobr>";
        oToolTip.style.visibility = "visible";
        
        var rightSide = document.body.scrollLeft + document.body.clientWidth;
        if(x < (rightSide - 140.0))
        {
            oToolTip.style.right = "auto";
            oToolTip.style.left = x + 20.0;
        }
        else
        {
            oToolTip.style.left = "auto";
            oToolTip.style.right = rightSide - x + 20.0;
        }
        
        var bottomSide = document.body.scrollTop + document.body.clientHeight;
        if(y < (bottomSide - 40.0))
        {
            oToolTip.style.bottom = "auto";
            oToolTip.style.top = y + 10.0;
        }
        else
        {
            oToolTip.style.top = "auto";
            oToolTip.style.bottom = bottomSide - y + 5.0;
        }
        oToolTip.style.backgroundColor = backgroundColor;
        oToolTip.style.color = textColor;
    }
}

function hideLandmark()
{
    oToolTip.style.visibility = "hidden";
    oToolTip.style.left = 0;
    oToolTip.style.right = 0;
}

function moveMarker()
{
    if(optionsEnabled["marker"] && config['show_coords'])
    {
	    var xPixel = event.offsetX;
	    var yPixel = event.offsetY;
    	
	    var marker = document.getElementById("marker");

	    marker.style.left = xPixel - markerSize/2 + getMapXPosition();
	    marker.style.top = yPixel - markerSize/2 + getMapYPosition();

		marker.style.visibility = "visible";

        var xCoordTextbox = document.getElementById("MarkerXCoord");
        var yCoordTextbox = document.getElementById("MarkerYCoord");
	    var xCoordSelect = document.getElementById("MarkerXText");
	    var yCoordSelect = document.getElementById("MarkerYText");

	    var xCoord = getXCoord(xPixel * 1.0);
	    var yCoord = getYCoord(yPixel * 1.0);
	    
	    xCoord = xCoord.toFixed(config['coord_precision']);
	    yCoord = yCoord.toFixed(config['coord_precision']);

        if(config['show_neg_coords'] == 1)
        {
	        xCoordTextbox.value = xCoord;
        }
        else
        {
	        xCoordTextbox.value = Math.abs(xCoord);
        }
	    if(xCoordSelect != null)
	    {
	        if(xCoord >= 0)
	        {
		        xCoordSelect.value = "+";
	        }
	        else
	        {
		        xCoordSelect.value = "-";
	        }
	    }
	    
	    if(config['show_neg_coords'] == 1)
	    {
	        yCoordTextbox.value = yCoord;
	    }
	    else
	    {
	        yCoordTextbox.value = Math.abs(yCoord);
	    }
	    if(yCoordSelect != null)
	    {
	        if(yCoord >= 0)
	        {
		        yCoordSelect.value = "+";
	        }
	        else
	        {
		        yCoordSelect.value = "-";
	        }
	    }
	}
}

function showMarkerCoords()
{
    var xCoordTextbox = document.getElementById("MarkerXCoord");
    var yCoordTextbox = document.getElementById("MarkerYCoord");
	var xCoordSelect = document.getElementById("MarkerXText");
	var yCoordSelect = document.getElementById("MarkerYText");
    var marker = document.getElementById("marker");
    
    var leftPx = marker.style.left;
    var topPx = marker.style.top;
    
    var re = "([0-9\.]+)";
    var regexp = new RegExp(re, "i");
    
    leftPx.match(regexp);
    var left = RegExp.$1 * 1.0;
    
    topPx.match(regexp);
    var top = RegExp.$1 * 1.0;
    
    if(oToolTip != undefined)
    {
		var yCoordText = yCoordTextbox.value;
		if(yCoordSelect != null)
		{
			if(yCoordSelect.value == "+")
			{
			    if(config['coord_text_loc'] == 0)
			    {
			        yCoordText = config['y_coord_pos_text'] + yCoordText;
			    }
			    else
			    {
    				yCoordText += config['y_coord_pos_text'];
    		    }
			}
			else
			{
			    if(config['coord_text_loc'] == 0)
			    {
			        yCoordText = config['y_coord_neg_text'] + yCoordText;
			    }
			    else
			    {
    				yCoordText += config['y_coord_neg_text'];
    			}
			}
		}
		
		var xCoordText = xCoordTextbox.value;
		if(xCoordSelect != null)
		{
			if(xCoordSelect.value == "+")
			{
			    if(config['coord_text_loc'] == 0)
			    {
				    xCoordText = config['x_coord_pos_text'] + xCoordText;
			    }
			    else
			    {
				    xCoordText += config['x_coord_pos_text'];
				}
			}
			else
			{
			    if(config['coord_text_loc'] == 0)
			    {
				    xCoordText = config['x_coord_neg_text'] + xCoordText;
    			}
    			else
    			{
    				xCoordText += config['x_coord_neg_text'];
    			}
			}
		}
		
		var text = "<nobr><b>Marker (";
		if(config['x_coord_first'] == 1)
		{
			text += xCoordText + ", " + yCoordText;
		}
		else
		{
			text += yCoordText + ", " + xCoordText;
		}
		if(config['use_z_coord'] == 1)
		{
		    var zero = 0;
		    text += ", ";
		    if(config['coord_text_loc'] == 0)
		    {
		        text += config['z_coord_pos_text'] + zero.toFixed(config['coord_precision']);
		    }
		    else
		    {
		        text += zero.toFixed(config['coord_precision']) + config['z_coord_pos_text'];
		    }
		}
		text += ")</b></nobr>";
		oToolTip.innerHTML = text;
		
        var rightSide = document.body.scrollLeft + document.body.clientWidth;
        if(left < (rightSide - 140.0))
        {
            oToolTip.style.right = "auto";
            oToolTip.style.left = left + 20.0;
        }
        else
        {
            oToolTip.style.left = "auto";
            oToolTip.style.right = rightSide - left + 20.0;
        }
        
        var bottomSide = document.body.scrollTop + document.body.clientHeight;
        if(top < (bottomSide - 40.0))
        {
            oToolTip.style.bottom = "auto";
            oToolTip.style.top = top + 10.0;
        }
        else
        {
            oToolTip.style.top = "auto";
            oToolTip.style.bottom = bottomSide - top + 5.0;
        }
        oToolTip.style.visibility = "visible";
        oToolTip.style.backgroundColor = "#00FF00";
		oToolTip.style.color = "#000000";
    }
}

function popupInfo(id)
{
    if(locationDetailsWindow == null || locationDetailsWindow.closed)
    {
        locationDetailsWindow = window.open("index.php?id=" + id);
    }
    else
    {
        locationDetailsWindow.navigate("index.php?id=" + id);
        locationDetailsWindow.focus();
    }
}

function showCoords()
{
    var coords = formatCoords(getXCoord(event.offsetX), getYCoord(event.offsetY), 0);

    window.status = mapInfo[mapDataNameIndex];
	if(config['show_coords'])
	{
		window.status += ": " + coords;
	}
}

function getXCoord(x)
{
    var origin = mapInfo[mapDataXOriginIndex];
    var scale = mapInfo[mapDataScaleIndex];

    return (x - origin) / scale;
}

function getYCoord(y)
{
    var origin = mapInfo[mapDataYOriginIndex];
    var scale = mapInfo[mapDataScaleIndex];

    return (y - origin) / scale;
}

function drawLines(x1, y1, x2, y2, colors, typeIDs, styles)
{
    var imageSrc = "";
    var left = xOffset;
    var top = yOffset;
    
//    var mapLocationsDiv = document.getElementById("mapLocationsDiv");
    
//    var oDiv = document.createElement("<div id='lines' style='position: absolute; left: " + left +
//        "; top: " + top + "; z-index: " + zIndexes['map_lines'] +
//        "' onMouseMove='showCoords()'>");
    if(useVML)
    {
        imageSrc = getVMLImageString(x1, y1, x2, y2, colors, typeIDs, styles);
    }
//    else
//    {
//        imageSrc = getPHPImageString(x1, y1, x2, y2, count, color);
//    }

    document.write("<div id='lines' style='position: absolute; left: " + left +
        "; top: " + top + "; z-index: " + zIndexes['map_lines'] +
        "' onMouseMove='showCoords()'>");
    document.write(imageSrc);
    document.write("</div>");
//    oDiv.innerHTML = imageSrc;
//    mapLocationsDiv.appendChild(oDiv);
}

function getVMLImageString(x1_array, y1_array, x2_array, y2_array, color_array, type_array, style_array)
{
    var imageSrc = "";
    var count = x1_array.length;
    
    for(var i = 0; i < count; i++)
    {
        var x1 = x1_array[i];
        var y1 = y1_array[i];
        var x2 = x2_array[i];
        var y2 = y2_array[i];
        
        var newX1 = getArrowX1(x1, y1, x2, y2);
        var newY1 = getArrowY1(x1, y1, x2, y2);
        var newX2 = getArrowX2(x1, y1, x2, y2);
        var newY2 = getArrowY2(x1, y1, x2, y2);

        var color = color_array[i];
        
        var currentLineWidth = lineWidth;
        var currentArrowWidth = arrowWidth;
        
        if(style_array[i] == "pointer")
        {
            currentLineWidth = pointerLineWidth;
            currentArrowWidth = pointerArrowWidth;
        }

        imageSrc += "<div id='" + type_array[i] + "'>";
        imageSrc += "<v:line from='" + newX1 + "," + newY1 + "' to='" + newX2 + "," + 
            newY2 + "'" + " strokecolor='" + color + "' style='position: absolute; left: 0; top: 0'>";
        imageSrc += "<v:stroke weight=" + currentLineWidth + " startarrow=";
        imageSrc += "\"none\"";
        imageSrc += " endarrowwidth=" + currentArrowWidth;
        imageSrc += " endarrow=\"classic\" endarrowlength=\"long\" /><v:path arrowok=\"true\" /></v:line>";
        imageSrc += "</div>\n";
    }
    
    return imageSrc;
}

function getArrowX1(x1, y1, x2, y2)
{
    var angle = 0;
	
//    if(x1 != x2)
//    {
//        angle = Math.atan(Math.abs(y2 - y1)/Math.abs(x2 - x1));
//    }

//    if(x2 > x1)
//    {
//        x1 = Math.round((x1 * 1.0) + (4.0 * Math.abs(Math.cos(angle))));
//    }
//    else if(x1 > x2)
//    {
//        x1 = Math.round((x1 * 1.0) - (4.0 * Math.abs(Math.cos(angle))));
//    }
    
    return x1;
}

function getArrowX2(x1, y1, x2, y2)
{
    var angle = 0;
    
//    if(x1 != x2)
//    {
//        angle = Math.atan(Math.abs(y2 - y1)/Math.abs(x2 - x1));
//    }
    
//    if(x2 > x1)
//    {
//        x2 = Math.round((x2 * 1.0) - (4.0 * Math.abs(Math.cos(angle))));
//    }
//    else if(x1 > x2)
//    {
//        x2 = Math.round((x2 * 1.0) + (4.0 * Math.abs(Math.cos(angle))));
//    }

    return x2;        
}

function getArrowY1(x1, y1, x2, y2)
{
    var angle = 0;
    
//    if(x1 != x2)
//    {
//        angle = Math.atan(Math.abs(y2 - y1)/Math.abs(x2 - x1));
//    }
    
//    if(y2 > y1)
//    {
//        y1 = Math.round((y1 * 1.0) + (4.0 * Math.abs(Math.sin(angle))));
//    }
//    else if(y1 > y2)
//    {
//        y1 = Math.round((y1 * 1.0) - (4.0 * Math.abs(Math.sin(angle))));
//    }
    
    return y1;
}

function getArrowY2(x1, y1, x2, y2)
{
    var angle = 0;
    
//    if(x1 != x2)
//    {
//        angle = Math.atan(Math.abs(y2 - y1)/Math.abs(x2 - x1));
//    }
    
//    if(y2 > y1)
//    {
//        y2 = Math.round((y2 * 1.0) - (4.0 * Math.abs(Math.sin(angle))));
//    }
//    else if(y1 > y2)
//    {
//        y2 = Math.round((y2 * 1.0) + (4.0 * Math.abs(Math.sin(angle))));
//    }
    
    return y2;
}

//function getPHPImageString(x1, y1, x2, y2, count, color)
//{
//    var imageSrc = "<img src='drawArrows.php?count=" + count;
//    for(var i = 0; i < count; i++)
//    {
//        var one = (2*i)+1;
//        var two = one + 1;
//        imageSrc = imageSrc + "&x" + one + "=" + x1[i] + "&y" + one + "=" + y1[i] + "&x" + two + "=" + x2[i] + "&y" + two + "=" + y2[i];
//    }
//    imageSrc = imageSrc + "&color=" + color;
//    imageSrc = imageSrc + "' onMouseOverMove='showCoords()'>";
//    
//    return imageSrc;
//}

function collapse(name)
{
    var name1 = name.replace(" ", "_");
    while(name1.indexOf(" ") >= 0)
    {
        name1 = name1.replace(" ", "_");
    }
    return name1;
}

function uncollapse(name)
{
    var name1 = name.replace("_", " ");
    while(name1.indexOf("_") >= 0)
    {
        name1 = name1.replace("_", " ");
    }
    return name1;
}

//function formatCoords(xCoord, yCoord)
//{
//    var coords = "";
//    if(yCoord < 0)
//    {
//        var newY = 0 - yCoord;
//        coords += config["y_coord_neg_prefix"];
//        coords += newY;
//        coords += config["y_coord_neg_suffix"];
//    }
//    else
//    {
//        coords += config["y_coord_pos_prefix"];
//        coords += yCoord;
//        coords += config["y_coord_pos_suffix"];
//    }
//    
//    coords += ", ";
//    
//    if(xCoord < 0)
//    {
//        var newX = 0 - xCoord;
//        coords += config["x_coord_neg_prefix"];
//        coords += newX;
//        coords += config["x_coord_neg_suffix"];
//    }
//    else
//    {
//        coords += config["x_coord_pos_prefix"];
//        coords += xCoord;
//        coords += config["x_coord_pos_suffix"];
//    }
//    
//    return coords;
//}

function getMax(numbers)
{
    var max = 0;
    
    for(var index in numbers)
    {
        if(numbers[index] > max)
        {
            max = numbers[index];
        }
    }
    
    return max;
}

function getMin(numbers)
{
    var min = 9999;
    
    for(var index in numbers)
    {
        if(numbers[index] < min)
        {
            min = numbers[index];
        }
    }
    
    return min;
}

function getMapIntersection(minX, maxX, minY, maxY, x1, y1, x2, y2)
{
    var x, y, originPoint;
    var intersect = new Array();
    
    x1 = x1 * 1.0;
    y1 = y1 * 1.0;
    x2 = x2 * 1.0;
    y2 = y2 * 1.0;

    var slope = (y2*1.0 - y1*1.0) / (x2*1.0 - x1*1.0);
    var b = y1 - (slope * x1);
    
    if((x1 >= minX) && (x1 <= maxX) && (y1 >= minY) && (y1 <= maxY))
    {
        originPoint = 1;
    }
    else if((x2 >= minX) && (x2 <= maxX) && (y2 >= minY) && (y2 <= maxY))
    {
        originPoint = 2;
    }
    else
    {
        intersect['x'] = x1;
        intersect['y'] = y1;
        return intersect;
    }
    
    if(((originPoint == 1) && (x2 > x1)) ||
        ((originPoint == 2) && (x1 >= x2)))
    {
        x = maxX;
        y = (slope * x) + b * 1.0;
        
        if((y >= minY) && (y <= maxY))
        {
            intersect['x'] = x;
            intersect['y'] = y;
            return intersect;
        }
    
        if(((originPoint == 1) && (y2 > y1)) ||
            ((originPoint == 2) && (y1 >= y2)))
        {
            y = maxY;
            x = (y - b)/slope;
            
            if((x >= minX) && (x <= maxX))
            {
                intersect['x'] = x;
                intersect['y'] = y;
                return intersect;
            }
        }
        else
        {
            y = minY;
            x = (y - b)/slope;
            
            if((x >= minX) && (x <= maxX))
            {
                intersect['x'] = x;
                intersect['y'] = y;
                return intersect;
            }
        }
    }
    else if(((originPoint == 1) && (x1 >= x2)) ||
        ((originPoint == 2) && (x2 > x1)))
    {
        x = minX;
        y = (slope * x) + b * 1.0;
        
        if((y >= minY) && (y <= maxY))
        {
            intersect['x'] = x;
            intersect['y'] = y;
            return intersect;
        }
        
        if(((originPoint == 1) && (y2 > y1)) ||
            ((originPoint == 2) && (y1 >= y2)))
        {
            y = maxY;
            x = (y - b)/slope;
            
            if((x >= minX) && (x <= maxX))
            {
                intersect['x'] = x;
                intersect['y'] = y;
                return intersect;
            }
        }
        else
        {
            y = minY;
            x = (y - b)/slope;
            
            if((x >= minX) && (x <= maxX))
            {
                intersect['x'] = x;
                intersect['y'] = y;
                return intersect;
            }
        }
    }
    
//    if(((originPoint == 1) && (x2 > x1)) ||
//        ((originPoint == 2) && (x1 >= x2)))
//    {
//        x = maxX;
//        y = (slope * x) + b * 1.0;
//        
//        if((y >= minY) && (y <= maxY))
//        {
//            intersect['x'] = x;
//            intersect['y'] = y;
//            return intersect;
//        }
//        
//        y = yMax;
//        x = (y - b)/slope;
//        
//        if((x >= minX) && (x <= maxX))
//        {
//            intersect['x'] = x;
//            intersect['y'] = y;
//            return intersect;
//        }
//    }
//    else if(((originPoint == 1) && (x1 >= x2)) ||
//        ((originPoint == 2) && (x2 > x1)))
//    {
//        x = minX;
//        y = (slope * x) + b * 1.0;
//        
//        oToolTip.innerHTML += " x: " + x + ", y: " + y + " ";
//        
//        if((y >= minY) && (y <= maxY))
//        {
//            intersect['x'] = x;
//            intersect['y'] = y;
//            return intersect;
//        }
//        
//        y = maxY;
//        x = (y - b)/slope;
//        
//        if((x >= minX) && (x <= maxX))
//        {
//            intersect['x'] = x;
//            intersect['y'] = y;
//            return intersect;
//        }
//    }
//    
//    if(((originPoint == 1) && (y2 > y1)) ||
//        ((originPoint == 2) && (y1 >= y2)))
//    {
//        y = maxY;
//        x = (y - b)/slope;
//        
//        if((x >= minX) && (x <= maxX))
//        {
//            intersect['x'] = x;
//            intersect['y'] = y;
//            return intersect;
//        }
//    }
//    else if(((originPoint == 1) && (y1 >= y2)) ||
//        ((originPoint == 2) && (y2 > y1)))
//    {
//        y = minY;
//        x = (y - b)/slope;
//        
//        if((x >= minX) && (x <= maxX))
//        {
//            intersect['x'] = x;
//            intersect['y'] = y;
//            return intersect;
//        }
//    }
//

//    if(x1 > x2)
//    {
//        x = minX;
//        y = (slope * x) + b * 1.0;
//
//        if((y >= minY) && (y <= maxY))
//        {
//            intersect['x'] = x;
//            intersect['y'] = y;
//            return intersect;
//        }
//    }
//    else
//    {
//        x = maxX;
//        y = (slope * x) + b * 1.0;
//        
//        if((y >= minY) && (y <= maxY))
//        {
//            intersect['x'] = x;
//            intersect['y'] = y;
//            return intersect;
//        }
//    }
//
//    if(y2 > y1)
//    {
//        y = minY;
//        x = (y - b)/slope;
//        
//        if((x >= minX) && (x <= maxX))
//        {
//            intersect['x'] = x;
//            intersect['y'] = y;
//            return intersect;
//        }
//    }
//    else
//    {
//        y = maxY;
//        x = (y - b)/slope;
//        
//        if((x >= minX) && (x <= maxX))
//        {
//            intersect['x'] = x;
//            intersect['y'] = y;
//            return intersect;
//        }
//    }
    
    intersect['x'] = x1;
    intersect['y'] = y1;
    return intersect;
}

function doesArrayContain(array, value)
{
    for(var index in array)
    {
        if(array[index] == value)
        {
            return true;
        }
    }
    
    return false;
}

}
/*
     FILE ARCHIVED ON 13:56:41 Jun 03, 2004 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:40:36 Dec 30, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 114.886
  exclusion.robots: 0.068
  exclusion.robots.policy: 0.061
  cdx.remote: 0.056
  esindex: 0.008
  LoadShardBlock: 42.216 (3)
  PetaboxLoader3.datanode: 65.517 (4)
  CDXLines.iter: 16.156 (3)
  load_resource: 102.296
  PetaboxLoader3.resolve: 65.277
*/


