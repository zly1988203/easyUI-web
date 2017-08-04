
/**
 * 序列化param 对象到 dom 结构中
 * @param param
 */
function initParam(param){
	if(param){
		//根据参数序列化到dom结构中
		for(key in param){
			//nameOrCode赋值
			var _inpStr = "<input type='hidden' id='"+key+"' name='"+key+"' value='"+(param[key]||"")+"' />";
			$('#deliverForm').append(_inpStr);
		}
	}
	if($('#formType').val() != "DA"){
		$('#timeDom').remove();
	}else{
		$("#popupSearchDateTime").val(dateUtil.getCurrentDateTime().format("yyyy-MM-dd hh:mm"));
	}
	
	initDatagridDeliverForm();
}

/**
 * 获取form 参数对象
 * @returns {___anonymous496_503}
 */
function serializeParam(){
	var _formObj = $('#deliverForm').serializeObject();
	_formObj.formNo = $.trim(_formObj.formNo||'');
	return _formObj;
}

var deliverFormCallBack;

//初始化回调函数
function initDeliverFormCallBack(cb){
	deliverFormCallBack = cb;
}
//搜索
function formCx(){
	$("#gridForm").datagrid("options").queryParams = serializeParam();
    $("#gridForm").datagrid("options").method = "post";
    $("#gridForm").datagrid("options").url = contextPath+'/form/deliverSelect/getDeliverFormList';
    $("#gridForm").datagrid("load");
}

//选择单行
function deliverFormClickRow(rowIndex, rowData){
    if(deliverFormCallBack){
    	deliverFormCallBack(rowData);
    }
}

//初始化表格 单据选择（调拨）
function initDatagridDeliverForm(){
    $("#gridForm").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        queryParams : serializeParam(),
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
