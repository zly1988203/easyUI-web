

$(function(){
	
	initAcountList();
})

var datagirdID = 'supAccountList';

function getAccountColumns(){
	var accountType = $('input[name="orderStatus"]:checked').val();
	console.log('accountType',accountType)
	var defaultColumns = [{field: 'check',checkbox:true}];
	if(accountType == '6'){
		defaultColumns =defaultColumns.concat([
          			{field: 'formNo',title:'结算单号',width:'130px',align:'left',
          				formatter:function(value,row,index){
	                    	strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'供应商预付款明细\',\''+ contextPath +'/settle/supplierCharge/advanceView?id='+ row.id +'\')">' + value + '</a>';
	                		return strHtml;
          				}
          			}]);
	}
	defaultColumns =defaultColumns.concat([
      			{field: 'branchCode', title: '机构编号', width: '100px', align: 'left'},
    			{field: 'branchName', title: '机构名称', width: '140px', align: 'left'},
    			{field: 'supplierCode', title: '供应商编号', width: '140px', align: 'left'},
    			{field: 'supplierName', title: '供应商名称', width: '140px', align: 'left'}]);
	
	//到期账款 未付款账款明细
	if(accountType == '1' || accountType == '2' || accountType == '4' || accountType == '6' || accountType == '7' ){
		defaultColumns = defaultColumns.concat([
                    {field: 'formNo',title:'单据编号',width:'130px',align:'left',formatter:function(value,row,index){
                    	strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'供应商预付款明细\',\''+ contextPath +'/settle/supplierCharge/advanceView?id='+ row.id +'\')">' + value + '</a>';
                		return strHtml;
                    }},
		            {field: 'formType',title: '单据类型', width: '80px', align: 'center'},
		            ]);
	}
	
	
	
	//未付款账款汇总
	if(accountType == '3' || accountType == '7'){
		defaultColumns = defaultColumns.concat([
					{field: 'yfmoney', title: '预付款金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					}])
	}
	//预付账款明细
	if(accountType == '7'){
		defaultColumns = defaultColumns.concat([
                    {field: 'yfmoney', title: '已用金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					},
                    {field: 'yfmoney', title: '未用金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					},
					{field: 'yfmoney', title: '付款日期', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					}
		            ]);
	}
	
	//到期账款 历史往来账款 未付款账款汇总
	if(accountType == '1' || accountType == '2' || accountType == '3' || accountType == '4' ){
		defaultColumns = defaultColumns.concat([
					{field: 'yfTime', title: '应付款日期', width: '100px', align: 'left',
						formatter: function (value, row, index) {
								return new Date().format('yyyy-MM-dd');
						}
					},
					{field: 'yfmoney', title: '应付款金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					}]);
	}
	
	//到期账款 历史往来账款 未付款账款汇总
	if(accountType == '1' || accountType == '2' || accountType == '3' || accountType == '4' || accountType == '5' || accountType == '6' ){
		defaultColumns = defaultColumns.concat([
					{field: 'yifmoney', title: accountType == 6 ? '实付金额':'已付金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					},
					{field: 'yhfmoney', title: '优惠金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					}]);
	}
	
	//到期账款 历史往来账款 未付款账款汇总
	if(accountType == '1' || accountType == '2' || accountType == '3' || accountType == '4' ){
		defaultColumns = defaultColumns.concat([
					{field: 'wfmoney', title: '未付金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					}]);
	}
	//未付款账款汇总
	if(accountType == '3'){
		defaultColumns = defaultColumns.concat([
					{field: 'sjfmoney', title: '实际结余金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					}]);
	}
	//到期账款 历史往来账款
	if(accountType == '1' || accountType == '2' || accountType == '6'  ){
		defaultColumns = defaultColumns.concat([
				{field: 'auditUserName', title: '审核人', width: '120px', align: 'left'},
				{field: 'auditTime', title: '审核时间', width: '100px', align: 'left',
					formatter: function (value, row, index) {
						return new Date().format('yyyy-MM-dd');
					}
				}])
	}	
	
	//到期账款 历史往来账款
	if(accountType == '1' || accountType == '2' ){
		defaultColumns = defaultColumns.concat([
				{field: 'actTime', title: '实际付款时间', width: '100px', align: 'left',
					formatter: function (value, row, index) {
						return new Date().format('yyyy-MM-dd');
					}
				}])
	}	
	
	if(accountType == '1' || accountType == '2' || accountType == '4' || accountType == '7'){
		defaultColumns = defaultColumns.concat([
				{field: 'remark', title: '备注', width: '200px', align: 'left'}]);
	}
	console.log(defaultColumns,defaultColumns.length);
	return [defaultColumns];
}

//初始化表格
function initAcountList(){
    $("#"+datagirdID).datagrid({
        method:'post',
        align:'center',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,         //占满
        showFooter:true,
		height:'100%',
		width:'100%',
        columns:getAccountColumns(),
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });
}





function queryForm(){
	initAcountList()
}