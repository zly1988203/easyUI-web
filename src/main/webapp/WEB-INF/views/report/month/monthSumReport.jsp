<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>月进销存报表</title>
	<%@ include file="/WEB-INF/views/include/header.jsp"%>
	<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	                <div class="ubtns-item" onclick="queryForm()">查询</div>
	                <div class="ubtns-item" onclick="exportData()">导出</div>
	                <div class="ubtns-item" onclick="printReport()">打印</div>
	                <input type="hidden" id="startCount" name="startCount" />
							<input type="hidden" id="endCount" name="endCount" />
	                <div class="ubtns-item" id="set" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">关闭</div>
	            </div>
	            <div class="ub ub-ac umar-l20">
					<div class="umar-r10 uw-70 ut-r">分析月份:</div>
			   		<input class="Wdate"  readonly="readonly" name="sumDate" id="txtStartDate" onfocus="updateWdatePicker(0)" value='<c:out value="${startTime }"></c:out>'/>
				</div>
			</div>
			<div class="ub uline umar-t8"></div>
			<div class="ub umar-t8">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">机构名称:</div>
					<input type="hidden" id="createBranchId" name="branchId" value='<c:out value="${branchId }"></c:out>'/>
					<input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" readonly="readonly" maxlength="50" value='<c:out value="${branchName }"></c:out>'/>
					<div class="uinp-more" onclick="selectBranches()" >...</div>
				</div>
				<div class="ub ub-ac umar-l40">
					<div class="umar-r10 uw-70 ut-r">商品类别:</div>
					<input class="uinp ub ub-f1" type="hidden" name="categoryCode" id="categoryCode" />
					<input class="uinp ub ub-f1" type="text" name="categoryNameCode" id="categoryNameCode" readonly="readonly" />
					<div class="uinp-more" onClick="searchCategory()">...</div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">商品名称:</div>
					<input class="uinp" type="text" name="skuName" id="skuName"/>
				</div>
				<div class="ub ub-ac uw-300 umar-l20">
					<div class="umar-r10 uw-70 ut-r">条码/货号:</div>
					<input class="uinp" type="text" name="skuCodeOrBarCode" id="skuCodeOrBarCode"/>
				</div>
			</div>
	    </form>
	    <div class="ub ub-f1  umar-t8 umar-b8">
			<table id="yueJXCList"></table>
		</div>
	</div>

	<script type="text/javascript">
		$(function(){
			initDatagridYueJXC();
			branchId = $("#branchId").val();
		});
	
		function updateWdatePicker(){
			   WdatePicker({
		       	dateFmt:'yyyy-MM',
		       	maxDate:'%y-%M',
		         onpicked:function(dp){
		             $("input:radio[name='dateradio']").attr("checked",false);
		         }
		    })
		}
	
		var datagridId = "yueJXCList"
	
		var gridHandel = new GridClass();
		var gridHandelDetail = new GridClass();
	
		var gridYueJXCList;
	
		//初始化表格
		function initDatagridYueJXC(){
			gridYueJXCList = $("#"+datagridId).datagrid({
				method:'post',
				align:'center',
				singleSelect:false,  //单选  false多选
				rownumbers:true,    //序号
				pagination:true,    //分页
				showFooter:true,
				fitColumns:false,    //每列占满
				height:'100%',
				width:'100%',
				pageSize:50,
				columns:[${columns}], 
				onLoadSuccess:function(data){
					if($("#createBranchId").val()&&data.total<=0)
						$_jxc.alert("该机构可能未月结,请先月结!");
				}
	
			});
		}
	
		//查询
		function queryForm(){
			if($("#branchName").val()=="" && $("#skuCodeOrBarCode").val()=="" ){
		        $_jxc.alert("请选择机构或输入条码");
		        return;
		    } 
			var fromObjStr = $('#queryForm').serializeObject();
			$("#"+datagridId).datagrid("options").method = "post";
			$("#"+datagridId).datagrid('options').url = contextPath + '/report/month/getData';
			$("#"+datagridId).datagrid('load', fromObjStr);
		}
	
	
		/**
		 * 机构名称
		 */
		function selectBranches(){
			new publicAgencyService(function(data){
				$("#createBranchId").val(data.branchesId);
				$("#branchName").val(data.branchName);
			},'',sessionBranchId);
		}
	
		/**
		 * 类别选择
		 */
		function searchCategory(){
			new publicCategoryService(function(data){
				$("#categoryCode").val(data.categoryCode);
				$("#categoryNameCode").val("["+data.categoryCode+"]"+data.categoryName);
			});
		}
	
		/**
		 * 重置
		 */
		var resetForm = function() {
			 $("#queryForm").form('clear');
		};
	
		var dg;
		/**
		 * 导出
		 */
		function exportData(){
			dg = gridYueJXCList;
			var length = gridYueJXCList.datagrid('getData').total;
			if(length == 0){
				$_jxc.alert("无数据可导");
				return;
			}
			$('#exportWin').window({
				top:($(window).height()-300) * 0.5,   
			    left:($(window).width()-500) * 0.5
			});
			$("#exportWin").show();
			$("#totalRows").html(gridYueJXCList.datagrid('getData').total);
			$("#exportWin").window("open");
		}
	
		/**
		 * 导出
		 */
		function exportExcel(){
			var length = gridYueJXCList.datagrid('getData').total;
			if(length == 0){
				$_jxc.alert("没有数据");
				return;
			}
			var fromObjStr = $('#queryForm').serializeObject();
			
			$("#queryForm").form({
				success : function(data){
					if(data==null){
						$_jxc.alert("导出数据成功！");
					}else{
						$_jxc.alert(JSON.parse(data).message);
					}
				}
			});
			$("#queryForm").attr("action",contextPath+"/report/month/export");
			
			$("#queryForm").submit();
		}
	
		var printReport = function(){
			var length = gridYueJXCList.datagrid('getData').total;
			if(length == 0){
				$_jxc.alert("没有数据");
				return;
			}
			var queryParams =  urlEncode($("#queryForm").serializeObject());
			parent.addTabPrint("reportPrint"+new Date().getTime(),"打印",contextPath+"/report/month/print?params="+queryParams);
		}


		var urlEncode = function(param, key, encode) {
			if (param == null)
				return '';
			var paramStr = '';
			var t = typeof (param);
			if (t == 'string' || t == 'number' || t == 'boolean') {
				paramStr += '&'
						+ key
						+ '='
						+ ((encode == null || encode) ? encodeURIComponent(param)
								: param);
			} else {
				for ( var i in param) {
					var k = key == null ? i
							: key
									+ (param instanceof Array ? '[' + i + ']'
											: '.' + i);
					paramStr += urlEncode(param[i], k, encode);
				}
			}
			return paramStr;
		};
	</script>
</body>
</html>