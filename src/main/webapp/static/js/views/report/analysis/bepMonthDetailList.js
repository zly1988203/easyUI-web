
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
})

var gridName = "gridMonthDetail";

function queryMonthDetail() {
	var branchId = $('#branchId').val();
	if($_jxc.isStringNull(branchId)){
	    $_jxc.alert("请选择机构");
	    return;
    }
	var month = $("#month").val();
	if($_jxc.isStringNull(month)){
		$_jxc.alert("请选择月份");
		return;
	}
	$_jxc.ajax({
		url : contextPath + "/report/bepMonthDetail/getDetail",
		data:{
			"branchId":branchId,
			"month":month
		}
	},function(result){
		if(result['code'] == 0){
            loadData(result['data']);
		}else{
			$_jxc.alert(result['message']);
		}
	});
}

function loadData(data) {
	$("#tb").addClass("tb-class")
    $("#tb").empty();
	var header_tr = $('<tr id="tr_header" class="header-tr head-tr-bg"></tr>')
    header_tr.appendTo($("#tb"));
    var td = $("<td>项目</td>");
    td.appendTo(header_tr);
    var td = $("<td>序号</td>");
    td.appendTo(header_tr);
    var td = $("<td>项目内容</td>");
    td.appendTo(header_tr);
    var td = $("<td>金额</td>");
    td.appendTo(header_tr);
    var td = $("<td>备注</td>");
    td.appendTo(header_tr);

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
                var td = $("<td class='td-amount'>"+parseFloat(child.amount).toFixed(2)+"</td>");
                td.appendTo(tr_child);
                var td = $("<td>"+child.remark+"</td>");
                td.appendTo(tr_child);
            })
            var tr = $("<tr class='header-tr tr-bg'></tr>");
            tr.appendTo($("#tb"));
            var td = $("<td colspan='3'>合计:</td>");
            td.appendTo(tr);
            var td = $("<td class='td-amount'>"+parseFloat(child.total).toFixed(2)+"</td>");
            td.appendTo(tr);
            var td = $("<td></td>");
            td.appendTo(tr);

        }else {
            var tr = $("<tr class='header-tr tr-bg'></tr>");
            tr.appendTo($("#tb"));
            var td = $("<td colspan='3'>"+item.dictType+"</td>");
            td.appendTo(tr);
            var td = $("<td class='td-amount'>"+parseFloat(child.total).toFixed(2)+"</td>");
            td.appendTo(tr);
            var td = $("<td></td>");
            td.appendTo(tr);
        }
    })
}

//调用导出方法
function exportExcel(){
	var branchId = $('#branchId').val();
	var month = $("#month").val();
	if(branchId && month){		
		location.href = contextPath + "/report/bepMonthDetail/exportExcelList?branchId=" + branchId + "&month=" + month;
	}
}