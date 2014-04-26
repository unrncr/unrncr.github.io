var SECOND = 1000;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;

function ParseEmail(email)
{
	var brokenstring = email.split("@");
	if(!brokenstring[1])
		return 0;
	else
	{
		brokenstring = brokenstring[1].split(".");
		if(!brokenstring[1])
			return 0;
		else
			return 1;
	}
}

function ParsePassword(passwd)
{
	if(passwd.length < 8)
		return 0;
	else
		return 1;
}

function IsFunction(a) 
{
	return typeof a == 'function';
}

function IsNull(a) 
{
	return typeof a == 'object' && !a;
}

function IsNumber(a) 
{
	return typeof a == 'number' && isFinite(a);
}

function IsObject(a) 
{
	return (typeof a == 'object' && a) || isFunction(a);
}

function IsString(a) 
{
	return (typeof a == 'string' && a);
}

function IsChar(num)
{//takes in ascii code
	if((num >= 65 && num <= 90) || (num >= 97 && num <= 122))
		return 1;//is char
	else
		return 0;//is other
}

function IsArray(obj)
{
	if(!obj)
		return false;
   if (obj.constructor.toString().indexOf("Array") == -1)
      return false;
   else
      return true;
}