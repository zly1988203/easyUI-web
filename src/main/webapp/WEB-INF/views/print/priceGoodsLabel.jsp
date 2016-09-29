<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title>价签打印</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <!--easyui-->
	<script>
	$(function(){
		if(!window.localStorage){
		    alert("浏览器支持localstorage");
		}else{
			 var storage=window.localStorage;
				
			 var  data=storage.prdata;
			 var  printNo=storage.printNo;
			$('#printNo').val(printNo);
			console.log()
		    $('#data').val(data);
		}
		$('#printdata').submit();
		storage.clear();
	});
</script>
</head>
<body class="ub uw uh ufs-14 uc-black">

 <form id="printdata" action="${ctx}/print/printLabel" method="post">
  <input type="hidden" id="printNo" name='printNo' value=""/>
  <input type="hidden" id="data" name='data' value=""/>
 </form>
</body>
</html>
