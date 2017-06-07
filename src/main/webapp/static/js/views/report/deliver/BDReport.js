/**
 * Created by zhanghuan on 2016/8/30.
 * BD业绩报表
 */
$(function(){
	//开始和结束时间
    toChangeDatetime(10);
    initDatagridRequireOrders();
	branchId = $("#branchId").val();
});
var gridHandel = new GridClass();

//初始化表格
function initDatagridRequireOrders(){
	dg=$("#deliverFormList").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        url:'',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        pageSize : 50,
		height:'100%',
		width:'100%',
        columns:[[
			{field:'check',checkbox:true},
			{field:'salesman',title:'业务员名称',width:'130px',align:'left',
				formatter:function(value,row,index){
	                if(value == null){
	                    return '<div class="ub ub-pc ufw-b">合计</div> '
	                }
					return value;
	            }
			},
            {field: 'targetBranchName', title: '要货机构', width: '100px', align: 'left'},
			{field: 'num', title: '成交数量', width: '80px', align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'amount', title: '成交金额', width: '80px', align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'branchName', title: '所属分公司', width: '100px', align: 'left'}
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });
}


//查询要货单
function queryForm(){
	$("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	$("#deliverType").val('DI');
	var fromObjStr = $('#queryForm').serializeObject();
	$("#deliverFormList").datagrid("options").method = "post";
	$("#deliverFormList").datagrid('options').url = contextPath + '/form/deliverReport/getBDReport';
	$("#deliverFormList").datagrid('load', fromObjStr);
}

/**
 * 查询机构
 */
var targetBrancheId;
function selectBranches(){
	new publicAgencyService(function(data){
        $("#branchName").val(data.branchName);
	},'',branchId);
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
	var length = $('#deliverFormList').datagrid('getData').rows.length;
	if(length == 0){
		$_jxc.alert("无数据可导");
		return;
	}
	$('#exportWin').window({
		top:($(window).height()-300) * 0.5,   
	    left:($(window).width()-500) * 0.5
	});
	$("#exportWin").show();
	$("#totalRows").html(dg.datagrid('getData').total);
	$("#exportWin").window("open");
}
// 调用导出方法
function exportExcel(){
	$("#exportWin").hide();
	$("#exportWin").window("close");
	$("#queryForm").form({
		success : function(result){

		}
	});
	$("#queryForm").attr("action",contextPath+'/form/deliverReport/exportBDList')
	$("#queryForm").submit();
}


