/**
 * created by zhaoly  2017-02-15
 * 此时的心情就像吃了一口夹着鱼腥草的铁板土豆
 */

$(function(){
//	initActivityGrid();
})

	var activityCallBack ;
	//初始化回调函数
	function initactivityCallBack(cb){
		activityCallBack = cb;
	}
	//选择单行
	function activityClickRow(rowIndex, rowData){
	    if(activityCallBack){
	    	activityCallBack(rowData);
	       
	    }
	}
	


function initActivityGrid(param){
	var path = contextPath+'/sale/activitySelect/activityList';
	
	if(param.branchId){
		path = path + "?branchId="+param.branchId
	}
	//列表
	$('#activitydg').datagrid({
		url : path,
		fit : true,
		fitColumns : false,
		border : false,
		idField : 'id',
		striped : true,
		pagination : true,
		rownumbers : true,
		pageNumber : 1,
		pageSize : 20,
		pageList : [ 5, 10, 20, 50, 100 ],
		singleSelect : true,
		remotesort : false,
		showFooter : true,
		extEditing : false,
		columns : [ [{
			field : 'id',
			hidden:true,
			title : '促销单id',
			width : 150,
			align : "center"
		}, {
			field : 'activityCode',
			title : '活动编号',
			width : 120,
			align : "center"
		},{
			field : 'activityName',
			title : '活动名称',
			width : 120,
			align : "center"
		},{
			field : 'startTime',
			title : '活动开始日期',
			width : 120,
			align : "center",
			formatter: function (value, row, index) {
				if (value) {
					return new Date(value).format('yyyy-MM-dd');
				}
				return "";
			}
		}, {
			field : 'endTime',
			title : '活动结束日期',
			width : 100,
			align : "center",
			formatter: function (value, row, index) {
				if (value) {
					return new Date(value).format('yyyy-MM-dd');
				}
				return "";
			}
		}, 
		{field:'dailyStartTime',title:'活动时段',width:'150px',align:'left', formatter: function (value, row, index) {
			//debugger;
			if (row) {
				return row.dailyStartTime+"-"+row.dailyEndTime;
			}
			return "";
		}},
		] ],
		toolbar : '#tb',
		showFooter : true,
		enableHeaderClickMenu : false,
		enableHeaderContextMenu : false,
		enableRowContextMenu : false,
		onClickRow:activityClickRow,
	});
}