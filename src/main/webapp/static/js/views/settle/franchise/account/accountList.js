

$(function(){
	
	initfraAcountList();
})

var datagirdID = 'fraAccountList';

function getAccountColumns(){
	var accountType = $('input[name="orderStatus"]:checked').val();
	console.log('accountType',accountType)
	var defaultColumns = [];
	
	defaultColumns =defaultColumns.concat([
             		{field: 'branchCode', title: accountType == 3 ?'加盟店编号': '机构编号', width: '100px', align: 'left'},
           			{field: 'branchName', title: accountType == 3 ?'加盟店':'机构名称', width: '140px', align: 'left'}])
	
	//3 未收账款汇总
	if(accountType != '3'){
		defaultColumns = defaultColumns.concat([
				    {field: 'formNo',title:'单号',width:'130px',align:'left',formatter:function(value,row,index){
				   	    strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'供应商预付款明细\',\''+ contextPath +'/settle/supplierCharge/advanceView?id='+ row.id +'\')">' + value + '</a>';
						return strHtml;
				    }},
				    {field: 'formType',title: '单据类型', width: '100px', align: 'center'}])
	}
	
	//5 已付账款明细  6预收账款明细
	if(accountType != '5' && accountType != '6' ){
		defaultColumns = defaultColumns.concat([
		           {field: 'ysmoney', title: '应收金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					},
					{field: 'ysmoney', title: '已收金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					},
					{field: 'ysmoney', title: '未收金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					}])
	}
	
	//5 已付账款明细
	if(accountType == '5'){
		defaultColumns = defaultColumns.concat([
                    {field: 'yfmoney', title: '收款金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					}]);
	}
	
	//预收账款明细
	if(accountType == '6'){
		defaultColumns = defaultColumns.concat([
                    {field: 'yfmoney', title: '已付金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					},
					{field: 'yfmoney', title: '已用金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					},
					{field: 'yfmoney', title: '未用金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					}]);
	}
	
	//3 未收账款汇总
	if(accountType != '3'){
		defaultColumns = defaultColumns.concat([
				{field: 'auditUserName', title: '审核人', width: '120px', align: 'left'},
				{field: 'auditTime', title: '审核时间', width: '100px', align: 'left',
					formatter: function (value, row, index) {
						return new Date().format('yyyy-MM-dd');
					}
				}])
	}	
	
	//到期账款 历史往来账款
	if(accountType == '2' ){
		defaultColumns = defaultColumns.concat([
				{field: 'jsTime', title: '结算日期', width: '100px', align: 'left',
					formatter: function (value, row, index) {
						return new Date().format('yyyy-MM-dd');
					}
				}])
	}	
	
	if(accountType == '1' || accountType == '2' || accountType == '4'){
		defaultColumns = defaultColumns.concat([
				{field: 'remark', title: '备注', width: '200px', align: 'left'}]);
	}
	console.log(defaultColumns,defaultColumns.length);
	return [defaultColumns];
}

//初始化表格
function initfraAcountList(){
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
	initfraAcountList()
}