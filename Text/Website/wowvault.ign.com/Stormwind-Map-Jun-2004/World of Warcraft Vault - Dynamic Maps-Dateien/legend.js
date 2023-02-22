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


function createLegend()
{
    document.write("<div class='legend' id='legendDiv' style='z-index: " + zIndexes['legend'] +
        "; border-color: " + config['legend_border_color'] + "' onMouseOver='showCoords()'>");
    
    var logo = config['map_logo_url'];
    var logo_link = config['map_logo_link'];
    if(logo != "")
    {
        document.write("<center>");
        if(logo_link != "")
        {
            document.write("<a href=\"" + logo_link + "\" target=\"_blank\">");
        }
        document.write("<img src='" + logo + "' border=0>");
        if(logo_link != "")
        {
            document.write("</a>");
        }
        document.write("</center><br>");
    }
    
    // Description
    document.write("<center><p>Click on any location for more info.<br>");
    document.write("See a missing landmark? <a href=\"index.php?view=usersubmit\" target=\"_blank\">Submit it!</a></p></center>");
    
    document.write("<table cellspacing=5 cellpadding=0 border=0 id='legendTable'>");
    
    // Map selection
	document.write("<form method=GET action=\"map.php\">\n");
	if(override == 1)
	{
	    document.write("<input type=hidden name=\"admin\" value=\"1\">\n");
	}
    document.write("<tr><td><b>Map:&nbsp;</b>");
	document.write("<td><select name=\"map\" onChange='this.form.submit();'");
	if(config['show_coords'])
	{
		document.write(" style='width:100%'");
	}
	document.write(">\n");
	for(var index in maps)
	{
		document.write("<option value=\"" + index + "\"");
		if(mapID == index)
		{
			document.write(" selected");
		}
		document.write(">" + maps[index] + "</option>\n");
	}
	document.write("</select></td></tr>\n");
    
	// Server
	if((config['use_game_servers'] == 1) && (config['separate_server_maps'] == 1))
	{
		document.write("<tr><td><b>Server:</b></td>");
		document.write("<td><select name=\"server\" onChange='this.form.submit();' style='width:100%'>\n");
		document.write("<option value=\"0\"");
		if(server == 0)
		{
			document.write(" selected");
		}
		document.write(">All Servers</option>");
		for(var id in servers)
		{
			document.write("<option value=\"" + id + "\"");
			if(id == server)
			{
				document.write(" selected");
			}
			document.write(">" + servers[id] + "</option>");
		}
		document.write("</select></td></tr>");
	}
	document.write("</form>");

    // Search
    document.write("<tr>");
    document.write("<td><b>Search:&nbsp;</b></td>");
    document.write("<td><input type='text' onKeyPress='searchKeyPressed()' name=\"SearchText\" style='width:100%'></td></tr>");

    // Marker
	if(config['show_coords'])
	{
		document.write("<tr><td><b>Marker:&nbsp;</b></td>");
		document.write("<td><table cellspacing=0 cellpadding=0 border=0 width=100%>");
		document.write("<tr>");
		if(config['x_coord_first'] == 1)
		{
			printXMarkerCoord();
			printYMarkerCoord();
		}
		else
		{
			printYMarkerCoord();
			printXMarkerCoord();
		}

		document.write("</tr>");
	}
    document.write("</table>");
    document.write("</td></tr>");
	
	document.write("</table>");
    
    document.write("<br>");
    
    // Icon legend
    document.write("<div id='legendBody' style='position: relative; z-index: " + zIndexes['legend'] + "'>");
    document.write("</div>");
    
    document.write("</div>");
}

function printXMarkerCoord()
{
    var text = false;
    if(config['x_coord_pos_text'] != "" && config['x_coord_neg_text'] != "")
    {
        text = true;
    }

    if(config['coord_text_loc'] == 1)
    {
        document.write("<td><input type='text' ");
        if(text)
        {
            document.write("size=4");
        }
        else
        {
            document.write("size=5");
        }
        document.write(" name=\"MarkerXCoord\" onChange=\"changeMarkerCoords()\"></td>");
        if(config['x_coord_pos_text'] != "" && config['x_coord_neg_text'] != "")
        {
            document.write("<td><select name='MarkerXText' onChange=\"changeMarkerCoords()\">");
            document.write("<option value='+'>" + config['x_coord_pos_text'] + "</option>");
            document.write("<option value='-'>" + config['x_coord_neg_text'] + "</option>");
            document.write("</select></td>\n");
        }
    }
    else
    {
        if(config['x_coord_pos_text'] != "" && config['x_coord_neg_text'] != "")
        {
            document.write("<td><select name='MarkerXText' onChange=\"changeMarkerCoords()\">");
            document.write("<option value='+'>" + config['x_coord_pos_text'] + "</option>");
            document.write("<option value='-'>" + config['x_coord_neg_text'] + "</option>");
            document.write("</select></td>\n");
        }
        document.write("<td><input type='text' ");
        if(text)
        {
            document.write("size=4");
        }
        else
        {
            document.write("size=5");
        }
        document.write(" name=\"MarkerXCoord\" onChange=\"changeMarkerCoords()\"></td>");
    }
}

function printYMarkerCoord()
{
    var text = false;
    if(config['y_coord_pos_text'] != "" && config['y_coord_neg_text'] != "")
    {
        text = true;
    }
    
    if(config['coord_text_loc'] == 1)
    {
        document.write("<td><input type='text' ");
        if(text)
        {
            document.write("size=4");
        }
        else
        {
            document.write("size=5");
        }
        document.write(" name=\"MarkerYCoord\" onChange=\"changeMarkerCoords()\"></td>");
        if(config['y_coord_pos_text'] != "" && config['y_coord_neg_text'] != "")
        {
            document.write("<td><select name='MarkerYText' onChange=\"changeMarkerCoords()\">");
            document.write("<option value='+'>" + config['y_coord_pos_text'] + "</option>");
            document.write("<option value='-'>" + config['y_coord_neg_text'] + "</option>");
            document.write("</select></td>\n");
        }
    }
    else
    {
        if(config['y_coord_pos_text'] != "" && config['y_coord_neg_text'] != "")
        {
            document.write("<td><select name='MarkerYText' onChange=\"changeMarkerCoords()\">");
            document.write("<option value='+'>" + config['y_coord_pos_text'] + "</option>");
            document.write("<option value='-'>" + config['y_coord_neg_text'] + "</option>");
            document.write("</select></td>\n");
        }
        document.write("<td><input type='text' ");
        if(text)
        {
            document.write("size=4");
        }
        else
        {
            document.write("size=5");
        }
        document.write(" name=\"MarkerYCoord\" onChange=\"changeMarkerCoords()\"></td>");
    }
}

function drawLegend(init)
{
    var legendDiv = document.getElementById("legendBody");
    var body = "";
    
    body += "<table cellspacing=0 cellpadding=1 border=0>";
    body += "<colgroup width=12><colgroup width=20>";
    if(init || optionsVisibility["allLocations"])
    {
        body += "<colgroup width=20><colgroup width=20>";
        if(showSubtype(init))
        {
            body += "<colgroup width=20>";
        }
        body += "<colgroup>";
    }
    body += "<tr><td valign=center align=center><b><span onClick=\"collapseLegend('allLocations');\" style='cursor: hand;' id='allLocations_collapse'>";
    if(init)
    {
        optionsEnabled["allLocations"] = true;
        optionsVisibility["allLocations"] = true;
        body += "<img src=\"http://vnscripts.ign.com/locations/images/minus.gif\" width=11 height=11>";
    }
    else if(optionsVisibility["allLocations"])
    {
        body += "<img src=\"http://vnscripts.ign.com/locations/images/minus.gif\" width=11 height=11>";
    }
    else
    {
        body += "<img src=\"http://vnscripts.ign.com/locations/images/plus.gif\" width=11 height=11>";
    }
    body += "</span></b></td><td>";
    body += "<input type=checkbox id='allLocations_option'";
    if(init || optionsEnabled["allLocations"])
    {
        body += " checked='true'";
    }
    body += " onClick=\"enableLocationType('allLocations', '-1')\"></td>";
    body += "<td colspan=4 align=left>";
    body += "<span onClick=\"collapseLegend('allLocations');\" style='cursor: hand;' id='allLocations_collapse'><nobr>All Locations</nobr></span></td></tr>";

    if(optionsVisibility["allLocations"])
    {
		if(config['show_coords'])
		{
			body += "<tr><td></td><td></td><td><input type=checkbox id='marker_option' ";
			if(init)
			{
				body += "checked='true'";
				optionsEnabled["marker"] = true;
			}
			else if(optionsEnabled["marker"])
			{
				body += "checked='true'";
			}
			
			body += " onClick=\"enableLocationType('marker', '-1')\"></td>";
			body += "<td valign=center align=center><span id='marker_optionitem'><img src='" + imageDir + "marker.gif' width=9 height=9 ";
			body += " onMouseMove='showCoords()'></td><td colspan=2>Marker</span></td></tr>";
		}

        for(var id in mapTypes)
        {
            var type = mapTypes[id];
            if(type[mapTypeIconIndex] != "" || doesContainSubtypes(type[mapTypeIdIndex]))
            {
                var typeOptionId = "type_" + id;

                body += "<tr><td></td>";
                if(doesContainSubtypes(type[mapTypeIdIndex]))
                {
                    body += "<td valign=center align=center><b><span onClick=\"collapseLegend('" + typeOptionId + "');\" style='cursor: hand;' id='" + typeOptionId + "_collapse'>"
                    if(init)
                    {
                        optionsVisibility[typeOptionId] = true;
                    }
                    if(optionsVisibility[typeOptionId])
                    {
                        body += "<img src=\"http://vnscripts.ign.com/locations/images/minus.gif\" width=11 height=11>";
                    }
                    else
                    {
                        body += "<img src=\"http://vnscripts.ign.com/locations/images/plus.gif\" width=11 height=11>";
                    }
                    body += "</td>";
                }
                else
                {
                    body += "<td></td>";
                }
                body += "<td><input type=checkbox id='" + typeOptionId + "_option' ";
                if(init)
                {
                    body += "checked='true'";
                    optionsEnabled[typeOptionId] = true;
                }
                else if(optionsEnabled[typeOptionId])
                {
                    body += "checked='true'";
                }
                body += " onClick=\"enableLocationType('" + typeOptionId + "', '-1')\"></td>";
                body += "<td valign=center align=center><span id='" + typeOptionId + "_optionitem'>";
                body += "<img src='";
                if(type[mapTypeIconIndex] != "")
                {
                    body += type[mapTypeIconIndex] + "' width=" + type[mapTypeIconWidthIndex] + " height=" + type[mapTypeIconHeightIndex];
                }
                else
                {
                    body += "https://web.archive.org/web/20040603135246/http://vnscripts.ign.com/locations/images/blank.gif' width=1 height=1";
                }
                body += " valign=center onMouseMove='showCoords()' hspace=3 vspace=3>";
                body += "</td>";
                body += "<td colspan=2> <nobr>" + type[mapTypeNameIndex] + "</nobr></span></td></tr>";
                
                if(optionsVisibility[typeOptionId])
                {
                    for(var index in mapSubtypes)
                    {
                        if((mapSubtypes[index][mapSubtypeAssocTypeIndex] == type[mapTypeIdIndex]) &&
                            (mapSubtypes[index][mapSubtypeIconIndex] != ""))
                        {
                            var subtype = mapSubtypes[index];
                            var subtypeId = subtype[mapSubtypeIdIndex];
                            var subtypeOptionId = "subtype_" + subtypeId;
                            body += "<tr><td></td><td></td><td></td>";
                            body += "<td><input type=checkbox id='" + subtypeOptionId + "_option' ";
                            if(init)
                            {
                                body += "checked='true'";
                                optionsEnabled[subtypeOptionId] = true;
                            }
                            else if(optionsEnabled[subtypeOptionId])
                            {
                                body += "checked='true'";
                            }
                            
                            body += " onClick=\"enableLocationType('" + subtypeOptionId + "', '-1')\"></td>";
                            body += "<td valign=center align=center><span id='" + subtypeOptionId + "_optionitem'><img src='";
                            body += subtype[mapSubtypeIconIndex] + "' width=" + subtype[mapSubtypeIconWidthIndex];
                            body += " height=" + subtype[mapSubtypeIconHeightIndex];
                            body += " valign=center onMouseMove='showCoords()' hspace=3 vspace=3></td>";
                            body += "<td> <nobr>" + subtype[mapSubtypeNameIndex] + "</nobr></span></td></tr>";
                        }
                    }
                }
            }
        }
    }

    body += "</table>";
    body += "<br>";
    
    legendDiv.innerHTML = body;
}

function doesContainSubtypes(type)
{
    for(var index in mapSubtypes)
    {
        if(mapSubtypes[index][mapSubtypeAssocTypeIndex] == type)
        {
            return true;
        }
    }
    
    return false;
}

function showSubtype(init)
{
    for(var index in mapSubtypes)
    {
        if(mapTypes[mapSubtypes[index][mapSubtypeAssocTypeIndex]] != null)
        {
            if(init || (optionsEnabled["subtype_" + mapSubtypes[index][mapSubtypeIdIndex]]))
            {
                return true;
            }
        }
    }
    
    return false;
}

function collapseLegend(type)
{
    if(optionsVisibility[type])
    {
        optionsVisibility[type] = false;
    }
    else
    {
        optionsVisibility[type] = true;
    }
    
    drawLegend(false);
}

function popupSearch()
{
    var searchTextbox = document.getElementById("SearchText");
    var searchText = searchTextbox.value;
    searchText = searchText.replace(" ", "+");
    
    if(searchWindow == null || searchWindow.closed)
    {
        searchWindow = window.open("index.php?view=search&search_text=" + searchText);
    }
    else
    {
        searchWindow.navigate("index.php?view=search&search_text=" + searchText);
        searchWindow.focus();
    }
}

function searchKeyPressed()
{
    var key = event.keyCode;
    if(key == 13)
    {
        popupSearch();
    }
}

function changeMarkerCoords()
{
    var xCoordTextbox = document.getElementById("MarkerXCoord");
    var yCoordTextbox = document.getElementById("MarkerYCoord");
	var xCoordSelect = document.getElementById("MarkerXText");
	var yCoordSelect = document.getElementById("MarkerYText");

    var re = "([\+\-]?[0-9]+\.?[0-9]*)";
    var regexp = new RegExp(re, "i");
    
	var xCoord = xCoordTextbox.value;
    xCoord.match(regexp);
    var x = RegExp.$1 * 1.0;
	xCoordTextbox.value = x;
	if(xCoordSelect != null && xCoordSelect.value == "-")
	{
		x = 0 - x;
	}
	
	var yCoord = yCoordTextbox.value;
    yCoord.match(regexp);
    var y = RegExp.$1 * 1.0;
	yCoordTextbox.value = y;
	if(yCoordSelect != null && yCoordSelect.value == "-")
	{
		y = 0 - y;
	}

    var marker = document.getElementById("marker");
	
	if(marker != null)
	{
		if(xCoord == null || yCoord == null || xCoordTextbox.value == "" || yCoordTextbox.value == "")
		{
			marker.runtimeStyle.visibility = "hidden";
			return;
		}

		var xPixel = (getMapXPosition() * 1.0) + (getXPixel(x) * 1.0) - markerSize/2;
		var yPixel = (getMapYPosition() * 1.0) + (getYPixel(y) * 1.0) - markerSize/2;

		if((xPixel < getMapXPosition()) || (xPixel > getMapXPosition() + mapInfo[mapDataImageWidthIndex]) ||
			(yPixel < getMapYPosition()) || (yPixel > getMapYPosition() + mapInfo[mapDataImageHeightIndex]))
        {
            marker.runtimeStyle.visibility = "hidden";
            marker.runtimeStyle.left = -100;
            marker.runtimeStyle.top = -100;
            return;
        }
		
        marker.runtimeStyle.left = xPixel;
        marker.runtimeStyle.top = yPixel;
        
        if(optionsEnabled["marker"])
        {
            marker.runtimeStyle.visibility = "visible";
        }
        else
        {
            marker.runtimeStyle.visibility = "hidden";
        }
    }
}

function enableLocationType(type, value)
{
    if(type == "allLocations")
    {
        var allLocationsCheckbox = document.getElementById(type + "_option");
        var enabled = allLocationsCheckbox.checked;
        if(value == 1)
        {
            enabled = true;
        }
        else if(value == 0)
        {
            enabled = false;
        }
        
        optionsEnabled["allLocations"] = enabled;
        
        // Check the marker checkbox
		enableLocationType("marker", enabled);
        var markerCheckbox = document.getElementById("marker_option");
		if(markerCheckbox != null)
		{
			markerCheckbox.checked = enabled;
		}

        // Check the types checkboxes        
        for(var i in mapTypes)
        {
            var type = mapTypes[i];
            var typeId = type[mapTypeIdIndex];
            var typeCheck = document.getElementById("type_" + typeId + "_option");
			enableLocationType("type_" + typeId, enabled);
            if(typeCheck != null)
            {
                typeCheck.checked = enabled;
            }
        }
        
        // Check the subtype checkboxes
//        for(var i in mapSubtypes)
//        {
//            var subtype = mapSubtypes[i];
//            var subtypeId = subtype[mapSubtypeIdIndex];
//            var subtypeCheck = document.getElementById("subtype_" + subtypeId + "_option");
//            if(subtypeCheck != null)
//            {
//                subtypeCheck.checked = enabled;
//                enableLocationType("subtype_" + subtypeId, enabled);
//            }
//        }
        
//        var allInputs = document.getElementsByTagName("input");
//        for(var index in allInputs)
//        {
//            var input = allInputs[index];
//            if(input.type == "checkbox")
//            {
//                input.checked = check.checked;
//            }
//        }

//        if(checkVisibility[type])
//        {
//            for(var i in checkTypes)
//            {
//                checkLandmarkType(checkTypes[i]);
//            }
//        }
//        
//        for(var j in checksChecked)
//        {
//            checksChecked[j] = check.checked;
//        }
//        
//        if(check.checked)
//        {
//            showAllLandmarks(currentMap);
//            showAllPortals(currentMap);
//        }
//        else
//        {
//            clearAllLandmarks(currentMap);
//            clearAllPortals(currentMap);
//        }
//    }
//    else if(type == "marker")
//    {
//        var markerOption = document.getElementById("marker_option");
//        var marker = document.getElementById("marker");
//        
//        if(markerOption.checked)
//        {
//            marker.style.visibility = "visible";
//            optionsEnabled["marker"] = true;
//        }
//        else
//        {
//            marker.style.visibility = "hidden";
//            optionsEnabled["marker"] = false;
//        }
//    }

//        var show = false;
//        if(markerCheck == null)
//        {
//            show = checksChecked["marker"];
//        }
//        else
//        {
//            show = markerCheck.checked;
//        }
//
//        if(show)
//        {
//            changeCoords();
////            marker.runtimeStyle.visibility = "visible";
//        }
//        else
//        {
//            marker.runtimeStyle.visibility = "hidden";
//        }
//        checksChecked["marker"] = show;
//    }
//    else if(type == "region")
//    {
//        var check = document.getElementById(collapse(type) + "check");
//        var show = false;
//        if(check == null)
//        {
//            show = checksChecked[collapse(type)];
//        }
//        else
//        {
//            show = check.checked;
//            checksChecked[collapse(type)] = show;
//        }
//
//        for(var regionType in regionProperties)
//        {
////            var subTypeArray = landmarkSubTypes[index];
////            var subType = subTypeArray[0];
////            if(collapse(subTypeArray[1]) == type)
////            {
//                var checks = document.getElementsByName(collapse(regionType) + "check");
//                for(checkIndex in checks)
//                {
//                    checks[checkIndex].checked = show;
//                }
//                checksChecked[collapse(regionType)] = show;
//                checkLandmarkType(collapse(regionType));
////            }
//        }
//    }
//    else
//    {
//        var check = document.getElementById(collapse(type) + "check");
//        var show = false;
//        if(check == null)
//        {
//            show = checksChecked[collapse(type)];
//        }
//        else
//        {
//            show = check.checked;
//            checksChecked[collapse(type)] = show;
//        }
//
//        var labels = document.getElementsByName(collapse(type) + "_" + currentMap);
//        for(var i = 0; i < labels.length; i++)
//        {
//            var label = labels[i];
//            if(show)
//            {
//                label.style.visibility = "visible";
//            }
//            else
//            {
//                label.style.visibility = "hidden";
//            }
//            checksChecked[collapse(type)] = show;
//        }
//
//        for(var index in landmarkSubTypes)
//        {
//            var subTypeArray = landmarkSubTypes[index];
//            var subType = subTypeArray[0];
//            if(collapse(subTypeArray[1]) == type)
//            {
//                var checks = document.getElementsByName(collapse(subType) + "check");
//                for(checkIndex in checks)
//                {
//                    checks[checkIndex].checked = show;
//                }
//                checksChecked[collapse(subType)] = show;
//                checkLandmarkType(collapse(subType));
//            }
//        }
//        
//        if(type == "Portal")
//        {
//            for(var index in portalRouteTypes)
//            {
//                var portalCheck = document.getElementById(collapse(portalRouteTypes[index]) + "check");
//                if(portalCheck != null)
//                {
//                    portalCheck.checked = show;
//                }
//                checksChecked[collapse(portalRouteTypes[index])] = show;
//                checkLandmarkType(collapse(portalRouteTypes[index]));
//            }
//        }
    }
    else
    {
        var typeCheckbox = document.getElementById(type + "_option");
        
		var enabled = false;
		if(typeCheckbox != null)
		{
			enabled = typeCheckbox.checked;
		}
		if(value == 1)
		{
			enabled = true;
		}
		else if(value == 0)
		{
			enabled = false;
		}
        
        optionsEnabled[type] = enabled;
        
        var locations = document.getElementsByName(type);
        for(var i = 0; i < locations.length; i++)
        {
            if(enabled)
            {
				locations[i].runtimeStyle.visibility = "visible";
				optionsEnabled[type] = true;
            }
            else
            {
                locations[i].runtimeStyle.visibility = "hidden";
                optionsEnabled[type] = false;
            }
        }
		
		for(var i in mapSubtypes)
		{
			if("type_" + mapSubtypes[i][mapSubtypeAssocTypeIndex] == type)
			{
                var subtypeId = mapSubtypes[i][mapSubtypeIdIndex];
                var subtypeCheck = document.getElementById("subtype_" + subtypeId + "_option");
				enableLocationType("subtype_" + subtypeId, enabled);
                if(subtypeCheck != null)
                {
			        if(enabled)
			        {
    				    subtypeCheck.checked = true;
    		        }
    		        else
    		        {
    				    subtypeCheck.checked = false;
    		        }
                }
			}
		}
    }
}



}
/*
     FILE ARCHIVED ON 13:52:46 Jun 03, 2004 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:40:40 Dec 30, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 3805.021
  exclusion.robots: 0.066
  exclusion.robots.policy: 0.06
  cdx.remote: 0.058
  esindex: 0.007
  LoadShardBlock: 75.354 (3)
  PetaboxLoader3.datanode: 67.674 (4)
  CDXLines.iter: 22.826 (3)
  load_resource: 113.406
  PetaboxLoader3.resolve: 95.271
*/