
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
                loadData(result['data']);
				console.log(result['data']);
			}else{
				$_jxc.alert(result['message']);
			}
		});
	}
}

function loadData(data) {
    $.each(data,function (i,item) {
        if(typeof(item.childs) != 'undefined' && item.childs.length > 0){
            var tr = $("<tr></tr>");
            tr.appendTo($("#tb"));
            var tdConut = item.childs.length+1;
            var td = $("<td class='header-tr' rowspan='"+tdConut+"'>"+item.dictType+"</td>");
            td.appendTo(tr);
            $.each(item.childs,function (j,child) {
                var tr_child = $("<tr></tr>");
                tr_child.appendTo($("#tb"));
                var td = $("<td>"+(j+1)+"</td>");
                td.appendTo(tr_child);
                var td = $("<td>"+child.costType+"</td>");
                td.appendTo(tr_child);
                var td = $("<td>"+child.amont+"</td>");
                td.appendTo(tr_child);
                var td = $("<td>"+child.remark+"</td>");
                td.appendTo(tr_child);
            })
            var tr = $("<tr class='header-tr tr-bg'></tr>");
            tr.appendTo($("#tb"));
            var td = $("<td colspan='3'>合计:</td>");
            td.appendTo(tr);
            var td = $("<td>"+item.total+"</td>");
            td.appendTo(tr);

        }else {
            var tr = $("<tr class='header-tr tr-bg'></tr>");
            tr.appendTo($("#tb"));
            var td = $("<td colspan='3'>"+item.dictType+"</td>");
            td.appendTo(tr);
            var td = $("<td>"+item.total+"</td>");
            td.appendTo(tr);
            var td = $("<td></td>");
            td.appendTo(tr);
        }
    })
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