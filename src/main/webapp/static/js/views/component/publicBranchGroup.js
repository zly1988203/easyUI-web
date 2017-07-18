/**
 * Created by huangj02 on 2016/8/8.
 * 公共组件-仓库/机构选择
 */

/*var nameOrCode=null;*/
var selectType=null;//0 单选  1多选
function initAgencyView(param){
	//debugger;
	console.log('param',param);
	if(param){
		selectType = param.selectType;
		//根据参数序列化到dom结构中
		for(key in param){
			//去除 组件内用参数
			if(key == 'type' || key == 'view' || key=='selectType') continue;
			//nameOrCode赋值
			if(key == 'nameOrCode'){
				$('#nameOrCode').val(param.nameOrCode);
			}else{
				var _inpStr = "<input type='hidden' name='"+key+"' value='"+(param[key]||"")+"' />";
				$('#domInner').append(_inpStr);
			}
		}
	}
    gFunSetEnterKey(agencySearch);
    initDatagridBranchGroupList(); //初始化表格
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


//初始化表格
function initDatagridBranchGroupList(){
	var _formObj = $('#formBranchGroup').serializeObject();
	var datagridObj = {
		method:'POST',
        align:'center',
        url:contextPath+'/branch/branchGroupSelect/queryList',
        queryParams:_formObj,
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        height:'100%',
        width:'100%',
        idField:'branchCode',
        columns:[[
            {field:'cb',checkbox:true,hidden:selectType == 1?false:true},    
            {field:'branchCode',title:'编码',width:100,align:'left'},
            {field:'branchName',title:'名称',width:100,align:'left'},
            {field:'branchType',title:'类型',width:100,align:'center'},
        ]],
        onLoadSuccess : function() {
       	 $('.datagrid-header').find('div.datagrid-cell').css('text-align','center');
        }
	}
	
	//单选模式
	if(selectType != 1){
		datagridObj['onClickRow'] = agencyClickRow;
	}else{
		//多选模式
		datagridObj['singleSelect'] = false;
	}	
	
    $("#gridBranchGroupList").datagrid(datagridObj);
}
/*
 * 多选模式下 【确定】按钮回调
 */
function publicBranchGetChecks(cb){
    var row =  $("#gridBranchGroupList").datagrid("getChecked");
    cb(row);
}
//搜索
function agencySearch(){
	var _formObj = $('#formBranchGroup').serializeObject();
	_formObj.nameOrCode = $.trim(_formObj.nameOrCode||'');
	$("#gridBranchGroupList").datagrid("options").queryParams = _formObj;
	$("#gridBranchGroupList").datagrid('load');
}
