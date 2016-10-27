/**
 * Created by huangj02 on 2016/8/8.
 * 公共组件-仓库/机构选择
 */
function initAgencyView(){
    gFunSetEnterKey(agencySearch);
    initTreeAgency(); //初始树
    initDatagridAgency(); //初始化表格
}
var agencyCallBack ;
//初始化回调函数
function initAgencyCallBack(cb){
    agencyCallBack = cb;
}
//选择单行
function agencyClickRow(rowIndex, rowData){
    if(agencyCallBack){
        agencyCallBack(rowData);
       
    }
}
//初始树
function initTreeAgency(){
	var args = { }
	$.post(contextPath + "/common/branchArea/getBranchAreaToTree", args,function(data){
	    var setting = {
	        data: {
	            key:{
	            	tId:'id',
	                name:'codeText'
	            }
	        },
	        callback: {
	    		onClick: zTreeOnClick
	    	}

	    };
	    $.fn.zTree.init($("#treeAgency"), setting, JSON.parse(data));
	    var treeObj = $.fn.zTree.getZTreeObj("treeAgency");
        var nodes = treeObj.getNodes();
        if (nodes.length>0) {
            treeObj.expandNode(nodes[0], true, false, true);
        }
	    
	});
}
/*
 * 树点击事件
 */
var branchAreaCode=null;
function zTreeOnClick(event, treeId, treeNode) {
	branchAreaCode=treeNode.code;
    $("#gridAgency").datagrid("options").queryParams = {branchAreaCode:branchAreaCode,formType:$("#formType").val()};
    $("#gridAgency").datagrid("options").method = "post";
    $("#gridAgency").datagrid("options").url =contextPath+'/common/branches/getComponentList',
    $("#gridAgency").datagrid("load");
};

//初始化表格
function initDatagridAgency(){
	
	var formType="";
	var branchId="";
	if($("#formType").val()){
		formType=$("#formType").val();
	}
	if($("#branchId").val()){
		branchId=$("#branchId").val();
	}
    $("#gridAgency").datagrid({
        //title:'普通表单-用键盘操作',
        method:'POST',
        align:'center',
        url:contextPath+'/common/branches/getComponentList?formType='+$("#formType").val()+'&branchId='+$("#branchId").val(),
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
            {field:'branchCode',title:'编码',width:100,align:'left'},
            {field:'branchName',title:'名称',width:100,align:'left'},
             {field:'contacts',title:'联系人',width:100,align:'left'},
             {field:'mobile',title:'电话',width:100,align:'left'},
        ]],
        onLoadSuccess : function() {
       	 $('.datagrid-header').find('div.datagrid-cell').css('text-align','center');
       },
        onClickRow:agencyClickRow,
    });
}
/*
 * 
 */
function publicGoodsGetCheckGoods(cb){
    var row =  $("#gridAgency").datagrid("getChecked");
    cb(row);
}
//搜索
function agencySearch(){
	var nameOrCode=$("#nameOrCode").val();
	$("#gridAgency").datagrid("options").queryParams = {branchAreaCode:branchAreaCode,nameOrCode:nameOrCode,formType:$("#formType").val(),branchId:$("#branchId").val()};
	$("#gridAgency").datagrid("options").method = "post";
	$("#gridAgency").datagrid("options").url =contextPath+'/common/branches/getComponentList',
	$("#gridAgency").datagrid('load');
}
