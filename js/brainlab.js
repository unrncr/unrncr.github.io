var xmlHttp = GetXmlHttpObject();
var TABLE_SIZE = 10;
var Buffer;

function LoadTestTable()
{
	if(!xmlHttp)
	{//Already midprocessing. Override attempt.
		alert("Your browser is not ajax compatible.");
		return;
	}
	xmlHttp.open("GET", "php/loadtesttable.php",true);
	xmlHttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
	xmlHttp.setRequestHeader("Cache-Control", "no-cache"); 
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			Buffer = JSON.parse(xmlHttp.responseText);
			if(!Buffer)
				alert("An error has occured!");
			else
			{
				for(var i = 0; i < TABLE_SIZE; i++)
				{
					if(i < Buffer.length)
					{
						document.getElementById("TableEntry"+i).innerHTML = "<td>"+Buffer[i][2]+"."+Buffer[i][0]+"</td><td>"+Buffer[i][1][0]+"</td><td>"+Buffer[i][1][1]+"</td><td>"
						+Buffer[i][1][2]+"</td><td>"+Buffer[i][1][3]+"</td><td>"+Buffer[i][1][4]+"</td><td>"+Buffer[i][1][5]+"</td><td>";
					}
					else
						document.getElementById("TableEntry"+i).innerHTML = "<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>";
				}
			}
		}
	}
	xmlHttp.send(null);	
}

function SelectTableEntry(entry)
{
	for(var i = 0; i < TABLE_SIZE; i++)
	{
		if((i < Buffer.length) && (entry == i))
		{
			document.getElementById("TableEntry"+i).className = "success";
			document.getElementById("AuthorDetails").innerHTML = "Author: "+capitalize(Buffer[i][2]);
			document.getElementById("ModelDetails").innerHTML = "Model: "+capitalize(Buffer[i][0]);
		}
		else
			document.getElementById("TableEntry"+i).className = "";
	}	
}

function UpdateTestTable()
{
	var name = document.getElementById("ListNames").value;
	var hours = document.getElementById("HoursInput").value;
	if(hours.length < 1)
	{
		alert("You must enter a more specific question.");
		return;
	}
	if(!xmlHttp)
	{//Already midprocessing. Override attempt.
		alert("Your browser is not ajax compatible.");
		return;
	}
	xmlHttp.open("GET", "php/updatetesttable.php?name="+name+"&hours="+hours,true);
	xmlHttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
	xmlHttp.setRequestHeader("Cache-Control", "no-cache"); 
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(!xmlHttp.responseText)
				alert("An error has occured!");
			else
			{
				for(var i = 0; i < 3; i++)
				{
					if(document.getElementById("TableName"+i).innerHTML == document.getElementById("ListNames").value)
						document.getElementById("TableHours"+i).innerHTML = hours;
				}
			}
		}
	}
	xmlHttp.send(null);	
}