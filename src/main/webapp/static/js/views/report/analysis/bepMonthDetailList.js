
$(function() {
	// 门店默认显示当前机构
	if(sessionBranchType == 3 || sessionBranchType == 4 || sessionBranchType == 5) {
		$("#branchId").val(sessionBranchId);
		$("#branchCodeName").val(sessionBranchCodeName);
	}
	$("#month").val(dateUtil.getPreMonthDate().format("yyyy-MM"));
	
	//机构组件初始化
	$('#branchSelect').branchSelect({
		param:{
			branchTypesStr:$_jxc.branchTypeEnum.OWN_STORES + ',' + $_jxc.branchTypeEnum.FRANCHISE_STORE_B + ',' + $_jxc.branchTypeEnum.FRANCHISE_STORE_C
		},
		loadFilter:function(data){
			return data;
		}
	});
	queryMonthDetail();
})

var gridName = "gridMonthDetail";

function queryMonthDetail() {
	var branchId = $('#branchId').val();
	var month = $("#month").val();
	if(branchId && month){		
		$_jxc.ajax({
			url : contextPath + "/report/bepMonthDetail/getDetail",
			data:{
				"branchId":branchId,
				"month":month
			}
		},function(result){
			if(result['code'] == 0){
				console.log(result['data']);
			}else{
				$_jxc.alert(result['message']);
			}
		});
	}
}

// 调用导出方法
function exportExcel(){
	var length = $("#"+gridName).datagrid('getData').rows.length;
	if(length == 0){
		$_jxc.alert("无数据可导");
		return;
	}

	$("#queryForm").attr("action",contextPath+"/report/bepMonthDetail/exportExcelList");
	$("#queryForm").submit();
}