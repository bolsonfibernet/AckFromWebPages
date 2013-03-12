////////////////////////////////////////////////////////////////////////////////
// Opens a URL in a new, completely default, browser window or tab.
////////////////////////////////////////////////////////////////////////////////

function openURL(url)
{
	window.open(url);
}

////////////////////////////////////////////////////////////////////////////////
// Navigates to another page, remaining in the same browser window or tab.
////////////////////////////////////////////////////////////////////////////////

function assignURL(url)
{
	window.location.assign(url);
}

////////////////////////////////////////////////////////////////////////////////
// Although the HTML DOM includes an onDblClick event, it's implemented very
// poorly.  Instead of producing one event, it produces three: two click events
// and one double-click event.  This is a problem if we also handle onClick.
// The hack to work around this is to set the click action to work on a short
// timer.  If we get a second click before time is up, we'll cancel the timer,
// and only the double-click fires.  Otherwise we get the timer's click action.
////////////////////////////////////////////////////////////////////////////////

function delayClick(link)
{
	if (link.clickTimer)
	{
		clearTimeout(link.clickTimer);
		link.clickTimer = null;
	}
	else if (link.href)
	{
		link.clickTimer = setTimeout("assignURL('" + link.href + "')", 250);
	}
}

function hide_by_name(name)
{
	var to_hide = document.getElementsByName(name + "-open");
	for (var i=0;i<to_hide.length;i++)
		{
			to_hide[i].style.display='none';
		}
	var to_show = document.getElementsByName(name + "-closed");
	for (var i=0;i<to_show.length;i++)
		{
			to_show[i].style.display='inline';
		}
}

function show_by_name(name)
{
	var to_show = document.getElementsByName(name + "-open");
	for (var i=0;i<to_show.length;i++)
		{
			to_show[i].style.display='inline';
		}
	var to_hide = document.getElementsByName(name + "-closed");
	for (var i=0;i<to_hide.length;i++)
		{
			to_hide[i].style.display='none';
		}
}

function updateMap(mapurl, updatedurl)
{
	$.ajaxSetup( {cache:false} );
	$("#mapcontents").innerHTML = "";
	$("#mapcontents").load(mapurl);
	$("#lastupdated").innerHTML = "";
	$("#lastupdated").load(updatedurl);
}

function changeRefreshInterval(secs,mapurl,updatedurl) 
{
  if (i) {
    clearInterval(i);
  }
  if (secs > 0) {
    i=setInterval("updateMap('" + mapurl + "','" + updatedurl + "');", secs * 1000);
  } else {
    i=null;
  }
}
var i=null;

