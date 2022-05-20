/*******************************************************
함 수 명 : cf_isNull
설    명 : 입력값이 null인지 체크 
인    자 : sValue    입력값 
리    턴 : true/false
*******************************************************/
function cf_isNull(sValue)
{
    if( new String(sValue).valueOf() == "undefined") 
        return true;
    if( sValue == null )
        return true;
    if( sValue.toString().trim().length == 0 )
        return true;
    return false;
}

/*******************************************************
함 수 명 : cf_checkNullAndGetFocus
설    명 : 입력값이 null인지 체크하고 포커스를 이동
인    자 : sValue    입력값 
리    턴 : true/false
*******************************************************/
function cf_checkNullAndGetFocus(jqControl, msg)
{
    if (!cf_isNull(jqControl.val()))
        return true;

    if (!cf_isNull(msg))
        alert(msg);

    jqControl.focus();
    return false;
}