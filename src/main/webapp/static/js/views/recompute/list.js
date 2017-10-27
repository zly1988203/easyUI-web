$(function() {
	// 机构组件初始化
	$('#branchSelect').branchSelect();
})

// 日志id，用于刷新日志
var logId;
// 页码
var pageIndex;
// 每页大小
var pageSize;
/**
 * 库存重算
 */
function handler() {
	var branchId = $('#branchId').val();
	var formNo = $('#formNo').val();
	var startDate = $('#startDate').val();
	var skuIds = $('#skuIds').val();

	// 判断必填
	if (!$.trim(branchId)) {
		$_jxc.alert('机构信息不能为空');
		return false;
	}
	if (!$.trim(formNo)) {
		$_jxc.alert('单据编号不能为空');
		return false;
	}
	if (!$.trim(startDate)) {
		$_jxc.alert('重算日期不能为空');
		return false;
	}

	var skuIdList = [];
	skuIds.split(',').forEach(function(item, index) {
		skuIdList.push(item);
	});

	var reqObj = {
		branchId : branchId,
		formNo : formNo,
		startDate : startDate || '',
		skuIdList : skuIdList
	}

	$_jxc.ajax({
		url : contextPath + "/recompute/handler",
		data : {
			"data" : JSON.stringify(reqObj)
		}
	}, function(result) {
		if (result['code'] == 0) {
			// 记录日志id，刷新日志
			logId = result['data'];
			pageIndex = 0;
			pageSize = 20;
			$("#resultLog").val("");
			$_jxc.alert("开始重算库存");
			refreshLog();
		} else {
			$_jxc.alert(result['message']);
		}
	});
}

function refreshLog() {
	if (logId) {
		$_jxc.ajax({
			url : contextPath + "/recompute/getLogList",
			data : {
				"logId" : logId,
				"pageIndex" : pageIndex,
				"pageSize" : pageSize
			}
		}, function(result) {
			if (result['code'] == 0) {
				var getNext = true;
				result['data'].forEach(function(log, index) {
					$("#resultLog").val($("#resultLog").val() + log + "\n");
					// 结算刷新
					if (log.indexOf('库存重算结束') > 0) {
						getNext = false;
					}
				});
				if (getNext) {
					pageIndex++;
					window.setTimeout(refreshLog, 3000);
				}
			}
		});
	}
}