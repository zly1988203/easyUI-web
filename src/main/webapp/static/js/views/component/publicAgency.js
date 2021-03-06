/**
 * Created by huangj02 on 2016/8/8.
 * 公共组件-仓库/机构选择
 */

var nameOrCode=null;
var formType=null;
var branchId=null;
var branchType=null;
var branchTypesStr=null;
var branchCompleCode = null;
var isOpenStock=null;
var scope=null;
var type=null;     //NOTREE 左边没有树
var selectType=null;//0 单选  1多选
var offlineStatus = "1";
function publicAgencyClass() {

}
    publicAgencyClass.prototype.initAgencyView = function(param){

        nameOrCode=$("#formAgency :text[name=nameOrCode]").val();
        offlineStatus = $('input[type="radio"][name="offlineStatus"]:checked').val();
        //新组件方法会传此参数
        if(param){
            if(param.formType){
                formType = param.formType;
            }

            if(param.branchId){
                branchId = param.branchId;
            }

            if(param.branchType){
                branchType = param.branchType;
            }

            if(param.nameOrCode){
                nameOrCode = param.nameOrCode;
                $("#formAgency :text[name=nameOrCode]").val(nameOrCode);
            }
            if(param.branchTypesStr){
                branchTypesStr = param.branchTypesStr;
            }
            if(param.branchCompleCode){
                branchCompleCode = param.branchCompleCode;
            }
            if(param.isOpenStock){
                isOpenStock = param.isOpenStock;
            }
            if(param.scope){
                scope = param.scope;
            }

            selectType = param.selectType;
            //扩展的publicBranchesServiceHandel initAgencyView(param)
            //param=空,param.type=空,param.type=NOTREE下  初始化左边的树
            type = (param.type||'').toUpperCase();
        }

        gFunSetEnterKey(agencySearch);
        if((param && type != 'NOTREE') || !param){
            $('#treeAgencyArea').removeClass('unhide');
            initTreePublicAgency(); //初始树
        }else{
            $('#treeAgencyArea').addClass('unhide');
        }

        var publicAgency = new publicAgencyClass();
        publicAgency.initDatagridAgency(); //初始化表格

        $("input[name='offlineStatus']").change(function () {
            $('#gridAgency').datagrid('clearSelections');
            $('#gridAgency').datagrid('clearChecked');
            agencySearch();
        })
    }

//初始化回调函数
    publicAgencyClass.prototype.initAgencyCallBack = function(cb){
        agencyCallBack = cb;
    }

var agencyCallBack ;

//选择单行
function agencyClickRow(rowIndex, rowData){
    if(agencyCallBack){
        agencyCallBack(rowData);
       
    }
}
//初始树
function initTreePublicAgency(){
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
	    		onClick: publicAgencyTreeOnClick
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
function publicAgencyTreeOnClick(event, treeId, treeNode) {
	branchAreaCode=treeNode.code;
    nameOrCode=$("#formAgency :text[name=nameOrCode]").val();
    offlineStatus = $('input[type="radio"][name="offlineStatus"]:checked').val();
    //去空格处理
    nameOrCode=$.trim(nameOrCode)||'';
//	var nameOrCode=$("#nameOrCode").val();
    $("#gridAgency").datagrid("options").queryParams = {
    		branchAreaCode:branchAreaCode,
    		nameOrCode:nameOrCode,
    		formType:formType,
    		branchId:branchId,
    		branchType:branchType,
    		branchTypesStr:branchTypesStr,
    		isOpenStock:isOpenStock,
    		branchCompleCode:branchCompleCode,
    		scope:scope,
        	offlineStatus :offlineStatus
    };
    $("#gridAgency").datagrid("options").method = "post";
    $("#gridAgency").datagrid("options").url =contextPath+'/common/branches/getComponentList',
    $("#gridAgency").datagrid("load");
};


//初始化表格
publicAgencyClass.prototype.initDatagridAgency = function(){
	
	var datagridObj = {
		method:'POST',
        align:'center',
        url:contextPath+'/common/branches/getComponentList',
        queryParams:{
        	nameOrCode:nameOrCode,
        	formType:formType,
    		branchId:branchId,
    		isOpenStock:isOpenStock,
    		scope:scope,
    		branchType:branchType,
    		branchTypesStr:branchTypesStr,
    		branchCompleCode:branchCompleCode,
            offlineStatus:offlineStatus
        },
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
            {field:'contacts',title:'联系人',width:100,align:'left',hidden:type=='NOTREE'?true:false},
            {field:'mobile',title:'电话',width:100,align:'left',hidden:type=='NOTREE'?true:false},
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
	
    $("#gridAgency").datagrid(datagridObj);
}
/*
 * 多选模式下 【确定】按钮回调
 */
publicAgencyClass.prototype.publicBranchGetChecks = function(cb){
    var row =  $("#gridAgency").datagrid("getChecked");
    cb(row);
}
//搜索
function agencySearch(){
	nameOrCode=$("#formAgency :text[name=nameOrCode]").val();
    offlineStatus = $('input[type="radio"][name="offlineStatus"]:checked').val();
	//去空格处理
	nameOrCode=$.trim(nameOrCode)||'';
	//去除左侧选中样式
	$('.zTreeDemoBackground a').removeClass('curSelectedNode');
	//点击搜索清除左侧数据
	$("#gridAgency").datagrid("options").queryParams = {
		nameOrCode:nameOrCode,
		formType:formType,
		branchId:branchId,
		branchType:branchType,
		branchTypesStr:branchTypesStr,
		branchCompleCode:branchCompleCode,
		isOpenStock:isOpenStock,
		scope:scope,
        offlineStatus:offlineStatus
	};
//	$("#gridAgency").datagrid("options").queryParams = {branchAreaCode:branchAreaCode,nameOrCode:nameOrCode,formType:$("#formType").val(),branchId:$("#branchId").val()};
	$("#gridAgency").datagrid("options").method = "post";
	$("#gridAgency").datagrid("options").url =contextPath+'/common/branches/getComponentList',
	$("#gridAgency").datagrid('load');
}
