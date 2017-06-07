/**
 * Created by zhanghuan on 2016/8/30.
 * 要货单
 */
$(function(){
	//开始和结束时间
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    
    initDatagridRequireOrders();
});

//初始化表格
function initDatagridRequireOrders(){
    $("#gridRequireOrders").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        url:contextPath+'/form/purchase/listData',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        columns:[[
			{field:'check',checkbox:true},
            {field:'formNo',title:'单据编号',width:100,align:'center',formatter:function(value,row,index){
            	return "<a style='text-decoration: underline;' href='"+ contextPath +"/form/purchase/orderEdit?formId="+ row.id +"'>" + value + "</a>"
            }},
            {field:'status',title:'审核状态',width:100,align:'center',formatter:function(value,row,index){
            	if(value == '0'){
            		return '待审核';
            	}else if(value == '1'){
            		return '审核通过';
            	}else if(value == '2'){
            		return '审核失败';
            	}else{
            		return '未知类型：'+ value;
            	}
            }},
			{field: 'djzt', title: '单据状态', width: 100, align: 'center'},
			{field: 'yhfd', title: '要货分店', width: 100, align: 'center'},
			{field: 'djje', title: '单据金额', width: 100, align: 'center'},
			{field: 'fhfd', title: '发货分店', width: 100, align: 'center'},
			{field:'updateUserName',title:'操作员',width:100,align:'center'},
			{field:'createTime',title:'操作日期',width:100,align:'center', formatter: function (value, row, index) {
                if (value) {
                	return new Date(value).format('yyyy-MM-dd hh:mm:ss');
                }
                return "";
            }},
            {field: 'yxqx', title: '有效期限', width: 150, align: 'center'},
            {field:'validUserName',title:'审核人',width:100,align:'center'},
			{field: 'bz', title: '备注', width: 100, align: 'center'}
        ]]
    });
}

//新增
function orderAdd(){
	location.href = contextPath + "/form/purchase/orderAdd";
}

//查询
function query(){
	$("#gridRequireOrders").datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#gridRequireOrders").datagrid("options").method = "post";
	$("#gridRequireOrders").datagrid("load");
}

//删除
function orderDelete(){
	var dg = $("#gridRequireOrders");
	var row = dg.datagrid("getSelected");
	if(rowIsNull(row)){
		return null;
	}
	$_jxc.confirm('是否要删除此条数据?',function(data){
		if(data){
			$_jxc.ajax({
		    	url:contextPath+"/form/purchase/delete",
		    	data:{
		    		formId:row.id
		    	}
		    },function(result){
	    		console.log(result);
	    		if(result['code'] == 0){
	    			$_jxc.alert("删除成功");
	    		}else{
	    			$_jxc.alert(result['message']);
	    		}
	    		dg.datagrid('reload');
		    });
		}
	});
}

//要货分店
function selectBranch(){
	/**
	 * 分店列表  type = 0  |  1
	* 0 表示单选  1 表示多选
	*/
	new publicBranchService(function(data){
		$("#branchShopInput").val(data.branchesId);//id
		$("#branchShopName").val(data.branchName);
	},0);

}

//操作员
function selectOperator(){
	new publicOperatorService(function(data){
		$("#operateUserId").val(data.id);
		$("#operateUserName").val(data.userName);
	});
}

//打印
function printDesign(){
     var dg = $("#gridRequireOrders");
     var row = dg.datagrid("getSelected");
     if(rowIsNull(row)){
           return null;
     }
     //弹出打印页面
     parent.addTabPrint('PASheet' + row.id,row.formNo+'单据打印',contextPath + '/printdesign/design?page=PASheet&controller=/form/purchase&template=-1&sheetNo=' + row.id + '&gridFlag=PAGrid','');
}
