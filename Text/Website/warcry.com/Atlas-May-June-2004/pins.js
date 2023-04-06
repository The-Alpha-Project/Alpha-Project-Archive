const areas = document.querySelectorAll("area");
let tables = document.querySelectorAll("table");

var offsetxpoint = -60; //Customize x offset of tooltip
var offsetypoint = 20; //Customize y offset of tooltip
var ie = document.all;
var ns6 = document.getElementById && !document.all;
var enabletip = false;
if (ie || ns6)
  var tipobj = document.all
    ? document.all["tooltip"]
    : document.getElementById
    ? document.getElementById("tooltip")
    : "";

function ietruebody() {
  return document.compatMode && document.compatMode != "BackCompat"
    ? document.documentElement
    : document.body;
}

function ddrivetip(thetext, thecolor, thewidth) {
  if (ns6 || ie) {
    if (typeof thewidth != "undefined") tipobj.style.width = thewidth + "px";
    if (typeof thecolor != "undefined" && thecolor != "")
      tipobj.style.backgroundColor = thecolor;
    tipobj.style.zIndex = 10000;
    tipobj.innerHTML =
      "<table width='100%' border='0' cellspacing='0' cellpadding='0'><tr><td width='6' height='6' align='left' valign='top'><img src='img/ecke_ol.gif' width='6' height='6'></td><td height='6' valign='top' background='img/ecke_o.gif'><img src='img/ecke_o.gif' width='52' height='6'></td><td width='6' height='6' align='right' valign='top'><img src='img/ecke_or.gif' width='6' height='6'></td></tr><tr><td width='6' background='img/ecke_l.gif'></td><td background='img/ecke.gif' bgcolor='#000000'>" +
      thetext +
      "</td><td width='6' background='img/ecke_r.gif'></td></tr><tr><td height='6' align='left' valign='bottom'><img src='img/ecke_ul.gif' width='6' height='6'></td><td height='6' valign='bottom' background='img/ecke_u.gif'><img src='img/ecke_u.gif' width='52' height='6'></td><td height='6' align='right' valign='bottom'><img src='img/ecke_ur.gif' width='6' height='6'></td></tr></table>";
    enabletip = true;
    return false;
  }
}

function positiontip(e) {
  if (enabletip) {
    var curX = ns6 ? e.pageX : event.x + ietruebody().scrollLeft;
    var curY = ns6 ? e.pageY : event.y + ietruebody().scrollTop;
    //Find out how close the mouse is to the corner of the window
    var rightedge =
      ie && !window.opera
        ? ietruebody().clientWidth - event.clientX - offsetxpoint
        : window.innerWidth - e.clientX - offsetxpoint - 20;
    var bottomedge =
      ie && !window.opera
        ? ietruebody().clientHeight - event.clientY - offsetypoint
        : window.innerHeight - e.clientY - offsetypoint - 20;

    var leftedge = offsetxpoint < 0 ? offsetxpoint * -1 : -1000;

    //if the horizontal distance isn't enough to accomodate the width of the context menu
    if (rightedge < tipobj.offsetWidth)
      //move the horizontal position of the menu to the left by it's width
      tipobj.style.left = ie
        ? ietruebody().scrollLeft + event.clientX - tipobj.offsetWidth + "px"
        : window.pageXOffset + e.clientX - tipobj.offsetWidth + "px";
    else if (curX < leftedge) tipobj.style.left = "5px";
    //position the horizontal position of the menu where the mouse is positioned
    else tipobj.style.left = curX + offsetxpoint + "px";

    //same concept with the vertical position
    if (bottomedge < tipobj.offsetHeight)
      tipobj.style.top = ie
        ? ietruebody().scrollTop +
          event.clientY -
          tipobj.offsetHeight -
          offsetypoint +
          "px"
        : window.pageYOffset +
          e.clientY -
          tipobj.offsetHeight -
          offsetypoint +
          "px";
    else tipobj.style.top = curY + offsetypoint + "px";
    tipobj.style.visibility = "visible";
  }
}

function hideddrivetip() {
  removePins()
  showPins();
  if (ns6 || ie) {
    enabletip = false;
    tipobj.style.visibility = "hidden";
    tipobj.style.left = "-1000px";
    tipobj.style.backgroundColor = "";
    tipobj.style.width = "";
  }
}

function removePins() {

  const pins = document.querySelectorAll(".map-pin");

  for (let pin of pins) {
    pin.remove()
  }

}

function showPins() {
  for (let area of areas) {
    const coords = area.getAttribute("coords");
    const splittedCoords = coords.split(",");
    let top = 0;
    let left = 0;

    if (area.getAttribute("shape") == "rect") {
      top = splittedCoords[1];
      left = splittedCoords[0];
    } else {
      top = splittedCoords[1];
      left = splittedCoords[0];
    }

    let pin = document.createElement("div");
    pin.setAttribute("class", "map-pin")
    pin.setAttribute(
      "style",
      `background-color: red; color: white; width: 15px; height: 15px; position: absolute; top: ${
        parseInt(top) + 42
      }px; left: ${parseInt(left) + 28}px; z-index: 100; border-radius: 100%;`
    );
    pin.addEventListener("mouseover", (event) => {
      event.target.style.display = "none";
    });
    tables[1].appendChild(pin);
  }
}

document.onmousemove = positiontip;
showPins();
