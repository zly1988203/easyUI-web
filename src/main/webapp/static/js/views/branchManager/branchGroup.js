/**
 * Created by bwp on 2017/07/06.
 */
$(function(){
    //初始化默认条件
    initDatagridStoreList();
    initDatagridStoreView();
    //新增机构组合机构选择 初始化
    $('#branchComponent').branchSelect({
    	param:{
    		branchTypesStr:$_jxc.branchTypeEnum.BRANCH_COMPANY
    	},
    	onShowBefore:function(){
    		if($('#id').val()){
    			return false;
    		}
    		return true;
    	}
    });
});
var gridDefault = {};
var gridHandel = new GridClass();
var gridStoreViewId = 'gridBranchComponentsList'
//初始化查询表格
function initDatagridStoreList(){
	gridHandel.setGridName(gridStoreViewId);
    $("#"+gridStoreViewId).datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
		height:'380px',
		width:'100%',
        columns:[[
			{field:'id',title:'机构组合编号',width:'140px',align:'left',hidden:true},
            {field:'groupNo',title:'机构组合编号',width:'140px',align:'left'},
            {field:'groupName',title:'机构组合名称',width:'140px',align:'left'},
            {field:'branchName',title:'所属分公司',width:'120px',align:'left'},
            {field:'branchCompleCode',title:'branchCompleCode',width:'120px',align:'left',hidden:true},
            {field:'hasMemeberStr',title:'是否已设置成分商品',width:'120px',align:'center'},
            {field:'createUserName',title:'创建人',width:'120px',align:'left'},
            {field:'createTime',title:'创建时间',width:'160px',align:'left',
	            formatter:function(value,row,index){
	        		return formatDate(value);
	        	}
            },
            {field:'updateUserName',title:'修改人',width:'120px',align:'left'},
            {field:'updateTime',title:'修改时间',width:'160px',align:'left',
	            formatter:function(value,row,index){
	        		return formatDate(value);
	        	}
            },
            {field:'remark',title:'备注',width:'180px',align:'left'},
        ]],
        onSelect:function(rowIndex,rowData){
        	$("#"+gridStoreDetailId).datagrid('loadData', [{},{}]);
        	selectView(rowData);
        },
		onLoadSuccess : function(data) {
			removeData(data);
			gridHandel.setDatagridHeader("center");
			if (data.rows.length > 0) {  
				//$("#"+gridStoreDetailId).datagrid('loadData', [{},{}]);
				$(this).datagrid('selectRow',0);
			} 
		}
    });
    query();
}

var gridStoreDetailId = "gridBranchComponentsView";
var editRowData = null;
var gridHandelDet = new GridClass();
//初始化编辑表格
function initDatagridStoreView(){
	gridHandelDet.setGridName(gridStoreDetailId);
	gridHandelDet.initKey({
        firstName:'branchCode',
        enterName:'branchCode',
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
                gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefault);
            }else{
            	selectBranchs(arg);
            }
        },
    })
    $("#"+gridStoreDetailId).datagrid({
        align:'center',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        showFooter:true,
        height:300,
        width:'100%',
        columns:[[
            {field:'cz',title:'操作',width:'60px',align:'center',
                formatter : function(value, row,index) {
                    var str = "";
                    if(row.isFooter){
                        str ='<div class="ub ub-pc">合计</div> '
                    }else{
                        str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                            '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
                    }
                    return str;
                },
            },
            {field:'branchCode',title:'机构编号',width: '140px',align:'left',editor:'textbox'},
            {field:'branchName',title:'机构名称',width:'140px',align:'left'},
            {field:'parentBranchName',title:'所属分公司',width:'140px',align:'left'},
            {field:'branchAreaName',title:'所属区域',width:'140px',align:'left'}
        ]],
        onClickCell:function(rowIndex,field,value){
        	gridHandelDet.setBeginRow(rowIndex);
        	gridHandelDet.setSelectFieldName(field);
           var target = gridHandel.getFieldTarget(field);
            if(target){
            	gridHandelDet.setFieldFocus(target);
            }else{
            	gridHandelDet.setSelectFieldName("branchCode");
         }
        },
        onLoadSuccess : function(data) {
        	gridHandelDet.setDatagridHeader("center");
        }
    });

}

//queryForm 表单提交
function query(){
	//清空gridOrdersresult里面的数据
	//$("#"+gridStoreDetailId).datagrid('loadData', { total: 0, rows: [] });
	$("#"+gridStoreViewId).datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#"+gridStoreViewId).datagrid("options").method = "post";
	$("#"+gridStoreViewId).datagrid("options").url = contextPath+'/branch/branchGroup/queryList';
	$("#"+gridStoreViewId).datagrid("load");
}

function removeData(data){
  if(data.list.length<=0){
	 $("#"+gridStoreDetailId).datagrid('loadData', { total: 0, rows: [] });
  }
}

//插入一行
function addLineHandel(event){
    event.stopPropagation(event);
    var index = $(event.target).attr('data-index')||0;
    gridHandelDet.addRow(index,gridDefault);
}
//删除一行
function delLineHandel(event){
    event.stopPropagation();
    var index = $(event.target).attr('data-index');
    gridHandelDet.delRow(index);
}


//机构组合商品  新增 
function addStoreComp(){
	showBranchDialog()
}

//机构组合商品  修改
function updateStoreComp(){
	//数据校验
	if(!checkData())return;
	var selectBranch = $('#'+gridStoreViewId).datagrid("getSelected");
	showBranchDialog(selectBranch);
}

//机构组合商品  删除
function delStoreComp(){
	//数据校验
	debugger;
	var selectBranch = $('#'+gridStoreViewId).datagrid("getSelected");
	
	
	  if (selectBranch) {
		  var id = selectBranch.id;
			console.log('id',id);
	        $_jxc.confirm('单据删除后将无法恢复，确认是否删除？', function(r) {
	            if (r) {
	                //删除单据
	                $_jxc.ajax({
	                    url: contextPath+"/branch/branchGroup/deleteGroup",
	                    data: {"groupId":id}
	                },function(result){
	                   
	                	if(result['code'] == 0){
	            			$_jxc.alert('删除成功',function(){
	            				query();
	            			});
	            		}
	                	
	                });
	            }
	        });
	    }
}

//机构组合商品  
var brDialog;
function showBranchDialog(obj){
	console.log(obj);
	brDialog = $_jxc.dialog({
		target:'#branchDialog',
		title: obj?'机构组合编辑':'机构组合新增', 
		width:600,
		height:400,
		onBeforeOpen:function(){
			$('#branchDialog-area').removeClass('none');
			//编辑时 form赋值
			if(obj){
				$('#branchId').val(obj.branchId||'');
				$('#branchName').val('['+(obj.branchCode||"")+']'+obj.branchName).addClass('uinp-no-more');
				$('#groupName').val(obj.groupName||'');
				$('#groupNo').val(obj.groupNo||'');
				$('#remark').val(obj.remark||'');
				$('#id').val(obj.id||'');
				$('#umore').addClass('unhide');
			}else{
			    $('#branchForm')[0].reset();
			    $('#umore').removeClass('unhide');
			    $('#branchName').removeClass('uinp-no-more');
			    $('#id').val("");
			}
			
		},
		onClose:function(){
			$('#id').val("");
			$('#branchForm')[0].reset();
			$('#branchDialog-area').addClass('none');
			
			//选择刷新列表
			if(operateFlag){
			    operateFlag = false;
				query();
			}
	    }
	})
}

//编辑保存操作表示
var operateFlag = false;
//机构组合商品新增 弹窗 --> 保存
function saveBranchComMsg(){
	var _paramObj = $('#branchForm').serializeObject();
	if(!_paramObj.branchName){
		$_jxc.alert('所属分公司信息不能为空');
		return;
	}
	if(!_paramObj.groupName){
		$_jxc.alert('机构组合名称不能为空');
		return;
	}
	
	_paramObj.branchName =  _paramObj.branchName.substr(_paramObj.branchName.indexOf(']')+1);
	console.log('_paramObj',_paramObj);
	//ajax后台保存数据
	 $_jxc.ajax({
			contentType:"application/json",
		    dataType:'json',
	        url:contextPath+"/branch/branchGroup/saveBranchGroup",
	        data:JSON.stringify(_paramObj),
	    },function(result){
	        if(result['code'] == 0){
	        	operateFlag = true;
	        	$('#groupNo').val(result.data?result.data.groupNo:'');
	        	$('#id').val(result.data&&result.data.id);
	        	$('#branchName').addClass('uinp-no-more');
	            $_jxc.alert("操作成功！");
	        }else{
	            $_jxc.alert(result['message']);
	        }
	    });
}

//机构组合商品新增 弹窗 --> 关闭
function closeBranchComMsg(){
	$(brDialog).dialog('close');
	$('#branchForm')[0].reset();
}

//数据检验
function checkData(){
	//所选的组合机构 (单选)
	var selectBranch = $('#'+gridStoreViewId).datagrid("getSelected");
	console.log('selectBranch',selectBranch)
	if(!selectBranch){
		$_jxc.alert("请选择机构组合");
		return false;
	}
	if(selectBranch && !selectBranch.groupName){
		$_jxc.alert("所选的机构组合名称不能为空");
		return false;
	}
	return true;
}

//选择机构
function selectBranchs(searchKey){
	//数据校验
	if(!checkData())return;
	var viewRows = $('#'+gridStoreViewId).datagrid('getSelected');
	var branchCompleCode=viewRows.branchCompleCode;
	var param = {
		selectType:1, //数据选择模式类型  null/''/0-->单选(默认)   1多选
		branchCompleCode:branchCompleCode, //
		//门店
		branchTypesStr:$_jxc.branchTypeEnum.OWN_STORES + ',' + $_jxc.branchTypeEnum.FRANCHISE_STORE_B + ',' + $_jxc.branchTypeEnum.FRANCHISE_STORE_C,
		nameOrCode:searchKey
	}
	publicBranchesService(param,function(result){
		//弹窗直接关闭 返回NO
		if(result == 'NO')return;
		var nowRows = gridHandelDet.getRowsWhere({branchName:'1'});
		var newRows = gridHandel.checkDatagrid(nowRows,result,{},{});
		
		gridHandelDet.setLoadData(newRows)
	})
}


//根据选中机构分组机构信息
function selectView(data){
    var searchskuId=data.id
	$_jxc.ajax({
    	url : contextPath+"/branch/branchGroup/queryGrouBranch",
    	data : {"groupId":searchskuId}
    },function(result){
    	$("#"+gridStoreDetailId).datagrid("loadData",result);
    });
}

//保存
function saveBranchsView(){
	//数据校验
	if(!checkData())return;
	
    $("#"+gridStoreDetailId).datagrid("endEdit", gridHandelDet.getSelectRowIndex());
    var rows = gridHandelDet.getRowsWhere({branchName:'1'});
    if(rows.length==0){
        $_jxc.alert("机构信息不能为空");
        return;
    }
    var isCheckResult = true;
    $.each(rows,function(i,v){
        if(!v["branchCode"]){
            $_jxc.alert("第"+(i+1)+"行，机构编码不能为空");
            isCheckResult = false;
            return false;
        };
    });
    if(!isCheckResult){
        return;
    }else{
    	saveDataHandel(rows);
    }
}

//保存里面拼接的字段
function saveDataHandel(rows){
	//获取选中产品id
	var viewRows = $('#'+gridStoreViewId).datagrid('getSelected');
	var id=viewRows.id;
    var reqObj = {
    	id:id,
    	branchList:rows
    }; 
    var goodsJson = JSON.stringify(reqObj);
    console.log(goodsJson);
    $_jxc.ajax({
		contentType:"application/json",
		dataType:'json',
        url:contextPath+"/branch/branchGroup/saveGroupBranch",
        data:goodsJson,
    },function(result){
        if(result['code'] == 0){
            $_jxc.alert("操作成功！",function(){
              /*<!--  location.href = contextPath +"/form/purchase/orderEdit?formId=" + result["formId"];-->*/
            });
        }else{
            $_jxc.alert(result['message']);
        }
    });
}


/**
 * 重置
 */
function reset(){
  //$("#storeInfos").val("");
};


