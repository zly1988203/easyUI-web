/**
 * Created by zhaoly on 2017/5/25.
 */

$(function () {
    initGridBranchCostList();
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    
    //机构选组件初始化
    $('#branchComponent').branchSelect({
    	param:{
    		branchTypesStr:$_jxc.branchTypeEnum.OWN_STORES + 
			',' + $_jxc.branchTypeEnum.FRANCHISE_STORE_C +
			',' + $_jxc.branchTypeEnum.FRANCHISE_STORE_B
    	}
    });
    
    //操作员组件初始化
    $('#operateComponent').operatorSelect({
    	loadFilter:function(data){
    		data.createUserId = data.id;
    		return data;
    	}
    })
    
})

var gridName = "gridStoreChargeList";
var gridHandel = new GridClass();

function initGridBranchCostList() {
	var updatePermission = $("#updatePermission").html().trim();
    gridHandel.setGridName(gridName);
    $("#"+gridName).datagrid({
        align:'center',
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        showFooter:true,
        height:'100%',
        width:'100%',
        fitColumns:true,    //每列占满
        columns:[[
            {field:'formNo',title:'单号',width:100,align:'left',
                formatter: function(value,row,index){
                    if (updatePermission) {
                    	return "<a href='#' onclick=\"editHandel('"+row.id+"')\" class='ualine'>"+value+"</a>";
                	}else{
                		return value;
                	}
                }
            },
            {field:'auditStatusStr',title:'审核状态',width:80,align:'left'},
            {field:'branchCode',title:'机构编码',width:80,align:'left'},
            {field:'branchName',title:'机构名称',width:180,align:'left'},
            {field:'sumAmount',title:'单据金额',width:80,align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'month',title:'费用月份',width:80,align:'right',
                formatter : function(value, row, index) {
                    var month = value+"";
                    return month.substr(0,4)+"-"+month.substr(4,5);
                },
            },
            {field:'createUserName',title:'操作人',width:120,align:'left'},
            {field:'createTime',title:'操作时间',width:120,align:'left',
            	formatter : function(value, rowData, rowIndex) {
            		return formatDate(value);
            	}
            },
            {field:'auditUserName',title:'审核人',width:120,align:'left'},
            {field:'remark',title:'备注',width:200,align:'left'},
        ]]
    })
}


function queryStoreCharge() {
    $("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url = contextPath+'/finance/financeCharge/getFinanceChargeList';
    $("#"+gridName).datagrid("load");
}

function storeChargeAdd() {
    toAddTab("新增门店固定费用",contextPath + "/finance/financeCharge/toAdd");
}

function editHandel(formId) {
    toAddTab("门店固定费用详情",contextPath + "/finance/financeCharge/toEdit?formId="+formId);
}
