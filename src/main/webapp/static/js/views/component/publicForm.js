
/**
 * Created by huangj02 on 2016/8/11.
 * 公共组件-单据选择
 */
$(function(){
	// 开始和结束时间
	$("#popupSearchDateTime").val(dateUtil.getCurrentDateTime().format("yyyy-MM-dd hh:mm"));
	var type=$("#type").val();
	if(type=="PA" || type=="PI" || type=="PR"){
		initDatagridForm(type);
	}else{
		initDatagridDeliverForm(type);
	}
    gFunSetEnterKey(formCx);
})

var formCallBack ;
var deliverFormCallBack;
var param = null;
//初始化回调函数
function initFormCallBack(cb){
    formCallBack = cb;
}
//初始化回调函数
function initDeliverFormCallBack(cb){
	deliverFormCallBack = cb;
}
//搜索
function formCx(){
	var formNo=$("#formNo").val();
	var type = $("#type").val();
    var targetBranchId = $('#targetBranchId').val();
	if($("#type").val()=='DA'||$("#type").val()=='DO'||$("#type").val()=='DI'||$("#type").val()=='DY'||$("#type").val()=='DR'){
		var endTime=$("#popupSearchDateTime").val();

		$("#gridForm").datagrid("options").queryParams = {formNo:formNo,endTime:endTime,formType:type,targetBranchId:targetBranchId};
		$("#gridForm").datagrid("options").url = contextPath+'/form/deliverSelect/getDeliverFormList';
	}else{
		  $("#gridForm").datagrid("options").queryParams = {formNo:formNo,formType:type};
		  $("#gridForm").datagrid("options").url = contextPath+'/form/purchaseSelect/getPurchaseFormList';
	}
    $("#gridForm").datagrid("options").method = "post";
    $("#gridForm").datagrid("load");
}
//选择单行
function formClickRow(rowIndex, rowData){
    getItemData(rowData.id);

}
//获取单据详情
function getItemData(formId){

    $.ajax({
        url:contextPath+'/form/purchaseSelect/getPurchaseForm?formId='+formId,
        type:'get',
        success:function(result){
            if(result['code'] == 0){
                if(formCallBack){
                    formCallBack(result);
                }
            }else{
                successTip(result['message']);
            }
        },
        error:function(data){
            successTip("请求发送失败或服务器处理失败");
        }
    })

}
//选择单行
function deliverFormClickRow(rowIndex, rowData){
    if(deliverFormCallBack){
    	deliverFormCallBack(rowData);
    }
}
//初始化表格 单据选择（采购）
function initDatagridForm(type){
    $("#gridForm").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        queryParams : {formType : type},
        url:contextPath+'/form/purchaseSelect/getPurchaseFormList',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'formNo',title:'单号',width:135,align:'left'},
            {field:'branchName',title:'收货机构',width:100,align:'left'},
            {field:'supplierName',title:'供应商',width:100,align:'left'},
            {field:'amount',title:'单据金额',width:100,align:'right',
            	formatter : function(value, row, index) {
            		return parseFloat(value||0).toFixed(2);
            	}
            },
            {field:'validTime',title:'审核时间',width:100,align:'center', formatter: function (value, row, index) {
                if (value) {
                	return new Date(value).format('yyyy-MM-dd hh:mm');
                }
                return "";
            }}
        ]],
        onLoadSuccess : function() {
        	$('.datagrid-header').find('div.datagrid-cell').css('text-align','center');
        },
        onClickRow:formClickRow,
    });
}
//初始化表格 单据选择（调拨）
function initDatagridDeliverForm(type){
	var data = "";
    var targetBranchId = $('#targetBranchId').val();
	if($("#type").val()=='DA'){
		var endTime=$("#popupSearchDateTime").val();
		data = {endTime:endTime,formType:type};
	}else{
		data = {formType:type,targetBranchId:targetBranchId};
	}
    $("#gridForm").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        queryParams : data,
        url:contextPath+'/form/deliverSelect/getDeliverFormList',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'formNo',title:'单号',width:135,align:'center'},
            {field:'status',title:'审核状态',width:100,align:'center',
            	 formatter: function(value,row,index){
            		 if(value == '0'){
                  		return '待审核';
                  	}else if(value == '1'){
                  		return '审核通过';
                  	}else if(value == '2'){
                  		return '审核失败';
                  	}else{
                  		return '未知类型：'+ value;
                  	}
                 }
            },
            {field:'sourceBranchName',title:'调出仓库',width:100,align:'center'},
            {field:'targetBranchName',title:'调入仓库',width:100,align:'center'},
            {field:'validTime',title:'审核日期',width:100,align:'left',
            	formatter : function(value, rowData, rowIndex) {
            		return formatDate(value,'yyyy-MM-dd hh:mm');
            	}
            }
        ]],
        onClickRow:deliverFormClickRow,
    });
}
