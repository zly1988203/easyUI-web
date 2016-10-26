$(function(){
	//开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrentDate().format("yyyy-MM"));
    initDatagridRequire();
});
var gridHandel = new GridClass();
//初始化表格
function initDatagridRequire(){
    $("#storeSale").datagrid({
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        fit:true,            //占满
        showFooter:true,
		height:'100%',
		width:'100%',
        columns:[[
			{field:'check',checkbox:true, rowspan:2},
            {field:'oneflag',title:'1号',width: '100px',align:'left',colspan:2},
            {field:'oneflag',title:'2号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'3号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'4号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'5号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'6号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'7号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'8号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'9号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'10号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'11号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'12号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'13号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'14号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'15号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'16号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'17号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'18号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'19号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'20号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'21号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'22号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'23号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'24号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'25号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'26号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'27号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'28号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'29号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'30号',width:'100px',align:'left',colspan:2},
            {field:'oneflag',title:'31号',width:'100px',align:'left',colspan:2}
        ],[ 
            {field:'saleAmount',title:'销售额',width: '50px',align:'center',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1},
            {field:'saleAmount',title:'销售额',align:'center',width: '50px',rowspan:1},
            {field:'maoli',title:'毛利',align:'center',width: '50px',rowspan:1}
        ]],
        
    });
    queryForm();
}
//查询入库单
function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	$("#storeSale").datagrid("options").method = "post";
	$("#storeSale").datagrid('options').url = contextPath + '/goodsSale/report/getGoodsSaleList';
	$("#storeSale").datagrid('load', fromObjStr);
}

/**
 * 店铺名称
 */
function searchBranch(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}
/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
};