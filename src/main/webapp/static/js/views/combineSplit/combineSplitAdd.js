var combineSplitEditDg;
var datagridId = "combineSplitEditGrid";
$(function(){
    //开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    //初始化列表
    initCombineSplieEditGrid();
    
});

function selectTion(){
	
}

function changeAmount(newV,oldV){
	console.log(newV);
	
}

var gridHandel = new GridClass();

var gridDefault = {
	componentNum:0,
}

function initCombineSplieEditGrid() {
	
	gridHandel.setGridName(datagridId);
    gridHandel.initKey({
        firstName:'componentNum',
        enterName:'componentNum',
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
                gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefault);
                setTimeout(function(){
                    gridHandel.setBeginRow(gridHandel.getSelectRowIndex()+1);
                    gridHandel.setSelectFieldName("componentNum");
                    gridHandel.setFieldFocus(gridHandel.getFieldTarget('componentNum'));
                },100)
            }else{
            	branchId = $("#createBranchId").val();
                selectGoods(arg);
            }
        },
    })
     combineSplitEditDg=$("#"+datagridId).datagrid({
        method: 'post',
        align: 'center',
        url: '',
        singleSelect: true,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        //fitColumns:true,    //占满
        height:'100%',
        pageSize:20,
        showFooter:true,
        columns: [[
			{
				field : 'ck',
				checkbox : true
			},
            {field: 'skuCode', title: '货号', width: '135px', align: 'left',
            	formatter : function(value, row,index) {
                   if(row.isFooter){
                    	return '<div class="ub ub-pc">合计</div> '
                    }
                }
            },
            {field: 'skuName', title: '商品名称', width:'180px', align: 'left'},
            {field: 'componentNum', title: '数量', width:'100px', align: 'left',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value||value==""){
                        row["componentNum"] = parseFloat(value||0).toFixed(2);
                    }
                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    value:'0',
                    options:{
                        min:0,
                        precision:4,
                        onChange: onChangeRealNum,
                    }
                },
            },
            {field: 'skuDetailType', title: '成分类型', width:'100px', align: 'left',
            	formatter:function(value,row,index){
            		return  '2';
            	}
            },
            {field: 'unit', title: '单位', width:'90px', align: 'left'},
            {field: 'salePrice', title: '单价', width:'90px', align: 'left'},
            {field: 'amount', title: '金额', width:'90px', align: 'left'},
            {field: 'remark', title: '备注', width: '250px', align: 'left'}
        ]],
        onClickCell : function(rowIndex, field, value) {
			gridHandel.setBeginRow(rowIndex);
			gridHandel.setSelectFieldName(field);
			var target = gridHandel.getFieldTarget(field);
			if(target){
				gridHandel.setFieldFocus(target);
			}else{
				gridHandel.setSelectFieldName("componentNum");
			}
		},
         onLoadSuccess:function(data){
            gridHandel.setDatagridHeader("center");
            updateFooter();
         }
    });
    gridHandel.setLoadData([$.extend({},gridDefault)]);
}

//监听商品数量
function onChangeRealNum(newV,oldV) {
	if("" == newV){
	  messager("商品数量输入有误");
	  gridHandel.setFieldValue('componentNum',oldV);
      return;
	}
    updateFooter();
}

function updateFooter(){
    var fields = {componentNum:0};
    var argWhere = {}
    gridHandel.updateFooter(fields,argWhere);
}

//选择商品
function selectGoods(searchKey){
	selectGoodsDialog(searchKey);
}

/**
 * 商品选择
 */
function selectGoodsDialog(searchKey) {
	var branchId=null;
	//判定供应商是否存在
    if($("#createBranchId").val()==""){
        messager("请先选择机构");
        return;
    }
    branchId=$("#createBranchId").val();
	gFunGoodsSelect(searchKey,branchId);
}

//商品选择 公共使用
function gFunGoodsSelect(searchKey,branchId){
	new publicGoodsService("PA",function(data){
    	if(data.length==0){
            return;
        }
    	if(data.length > 1){
    		messager('只能选择一个组合商品');
    		return;
    	}
    	
    	$("#skuId").val(data[0].skuId);
    	$("#skuCode").val(data[0].skuCode);
    	$("#skuName").val(data[0].skuName);
    	$("#salePrice").val(data[0].salePrice);
    	$("#componentNum").numberbox('setValue',1);
    	$("#amount").val(data[0].salePrice);
    	//查询成分商品
    	selectView($("#skuId").val());
    },searchKey,0,"","",branchId,"","0");
}

/**
 * 机构列表下拉选
 */
function selectBranch (){
	new publicAgencyService(function(data){
		$("#createBranchId").val(data.branchesId);
		$("#createBranchName").val("["+data.branchCode+"]"+data.branchName);
	},"","");
}
//根据选中skuid查询价格、库存
function selectView(searchskuId){
	$.ajax({
		// url : contextPath+"/goods/component/queryComponent",
		url : contextPath + "/stock/combineSplit/getCombineSplitDetailList",
		type : "POST",
		data : {
			"skuId" : searchskuId,
			"branchId" :$("#createBranchId").val()
		},
		success : function(result) {
			if (result.length > 0) {
				setDataValue(result);
			} else {
				// result.length <0 清空数据
				$("#"+datagridId).datagrid('loadData', {
					total : 0,
					rows : []
				});
			}
		},
		error : function(result) {
			successTip("请求发送失败或服务器处理失败");
		}
	});
}
// 二次查询设置值
function setDataValue(data) {
	console.log("/////////////////////");
	console.log(data);
    var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
    var addDefaultData  = gridHandel.addDefault(data,gridDefault);
    var keyNames ={};
    var rows = gFunUpdateKey(addDefaultData,keyNames);
    
    var argWhere ={skuCode:1};  //验证重复性
    var isCheck ={isGift:1 };   //只要是赠品就可以重复
    var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);
    console.log('38',newRows);
    gridHandel.setLoadData(newRows);
    $("#"+datagridId).datagrid('reload',newRows);
   
}

//保存
function saveCombineSplit(){
    $("#"+datagridId).datagrid("endEdit", gridHandel.getSelectRowIndex());
    var rows = gridHandel.getRowsWhere({skuName:'1'});
    console.log(rows);
    $(gridHandel.getGridName()).datagrid("loadData",rows);
    if(rows.length==0){
        messager("表格不能为空");
        return;
    }
    var isCheckResult = true;
    var isChcekPrice = false;
    
    $.each(rows,function(i,v){
        /*if(parseFloat(v["costPrice"])<=0){
            isChcekPrice = true;
        }*/
    });
    if(isCheckResult){
        if(isChcekPrice){
            $.messager.confirm('系统提示',"新单价存在为0，是否确定保存",function(r){
                if (r){
                    saveDataHandel(rows);
                }
            });
        }else{
            saveDataHandel(rows);
        }
    }
}

function saveDataHandel(rows){
	// 主商品Id
	var skuId = $("#skuId").val();
	// 主商品编号
	var skuCode = $("#skuCode").val();
	// 机构
	var branchId =$("#createBranchId").val();
	// 组合或拆分
	var formType = $("#formType").combobox('getValue');
    //商品名称
    var skuName = $("#skuName").val();
    //数量
    var totalNum = $("#totalNum").val();
    //单价
    var salePrice=$("#salePrice").val();
    //金额
    var amount=$("#amount").val();
    // 备注
    var remark = $("#remark").val();
    // 原因
    var reason = $("input[name='reason']").val()  
    
    var tempRows = [];
    //创建一个主商品，当组合拆分单的明细一项，并设置调整单商品明细类型为1主商品
    var masterStock = {
    		realNum: totalNum,
    		largeNum:0,
    		originalPrice:0,
    		price:0,
    		skuDetailType:1,
    		skuId:skuId,
    		skuCode:skuCode,
    		amount:amount,
    		salePrice:salePrice
    };
    tempRows.push(masterStock);
    // 成分商品
    $.each(rows,function(i,data){
        var temp = {
        	realNum: data.componentNum,
        	largeNum:0,
    		originalPrice:0,
    		price:0,
        	skuDetailType:2,
        	skuId:data.componentSkuId,
        	skuCode:data.skuCode,
        	amount:data.amount,
        	salePrice:data.salePrice

        }
        tempRows.push(temp);
    });
    var jsonData = {
    		skuId:skuId,
    		skuCode:skuCode,
    		createBranchId:branchId,
    		formType:formType,
        	skuName:skuName,
        	totalNum:totalNum,
        	salePrice:salePrice,
        	amount:amount,
            remark:remark,
            stockFormDetailList:tempRows
        };
    console.log('组合单',JSON.stringify(jsonData));
    $.ajax({
        url:contextPath+"/stock/combineSplit/saveCombineSplit",
        type:"POST",
        data:{"data":JSON.stringify(jsonData)},
        success:function(result){
            if(result['code'] == 0){
                console.log(result);
                successTip(result['message']);
            }else{
                successTip(result['message']);
            }
        },
        error:function(result){
            successTip("请求发送失败或服务器处理失败");
        }
    });
}
