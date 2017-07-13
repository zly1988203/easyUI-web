
//月份间隔
var monthMargin = 6;
var chargeStatus = "add";
var _urlMonthStr = getUrlQueryString('monthStr');
var gridUrl;
$(function(){
	chargeStatus = $('#chargeStatus').val();
	//开始和结束时间
    $("#year").val(dateUtil.getCurrentDate().format("yyyy"));
    //新增
    if(chargeStatus == 'add'){
    	initStorePlanList();
    	//机构选择初始化
    	$('#branchSelect').branchSelect({
    		param:{
    			branchTypesStr:$_jxc.branchTypeEnum.OWN_STORES + ',' + $_jxc.branchTypeEnum.FRANCHISE_STORE_B + ',' + $_jxc.branchTypeEnum.FRANCHISE_STORE_C
    		},
    		onAfterRender:function(data){
    			//修改机构重设表格数据
    			//gridHandel.setLoadData(getInitDate())
    		}
    	});
    }else if(chargeStatus == 'edit'){
    	//编辑
    	var branchId = $("#branchId").val();
    	var year = $("#year").val();
    	//方式一
    	gridUrl = contextPath + "/target/storePlan/getStorePlanListByYear?branchId="+branchId+"&year="+year;
		
		initStorePlanList();
		
    	//方式二
//		$("#"+datagridId).datagrid('options').queryParams = {"branchId":branchId,"year":year}
//		$("#"+datagridId).datagrid('options').url = contextPath + "/target/storePlan/getStorePlanListByYear";
//		$("#"+datagridId).datagrid('load');
    }
    
});

//选择年份
function selecYear(){ 
	//初始化表格
	gridHandel.setLoadData(getInitDate())
}

function getInitDate(){
	var source_data = [];
	var _dataV = $('#year').val();
	var _year = _dataV;
	for(var i = 1;i <= 12; i++){
		source_data.push({
			    month:i,
			    monthStr:_year+'-'+(i<10?'0'+i:i),
				monthSaleAmount:0,
				dayavgSaleAmount:0,
				monthCostAmount:0,
				dayavgSaleAmountOnline:0,
				dayavgSaleAmountOffline:0,
				dayavgCostAmount:0
			});
	}
	return source_data;
}

var gridHandel = new GridClass();

var datagridId = 'storePlanList';
//初始化表格 没有成本价权限
function initStorePlanList(){
	gridHandel.setGridName(datagridId);
	
	gridHandel.initKey({
		firstName:'dayavgSaleAmountOnline',
	});
	
    dg = $("#"+datagridId).datagrid({
        method:'post',
        align:'right',
        url:gridUrl,
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        data:getInitDate(),
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
        columns:[[
            {field:'month',hidden:true},     
            {field:'id',hidden:true},     
            {field:'monthStr',title:'月份',align:'left',width: 120,
            	formatter:function(value,row,index){
            		if(row.isFooter){
            			return '<p class="ub ub-ac ub-pe uc-red">年目标销售合计:</p>';
            		}
            		return value;
            	}
            },
            {field:'monthSaleAmount',title:'月目标销额合计',align:'right',width: 120,
            	formatter:function(value,row,index){
            		if(row.isFooter){
            			return '<b class="ub ub-ac " id="yearCount">1000</b>';
            		}
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'dayavgSaleAmount',title:'日均目标销售合计',align:'right',width: 120,
            	formatter:function(value,row,index){
            		if(row.isFooter){
            			return '<p class="ub ub-ac ub-pe uc-red">线上目标销售合计:</p>';
            		}
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'monthCostAmount',title:'月目标成本合计',align:'right',width: 120,
            	formatter:function(value,row,index){
            		if(row.isFooter){
            			return '<b class="ub ub-ac " id="onCount">1000</b>';
            		}
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'dayavgSaleAmountOnline',title:'线上日均销售金额',align:'right',width: 120,
            	formatter:function(value,row,index){
            		if(row.isFooter){
            			return '<p class="ub ub-ac ub-pe uc-red">线下目标销售合计:</p>';
            		}
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                	type:'numberbox',
                	options:{
                		min:0,
                		precision:4,
                		onChange:changeOnDatePrice
                	}
                }
            },
            {field:'dayavgSaleAmountOffline',title:'线下日均目标销售金额',align:'right',width: 120,
            	formatter:function(value,row,index){
            		if(row.isFooter){
            			return '<b class="ub ub-ac " id="upCount">1000</b>';
            		}
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                	type:'numberbox',
                	options:{
                		min:0,
                		precision:4,
                		onChange:changeUpDatePrice
                	}
                }
            },
            {field:'dayavgCostAmount',title:'日均目标成本金额',align:'right',width: 120,
            	formatter:function(value,row,index){
            		if(row.isFooter){
            			return '';
            		}
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                	type:'numberbox',
                	options:{
                		min:0,
                		precision:4,
                		onChange:changeDatePrice
                	}
                }
            }
        ]],
        onClickCell:function(rowIndex,field,value){
        	// if(!checkBranch())return;
        	//if(!checkIfEdit(rowIndex+1))return;
            gridHandel.setBeginRow(rowIndex);
            gridHandel.setSelectFieldName(field);
            var target = gridHandel.getFieldTarget(field);
            if(target){
                gridHandel.setFieldFocus(target);
            }else{
                gridHandel.setSelectFieldName("dayavgSaleAmountOnline");
            }
        },
        onLoadSuccess:function(data){
            gridHandel.setDatagridHeader("center");
            updateFooter();
        }       
    });
}

//监听线上日均销售金额
var editErrorOD = false;
function changeOnDatePrice(newV,oldV){
	if(editErrorOD){
		editErrorOD = false;
		return;
	}
	
	if(newV > $_jxc.MAXNUMBER){
		$_jxc.alert('金额不得大于 '+$_jxc.MAXNUMBER);
		editErrorOD = true;
		$(this).numberbox('setValue',oldV);
		return;
	}
	
	calculateMoney();
	updateFooter();
}

//监听线下日均销售金额
var editErrorUD = false;
function changeUpDatePrice(newV,oldV){
	if(editErrorUD){
		editErrorUD = false;
		return;
	}
	if(newV > $_jxc.MAXNUMBER){
		$_jxc.alert('金额不得大于 '+$_jxc.MAXNUMBER);
		editErrorUD = true;
		$(this).numberbox('setValue',oldV)
	}
	
	calculateMoney();
	updateFooter();
}

//监听线上日均销售金额
var editError = false;
function changeDatePrice(newV,oldV){
	if(editError){
		editError = false;
		return;
	}
	if(newV > $_jxc.MAXNUMBER){
		$_jxc.alert('金额不得大于 '+$_jxc.MAXNUMBER);
		editError = true;
		$(this).numberbox('setValue',oldV)
	}
	
	//设值 月目标成本合计
	var _month = gridHandel.getSelectRowIndex()+1;
	gridHandel.setFieldsData({monthCostAmount:getNumberByMonth(_month,newV)});
}

//计算相关价格
function calculateMoney(){
	//线上
	var _onPriceValue = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'dayavgSaleAmountOnline');
	//线下
	var _upPriceValue = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'dayavgSaleAmountOffline');
	
	var _temPrice = parseFloat(_onPriceValue)+parseFloat(_upPriceValue);

	//设值 日均目标销售合计
	gridHandel.setFieldsData({dayavgSaleAmount:_temPrice});
	  
	//设值 月目标销售合计
	var _month = gridHandel.getSelectRowIndex()+1;
	gridHandel.setFieldsData({monthSaleAmount:getNumberByMonth(_month,_temPrice)});
}

//根据月份计算
function getNumberByMonth(month,number){
	var _dataV = $('#year').val();
	var _year = _dataV;//年
	if(month == 2){
		//平年 28天月
		if(0 == _year%4 && (_year%100 !=0 || _year%400 == 0)){
			return parseFloat(number)*29;
		}else{
			return parseFloat(number)*28;
		}
	}
	//31天月
	if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12 ){
		return parseFloat(number)*31;
	}
	//30天月
	if(month == 4 || month == 6 || month == 9 || month == 11){
		return parseFloat(number)*30;
	}
}

//检验机构
function checkBranch(){
	if(!$.trim($("#branchName").val())){
	    $_jxc.alert("请选择机构");
	    return false;
	 } 
	 return true;
}

//校验是否可以编辑
function checkIfEdit(month){
	console.log('month',month);
	
	var _year = $('#year').val();
	
	var _dat = new Date();
	var _curYear = _dat.getFullYear();
	//当前月份
	var _curMonth = _dat.getMonth()+1;
	
	if(_year > _curYear || (_curYear == _year && month >= _curMonth) ) return true;
	
	
	//跨年
	var lastMargin = 0;
	if(_year < _curYear){
		lastMargin = 12 - month;
		lastMargin += _curMonth-1;
		//月跨度 monthMargin 个月以前 
		if(lastMargin >= monthMargin){
			$_jxc.alert('不可编辑'+monthMargin+'月以前的计划');
			return false;
		}
	}
	
	if(_year == _curYear && month < _curMonth ){
		if(_curMonth - month > monthMargin ){
			$_jxc.alert('不可编辑'+monthMargin+'月以前的计划');
			return false
		}
	}
	
	return true;
}

//合计
function updateFooter(){
    gridHandel.updateFooter({},{});
    
    //年目标销售合计
    var _yearCount = 0;
    //线上目标销售合计
    var _onCount = 0;
    //线下目标销售合计
    var _upCount = 0;
    
    var _rows = gridHandel.getRows();
    _rows.forEach(function(obj,index){
    	if(obj){
    		_yearCount += parseFloat(obj.monthSaleAmount||0);
    		_onCount   += getNumberByMonth(index+1,parseFloat(obj.dayavgSaleAmountOnline||0));
    		_upCount   += getNumberByMonth(index+1,parseFloat(obj.dayavgSaleAmountOffline||0));
    	}
    });
    		
    $('#yearCount').text(_yearCount.toFixed(2));
    $('#onCount').text(_onCount.toFixed(2));
    $('#upCount').text(_upCount.toFixed(2));
}


//保存 门店计划
function savePlan(){
	if(!checkBranch())return;
	gridHandel.endEditRow();
	var _rows = gridHandel.getRows();
	var _errorFlag = false;
	_rows.forEach(function(obj,index){
		if(obj){
			
			//数字转字符串
			obj.dayavgSaleAmount = obj.dayavgSaleAmount+"";
			obj.monthCostAmount = obj.monthCostAmount+"";
			obj.monthSaleAmount = obj.monthSaleAmount+"";
			obj.dayavgSaleAmountOnline = obj.dayavgSaleAmountOnline+"";
			obj.dayavgSaleAmountOffline = obj.dayavgSaleAmountOffline+"";
			obj.dayavgCostAmount = obj.dayavgCostAmount+"";
			
			if(parseFloat(obj.dayavgSaleAmountOnline||0) > 0 || parseFloat(obj.dayavgSaleAmountOffline||0) > 0 || parseFloat(obj.dayavgCostAmount||0) > 0 ){
				_errorFlag = true;
			}
		}
	});
	if(!_errorFlag){
		$_jxc.alert('计划不能为空');
		return ;
	}
	
	var _branchId = $('#branchId').val()||'';
	var _temYear = parseInt($('#year').val()||0);
	//异步参数
	var _reqObj = {
		branchId:_branchId,
		year: _temYear,
		itemList:_rows
	};
	
	var url = "";
    if(chargeStatus === "add"){
        url = contextPath + "/target/storePlan/addStorePlan";
    }else if(chargeStatus === "edit"){
    	url = contextPath + "/target/storePlan/updateStorePlan";
    }
	
	var param = {
        url:url,
        data:JSON.stringify(_reqObj),
        contentType:'application/json',
    }
	//console.log('_rows',_reqObj);
	
	$_jxc.ajax(param,function (result) {
        if(result['code'] == 0){
            $_jxc.alert("保存成功！",function(){
            	if(chargeStatus === "add"){
            		location.href = contextPath + "/target/storePlan/toEdit?branchId=" + _branchId+"&monthStr="+_temYear+"-01";
            	}else if(chargeStatus === "edit"){
            		location.href = contextPath + "/target/storePlan/toEdit?branchId=" + _branchId+"&monthStr="+_urlMonthStr;
                }
            });
        }else{
            $_jxc.alert(result['message'])
        }
    });
	
}

/*//查询入库单
function queryForm(){
	 if($("#branchName").val()==""){
	    $_jxc.alert("请选择店铺名称");
	    return;
	 } 
	var fromObjStr = $('#queryForm').serializeObject();
	// 去除编码
	fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)
	$("#"+datagridId).datagrid("options").method = "post";
	$("#"+datagridId).datagrid('options').url = contextPath + '/storeDaySale/report/getStoreDaySaleList';
	$("#"+datagridId).datagrid('load', fromObjStr);
}*/


//新增门店计划
function addPlan(){
	toAddTab("新增门店计划",contextPath + "/target/storePlan/toAdd");
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
	 $("#saleTime").val(dateUtil.getCurrentDate().format("yyyy-MM"));
};