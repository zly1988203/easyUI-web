
/**
 * 序列化param 对象到 dom 结构中
 * @param param
 */
function initParam(param){
	if(param){
		selectType = param.selectType;
		//根据参数序列化到dom结构中
		for(key in param){
			//nameOrCode赋值
			var _inpStr = "<input type='hidden' id='"+key+"' name='"+key+"' value='"+(param[key]||"")+"' />";
			$('#purchForm').append(_inpStr);
		}
	}
	initDatagridForm();
	gFunSetEnterKey(formCx);
}

/**
 * 获取form 参数对象
 * @returns {___anonymous496_503}
 */
function serializeParam(){
	var _formObj = $('#purchForm').serializeObject();
	_formObj.formNo = $.trim(_formObj.formNo||'');
	return _formObj;
}

var formCallBack ;
var param = null;
//初始化回调函数
function initFormCallBack(cb){
    formCallBack = cb;
}

//搜索
function formCx(){
    $("#gridForm").datagrid("options").queryParams = serializeParam();
    $("#gridForm").datagrid("options").url = contextPath+'/form/purchaseSelect/getPurchaseFormList';
    $("#gridForm").datagrid("options").method = "post";
    $("#gridForm").datagrid("load");
}


//选择单行
function formClickRow(rowIndex, rowData){
    getItemData(rowData.id);

}
//获取单据详情
function getItemData(formId){

    $_jxc.ajax({
        url:contextPath+'/form/purchaseSelect/getPurchaseForm?formId='+formId,
        type:'get'
    },function(result){
        if(result['code'] == 0){
            if(formCallBack){
                formCallBack(result);
            }
        }else{
            $_jxc.alert(result['message']);
        }
    })

}

//初始化表格 单据选择（采购）
function initDatagridForm(){
	
    $("#gridForm").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        queryParams : serializeParam(),
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

    if(hasPurchasePrice==false){
        priceGrantUtil.grantPurchasePrice("gridForm",["amount"])
    }
}

