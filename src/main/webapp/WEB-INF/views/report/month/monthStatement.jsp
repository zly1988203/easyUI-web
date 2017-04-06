<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>日结</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4 ubor uh-200 ubgc-while">
		<div class="ub umar-t10">
			<div class="ub ub-ac">
				<div class="umar-r10 uw-70 ut-r">机&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;构:</div>
				<input type="hidden" id="createBranchId" name="createBranchId" /> <input
					class="uinp ub ub-f1" type="text" id="branchName" name="branchName"
					maxlength="50" />
				<div class="uinp-more" onclick="selectBranches()">...</div>
			</div>
			<div class="ub ub-ac umar-l20">
				<div class="umar-r10 uw-70 ut-r">月结期间:</div>
				<input class="Wdate" readonly="readonly" name="rptDate"
					id="rptDate" onfocus="updateWdatePicker(0)" />
			</div>
		</div>
		<div class="ub ub-ac umar-t10 upad-l10">月结周期： 月结日是每月1日，月结期间由此决定。
		</div>
		<div class="ub ub-ac umar-t10 upad-l10">
			注：上一次月结期间为：
			<div class="utxt" id="maxRptDate">${mReport.maxRptDate}</div>
		</div>
		<div class="ub uw-600 ub-ac ub-pc umar-t20">
			<div class="ubtns ">
				<div class="ubtns-item" onClick="monthStatement()">月结</div>
			</div>
		</div>
	</div>
	<script>
		   /**
		    * 机构名称
		    */
		   function selectBranches() {
			   	new publicAgencyService(function(data) {
			   		$("#createBranchId").val(data.branchesId);
			   		$("#branchName").val(data.branchName);
			   		
				    $.ajax({
				        url:contextPath+"/report/monthStatement/getUpMonthReportDay",
				        type:"POST",
				        data:{"branchId":data.branchesId},
				        success:function(result){
				        	var maxRptDate = result['data'].maxRptDate;
				        	alert(maxRptDate);
				        	$("#maxRptDate").html(maxRptDate);
				        },
				        error:function(result){
				            successTip("请求发送失败或服务器处理失败");
				        }
				    });
			   	}, 'IU', '');
			   	
		   }
		   
		   function updateWdatePicker(){
			   WdatePicker({
	              	dateFmt:'yyyy-MM',
	                onpicked:function(dp){
	                    $("input:radio[name='dateradio']").attr("checked",false);
	                }
	           })
		   }
		   
		   function monthStatement(){
			   	var branchId = $("#createBranchId").val();
			   	var rptDate = $("#rptDate").val();
			   	
		    	var jsonData = {
		    		branchId:branchId,
		    		rptDate:rptDate
		        };
			    console.log('monthStatement：',JSON.stringify(jsonData));
			    
			    $.ajax({
			        url:contextPath+"/report/monthStatement/executeMonthStatement",
			        type:"POST",
			        data:{"data":JSON.stringify(jsonData)},
			        success:function(result){
			            if(result['code'] == 0){
			            	$.messager.alert('操作提示','操作成功！')
// 			    			$.messager.alert("操作提示", "操作成功！", "info",function(){
// 			    				location.href = contextPath +"/stock/combineSplit/combineSplitView?id="+id;
// 			    			});
			            }else{
			                successTip(result['message']);
			            }
			        },
			        error:function(result){
			            successTip("请求发送失败或服务器处理失败");
			        }
			    });
		   }
	
   </script>

</body>
</html>
