/**
 * 加盟店合同建立-新增编辑
 */
var dataGridId = "taxList";
var pageStatus = 'add';
$(function(){
    initContact();
    
    //甲方公司
    $('#companyA').branchSelect({
    	param:{
    		branchTypesStr:$_jxc.branchTypeEnum.BRANCH_COMPANY
    	},
    	onAfterRender:function(data){
    		$('#contactsA').val(data.contacts);
    		$('#mobileA').val(data.mobile);
    	}
    })
    
    //乙方公司
    $('#companyB').branchSelect({
    	param:{
    		branchTypesStr:$_jxc.branchTypeEnum.FRANCHISE_STORE_B+','+$_jxc.branchTypeEnum.FRANCHISE_STORE_C
    	},
    	onAfterRender:function(data){
    		$('#branchIdB').val(data.branchId);
    		$('#contactsB').val(data.contacts);
    		$('#mobileB').val(data.mobile);
    	}
    })
    
});
var gridHandel = new GridClass();

var gridDefault = {
	taxStart:0
}

function initContact(){
    gridHandel.setGridName(dataGridId);
    $("#"+dataGridId).datagrid({
        align:'center',
        singleSelect:false,  // 单选 false多选
        rownumbers:true,    // 序号
        showFooter:true,
        height:'200',
        width:'800',
        columns:[[
            {field:'cz',title:'操作',width:'60px',align:'center',
                formatter : function(value, row,index) {
                    var str = "";
                    str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                        '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
                    return str;
                }
                
            },
            {field:'taxStart',title:'毛利额度起',width:'100',align:'right',
            	formatter:function(value,row,index){
            		console.log('taxStart',value)
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	},
            	styler:function(value,row,index){
                	return 'background-color:#f2f2f2;';
                }
            },
            {field:'taxEnd',title:'毛利额度止',width:'100',align:'right',
            	formatter:function(value,row,index){
            		return value == "" || typeof value == "undefined"? '' : '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	},
            	editor:{
            		type:'numberbox',
            		options:{
            			min:0,
            			precision:2,
            			onChange:changeTaxEnd
            		}
            	}
            },
            {field:'taxA',title:'甲方分配（%）',width:'100',align:'right',
            	formatter:function(value,row,index){
            		return value == "" || typeof value == "undefined"? '' : '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	},
            	editor:{
            		type:'numberbox',
            		options:{
            			min:0,
            			max:100,
            			prompt:'0.00~100.00',
            			precision:2,
            			onChange:changeTaxA
            		}
            	}
            },
            {field:'taxB',title:'乙方分配（%）',width:'100',align:'right',
            	formatter:function(value,row,index){
            		return value == "" || typeof value == "undefined" ? '' : '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	},
            	editor:{
            		type:'numberbox',
            		options:{
            			min:0,
            			max:100,
            			readonly:true,
            			precision:2,
            		}
            	},
            	styler:function(value,row,index){
                	return 'background-color:#f2f2f2;';
                }
            },
            {field:'remark',title:'备注',width:'200',align:'left',editor:'textbox'}
        ]],
        onClickCell:function(rowIndex,field,value){
        	//if(field == 'taxStart' && !checkIfCanEdit(rowIndex))return;
            gridHandel.setBeginRow(rowIndex);
            gridHandel.setSelectFieldName(field);
            var target = gridHandel.getFieldTarget(field);
            if(target){
                gridHandel.setFieldFocus(target);
            }else{
                gridHandel.setSelectFieldName("taxA");
            }
        },
        onLoadSuccess:function(data){
            gridHandel.setDatagridHeader("center");
        }
    });
    
    if(pageStatus == 'add'){
    	gridHandel.setLoadData([$.extend({},gridDefault)])
    }
}


// 插入一行
function addLineHandel(event){
    event.stopPropagation(event);
    var index = $(event.target).attr('data-index')||0;
    if(index > 2){
    	$_jxc.alert('最多只能添加4行毛利梯度');
    	return;
    }
    if(!checkTaxData(index))return;
    changeDefaultData(index);
    gridHandel.addRow(index,gridDefault);
}
// 删除一行
function delLineHandel(event){
    event.stopPropagation();
    var index = $(event.target).attr('data-index');
    gridHandel.delRow(index);
}

//检验数据
function checkTaxData(index){
	gridHandel.endEditRow();
	var _taxEnd = gridHandel.getFieldData(index,'taxEnd');
	if(_taxEnd == ""){
		$_jxc.alert('毛利额度止不能为空');
		return false;
	}
	if(parseFloat(_taxEnd) == 0){
		$_jxc.alert('毛利额度止要大于0');
		return false;
	}
	
	var _taxA = gridHandel.getFieldData(index,'taxA');
	var _taxB = gridHandel.getFieldData(index,'taxB');
	if(_taxA == ""){
		$_jxc.alert('甲方分配百分比不能为空');
		return false;
	}
	return true;
}

//不能编辑小于当前行数的毛利额度止
function checkIfCanEdit(index){
	var _rows = $('#'+dataGridId).datagrid('getRows').length;
	if(index < (_rows-1))return false;
	return true;
}

//改变默认数据
function changeDefaultData(index){
	gridDefault.taxStart = gridHandel.getFieldData(index,'taxEnd');
}

//毛利额度止 监听
var chTaxEndFlag = false;
function changeTaxEnd(newV,oldV){
	if(chTaxFlag){
		chTaxFlag = false;
		return;
	}
	if(newV == ""){
		$_jxc.alert("毛利额度止不能为空");
		chTaxFlag = true;
		$(this).numberbox('setValue',oldV);
		return 
	}
	var _taxStart = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'taxStart');
	if(parseFloat(newV) <= parseFloat(_taxStart)){
		$_jxc.alert("毛利额度止不能小于等于毛利额度起");
		chTaxFlag = true;
		$(this).numberbox('setValue',oldV);
		return 
	}
	
	//不是最后一行
	if(gridHandel.getSelectRowIndex() < ($('#'+dataGridId).datagrid('getRows').length-1)){
		$('#'+dataGridId).datagrid('updateRow',{
			index:gridHandel.getSelectRowIndex()+1,
			row: {
				taxStart: newV
			}
		});
	}
}

//甲分配 监听
var chTaxFlag = false;
function changeTaxA(newV,oldV){
	if(chTaxFlag){
		chTaxFlag = false;
		return;
	}
	if(newV == ""){
		$_jxc.alert("甲方分配百分比不能为空");
		chTaxFlag = true;
		$(this).numberbox('setValue',oldV);
		return 
	}
	gridHandel.setFieldValue('taxB',parseFloat(100-newV).toFixed(4));
}

// 保存
function saveContract(){
	//合同名称
	var _contactName = $.trim($("#contactName").val());
	if(!_contactName){
		$_jxc.alert('合同名称不能为空');
		return;
	}
	//时间起
	var _startTime = $.trim($("#startTime").val());
	if(!_startTime){
		$_jxc.alert('合同有效期起不能为空');
		return;
	}
	//时间止
	var _endTime = $.trim($("#endTime").val());
	if(!_endTime){
		$_jxc.alert('合同有效期止不能为空');
		return;
	}
	//甲方公司
	var _companyA = $.trim($("#branchId").val());
	if(!_companyA){
		$_jxc.alert('甲方(公司)不能为空');
		return;
	}
	//乙方公司
	var _companyB = $.trim($("#branchIdB").val());
	if(!_companyB){
		$_jxc.alert('乙方(签约机构)不能为空');
		return;
	}
	
	var _taxList = checkTaxListData();
	if(!_taxList) return;
	
	var param = {
		contactName:_contactName,
		startTime:_startTime,
		endTime:_endTime,
		branchId:_companyA,
		branchIdB:_companyB,
		contactsA:$.trim($('#contactsA').val())||'',
		mobileA:$.trim($('#mobileA').val())||'',
		contactsB:$.trim($('#contactsB').val())||'',
		mobileB:$.trim($('#mobileB').val())||'',
		remark:$.trim($('#remark').val())||'',
		taxList:_taxList
	}
	
	console.log(param);
	
}


function checkTaxListData(){
	gridHandel.endEditRow();
	var _rows = $('#'+dataGridId).datagrid('getRows');
	var errorFlag = true;
	_rows.forEach(function(obj,index){
		if(obj.taxEnd == '' || typeof obj.taxEnd == 'undefined'){
			$_jxc.alert("毛利梯度第"+(index+1)+"行 毛利额度止不能为空");
			errorFlag = false;
			return errorFlag;
		}
		if(parseFloat(obj.taxEnd) < parseFloat(obj.taxStart)){
			$_jxc.alert("毛利梯度第"+(index+1)+"行 毛利额度止不能小于毛利额度起");
			errorFlag = false;
			return errorFlag;
		}
		if(obj.taxB == ''){
			$_jxc.alert("毛利梯度第"+(index+1)+"行 甲方分配百分比不能为空");
			errorFlag = false;
			return errorFlag;
		}
	})
	
	if(!errorFlag)return false;
	
	return _rows;
}


/**
 * 返回领用单
 */
function back(){
	toClose();
}

