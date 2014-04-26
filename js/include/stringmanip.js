function capitalize(tocap) 
{
	var breakit;
	if(!tocap)
		return;
	else if(IsString(tocap))
	{
		breakit = tocap.split(" ");
		for(var i = 0; i < breakit.length; i++)
			breakit[i] = breakit[i].substring(0,1).toUpperCase() + breakit[i].substring(1,breakit[i].length);
		tocap = breakit.join(" ");
	}
	return tocap;
}

function cap_sentance(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalize_array(tocap, sec)
{
	for(var x = 0; x < tocap.length; x++)
	{
		if(sec != -1)
			breakit = tocap[x][sec].split(" ");
		else
			breakit = tocap[x].split(" ");
		for(var i = 0; i < breakit.length; i++)
			breakit[i] = breakit[i].substring(0,1).toUpperCase() + breakit[i].substring(1,breakit[i].length);
		if(sec != -1)
			tocap[x][sec] = breakit.join(" ");
		else
			tocap[x] = breakit.join(" ");
	}
	return tocap;
}

function singular(text)
{
	if(text.substr(text.length-1, text.length-1) == "s")
		text = text.slice(0, -1);
	return text;
}

function depossessive(text)
{
	var target = text.indexOf("'");
	if(target == -1)
		return text;//no possessive found
	else
	{
		text = text.slice(0, -2);
		return text;//return without possessive
	}
}

function depostfix(text)
{//takes punctuation off end of string
	var cc = text.charCodeAt(text.length-1);
	if(!IsChar(cc))//punctuation tail found
		text = text.slice(0, -1);//clip punctuation tail
	cc = text.charCodeAt(0);
	if(!IsChar(cc))//punctuation head found
		text = text.slice(1);//clip punctuation head
	return text;
}

function ConjugateVerb(verb)
{
	var p = verb.length-1;
	if(verb.charAt(p) == 115)//is s
		verb += "es";
	else if(verb.charAt(p) == 121)//is y
	{
		verb = verb.substr(0, p);//drop last char
		verb += "ies";
	}
	else
		verb += "s";
	return verb;
}

function addslashes(str) 
{
	if(!IsString(str))
		return str;
	str = str.replace(/\\/g,'\\\\');
	str = str.replace(/\'/g,'\\\'');
	str = str.replace(/\"/g,'\\"');
	str = str.replace(/\0/g,'\\0');
	return str;
}