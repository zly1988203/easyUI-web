<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>日志级别变更</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
    <style>
        .datagrid-header-row .datagrid-cell{text-align: center!important;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
<c:if test="${user.branchId eq '0'}" >
<div class="ub ub-ver ub-f1 umar-4 upad-4">
    <form id="queryForm" action="" method="post">
        <div class="ub ub-ac">
            <div class="ubtns">
                <div class="ubtns-item" onclick="update()">修改</div>
                <div class="ubtns-item" onclick="resetForm()">重置</div>
            </div>
        </div>
        <div class="ub uline umar-t8"></div>
        <div class="ub umar-t8">
            <div class="ub ub-ac umar-r40">
                <div class="umar-r10 uw-70 ut-r">系统:</div>
                <select class="uinp ub ub-f1"  id="system" name="system" >
                    <option value="retail">零售web</option>
                    <option value="retail-service">零售后台</option>
                    <option value="retail-service-stock">库存service</option>
                    <option value="retail-service-report">报表service</option>
                    <option value="pos">pos</option>
                    <option value="m-pos">管店助手</option>
                </select>
            </div>
            <div class="ub ub-ac umar-r40">
                <div class="umar-r10 uw-70 ut-r">日志名称:</div>
                <input id="loggerName" name="loggerName" value="" class="uinp uw-300">
            </div>
            <div class="ub ub-ac umar-r40">
                <div class="umar-r10 uw-70 ut-r">日志级别:</div>
                <select class="uinp ub ub-f1" id="loggerLevel" name="loggerLevel" >
                    <option value="DEBUG" <c:if test="${level eq 'DEBUG'}">selected="selected"</c:if> >DEBUG</option>
                    <option value="TRACE" <c:if test="${level eq 'TRACE'}">selected="selected"</c:if> >TRACE</option>
                    <option value="INFO"  <c:if test="${level eq 'INFO'}">selected="selected"</c:if>  >INFO</option>
                    <option value="WARN"  <c:if test="${level eq 'WARN'}">selected="selected"</c:if>  >WARN</option>
                    <option value="ERROR" <c:if test="${level eq 'ERROR'}">selected="selected"</c:if> >ERROR</option>
                    <option value="FATAL" <c:if test="${level eq 'FATAL'}">selected="selected"</c:if> >FATAL</option>
                    <option value="ALL"   <c:if test="${level eq 'ALL'}">selected="selected"</c:if>   >ALL</option>
                    <option value="OFF"   <c:if test="${level eq 'OFF'}">selected="selected"</c:if>   >OFF</option>
                </select>
            </div>
        </div>
    </form>
</div>
<script type="application/javascript" >
    /**
     * 重置
     */
    var resetForm = function(){
        location.href=contextPath+"/log4j";
    };

    $(function () {
        //$("#loggerLevel").val(level);
        $("#system").on("change",function () {
            $_jxc.ajax({
                url:contextPath+"/log4j/level",
                type:"POST",
                data:{"system":$("#system").val()}
            },function(result){
                $("#loggerLevel").val(result.level);
            });
        });
    });

    var update = function () {
    	$_jxc.confirm('确认修改 【' + $('#system').find('option:selected').text() + '】 的日志级别?',function(r){
    		if(r){
		        $_jxc.ajax({
		            url:contextPath+"/log4j/change",
		            type:"POST",
		            data:{"system":$("#system").val(),"loggerName":$("#loggerName").val(),"loggerLevel":$("#loggerLevel").val()}
		        },function(result){
		            if (result.code=="0"){
		                $_jxc.alert("修改成功!");
		            }else{
		                $_jxc.alert("修改失败!");
		            }
		        });
    		}
    	});
    };
</script>
</c:if>
</body>
</html>