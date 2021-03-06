<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>货主数据导入</title>
	
	<%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/libs/jquery/js/jquery.form.js"></script>
</head>
<body class="ub ub-ver uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4  ubor">
		<div class="ub ub-ac upad-4">
	        <div class="ubtns umar-l20 umar-t10">
	            <div id="btnNext" class="ubtns-item" onclick="impExcel()">导入</div>
	            <div class="ubtns-item" onclick="gFunRefresh()">重置</div>
				<div class="ubtns-item" onclick="toClose()">关闭</div>
	        </div>
	    </div>
	    
	    <form id="impForm" action="ediIn/importList" method="post" enctype="multipart/form-data">
			<div class="ub ub-ver umar-l20">
    			<div class="ub umar-t20">
	    			<div class="ub ub-ac uw-516">
	    				<div class="umar-r10 uw-90 ut-r">选择文件夹:</div>
			            <div>
			                <input id="filelink" class="uinp ub"  type="text" readonly="readonly">
			                <label class="ualable" style="top:0px;right:125px;">
			                	选择文件夹
			                	<input id="file" name="file" type="file" webkitdirectory class="uafile" onchange="fileUrlChange(event)" readonly="readonly" />
			                </label>
			            </div>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="ub ub-ver umar-l20">
	    		<div class="ub umar-t20">
	    			<div id="message"></div>
	    		</div>
	    	</div>
	    </form>
	</div>
	
	<script type="text/javascript">
		// 上传
		function impExcel(){
			if(!$("#file").val()){
		        $_jxc.alert('请选择文件！');
				return;
			}
			
			var options = {
			   beforeSubmit: gFunStartLoading,  //提交前的回调函数
			   success:function(responseText, statusText){
				   $("#message").html(responseText.data);
				   gFunEndLoading();
			   },
			   url: contextPath + '/logistic/ediIn/importList',                 //默认是form的action， 如果申明，则会覆盖
			   type: 'POST' //默认是form的method（get or post），如果申明，则会覆盖
			}
			$("#impForm").ajaxSubmit(options);
		}
		
		function fileUrlChange(event){
		    var value=$("#file").val();
		    $('#filelink').val(value);
		}
	</script>
</body>
</html>