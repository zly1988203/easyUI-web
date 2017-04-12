var datagridId = "saleMangeadd";
var gridDefault = {
    oldSaleRate:"0%",
    newSaleRate:"0%"
}
$(function(){
	// 开始和结束时间
// $("#startTime").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
// $("#endTime").val("2016-11-18");
    $("#dailyStartTime").val("00:00:00");
    $("#dailyEndTime").val("23:59:59");
    initDatagridSpecial();
    // 禁止按钮点击事件
    disableGoods('','GoodsType');
    // 加载进行批量特价设置
    /*$('#special,#discount,#batchcount').on('input',function(){
    	var obj=$(this).attr('id');
    	specialRows(obj,$(this).val());

	})*/
	//一周星期获取和初始化
	  weekCheckDay();
	$(document).on('click','#weekday .ubcheckweek',function(){
	//点击取消切换方法执行
	  weekCheckDay();
	})
	
});

//特价
function changeSpecNum(newV,oldV){
	if(newV && newV>0){
		specialRows('special',newV);
	}
}

//折扣
function changeDisNum(newV,oldV){
	if(newV && newV>0){
		specialRows('discount',newV);
	}
}

//偶数特价
function changeOddprice(newV,oldV){
	if(newV && newV>0){
		specialRows('batchcount',newV);
	}
}

// select 选择切换
var gVarLastActivityType = "1";
var gVarAutoSelect = false;
function onChangeSelect(){
    if(gVarAutoSelect){
	    gVarAutoSelect = false;
	    return;
    }
    var priceVal=$("#activityType").combobox('getValue');
    var changeType = function(){
	    gVarLastActivityType = priceVal;
	    switch(priceVal)
	    {
	 	    case "1":
			    selectOptionSpecial();
			    break;
		    case "2": //折扣
			    selectOptionzk();
			    break;
		    case "3":
			    selectOptionOdd();
			    break;
		    case "4":
			    optionHide();
			    $("#consaleadd").removeClass("unhide");
			    initDatagridRedemption();
			    disableGoods('','GoodsType');
			    break;
		    case "5":
			    selectOptionMj();
			    break;
		    case "6":
			    optionHide();
			    $("#consaleadd").removeClass("unhide");
			    initDatagridCompose();
			    disableGoods('','GoodsType');
			    break;
		    case "10": //买满送
		    	selectOptionmms();
			    break;
	    }
	};
    var rows = gridHandel.getRows();
	if(rows.length==0 || JSON.stringify(rows[0])==JSON.stringify({oldPurPrice:0})){
		changeType();
	}else{
		$.messager.confirm("","更换活动类型将清空当前列表信息，是否更换？",function(b){
			if(!b) {
				gVarAutoSelect = true;
				$("#activityType").combobox('select',gVarLastActivityType);
				return;
			};
			changeType();
		});
	}
}

var cheFlag = false;
//选择买满金额 买满数量
function onChangemmsSelect(newV,oldV){
	var _this = $(this);
	if(cheFlag){
		cheFlag = false;
		return;
	}
	$.messager.confirm("提示","更换活动类型将清空当前列表信息，是否更换？",function(b){
		if(b){
			gridTitleName = newV == '0' ? '买满金额':'买满数量';
			initDatagridmmsTJ();
		}else{
			cheFlag = true;
			$(_this).combobox('setValue',oldV);
		}
	})
	
}

// 特价状态选择隐藏
function selectOptionSpecial(){
    // 禁止按钮点击事件
    disableGoods('','GoodsType');
	optionHide();
	$("#consaleadd").removeClass('unhide');
	$('.special').removeClass('unhide');
	initDatagridSpecial();
}

//买满送
function selectOptionmms(){
	optionHide();
	disableGoods('','GoodsType');
	$('#consaleadd').addClass('unhide');
	
	$('.mmsTypechoose').removeClass('unhide');
	$('.mmstype').removeClass('unhide');
	
	$('#consolemms').addClass('ub-f1');
	$('#consolemms').removeClass('unhide');
	
	//先移除事件
	$(document).off('mousedown','input[name="mmsstatus"]');
	//买满送 --- 全场 类别 商品 选择事件
	$(document).on('mousedown','input[name="mmsstatus"]',function(){
		var _this = $(this);
		$.messager.confirm("","更换活动类型将清空当1前列表信息，是否更换？",function(b){
			if(b){
				//重置 买满送 内部tab标示 
				hasClickTab = false;
				
				$(_this).prop('checked',true);
				
				var mmsstatusV = $(_this).val();
				// 2 全场
				if(mmsstatusV == '2'){
					choosemmsTab(mmsstatusV);
				}else if(mmsstatusV == '1'){
					//1类别
					choosemmsTab(mmsstatusV);
					$("#tabone").text("类别信息");
					disableGoods('SelectGoods','');
					initDatagridmmjComLB();
				}else{
					//0  商品  
					choosemmsTab(mmsstatusV);
					$("#tabone").text("商品信息");
					disableGoods('','GoodsType');
					initDatagridmmjComLG();
				}
			}else{
				return false;
			}
		})
	})
	
	//初始化买满送 梯度datagrid
	initDatagridmmsTJ();
	//买满送 礼品列表
	initDatagridmmsGOOD();
}


//买满送 tab标签内容控制
function choosemmsTab(type){
	$("#mmsTab").find("li").removeClass("tabs-selected").eq(0).addClass("tabs-selected");
	if(type == '2'){
		//全场时  标签页隐藏
		$("#mmsTab").addClass('unhide');
		//隐藏第一个div datagrid 
		$("#area1").addClass("unhide");
		//显示 第二个 div datagrid 
		$("#area2").removeClass("unhide");
	}else{
		//否则   标签页显示
		$("#mmsTab").removeClass('unhide');
		//隐藏第一个div datagrid 
		$("#area1").removeClass("unhide");
		//显示 第二个 div datagrid 
		$("#area2").addClass("unhide");
	}
	
}

var hasClickTab = false;
//点击买满送tab 控制页面内容显示
function clickmmsTab(type){
	$("#mmsTab").find("li").removeClass("tabs-selected").eq(type-1).addClass("tabs-selected");
	var tabtext = $("#mmsTab").find("li.tabs-selected .tabs-title").text();
	//类别 - 商品
	if(type == 1){
		$("#area1").removeClass("unhide");
		$("#area2").addClass("unhide");
		if(tabtext == '类别信息'){
			disableGoods('SelectGoods','');
		}
	}else{
		disableGoods('','GoodsType');
		//赠品信息
		$("#area1").addClass("unhide");
		$("#area2").removeClass("unhide");
		if(!hasClickTab){
			hasClickTab = true;
			gridHandelT.setLoadData([$.extend({},mmsTJDefault)]);
			gridHandel.setLoadData([$.extend({},gridDefaultG)]);
			
		}
	}
}

var gridHandelB = new GridClass();
//初始化表格-买满送 主设置 -类别
function initDatagridmmjComLB(){
	gridHandelB.setGridName("mmscommonList");
    $("#mmscommonList").datagrid({
        align:'center',
        // toolbar: '#tb', //工具栏 id为tb
        singleSelect:false,  // 单选 false多选
        rownumbers:true,    // 序号
        fitColumns:true,    // 每列占满
        fit:true, //占满
        showFooter:true,
		height:'50%',
		pageSize:50,
		width:'100%',
		columns:[[
					{field:'ck',checkbox:true},
					{field:'cz',title:'操作',width:'60px',align:'center',
					    formatter : function(value, row,index) {
					        var str = "";
					        if(row.isFooter){
					            str ='<div class="ub ub-pc">合计</div> '
					        }else{
					            str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandelmmscomB(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
					                '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandelmmscomB(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
					        }
					        return str;
					    },
					},
					{field:'categoryCode',title:'类别编码',width:'140',align:'left'},
					{field:'categoryName',title:'类别名称',width:'140',align:'left'},
					
        ]],
        onAfterRender:function(target){
        	console.log('target',target);
        },
        onLoadSuccess:function(data){
    	  gridHandelB.setDatagridHeader("center");
        }
    });
    gridHandelB.setLoadData([$.extend({},gridDefault)])
 }

var gridHandelG = new GridClass();

// 初始化表格-买满送 礼品默认数据
var gridDefaultG = {
	limitCount:0,	
	limitAmount:0,
}
//初始化表格-买满送 主设置 -商品
function initDatagridmmjComLG(){
	gridHandelG.setGridName("mmscommonList");
	gridHandelG.initKey({
        firstName:'skuCode',
        enterName:'skuCode',
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
            	gridHandelG.addRow(parseInt(gridHandelG.getSelectRowIndex())+1,gridDefaultG);
                setTimeout(function(){
                	gridHandelG.setBeginRow(gridHandelG.getSelectRowIndex()+1);
                    gridHandelG.setSelectFieldName("skuCode");
                    gridHandelG.setFieldFocus(gridHandelG.getFieldTarget('skuCode'));
                },100)
            }else{
            	selectGoodsComG(arg);
            }
        },
    })
    
    $("#mmscommonList").datagrid({
      align:'center',
      // toolbar: '#tb', //工具栏 id为tb
      singleSelect:false,  // 单选 false多选
      rownumbers:true,    // 序号
      fitColumns:true,    // 每列占满
      fit:true, //占满
		height:'50%',
		pageSize:50,
		width:'100%',
		columns:[[
                  {field:'ck',checkbox:true},
                  {field:'cz',title:'操作',width:'60px',align:'center',
					    formatter : function(value, row,index) {
					        var str = "";
					            str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandelmmscomG(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
					                '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandelmmscomG(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
					        return str;
					    },
					},
					{field:'skuCode',title:'货号',width:'80',align:'left',editor:'textbox'},
					{field:'skuName',title:'商品名称',width:'100',align:'left'},
					{field:'barCode', title: '条码', width:80, align: 'left'},
					{field:'unit', title: '单位', width:70, align: 'left'},
		            {field:'spec', title: '规格', width:70, align: 'left'},
		            {field:'price',title:'零售价',width:'80px',align:'right',
		            	formatter:function(value,row,index){
		                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                },
		            }
        ]],
		onClickCell : function(rowIndex, field, value) {
			gridHandelG.setBeginRow(rowIndex);
			gridHandelG.setSelectFieldName(field);
			var target = gridHandelG.getFieldTarget(field);
			if(target){
				gridHandelG.setFieldFocus(target);
			}else{
				gridHandelG.setSelectFieldName("skuCode");
			}
		},
    onLoadSuccess:function(data){
    	gridHandelG.setDatagridHeader("center");
	  }
  });
	gridHandelG.setLoadData([$.extend({},gridDefaultG)])
}


var gridHandelT = new GridClass();
var gridTitleName = "买满金额"; //买满送梯度标题设置

//买满条件默认数据
var mmsTJDefault={
	 limitCount:0,
	 limitAmount:0,
}
var temGflag = false;
//初始化表格-买满送条件  梯度
function initDatagridmmsTJ(){
	gridHandelT.setGridName("mmsgradedList");
	gridHandelT.initKey({
		firstName:gridTitleName == '买满数量' ? 'limitCount':'limitAmount',
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
            	var giftGoodsList = $("#mmsgoodList").datagrid('getRows');
//            	var flg = initmmTJGoodParams(gridHandelT.getSelectRowIndex(),true);
//            	if(!flg) return;
            		
            	gridHandelT.addRow(parseInt(gridHandelT.getSelectRowIndex())+1,mmsTJDefault);
                setTimeout(function(){
                	gridHandelT.setBeginRow(gridHandelT.getSelectRowIndex()+1);
                	if(gridTitleName == '买满数量'){
                		gridHandelT.setSelectFieldName("limitCount");
                    	gridHandelT.setFieldFocus(gridHandelT.getFieldTarget('limitCount'));
                	}else{
                		gridHandelT.setSelectFieldName("limitAmount");
                    	gridHandelT.setFieldFocus(gridHandelT.getFieldTarget('limitAmount'));
                	}
                	
                },100)
            }
        },
    })
    $("#mmsgradedList").datagrid({
        align:'center',
        // toolbar: '#tb', //工具栏 id为tb
        singleSelect:true,  // 单选 false多选
        rownumbers:true,    // 序号
        fitColumns:true,    // 每列占满
        fit:true, //占满
//        showFooter:true,
		height:'50%',
		pageSize:50,
		width:'100%',
        columns:[[
        			{field:'ck',checkbox:true},
					{field:'cz',title:'操作',width:'60px',align:'center',
					    formatter : function(value, row,index) {
					        var str = "";
					            str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandelmstd(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
					                '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandelmstd(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
					        return str;
					    },
					},
					{field:'limitCount',title:'买满数量',width:'80px',align:'right',hidden:gridTitleName =='买满数量'?false:true,
		                formatter:function(value,row,index){
		                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                },
		                editor:{
		                    type:'numberbox',
		                    options:{
		                        min:0,
		                        precision:2,
		                    }
		                },
		            }, 
		            {field:'limitAmount',title:'买满金额',width:'80px',align:'right',hidden:gridTitleName =='买满金额'?false:true,
		                formatter:function(value,row,index){
		                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                },
		                editor:{
		                    type:'numberbox',
		                    options:{
		                        min:0,
		                        precision:2,
		                    }
		                },
		            }, 
          ]],
       onEndEdit:function(rowIndex, rowData){
    	    var _this = this;
    	    console.log('onEndEdit rowData '+rowIndex+'',rowData);
//	        var ro = gridHandel.getRowsWhere({skuName:'1'});
//     	    if(ro.length > 0 ){
//     	    	$.messager.confirm("","更换买满条件会清空当前赠品列表信息，是否先保存当前赠品信息？",function(b){
//	  			   if(b){
//	  				   $(_this).datagrid('cancelEdit')
//	  			   }
//	  		    })
//     		   
//     	   }
	        
       },
       onBeginEdit:function(rowIndex, rowData){
        	
            console.log('onBeginEdit rowData '+rowIndex+'',rowData);
            if(rowData && rowData.goodsGiftList){
            	if(rowData.goodsGiftList.length > 0){
            		gridHandel.setLoadData(rowData.goodsGiftList)
            	}
	      	}else{
	      		gridHandel.setLoadData([$.extend({},gridDefaultG)])
	      	}
     	   //initmmTJGoodParams(rowIndex,false);
     	   /*var ro = gridHandel.getRowsWhere({skuName:'1'});
     	   if(ro.length > 0){
     		   $.messager.confirm("","更换买满条件会清空当前赠品列表信息，是否更换？",function(b){
     			   if(!b){
     				   gridHandelT.setBeginRow(rowIndex);
     				   var temS = gridTitleName =='买满金额'?'limitAmount':'limitCount';
     		  		   gridHandelT.setSelectFieldName(temS);
     				   var target = gridHandelT.getFieldTarget(temS);
     				   if(target){
     					  gridHandelT.setFieldFocus(target);
     				   }else{
     						
     						gridHandelT.setSelectFieldName(temS);
     				   }
     			   }
     		   })
     	   }*/
        }, 
  		onClickCell : function(rowIndex, field, value) {
  			gridHandelT.setBeginRow(rowIndex);
  			gridHandelT.setSelectFieldName(field);
			var target = gridHandelT.getFieldTarget(field);
			if(target){
				gridHandelT.setFieldFocus(target);
			}else{
				var temS = gridTitleName =='买满金额'?'limitAmount':'limitCount';
				gridHandelT.setSelectFieldName(temS);
			}
		},
        onLoadSuccess:function(data){
           var _this = this;
    	   console.log('data1',data);
    	   $(_this).datagrid('resize',{width:'100%',height:'300px'})
//    	   gridHandelT.setBeginRow(data.total - 1);
//		   var temS = gridTitleName =='买满金额'?'limitAmount':'limitCount';
//  		   gridHandelT.setSelectFieldName(temS);
//		   var target = gridHandelT.getFieldTarget(temS);
//		   if(target){
//			  gridHandelT.setFieldFocus(target);
//		   }else{
//				
//				gridHandelT.setSelectFieldName(temS);
//		   }
    	  gridHandelT.setDatagridHeader("center");
	  }
    });
	gridHandelT.setLoadData([$.extend({},mmsTJDefault)]);
 }


//初始化表格-买满送 赠品 商品
function initDatagridmmsGOOD(){
	gridHandel.setGridName("mmsgoodList");
    gridHandel.initKey({
        firstName:'skuCode',
        enterName:'skuCode',
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
                gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefaultG);
                setTimeout(function(){
                    gridHandel.setBeginRow(gridHandel.getSelectRowIndex()+1);
                    gridHandel.setSelectFieldName("skuCode");
                    gridHandel.setFieldFocus(gridHandel.getFieldTarget('skuCode'));
                },100)
            }else{
               selectGoodsG(arg);
            }
        },
    })
    $("#mmsgoodList").datagrid({
        align:'center',
        // toolbar: '#tb', //工具栏 id为tb
        singleSelect:false,  // 单选 false多选
        rownumbers:true,    // 序号
        fitColumns:true,    // 每列占满
        fit:true, //占满
        showFooter:true,
		height:'100%',
//		pageSize:50,
		width:'100%',
        columns:[[
                    {field:'ck',checkbox:true},
                    {field:'cz',title:'操作',width:'60px',align:'center',
					    formatter : function(value, row,index) {
					        var str = "";
					            str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
					                '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
					        return str;
					    },
					},
					{field:'skuCode',title:'货号',width:'80',align:'left',editor:'textbox'},
					{field:'skuName',title:'商品名称',width:'100',align:'left'},
					{field:'barCode', title: '条码', width:80, align: 'left'},
					{field:'unit', title: '单位', width:70, align: 'left'},
		            {field:'spec', title: '规格', width:70, align: 'left'},
		            {field:'price',title:'零售价',width:'80px',align:'right',
		            	formatter:function(value,row,index){
		                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                },
		            }, 
					{field:'giftNum',title:'数量',width:'100px',align:'right',
		            	formatter:function(value,row,index){
		            		if(!value){
		            			row['giftNum'] = 0;
		            		}
		                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                },
		                editor:{
		                    type:'numberbox',
		                    options:{
		                        min:0,
		                        precision:2,
		                    }
		                },
		            }, 
					{field:'giftAmount',title:'增加金额',width:'80px',align:'right',
		            	formatter:function(value,row,index){
		            		if(!value){
		            			row['giftAmount'] = 0;
		            		}
		                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                },
		                editor:{
		                    type:'numberbox',
		                    options:{
		                        min:0,
		                        precision:2,
		                        onChange:changeGiftPrice
		                    }
		                },
		            } 
          ]],
  		onClickCell : function(rowIndex, field, value) {
  			
			gridHandel.setBeginRow(rowIndex);
			gridHandel.setSelectFieldName(field);
			var target = gridHandel.getFieldTarget(field);
			if(target){
				gridHandel.setFieldFocus(target);
			}else{
				gridHandel.setSelectFieldName("skuCode");
			}
		},
      onLoadSuccess:function(data){
    	  
			gridHandel.setDatagridHeader("center");
				
		 }
    });
    gridHandel.setLoadData([$.extend({},gridDefaultG)])
 }


//买满送 金额改变监听
function changeGiftPrice(newV,oldV){
	var _this = this;
	var tempPrice = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'price');
	if(parseFloat(newV||0) > parseFloat(tempPrice||0)){
		$.messager.alert('提示','新增金额不得大于零售价','',function(){
			$(_this).numberbox('setValue',(oldV||0));
		});
	}
	//gridHandel
}

//买满送 参数保存
var mmsParams={
		actList:[],//活动列表
};

//赠品信息 暂时保存
function saveTempGiftGoods(){
	
	initmmTJGoodParams(gridHandelT.getSelectRowIndex(),true);
}

function resetGiftGoods(){
	var mmsTJObj = $("#mmsgradedList").datagrid('getRows')[gridHandelT.getSelectRowIndex()];
	delete mmsTJObj.goodsGiftList;
	gridHandel.setLoadData([$.extend({},gridDefaultG)]);
}

//封装 买满送 条件梯度和对于礼品参数  showAlert-->true进行提示  false不进行提示
function initmmTJGoodParams(index,showAlert){
	var curIndex = index||0;
	console.log('curIndex',curIndex);
	$("#mmsgradedList").datagrid('endEdit',curIndex);
	$("#mmsgoodList").datagrid('endEdit',gridHandel.getSelectRowIndex())
	//获取买满条件当前梯度
	var checkRows = $("#mmsgradedList").datagrid('getChecked');
	console.log('checkRows',JSON.stringify(checkRows));
	if(checkRows.length <= 0){
		if(showAlert)$.messager.alert('提示','请选择买满条件','',function(){});
		return false;
	}
	var mmsTJObj = checkRows[0];
	if(gridTitleName == '买满金额' && parseFloat(mmsTJObj.limitAmount||0)<= 0){
		if(showAlert)$.messager.alert('提示','当前买满金额不能小于等于0','',function(){});
		return false;
	}
	if(gridTitleName == '买满数量' && parseFloat(mmsTJObj.limitCount||0)<= 0){
		if(showAlert)$.messager.alert('提示','当前买满数量不能小于等于0','',function(){});
		return false;
	}
	
	//获取赠品信息的数据
	var giftGoods = gridHandel.getRowsWhere({skuName:'1'}) //$("#mmsgoodList").datagrid('getRows');
	if(giftGoods.length <= 0){
		if(showAlert)$.messager.alert('提示','请选择赠品信息','',function(){});
		return false;
	}
	
	var tempErrorIndexs = [];
	giftGoods.forEach(function(obj,index){
		//判断礼品数量
		if(parseFloat(obj.giftNum||0) <= 0){
			tempErrorIndexs.push(index);
		}
	});
	
	if(tempErrorIndexs.length <= 0){
		mmsTJObj.goodsGiftList = giftGoods;
		return true;
	}else{
		if(showAlert){
			$.messager.alert('提示','第'+tempErrorIndexs.join(',')+'行赠品数量不能小于等于0','',function(){
				gridHandel.setBeginRow(tempErrorIndexs[0]);
				gridHandel.setSelectFieldName('giftNum');
				var target = gridHandel.getFieldTarget('giftNum');
				if(target){
					gridHandel.setFieldFocus(target);
				}else{
					gridHandel.setSelectFieldName("giftNum");
				}
			})
		};
		return false;
	}
	
	
}


// 折扣状态选择隐藏
function selectOptionzk(){
	optionHide();
	$("#consaleadd").removeClass("unhide");
	initDatagridsortZk();
	//disableGoods('','GoodsType');
	disableGoods('SelectGoods','');
	//初始化为 类型折扣
	$('#sortZk').prop('checked',true);
	$('#activityScopedis').val('1');
	
	$('.discount').removeClass('unhide');
	$('.discountTypechoose').removeClass('unhide');
	$(document).on('mousedown','.discountTypechoose .disradio',function(){
		var _this = $(this);
		$('#activityScopedis').val(_this.val());
		var changeDisType = function(){
			_this.prop("checked",true);
			if(_this.val()==="1"){
				initDatagridsortZk();
				// 禁止按钮点击事件
				disableGoods('SelectGoods','');
			}else if(_this.val()==="0"){
				initDatagridoneZk();
				// 禁止按钮点击事件
				disableGoods('','GoodsType');
			}else if(_this.val()==="2"){
			    //全场折扣
				initDatagridallZk()
				// 禁止按钮点击事件
				disableGoods('SelectGoods','GoodsType');
			}
		}
		
		  // 保存结束编辑
		  $("#saleMangeadd").datagrid("endEdit", gridHandel.getSelectRowIndex());
			var rows= gridHandel.getRows();
		if(rows.length==0 || JSON.stringify(rows[0])==JSON.stringify({oldPurPrice:0})){
			changeDisType();
		}else{
			$.messager.confirm("","更换活动类型将清空当前列表信息，是否更换？",function(b){
				if(!b){
					return;
				}else{
					changeDisType();
				}
			});
		}
   })
}

// 偶数特价状态选择隐藏
function selectOptionOdd(){
    disableGoods('','GoodsType');
	optionHide();
	$("#consaleadd").removeClass('unhide');
	initDatagridOddtj();
    $('.oddprice ').removeClass('unhide');
}

// 满减状态选择隐藏
function selectOptionMj(){
	optionHide();
	//初始化
	$('#consalesetmj').removeClass('unhide');
	$("#consaleadd").removeClass('ub-f1');
	$("#consaleadd").removeClass('unhide');
	$('.mjTypechoose').removeClass('unhide');
	// 禁止按钮点击事件
	disableGoods('SelectGoods','GoodsType');
	//初始化为 全场满减
	$('#allMj').prop("checked",true);
	$('#activityScopemj').val('2');
	
	initDatagridallMj();
	initDatagridsortSet();


	$(document).on('mousedown','.mjTypechoose .mjradio',function(){

		var _this = $(this);
		$('#activityScopemj').val(_this.val());
		var changeDisType =  function(){
			_this.prop("checked",true);
			
			if(_this.val()=="2"){
				$("#consaleadd").addClass('ub-f1');
				$('#consaleadd').removeClass('unhide');
				$('#consalesetmj').addClass('unhide');
//				$('#allMj').prop("checked",true);

				$('#activityScopemj').val('2');
				//禁止按钮点击事件
				disableGoods('SelectGoods','GoodsType');
				initDatagridallMj();
				initDatagridsortSet();
			}
			else if(_this.val()=="1"){
				$("#consaleadd").addClass('ub-f1');
				$('#consaleadd').removeClass('unhide');
				$('#consalesetmj').removeClass('unhide');
		
//				$('#sortMj').prop("checked",true);
				
				$('#activityScopemj').val('1');
				//禁止按钮点击事件
				disableGoods('SelectGoods','');
				initDatagridsortMj();
				initDatagridsortSet();
			}
			else {
				$("#consaleadd").removeClass('ub-f1');
				$('#consaleadd').removeClass('unhide');
				$('#consalesetmj').removeClass('unhide');
				
//				$('#goodsMj').prop("checked",true);
			
				$('#activityScopemj').val('0');
				//禁止按钮点击事件
				disableGoods('','GoodsType');
				initDatagridshopMj();
				initDatagridsortSet();

			}

		}
		  // 保存结束编辑
		  $("#saleMangeadd").datagrid("endEdit", gridHandel.getSelectRowIndex());
			var rows= gridHandel.getRows();
			 $("#salesetmj").datagrid("endEdit", gridHandelMj.getSelectRowIndex());
			var setrows=$('#salesetmj').datagrid('getRows');
			
			if((rows.length==0 || JSON.stringify(rows[0])==JSON.stringify({oldPurPrice:0})) &&
					(setrows.length == 0  || JSON.stringify(setrows[0])==JSON.stringify({oldPurPrice:0}))){
						changeDisType();
			}else{
				$.messager.confirm("","更换满减类型将清空当前列表信息，是否更换？",function(b){
					if(!b){
						return;
					}else{
						changeDisType();
					}
				});
			}
	     
	   })
}
//状态初始化 隐藏 清空数据 
function optionHide(){
	$("#consaleadd").addClass('ub-f1');
	$('.special').addClass('unhide');
	$('.discount').addClass('unhide');
	$('.oddprice ').addClass('unhide');
	$('.discountTypechoose').addClass('unhide');
	$('.mjTypechoose').addClass('unhide');
	$('#consalesetmj').addClass('unhide');
	
	initmmsDom();	
	
}

//初始化买满送 dom结构
function initmmsDom(){
	//买满送
	$('#consolemms').addClass('unhide');
	$(".mmstype").addClass('unhide');
	$('.mmsTypechoose').addClass('unhide');
	
	//初始化为全场折扣
	$("input[name='mmsstatus']").eq(0).prop('checked',true); 
	//初始化 倍数送 促销商品参与
	$("input[name='mmsofactType']").prop('checked',false);
	//初始化活动条件
	$("#activitymmsType").combobox('setValue',0)
	
	choosemmsTab(2);
}

// 状态初始化 禁止点击
function disableGoods(idone,idtow){
	if(idone=="SelectGoods"&&idtow==""){
	 $('#SelectGoods').addClass("uinp-no-more")
	 $('#SelectGoods').removeAttr('onclick');
	 $('#GoodsType').removeClass("uinp-no-more")
	 $('#GoodsType').attr('onclick','getGoodsType()');
	}
	else if(idone==""&&idtow=="GoodsType"){
	 $('#GoodsType').addClass("uinp-no-more")
	 $('#GoodsType').removeAttr('onclick');
	 $('#SelectGoods').removeClass("uinp-no-more")
     $('#SelectGoods').attr('onclick','selectGoods()');
	}
	else if(idone=="SelectGoods"&&idtow=="GoodsType"){
	 $('#SelectGoods').addClass("uinp-no-more")
	 $('#SelectGoods').removeAttr('onclick');
	 $('#GoodsType').addClass("uinp-no-more")
	 $('#GoodsType').removeAttr('onclick');
	}
	else if(idtow==""&&idone==""){
	 $('#SelectGoods').removeClass("uinp-no-more")
     $('#SelectGoods').attr('onclick','selectGoods()');
	 $('#GoodsType').removeClass("uinp-no-more")
	 $('#GoodsType').attr('onclick','getGoodsType()');
	}
}

var gridHandel = new GridClass();
// 初始化表格-特价
function initDatagridSpecial(){
	gridHandel.setGridName("saleMangeadd");
    gridHandel.initKey({
        firstName:'skuCode',
        enterName:'skuCode',
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
                gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefault);
                setTimeout(function(){
                    gridHandel.setBeginRow(gridHandel.getSelectRowIndex()+1);
                    gridHandel.setSelectFieldName("skuCode");
                    gridHandel.setFieldFocus(gridHandel.getFieldTarget('skuCode'));
                },100)
            }else{
               selectGoods(arg);
            }
        },
    })
    $("#saleMangeadd").datagrid({
        align:'center',
        // toolbar: '#tb', //工具栏 id为tb
        singleSelect:false,  // 单选 false多选
        rownumbers:true,    // 序号
        fitColumns:true,    // 每列占满
        // fit:true, //占满
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
        columns:[[
					{field:'ck',checkbox:true},
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
					{field:'skuCode',title:'货号',width:'70px',align:'left',editor:'textbox'},
					{field:'skuName',title:'商品名称',width:'200px',align:'left'},
					{field:'barCode',title:'条码',width:'150px',align:'left'},
					{field:'categoryName',title:'商品类别',width:'200px',align:'left'},
					{field:'unit',title:'单位',width:'60px',align:'left'},
					{field:'spec',title:'规格',width:'90px',align:'left'},
					 {field:'price',title:'单价',width:'80px',align:'right',
		                formatter:function(value,row,index){
		                    if(row.isFooter){
		                        return
		                    }
		                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                },
//		                editor:{
//		                    type:'numberbox',
//		                    options:{
//		                        disabled:true,
//		                        min:0,
//		                        precision:2,
//		           
//		                    }
//		                },
		            },
		            {field: 'saleAmount', title: '促销价', width: 100, align: 'right',
		                formatter : function(value, row, index) {
		                    if(row.isFooter){
		                        return;
		                    }
                            if(!value){
                                row["saleAmount"] = parseFloat(value||0).toFixed(2);
                            }

		                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                },
		                editor:{
		                    type:'numberbox',
		                    options:{
		                        min:0,
		                        precision:4,
								onChange:saleAmountOnChange,
		                    }
		                },
		            },
            {field: 'purchasePrice', title: '成本价', width: 100, align: 'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:2,
                        disabled:true,
                    }
                },
            },
            {
                field : 'oldSaleRate',
                title : '原毛利率',
                width : '120px',
                align : 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    if(!value){
                        value = "0%";
                    }else{
                        row['oldSaleRate'] = value;
                    }
                    return '<b>'+value+'</b>';
                },
            },
            {
                field : 'newSaleRate',
                title : '新毛利率',
                width : '120px',
                align : 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    if(!value){
                        value = "0%";
                    }else{
                        row['newSaleRate'] = value;
                    }
                    return '<b>'+value+'</b>';
                },
                editor : {
                    type : 'textbox',
                    options:{
                        disabled:true,
                    }
                }
            },
        ]],
		onClickCell : function(rowIndex, field, value) {
			gridHandel.setBeginRow(rowIndex);
			gridHandel.setSelectFieldName(field);
			var target = gridHandel.getFieldTarget(field);
			if(target){
				gridHandel.setFieldFocus(target);
			}else{
				gridHandel.setSelectFieldName("skuCode");
			}
		},
      onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
				
		 }
    });
    gridHandel.setLoadData([{}]) 
}

// 初始化表格-类别折扣
function initDatagridsortZk(){
	gridHandel.setGridName("saleMangeadd");
    gridHandel.initKey({
        firstName:'categoryCode',
        enterName:'categoryCode',
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
                gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefault);
                setTimeout(function(){
                    gridHandel.setBeginRow(gridHandel.getSelectRowIndex()+1);
                    gridHandel.setSelectFieldName("categoryCode");
                    gridHandel.setFieldFocus(gridHandel.getFieldTarget('categoryCode'));
                },100)
            }else{
               selectGoods(arg);
            }
        },
    })
    $("#saleMangeadd").datagrid({
        align:'center',
        // toolbar: '#tb', //工具栏 id为tb
        singleSelect:false,  // 单选 false多选
        rownumbers:true,    // 序号
        fitColumns:true,    // 每列占满
        // fit:true, //占满
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
        columns:[[
					{field:'ck',checkbox:true},
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
					{field:'categoryCode',title:'类别编码',width:'200px',align:'left',hidden:true},
					{field:'categoryName',title:'商品类别',width:'200px',align:'left'},
					 {field:'discount',title:'折扣',width:'80px',align:'right',
		                formatter:function(value,row,index){
		                    if(row.isFooter){
		                    	return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                    }
		                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                },
		                editor:{
		                    type:'numberbox',
		                    options:{
		                        min:0,
		                        precision:2,
		                    }
		                },
		            }, 
          ]],
  		onClickCell : function(rowIndex, field, value) {
			gridHandel.setBeginRow(rowIndex);
			gridHandel.setSelectFieldName(field);
			var target = gridHandel.getFieldTarget(field);
			if(target){
				gridHandel.setFieldFocus(target);
			}else{
				gridHandel.setSelectFieldName("skuCode");
			}
		},
      onLoadSuccess:function(data){
    	  
			gridHandel.setDatagridHeader("center");
				
		 }
    });
    gridHandel.setLoadData([$.extend({},gridDefault)])
 }


//初始化表格-全场折扣
function initDatagridallZk(){
	gridHandel.setGridName("saleMangeadd");
    $("#saleMangeadd").datagrid({
        align:'center',
        // toolbar: '#tb', //工具栏 id为tb
        singleSelect:false,  // 单选 false多选
        rownumbers:true,    // 序号
        fitColumns:true,    // 每列占满
        // fit:true, //占满
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
        columns:[[
					{field:'categoryCode',title:'活动类型',width:'200px',align:'left',
						formatter:function(value,row,index){
							return "全场折扣";
						}
					},
					{field:'discount',title:'折扣',width:'80px',align:'right',
		                formatter:function(value,row,index){
		                    if(row.isFooter){
		                    	return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                    }
		                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                },
		                editor:{
		                    type:'numberbox',
		                    options:{
		                        min:0,
		                        precision:2,
		                    }
		                },
		            }, 
          ]],
  		onClickCell : function(rowIndex, field, value) {
			gridHandel.setBeginRow(rowIndex);
			gridHandel.setSelectFieldName(field);
			var target = gridHandel.getFieldTarget(field);
			if(target){
				gridHandel.setFieldFocus(target);
			}else{
				gridHandel.setSelectFieldName("discount");
			}
		},
      onLoadSuccess:function(data){
    	  
			gridHandel.setDatagridHeader("center");
				
		 }
    });
    gridHandel.setLoadData([$.extend({},gridDefault)])
 }

// 初始化表格-单品折扣
function initDatagridoneZk(){
	gridHandel.setGridName("saleMangeadd");
    gridHandel.initKey({
        firstName:'skuCode',
        enterName:'skuCode',
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
                gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefault);
                setTimeout(function(){
                    gridHandel.setBeginRow(gridHandel.getSelectRowIndex()+1);
                    gridHandel.setSelectFieldName("skuCode");
                    gridHandel.setFieldFocus(gridHandel.getFieldTarget('skuCode'));
                },100)
            }else{
               selectGoods(arg);
            }
        },
    })
    $("#saleMangeadd").datagrid({
        align:'center',
        // toolbar: '#tb', //工具栏 id为tb
        singleSelect:false,  // 单选 false多选
        rownumbers:true,    // 序号
        fitColumns:true,    // 每列占满
        // fit:true, //占满
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
        columns:[[
			{field:'ck',checkbox:true},
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
			{field:'skuCode',title:'货号',width:'70px',align:'left',editor:'textbox'},
			{field:'skuName',title:'商品名称',width:'200px',align:'left'},
			{field:'barCode',title:'条码',width:'150px',align:'left'},
			{field:'categoryName',title:'商品类别',width:'200px',align:'left'},
			{field:'unit',title:'单位',width:'60px',align:'left'},
			{field:'spec',title:'规格',width:'90px',align:'left'},
			 {field:'price',title:'单价',width:'80px',align:'right',
			    formatter:function(value,row,index){
			        if(row.isFooter){
			            return
			        }
			        return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			    },
//			    editor:{
//			        type:'numberbox',
//			        options:{
//			            disabled:true,
//			            min:0,
//			            precision:2,
//			
//			        }
//			    },
			},
            {field: 'purchasePrice', title: '成本价', width: 100, align: 'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:2,
						disabled:true,
                    }
                },
            },
			{field: 'discount', title: '折扣', width: 100, align: 'right',
			    formatter : function(value, row, index) {
			        if(row.isFooter){
			            return;
			        }
			        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			    },
			    editor:{
			        type:'numberbox',
			        options:{
			            min:0,
			            precision:2,
						onChange:changeDiscount
			        }
			    },
			},
            {
                field : 'oldSaleRate',
                title : '原毛利率',
                width : '120px',
                align : 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    if(!value){
                        value = "0%";
                    }else{
                        row['oldSaleRate'] = value;
                    }
                    return '<b>'+value+'</b>';
                },
            },
            {
                field : 'newSaleRate',
                title : '新毛利率',
                width : '120px',
                align : 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    if(!value){
                        value = "0%";
                    }else{
                        row['newSaleRate'] = value;
                    }
                    return '<b>'+value+'</b>';
                },
                editor : {
                    type : 'textbox',
                    options:{
                        disabled:true,
                    }
                }
            },


          ]],
  		onClickCell : function(rowIndex, field, value) {
			gridHandel.setBeginRow(rowIndex);
			gridHandel.setSelectFieldName(field);
			var target = gridHandel.getFieldTarget(field);
			if(target){
				gridHandel.setFieldFocus(target);
			}else{
				gridHandel.setSelectFieldName("skuCode");
			}
		},
      onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
				
		 }
    });
    
    gridHandel.setLoadData([$.extend({},gridDefault)])
   }

//单品折扣 计算新毛利率
function changeDiscount(newVal,oldVal) {
    var salePrice = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'price');
    var purchasePrice = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'purchasePrice');
    var discountPrice = ((salePrice*newVal)/10).toFixed(2);
    var newSaleRate = ((discountPrice-purchasePrice)/discountPrice*100).toFixed(2)+"%";
    gridHandel.setFieldTextValue('newSaleRate',newSaleRate);
}



// 初始化表格-偶数特价
function initDatagridOddtj(){
	gridHandel.setGridName("saleMangeadd");
    gridHandel.initKey({
        firstName:'skuCode',
        enterName:'skuCode',
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
                gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefault);
                setTimeout(function(){
                    gridHandel.setBeginRow(gridHandel.getSelectRowIndex()+1);
                    gridHandel.setSelectFieldName("skuCode");
                    gridHandel.setFieldFocus(gridHandel.getFieldTarget('skuCode'));
                },100)
            }else{
               selectGoods(arg);
            }
        },
    })
    $("#saleMangeadd").datagrid({
        align:'center',
        // toolbar: '#tb', //工具栏 id为tb
        singleSelect:false,  // 单选 false多选
        rownumbers:true,    // 序号
        fitColumns:true,    // 每列占满
        // fit:true, //占满
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
        columns:[[
			{field:'ck',checkbox:true},
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
			{field:'skuCode',title:'货号',width:'70px',align:'left',editor:'textbox'},
			{field:'skuName',title:'商品名称',width:'200px',align:'left'},
			{field:'barCode',title:'条码',width:'150px',align:'left'},
			{field:'categoryName',title:'商品类别',width:'200px',align:'left'},
			{field:'unit',title:'单位',width:'60px',align:'left'},
			{field:'spec',title:'规格',width:'90px',align:'left'},
			 {field:'price',title:'单价',width:'80px',align:'right',
			    formatter:function(value,row,index){
			        if(row.isFooter){
			            return
			        }
			        return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			    },
//			    editor:{
//			        type:'numberbox',
//			        options:{
//			            disabled:true,
//			            min:0,
//			            precision:2,
//			
//			        }
//			    },
			},
            {field: 'purchasePrice', title: '成本价', width: 100, align: 'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:2,
                        disabled:true,
                    }
                },
            },
			{field: 'saleAmount', title: '偶数特价', width: 100, align: 'right',
			    formatter : function(value, row, index) {
			        if(row.isFooter){
			        	  return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			        }

                    if(!value){
                        row["saleAmount"] = parseFloat(value||0).toFixed(2);
                    }

			        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			    },
			    editor:{
			        type:'numberbox',
			        options:{
			            min:0,
			            precision:4,
						onChange:saleAmountOnChange,
			        }
			    },
			},
            {
                field : 'oldSaleRate',
                title : '原毛利率',
                width : '120px',
                align : 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    if(!value){
                        value = "0%";
                    }else{
                        row['oldSaleRate'] = value;
                    }
                    return '<b>'+value+'</b>';
                },
            },
            {
                field : 'newSaleRate',
                title : '新毛利率',
                width : '120px',
                align : 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    if(!value){
                        value = "0%";
                    }else{
                        row['newSaleRate'] = value;
                    }
                    return '<b>'+value+'</b>';
                },
                editor : {
                    type : 'textbox',
                    options:{
                        disabled:true,
                    }
                }
            },
          ]],
  		onClickCell : function(rowIndex, field, value) {
			gridHandel.setBeginRow(rowIndex);
			gridHandel.setSelectFieldName(field);
			var target = gridHandel.getFieldTarget(field);
			if(target){
				gridHandel.setFieldFocus(target);
			}else{
				gridHandel.setSelectFieldName("skuCode");
			}
		},
      onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
				
		 }
    });
    gridHandel.setLoadData([$.extend({},gridDefault)])
}


// 初始化表格-换购
function initDatagridRedemption(){
	gridHandel.setGridName("saleMangeadd");
  gridHandel.initKey({
      firstName:'skuCode',
      enterName:'skuCode',
      enterCallBack:function(arg){
          if(arg&&arg=="add"){
              gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefault);
              setTimeout(function(){
                  gridHandel.setBeginRow(gridHandel.getSelectRowIndex()+1);
                  gridHandel.setSelectFieldName("skuCode");
                  gridHandel.setFieldFocus(gridHandel.getFieldTarget('skuCode'));
              },100)
          }else{
             selectGoods(arg);
          }
      },
  })
  $("#saleMangeadd").datagrid({
      align:'center',
      // toolbar: '#tb', //工具栏 id为tb
      singleSelect:false,  // 单选 false多选
      rownumbers:true,    // 序号
      fitColumns:true,    // 每列占满
      // fit:true, //占满
      showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
      columns:[[
			{field:'ck',checkbox:true},
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
			{field:'skuCode',title:'货号',width:'70px',align:'left',editor:'textbox'},
			{field:'skuName',title:'商品名称',width:'200px',align:'left'},
			{field:'barCode',title:'条码',width:'150px',align:'left'},
			{field:'categoryName',title:'商品类别',width:'200px',align:'left'},
			{field:'unit',title:'单位',width:'60px',align:'left'},
			{field:'spec',title:'规格',width:'90px',align:'left'},
			 {field:'price',title:'单价',width:'80px',align:'right',
			    formatter:function(value,row,index){
			        if(row.isFooter){
			            return
			        }
			        return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			    },
//			    editor:{
//			        type:'numberbox',
//			        options:{
//			            disabled:true,
//			            min:0,
//			            precision:2,
//			
//			        }
//			    },
			},
			{field: 'saleAmount', title: '换购价', width: 100, align: 'right',
			    formatter : function(value, row, index) {
			        if(row.isFooter){
			        	 return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			        }
                    if(!value){
                        row["saleAmount"] = parseFloat(value||0).toFixed(2);
                    }
			        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			    },
			    editor:{
			        type:'numberbox',
			        options:{
			            min:0,
			            precision:4,
						onChange:saleAmountOnChange,
			        }
			    },
			},
        ]],
		onClickCell : function(rowIndex, field, value) {
			gridHandel.setBeginRow(rowIndex);
			gridHandel.setSelectFieldName(field);
			var target = gridHandel.getFieldTarget(field);
			if(target){
				gridHandel.setFieldFocus(target);
			}else{
				gridHandel.setSelectFieldName("skuCode");
			}
		},
    onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
				
		 }
  });
  gridHandel.setLoadData([$.extend({},gridDefault)])
}

// 初始化表格-全场满减
function initDatagridallMj(){
	gridHandel.setGridName("saleMangeadd");
    gridHandel.initKey({
        firstName:'skuCode',
        enterName:'skuCode',
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
                gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefault);
                setTimeout(function(){
                    gridHandel.setBeginRow(gridHandel.getSelectRowIndex()+1);
                    gridHandel.setSelectFieldName("skuCode");
                    gridHandel.setFieldFocus(gridHandel.getFieldTarget('skuCode'));
                },100)
            }else{
               selectGoods(arg);
            }
        },
    })
    $("#saleMangeadd").datagrid({
        align:'center',
        // toolbar: '#tb', //工具栏 id为tb
        singleSelect:false,  // 单选 false多选
        rownumbers:true,    // 序号
        fitColumns:true,    // 每列占满
        // fit:true, //占满
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
        columns:[[
					{field:'ck',checkbox:true},
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
					{field:'limitAmount',title:'买满金额',width:'80px',align:'right',
		                formatter:function(value,row,index){
		                    if(row.isFooter){
		                    	 return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                    }
		                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                },
		                editor:{
		                    type:'numberbox',
		                    options:{
		                        min:0,
		                        precision:2,
		           
		                    }
		                },
		            }, 
					{field:'discountPrice',title:'优惠额',width:'80px',align:'right',
		                formatter:function(value,row,index){
		                    if(row.isFooter){
		                    	 return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                    }
		                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                },
		                editor:{
		                    type:'numberbox',
		                    options:{
		                        min:0,
		                        precision:2,
		           
		                    }
		                },
		            }, 
          ]],
  		onClickCell : function(rowIndex, field, value) {
			gridHandel.setBeginRow(rowIndex);
			gridHandel.setSelectFieldName(field);
			var target = gridHandel.getFieldTarget(field);
			if(target){
				gridHandel.setFieldFocus(target);
			}else{
				gridHandel.setSelectFieldName("skuCode");
			}
		},
      onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
				
		 }
    });
    gridHandel.setLoadData([$.extend({},gridDefault)])
}

// 初始化表格-类别满减
function initDatagridsortMj(){
	gridHandel.setGridName("saleMangeadd");
    $("#saleMangeadd").datagrid({
        align:'center',
        // toolbar: '#tb', //工具栏 id为tb
        singleSelect:false,  // 单选 false多选
        rownumbers:true,    // 序号
        fitColumns:true,    // 每列占满
        // fit:true, //占满
        showFooter:true,
		height:'300px',
		pageSize:50,
		width:'100%',
        columns:[[
					{field:'ck',checkbox:true},
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
					{field:'categoryCode',title:'类别编码',width:'200px',align:'left',hidden:true},
					{field:'categoryName',title:'商品类别',width:'200px',align:'left'},
          ]],
  		onClickCell : function(rowIndex, field, value) {
			gridHandel.setBeginRow(rowIndex);
			gridHandel.setSelectFieldName(field);
			var target = gridHandel.getFieldTarget(field);
			if(target){
				gridHandel.setFieldFocus(target);
			}else{
				gridHandel.setSelectFieldName("skuCode");
			}
		},
           onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
				
		 }
    });
    gridHandel.setLoadData([$.extend({},gridDefault)])
}
// 初始化表格-类别满减设置
var gridHandelMj = new GridClass();
function initDatagridsortSet(){
	gridHandelMj.setGridName("salesetmj");
    $("#salesetmj").datagrid({
        align:'center',
        // toolbar: '#tb', //工具栏 id为tb
        singleSelect:false,  // 单选 false多选
        rownumbers:true,    // 序号
        fitColumns:true,    // 每列占满
        // fit:true, //占满
        showFooter:true,
		height:'300px',
		pageSize:50,
		width:'100%',
        columns:[[
					{field:'ck',checkbox:true},
					{field:'cz',title:'操作',width:'60px',align:'center',
					    formatter : function(value, row,index) {
					        var str = "";
					        if(row.isFooter){
					            str ='<div class="ub ub-pc">合计</div> '
					        }else{
					            str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandelmj(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
					                '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandelmj(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
					        }
					        return str;
					    },
					},
					{field: 'limitAmount', title: '买满金额', width: 100, align: 'right',
					    formatter : function(value, row, index) {
					        if(row.isFooter){
					        	return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					        }
					        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					    },
					    editor:{
					        type:'numberbox',
					        options:{
					            min:0,
					            precision:2,
					        }
					    },
					},
					{field: 'discountPrice', title: '优惠额', width: 100, align: 'right',
					    formatter : function(value, row, index) {
					        if(row.isFooter){
					        	return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					        }
					        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					    },
					    editor:{
					        type:'numberbox',
					        options:{
					            min:0,
					            precision:2,
					        }
					    },
					},
          ]],
         
          onLoadSuccess:function(data){
        	 gridHandelMj.setDatagridHeader("center");
        	 // addrowsdt();
		 },
		 onClickCell:function(rowIndex,field,value){
			 gridHandelMj.setBeginRow(rowIndex);
			 gridHandelMj.setSelectFieldName(field);
	            var target = gridHandelMj.getFieldTarget(field);
	            if(target){
	            	gridHandelMj.setFieldFocus(target);
	            }else{
	            	gridHandelMj.setSelectFieldName("skuCode");
	            }
	        },
    });
    gridHandelMj.setLoadData([$.extend({},gridDefault)])
}


// 初始化表格-商品满减
function initDatagridshopMj(){
	gridHandel.setGridName("saleMangeadd");
  $("#saleMangeadd").datagrid({
      align:'center',
      // toolbar: '#tb', //工具栏 id为tb
      singleSelect:false,  // 单选 false多选
      rownumbers:true,    // 序号
      fitColumns:true,    // 每列占满
      // fit:true, //占满
      showFooter:true,
		height:'300px',
		pageSize:50,
		width:'100%',
      columns:[[
			{field:'ck',checkbox:true},
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
			{field:'skuCode',title:'货号',width:'70px',align:'left',editor:'textbox'},
			{field:'skuName',title:'商品名称',width:'200px',align:'left'},
			{field:'barCode',title:'条码',width:'150px',align:'left'},
			{field:'categoryName',title:'商品类别',width:'200px',align:'left'},
			{field:'unit',title:'单位',width:'60px',align:'left'},
			{field:'spec',title:'规格',width:'90px',align:'left'},
			 {field:'price',title:'单价',width:'80px',align:'right',
			    formatter:function(value,row,index){
			        if(row.isFooter){
			        	 return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			        }
			        return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			    },
//			    editor:{
//			        type:'numberbox',
//			        options:{
//			            disabled:true,
//			            min:0,
//			            precision:2,
//			
//			        }
//			    },
			},
        ]], 
		onClickCell : function(rowIndex, field, value) {
			gridHandel.setBeginRow(rowIndex);
			gridHandel.setSelectFieldName(field);
			var target = gridHandel.getFieldTarget(field);
			if(target){
				gridHandel.setFieldFocus(target);
			}else{
				gridHandel.setSelectFieldName("skuCode");
			}
		},
       
        onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			// selectAddRows(data);
		 }
  });
  gridHandel.setLoadData([$.extend({},gridDefault)])

}

// 初始化表格-组合特价
function initDatagridCompose(){
  gridHandel.setGridName("saleMangeadd");
  gridHandel.initKey({
      firstName:'skuCode',
      enterName:'skuCode',
      enterCallBack:function(arg){
          if(arg&&arg=="add"){
              gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefault);
              setTimeout(function(){
                  gridHandel.setBeginRow(gridHandel.getSelectRowIndex()+1);
                  gridHandel.setSelectFieldName("skuCode");
                  gridHandel.setFieldFocus(gridHandel.getFieldTarget('skuCode'));
              },100)
          }else{
             selectGoods(arg);
          }
      },
  })
  $("#saleMangeadd").datagrid({
      align:'center',
      // toolbar: '#tb', //工具栏 id为tb
      singleSelect:false,  // 单选 false多选
      rownumbers:true,    // 序号
      fitColumns:true,    // 每列占满
      // fit:true, //占满
      showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
      columns:[[
			{field:'ck',checkbox:true},
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
			{field:'skuCode',title:'货号',width:'70px',align:'left',editor:'textbox'},
			{field:'skuName',title:'商品名称',width:'200px',align:'left'},
			{field:'barCode',title:'条码',width:'150px',align:'left'},
			{field:'categoryName',title:'商品类别',width:'200px',align:'left'},
			{field:'unit',title:'单位',width:'60px',align:'left'},
			{field:'spec',title:'规格',width:'90px',align:'left'},
			 {field:'price',title:'单价',width:'80px',align:'right',
			    formatter:function(value,row,index){
			        if(row.isFooter){
			            return
			        }
			        return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			    },
//			    editor:{
//			        type:'numberbox',
//			        options:{
//			            disabled:true,
//			            min:0,
//			            precision:2,
//			
//			        }
//			    },
			},
			{field: 'limitCount', title: '组合数量', width: 100, align: 'right',
			    formatter : function(value, row, index) {
			        if(row.isFooter){
			            return;
			        }
			        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			    },
			    editor:{
			        type:'numberbox',
			        options:{
			            min:0,
			            precision:2,
			        }
			    },
			},
			{field: 'saleAmount', title: '组合特价', width: 100, align: 'right',
			    formatter : function(value, row, index) {
			        if(row.isFooter){
			            return;
			        }
			        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			    },
			    editor:{
			        type:'numberbox',
			        options:{
			            min:0,
			            precision:2,
			        }
			    },
			},
			{field: 'groupNum', title: '组号', width: 100, align: 'right',
			    formatter : function(value, row, index) {
			        if(row.isFooter){
			            return;
			        }
			        return '<b>'+parseInt(value||0)+'</b>';
			    },
			    editor:{
			        type:'numberbox',
			        options:{
			            min:0,
			            precision:0,
			        }
			    },
			},
        ]],
		onClickCell : function(rowIndex, field, value) {
			gridHandel.setBeginRow(rowIndex);
			gridHandel.setSelectFieldName(field);
			var target = gridHandel.getFieldTarget(field);
			if(target){
				gridHandel.setFieldFocus(target);
			}else{
				gridHandel.setSelectFieldName("skuCode");
			}
		},
       onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
				
		 }
  });
  gridHandel.setLoadData([$.extend({},gridDefault)])
}


// 查询入库单
function queryForm(){
	if($("#branchName").val()==""){
        messager("请选择店铺名称");
        return;
    } 
	var fromObjStr = $('#queryForm').serializeObject();
	$("#saleMangeadd").datagrid("options").method = "post";
	$("#saleMangeadd").datagrid('options').url = contextPath + '/categorySale/report/getCategorySaleList';
	$("#saleMangeadd").datagrid('load', fromObjStr);
}
// 批量设置
function specialRows(id,val){
	// 获取选中行的Index的值
	var rowIndex = -1;
	var newData = $("#"+datagridId).datagrid("getRows");
	if(id=="special"){
		for(var i = 0;i < newData.length;i++){
			var item = newData[i];
            item.saleAmount= val;
            //计算新毛利率
            item.newSaleRate = ((item.saleAmount-item.purchasePrice)/item.saleAmount*100).toFixed(2)+"%"
		}
		$("#"+datagridId).datagrid({data:newData})
	}
	else if(id=="discount"){
		for(var i = 0;i < newData.length;i++){
			var item = newData[i];
            item.discount= val;
            var discountPrice = ((item.salePrice*item.discount)/10).toFixed(2);
            item.newSaleRate = ((discountPrice-item.purchasePrice)/discountPrice*100).toFixed(2)+"%"
		}
	}
	else if(id=="batchcount"){
		for(var i = 0;i < newData.length;i++){
            var item = newData[i];
            item.saleAmount= val;
            item.newSaleRate = ((item.saleAmount-item.purchasePrice)/(2*item.saleAmount)*100).toFixed(2)+"%"
		}
	}
	$("#"+datagridId).datagrid({data:newData})
}
// 插入动态行
function addrowsdt(){
	// 活动类型
	var activityType=$("#activityType").combobox('getValue');
	if(activityType=="5"){
		var rows=$('#saleMangeadd').datagrid('getRows');
	    for(var i = 1; i < rows.length; i++){
	    	$('#salesetmj').datagrid('appendRow',[{cz:'',limitAmount:'1',discountPrice:''}]);  
		  	
	     }
	   
	}
}
// 选择商品插入动态行
function selectAddRows(data){
	var row=data.rows;
	if(row.length==0){
		return
	}
	// 活动类型
	var activityType=$("#activityType").combobox('getValue');
	if(activityType=="5"){
	    for(var i = 0; i < row.length; i++){
	    	$('#salesetmj').datagrid('appendRow',[{cz:'',limitAmount:'1',discountPrice:''}]);  
		  	
	     }
	}
}
// 插入一行
function addLineHandel(event){
    event.stopPropagation(event);
    var index = $(event.target).attr('data-index')||0;
    gridHandel.addRow(index,gridDefault);
}

//满送梯度插入一行
function addLineHandelmstd(event){
    event.stopPropagation(event);
    var index = $(event.target).attr('data-index')||0;
    gridHandelT.addRow(index,mmsTJDefault);
}

//满送 主设置 商品  插入一行
function addLineHandelmmscomG(event){
    event.stopPropagation(event);
    var index = $(event.target).attr('data-index')||0;
    gridHandelG.addRow(index,gridDefaultG);
}

//满送 主设置 类别  插入一行
function addLineHandelmmscomB(event){
    event.stopPropagation(event);
    var index = $(event.target).attr('data-index')||0;
    gridHandelB.addRow(index,{});
}

// 减速设置插入一行
function addLineHandelmj(event){
    event.stopPropagation(event);
    var index = $(event.target).attr('data-index')||0;
    gridHandelMj.addRow(index,gridDefault);
}
// 删除一行
function delLineHandel(event){
    event.stopPropagation();
    var index = $(event.target).attr('data-index');
    gridHandel.delRow(index);
}
// 减速设置插入一行
function delLineHandelmj(event){
    event.stopPropagation();
    var index = $(event.target).attr('data-index');
    gridHandelMj.delRow(index);
}

//满送 买满条件设置 删除一行
function delLineHandelmstd(event){
    event.stopPropagation();
    var index = $(event.target).attr('data-index');
    gridHandelT.delRow(index);
}

//满送 主设置商品  删除一行
function delLineHandelmmscomG(event){
    event.stopPropagation();
    var index = $(event.target).attr('data-index');
    gridHandelG.delRow(index);
}

//满送 主设置商品  删除一行
function delLineHandelmmscomB(event){
    event.stopPropagation();
    var index = $(event.target).attr('data-index');
    gridHandelB.delRow(index);
}


//商品选择 买满送 主商品 选择
function selectGoodsComG(searchKey){
	
	var param = {
			type:'PX',
			key:searchKey,
			isRadio:'',
			sourceBranchId:'',
			targetBranchId:'',
			branchId:$("#branchIds").val(),
			supplierId:'',
			flag:''
	}
	
	//借用一下type值，用来活动商品选择时，过滤不参加促销的商品
    new publicGoodsServiceTem(param,function(data){
    	if(searchKey){
            $("#mmscommonList").datagrid("deleteRow", gridHandelG.getSelectRowIndex());
            $("#mmscommonList").datagrid("acceptChanges");
        }
        var nowRows = gridHandelG.getRowsWhere({skuName:'1'});
        var addDefaultData  = gridHandelG.addDefault(data,[{}]);
        var keyNames = {
        		skuId:'goodsSkuId',
        		salePrice:'price'
        };
        var rows = gFunUpdateKey(addDefaultData,keyNames);
        var argWhere ={skuCode:1};  // 验证重复性
        var isCheck ={isGift:1};   // 只要是赠品就可以重复
        var newRows = gridHandelG.checkDatagrid(nowRows,rows,argWhere,isCheck);
        $("#mmscommonList").datagrid("loadData",newRows);
    })
}

//商品选择 买满送 礼品
function selectGoodsG(searchKey){
	var param = {
			type:'PX',
			key:searchKey,
			isRadio:'',
			sourceBranchId:'',
			targetBranchId:'',
			branchId:$("#branchIds").val(),
			supplierId:'',
			flag:''
	}
	
	//借用一下type值，用来活动商品选择时，过滤不参加促销的商品
    new publicGoodsServiceTem(param,function(data){
    	if(searchKey){
            $("#mmsgoodList").datagrid("deleteRow", gridHandel.getSelectRowIndex());
            $("#mmsgoodList").datagrid("acceptChanges");
        }
        var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
        var addDefaultData  = gridHandel.addDefault(data,gridDefaultG);
        var keyNames = {
        		skuId:'goodsSkuId',
        		salePrice:'price'
        };
        var rows = gFunUpdateKey(addDefaultData,keyNames);
        var argWhere ={skuCode:1};  // 验证重复性
        var isCheck ={isGift:1};   // 只要是赠品就可以重复
        var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);
        $("#mmsgoodList").datagrid("loadData",newRows);
    })
}
// 选择商品
function selectGoods(searchKey){
	
	if($("#branchName").val()==" "){ //是否选择活动机构的校验
		messager("请先选择活动分店！");
		return;
	}
	
	if(typeof(searchKey)=="undefined"){ 
		searchKey = "";
	}
	
	var activityT=$("#activityType").combobox('getValue');
	//买满送调用  赠品 selectGoodsG方法
	if(activityT == '10'){
		//全场 类别 商品下 区分 主商品 和 赠品 商品选择要区分
		//是否显示了 tab
		var isHasTab = $("#mmsTab").hasClass('unhide');
		var tabtext = $("#mmsTab").find("li.tabs-selected .tabs-title").text();
		if(!isHasTab && tabtext == '商品信息'){
			selectGoodsComG(searchKey)
		}else{
			//赠品 商品 选择
			selectGoodsG(searchKey);
		}
		return;
	}
	
	var param = {
			type:'PX',
			key:searchKey,
			isRadio:'',
			sourceBranchId:'',
			targetBranchId:'',
			branchId:$("#branchIds").val(),
			supplierId:'',
			flag:''
	}

	//借用一下type值，用来活动商品选择时，过滤不参加促销的商品
    new publicGoodsServiceTem(param,function(data){
        if(searchKey){
            $("#saleMangeadd").datagrid("deleteRow", gridHandel.getSelectRowIndex());
            $("#saleMangeadd").datagrid("acceptChanges");
        }
        var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
        var addDefaultData  = gridHandel.addDefault(data,gridDefault);
        var keyNames = {
        		skuId:'goodsSkuId',
        		salePrice:'price'
        };
        var rows = gFunUpdateKey(addDefaultData,keyNames);
        var argWhere ={skuCode:1};  // 验证重复性
        var isCheck ={isGift:1 };   // 只要是赠品就可以重复
        var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);
        //选择商品的时候计算老毛利率
        var activityType=$("#activityType").combobox('getValue');
        if(activityType==="1"){
        	//特价
			$.each(newRows,function (index,item) {
                //兼容老数据 如果原零售价为0
                if(item.price === '0' || item.price == 0 ){
                    item.oldSaleRate = "0%";
                }else{
                    item.oldSaleRate = ((item.price-item.purchasePrice)/item.price*100).toFixed(2)+"%";
                }

            })
		}else if(activityType==="2" && $('#activityScopedis').val()==="0"){
        	//折扣 单品折扣
            $.each(newRows,function (index,item) {
                //兼容老数据 如果原零售价为0
                if(item.price === '0' || item.price == 0 ){
                    item.oldSaleRate = "0%";
                }else{
                    item.oldSaleRate = ((item.price-item.purchasePrice)/item.price*100).toFixed(2)+"%";
                }

            })
		}else if(activityType==="3"){
			//偶数特价
            $.each(newRows,function (index,item) {
                //兼容老数据 如果原零售价为0
                if(item.price === '0' || item.price == 0 ){
                    item.oldSaleRate = "0%";
                }else{
                    item.oldSaleRate = ((item.price-item.purchasePrice)/(2*item.price)*100).toFixed(2)+"%";
                }

            })
		}
        
        $("#saleMangeadd").datagrid("loadData",newRows);

        /*
		 * setTimeout(function(){
		 * gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
		 * gridHandel.setSelectFieldName("saleAmount");
		 * gridHandel.setFieldFocus(gridHandel.getFieldTarget('saleAmount'));
		 * },100)
		 */
    });
}


//function selectCategory(searchKey){
//	new publicCategoryService(function(){
//		
//	},searchKey,'');
//}





// 保存
function saveActivity(){
  // 保存结束编辑
  $("#saleMangeadd").datagrid("endEdit", gridHandel.getSelectRowIndex());
  
  // 活动类型
  var activityType=$("#activityType").combobox('getValue');
  // 打折活动类型
  var activityScopedis=$("#activityScopedis").val();
  // 满减活动类型
  var activityScopemj=$("#activityScopemj").val();
  //验证货号不能为空
  var check = {skuCode:'1'};
  
  if(activityScopedis == 1 || activityScopemj == 1){
	  var check ={goodsCategoryCode:'1'}
  }
  if(activityType == 5 && activityScopemj == 2){
	  check = {limitAmount:'1'}
  }
  if(activityType == 2 && activityScopedis == 1){
	  check = {categoryName:'1'}
  }
  // 获取非空的数据
  var rows= gridHandel.getRows();// $('#saleMangeadd').datagrid('getRows');
  if(rows.length==0){
	  messager("表格不能为空");
	  return;
  }
  // 重新加载数据，去除空数据
  $("#saleMangeadd").datagrid("loadData",rows);
  
	if(!$("#startTime").val() || !$("#endTime").val()){
		messager("<活动时间>不能为空");
		return;
	}
	
	if(!$("#dailyStartTime").val() || !$("#dailyStartTime").val()){
		messager("<活动时段>不能为空");
		return;
	}
  
    if(!$("#activityName").val()){
	    messager("<活动名称>不能为空");
	    return;
    }


	if(!$("#branchName").val().trim()){
		messager("<活动分店>不能为空");
		return;
	}

  
  var isCheckResult = true;
  // 活动类型特价验证
  if(activityType=="1"){
	  for(var i=0;i<rows.length;i++){
		  var v = rows[i];
		  if(!v["skuCode"]){
	          messager("第"+(i+1)+"行，货号不能为空");
	          isCheckResult = false;
	          return false;
	      };
	      if(!v["saleAmount"] || v["saleAmount"]=='0.00'){
	          messager("第"+(i+1)+"行，促销价不能为空或0");
	          isCheckResult = false;
	          return false;
	      };
	      
	      if(parseFloat(v["price"]) <= parseFloat(v["saleAmount"])){
	          messager("第"+(i+1)+"行，促销价要小于原价");
	          isCheckResult = false;
	          return false;
	      };
	      
	  }
	  saveDataHandel(rows);
  }
  
  // 活动类型折扣验证
  else if(activityType=="2"){
	  if($("#discount").val()>10 || $("#discount").val()<0){
		  messager("批量折扣值在0~10之间");
		  return;
	  }
	  
	// 活动类型单品折扣验证
	  if(activityScopedis=="0"){
		  for(var i=0;i<rows.length;i++){
			  var v = rows[i];
		      if(!v["skuCode"]){
		          messager("第"+(i+1)+"行，货号不能为空");
		          isCheckResult = false;
		          return false;
		      };
		      if(!v["discount"] || v["discount"]=='0.00'){
		          messager("第"+(i+1)+"行，折扣不能为空或0");
		          isCheckResult = false;
		          return false;
		      };
		      if(parseFloat(v["discount"])>=10 || parseFloat(v["discount"]<=0)){
		          messager("第"+(i+1)+"行，折扣值在0~10之间");
		          isCheckResult = false;
		          return false;
		      };
		      
		  }
		  saveDataHandel(rows);
	  }else if(activityScopedis=="2"){
		  //全场折扣
		  for(var i=0;i<rows.length;i++){
			  var v = rows[i];
			  if(!v["discount"] || v["discount"]=='0.00'){
		          messager("第"+(i+1)+"行，折扣不能为空或0");
		          isCheckResult = false;
		          return false;
		      };
		  }
		  saveDataHandel(rows);
	  }
	// 活动类型类别折扣验证
	  else{
		  for(var i=0;i<rows.length;i++){
			  var v = rows[i];
		      if(!v["categoryName"]){
		          messager("第"+(i+1)+"行，商品类别不能为空");
		          isCheckResult = false;
		          return false;
		      };
		      if(!v["discount"] || v["discount"]=='0.00'){
		          messager("第"+(i+1)+"行，折扣不能为空或0");
		          isCheckResult = false;
		          return false;
		      };
		      if(parseFloat(v["discount"])>=10 || parseFloat(v["discount"])<=0){
		          messager("第"+(i+1)+"行，折扣值在0~10之间");
		          isCheckResult = false;
		          return false;
		      };
		     
		  }
		  saveDataHandel(rows);
	  }
	  
  }
// 活动类型偶数特价验证
  else if(activityType=="3"){
	  for(var i=0;i<rows.length;i++){
		  var v = rows[i];
	      if(!v["skuCode"]){
	          messager("第"+(i+1)+"行，货号不能为空");
	          isCheckResult = false;
	          return false;
	      };
	      if(!v["saleAmount"]){
	          messager("第"+(i+1)+"行，偶数特价不能为空");
	          isCheckResult = false;
	          return false;
	      };
	      
	      if(parseFloat(v["price"]) <= parseFloat(v["saleAmount"])){
	          messager("第"+(i+1)+"行，偶数特价要小于原价");
	          isCheckResult = false;
	          return false;
	      };
	     
	  }
	  saveDataHandel(rows);
  }
// 活动类型换购价验证
  else if(activityType=="4"){
	  for(var i=0;i<rows.length;i++){
		  var v = rows[i];
	      if(!v["skuCode"]){
	          messager("第"+(i+1)+"行，货号不能为空");
	          isCheckResult = false;
	          return false;
	      };
	      if(!v["saleAmount"]){
	          messager("第"+(i+1)+"行，换购价不能为空");
	          isCheckResult = false;
	          return false;
	      };
	      
	      if(parseFloat(v["price"]) <= parseFloat(v["saleAmount"])){
	          messager("第"+(i+1)+"行，换购价要小于原价");
	          isCheckResult = false;
	          return false;
	      };
	     
	  }
	  saveDataHandel(rows);
  }
// 活动满减验证
  else if(activityType=="5"){
	  $("#salesetmj").datagrid("endEdit", gridHandelMj.getSelectRowIndex());
	  var setrows=$('#salesetmj').datagrid('getRows');
		  if(activityScopemj=="0"){
			  if(setrows.length==0){
			      messager("满减设置表格不能为空");
			      return;
			  }
			  for(var i=0;i<rows.length;i++){
				  var v = rows[i];
			      if(!v["skuCode"]){
			          messager("第"+(i+1)+"行，货号不能为空");
			          isCheckResult = false;
			          return false;
			      };
			  }
			  for(var i=0;i<setrows.length;i++){
				  var v = setrows[i];
				  
			      if(!v["limitAmount"] || v["limitAmount"]=='0.00'){
			          messager("第"+(i+1)+"行，买满金额不能为空或0");
			          isCheckResult = false;
			          return false;
			      };
			      if(!v["discountPrice"] || v["discountPrice"]=='0.00'){
			          messager("第"+(i+1)+"行，优惠额不能为空或0");
			          isCheckResult = false;
			          return false;
			      };
			      
			      if(parseFloat(v["limitAmount"]) < parseFloat(v["discountPrice"])){
			    	  messager("第"+(i+1)+"行，买满金额不能小于优惠额");
			          isCheckResult = false;
			          return false;
			      }
			  }
			  saveDataHandel(rows,setrows);
		 }
		  else if(activityScopemj=="1"){
			  if(setrows.length==0){
			      messager("满减设置表格不能为空");
			      return;
			  }
			  for(var i=0;i<rows.length;i++){
				  var v = rows[i];
			      if(!v["categoryName"]){
			          messager("第"+(i+1)+"行，商品类别不能为空");
			          isCheckResult = false;
			          return false;
			      };
			  }
			  for(var i=0;i<setrows.length;i++){
				  var v = setrows[i];
			      if(!v["limitAmount"] || v["limitAmount"]=='0.00'){
			          messager("第"+(i+1)+"行，买满金额不能为空或0");
			          isCheckResult = false;
			          return false;
			      };
			      if(!v["discountPrice"] || v["discountPrice"]=='0.00'){
			          messager("第"+(i+1)+"行，优惠额不能为空或0");
			          isCheckResult = false;
			          return false;
			      };
			      
			      if(parseFloat(v["limitAmount"]||0) < parseFloat(v["discountPrice"]||0)){
			    	  messager("第"+(i+1)+"行，买满金额不能小于优惠额");
			          isCheckResult = false;
			          return false;
			      }
			  }
			  saveDataHandel(rows,setrows); 
		 }
		  else if(activityScopemj=="2"){
			  for(var i=0;i<rows.length;i++){
				  var v = rows[i];
			      if(!v["limitAmount"] || v["limitAmount"]=='0.00'){
			          messager("第"+(i+1)+"行，买满金额不能为空或0");
			          isCheckResult = false;
			          return false;
			      };
			      if(!v["discountPrice"] || v["discountPrice"]=='0.00'){
			          messager("第"+(i+1)+"行，优惠额不能为空或0");
			          isCheckResult = false;
			          return false;
			      };
			      
			      if(parseFloat(v["limitAmount"]||0) < parseFloat(v["discountPrice"]||0)){
			    	  messager("第"+(i+1)+"行，买满金额不能小于优惠额");
			          isCheckResult = false;
			          return false;
			      }
			  }
			  saveDataHandel(rows);
		  }
		  
  }
  //组合特价
  else if(activityType=="6"){
	 
	  var flag = false;//判断是否有不同的组号
	  
	  for(var i=0;i<rows.length;i++){
		  var v = rows[i];
	      if(!v["skuCode"]){
	          messager("第"+(i+1)+"行，货号不能为空");
	          isCheckResult = false;
	          return false;
	      };
	      if(!v["limitCount"] || v["limitCount"]=='0.00'){
	          messager("第"+(i+1)+"行，组合数量不能为空或0");
	          isCheckResult = false;
	          return false;
	      };
	      
	      if(!v["saleAmount"] || v["saleAmount"]=='0.00'){
	          messager("第"+(i+1)+"行，组合特价不能为空或0");
	          isCheckResult = false;
	          return false;
	      };
	      
	      if(parseFloat(v["price"]) <= parseFloat(v["saleAmount"])){
	          messager("第"+(i+1)+"行，换购价要小于原价");
	          isCheckResult = false;
	          return false;
	      };
	      
	      if(!v["groupNum"] || parseInt(v["groupNum"]) <= 0 || parseInt(v["groupNum"]) > 3){
	          messager("第"+(i+1)+"行，组号只能是1,2,3");
	          isCheckResult = false;
	          return false;
	      };
	      
	      //取列表第一个商品的组号跟其他商品组号比较，有不同的组号就可以
	      var item = rows[0]
	      
	      if(v["groupNum"] != item["groupNum"]){
	    	  flag = true;
	    	  continue;
	      }
	      
	  }
	  
	  if(!flag){
		  messager("组号不能全部相同");
          isCheckResult = false;
          return false;
	  }
	  
	  saveDataHandel(rows);
	 
  //买满送	  
  }else if(activityType=="10"){
	  //全场(2)  类别(1)  商品(0) 
	  var mmstype = $("input[name='mmsstatus']:checked").val();
	  var setRows = [{goodsSkuId:"000000"}];
	  if(mmstype == '1'){
		  var lbRows = gridHandelB.getRowsWhere({categoryName:'1'});
		  if(lbRows.length <= 0){
			  $.messager.alert('提示','请选择类别！','',function(){});
			  return;
		  }
		  setRows = lbRows;
	  }
	  if(mmstype == '0'){
		  var spRows = gridHandelG.getRowsWhere({skuName:'1'});
		  if(spRows.length <= 0){
			  $.messager.alert('提示','请选择商品！','',function(){});
			  return;
		  }
		  setRows = spRows;
	  }
	  
	  //买满条件
	  gridHandelT.endEditRow();
	  gridHandel.endEditRow();
	  //买满条件 梯度检查
	  var tjRows = gridHandelT.getRows();
	  if(tjRows.length <= 0){
		  $.messager.alert('提示','请设置买满条件！','',function(){});
		  return;
	  }
	  for(var i = 0; i<tjRows.length ; i++){
		  var mmsTJObj = tjRows[i];
		  if(gridTitleName == '买满金额' && parseFloat(mmsTJObj.limitAmount||0)<= 0){
			$.messager.alert('提示','第'+(i+1)+'行，买满金额不能小于等于0','',function(){});
			return false;
		  }
		  if(gridTitleName == '买满数量' && parseFloat(mmsTJObj.limitCount||0)<= 0){
			$.messager.alert('提示','第'+(i+1)+'行，买满数量不能小于等于0','',function(){});
			return false;
		  }
		  
		  if(!(mmsTJObj.goodsGiftList && mmsTJObj.goodsGiftList.length >0)){
			  $.messager.alert('提示','买满条件第'+(i+1)+'行，未选择赠品！','',function(){});
			  return false;
		  }else{
			  var gifts = mmsTJObj.goodsGiftList;
			  for(var x = 0; x < gifts.length ; x++){
				  var gifObj = gifts[x];
				  if(gifObj && gifObj.giftNum <= 0){
					  $.messager.alert('提示','买满条件第'+(i+1)+'行，存在赠品数量小于等于0','',function(){});
					  return;
				  }
			  }
		  }
	  }
	  saveDataHandel(tjRows,setRows);
  }
  else{
	  saveDataHandel(rows);
  }

}



function saveDataHandel(rows,setrows){
  // 活动分店机构id
  var branchIds = $("#branchIds").val();
  // 活动名称
  var activityName = $("#activityName").val();
  // 活动类型
  var activityType=$("#activityType").combobox('getValue');
  // 打折活动类型
  var activityScopedis=$("#activityScopedis").val();
  // 满减活动类型
  var activityScopemj=$("#activityScopemj").val();
  // 开始日期
  var startTime=$("#startTime").val();
  // 结束日期
  var endTime=$("#endTime").val();
  endTime = endTime +" 23:59:59";
  // 开始时间
  var dailyStartTime=Date.parse("1970-1-1 "+$("#dailyStartTime").val());
  // 结束时间
  var dailyEndTime=Date.parse("1970-1-1 "+$("#dailyEndTime").val());
  // 星期值获取
  var weeklyActivityDay=$('#weeklyActivityDay').val();
  // 验证表格数据
  var footerRows = $("#saleMangeadd").datagrid("getFooterRows");
  if(footerRows){
	  saleAmount = parseFloat(footerRows[0]["saleAmount"]||0.0).toFixed(4);
  }
 
  // 活动状态为特价--偶数特价--换购
  if(activityType=="1"||activityType=="3"||activityType=="4"){
	  var reqObj = {
	          branchIds:branchIds,
	          activityName:activityName,
	          activityType:activityType,
	          startTime:startTime,
	          endTime:endTime,
	          dailyStartTime:dailyStartTime,
	          dailyEndTime:dailyEndTime,
	          weeklyActivityDay:weeklyActivityDay,
	          activityScope:0,
	          detailList : []
	  };
	  $.each(rows,function(i,data){
	      var temp = {
	    	  goodsSkuId: data.goodsSkuId,
	    	  saleAmount:data.saleAmount,
	    	  price:data.price
	      }
	      reqObj.detailList[i] = temp;
	  });
  }
  else if(activityType=="6"){
	  var reqObj = {
	          branchIds:branchIds,
	          activityName:activityName,
	          activityType:activityType,
	          startTime:startTime,
	          endTime:endTime,
	          dailyStartTime:dailyStartTime,
	          dailyEndTime:dailyEndTime,
	          weeklyActivityDay:weeklyActivityDay,
	          activityScope:0,
	          detailList : []
	  };
	  $.each(rows,function(i,data){
	      var temp = {
	    	  goodsSkuId: data.goodsSkuId,
	    	  limitCount: data.limitCount,
	    	  saleAmount:data.saleAmount,
	    	  groupNum:data.groupNum,
	    	  price:data.price
	      }
	      reqObj.detailList[i] = temp;
	  });
	  
  }
  // 活动状态为折扣
  else if(activityType=="2"){
	// 活动状态为折扣--拼接数据
	  var reqObj = {
	          branchIds:branchIds,
	          activityName:activityName,
	          activityType:activityType,
	          startTime:startTime,
	          endTime:endTime,
	          dailyStartTime:dailyStartTime,
	          dailyEndTime:dailyEndTime,
	          weeklyActivityDay:weeklyActivityDay,
	          activityScope:activityScopedis,
	          detailList : []
	  };
	  // 活动状态为折扣--单品折扣
	   if(activityScopedis=="0"){
		   $.each(rows,function(i,data){
			      var temp = {
			    	  goodsSkuId: data.goodsSkuId,
			    	  discount:data.discount,
			    	  price:data.price
			      }
			      reqObj.detailList[i] = temp;
			  });
		   
	   }else if(activityScopedis=="2"){
		   //全场折扣
		   $.each(rows,function(i,data){
			      var temp = {
			    	  discount:data.discount,
			      }
			      reqObj.detailList[i] = temp;
			  });
	   }
	  // 活动状态为折扣--类别折扣
	   else{
		   $.each(rows,function(i,data){
			      var temp = {
			    		goodsCategoryId:data.goodsCategoryId,
			    		goodsCategoryCode:data.goodsCategoryCode,
			    	    discount:data.discount,
			      }
			      reqObj.detailList[i] = temp;
			  });
	   }
	 
  }
  // 活动状态为满折
  else if(activityType=="5"){
	// 活动状态为满减--拼接数据
	  var reqObj = {
	          branchIds:branchIds,
	          activityName:activityName,
	          activityType:activityType,
	          startTime:startTime,
	          endTime:endTime,
	          dailyStartTime:dailyStartTime,
	          dailyEndTime:dailyEndTime,
	          weeklyActivityDay:weeklyActivityDay,
	          activityScope:activityScopemj,
	          detailList : []
	  };
	// 活动状态为满减 -商品
	  if(activityScopemj=="0"){
		  $.each(rows,function(i,data){
			  var goodsSkuId = data.goodsSkuId;
		      var price = data.price;
		      
		      $.each(setrows,function(j,data1){
			      var fullCutData = {
			    	  limitAmount:data1.limitAmount,
			          discountPrice:data1.discountPrice,
			      }
			      var goodsFullCut = $.extend({
					  goodsSkuId:goodsSkuId,
					  price:price
			      },fullCutData);
			      
			      reqObj.detailList.push(goodsFullCut);
			      
			  });
		      
		  });
		  
	  }
	//活动状态为满减 -类别
	  else if(activityScopemj=="1"){
		  $.each(rows,function(i,data){
		      var _goodsCategoryId = data.goodsCategoryId;
		      var _goodsCategoryCode = data.goodsCategoryCode;
		      
		      $.each(setrows,function(i,data){
			      var fullCutData = {
			    	  limitAmount:data.limitAmount,
			          discountPrice:data.discountPrice,
//			          price:data.price
			      }
			      var goodsFullCut = $.extend({
			    	  goodsCategoryId:_goodsCategoryId,
			    	  goodsCategoryCode:_goodsCategoryCode
			      },fullCutData);
			      
			      reqObj.detailList.push(goodsFullCut);
			      
			  });  
		  });
	  } 
      //满减全场类型
	  else if(activityScopemj=="2"){
		  $.each(rows,function(i,data){
		      var temp = {
		    	  limitAmount:data.limitAmount,
			      discountPrice:data.discountPrice,
		      }
		      reqObj.detailList[i] = temp
		  });
	  }
  //买满送
  }else if(activityType=="10"){
	  rows.forEach(function(obj,index){
		  var tempgifts = [];//rows;
		  if(obj.goodsGiftList &&　obj.goodsGiftList.length >0){
			  obj.goodsGiftList.forEach(function(obx,indej){
				  var temgood = {
						  skuId :  obx.skuId,
						  skuCode :  obx.skuCode,
						  giftNum :  obx.giftNum,
						  giftAmount :  obx.giftAmount,
				  }
				  tempgifts.push(temgood);
			  })
			  obj.goodsGiftList = tempgifts;
		  }
	  })
	  
	  //全场(2)  类别(1)  商品(0) 
	  var actScope = $("input[name='mmsstatus']:checked").val()||'';
	  
	  var reqObj = {
	          branchIds:branchIds,
	          activityName:activityName,
	          activityType:activityType,
	          startTime:startTime,
	          endTime:endTime,
	          dailyStartTime:dailyStartTime,
	          dailyEndTime:dailyEndTime,
	          weeklyActivityDay:weeklyActivityDay,
	          activityScope:actScope,
	          activityPattern:$('#activitymmsType').combobox('getValue')||'',
	          allowActivity:$("#mmsofactType1").is(":checked")?1:0,
	          allowMultiple:$("#mmsofactType2").is(":checked")?1:0,
	          detailList:setrows, //活动范围数据集合
	          gradientList:rows //梯度集合
	  };
	  
  }
  
  var req = JSON.stringify(reqObj);
  console.log('req',req);
//  return; 
  $.ajax({
      url:contextPath+"/sale/activity/save",
      type:"POST",
      contentType:'application/json',
      data:req,
      success:function(result){
          if(result['code'] == 0){
              $.messager.alert("操作提示", "操作成功！", "info", function(){
            		  location.href = contextPath +"/sale/activity/edit?activityId="+result["activityId"]; 
              });
          }else{
              successTip(result['message']);
          }
      },
      error:function(result){
          successTip("请求发送失败或服务器处理失败");
      }
  });
}


/**
 * 星期选择赋值
 */
function weekCheckDay(){
  var len=$('#weekday .ubcheckweek').length;
  var str="";
  for(var i=0;i<len;i++){
	 var elemt=$('#weekday .ubcheckweek').eq(i).find('.ub');
	 var check= elemt.prop("checked");
	  if(check){
		str+=elemt.val()
	   }
    }
  $('#weeklyActivityDay').val(str);
}



/**
 * 分店列表 0 单选,1 多选
 */

function selectBranch() {
	new publicBranchService(function(data) {
		var branchesId="";
		var branchName="";
		$.each(data,function(i,k){
			branchesId=k.branchesId+","+branchesId;
			branchName+="["+k.branchCode+"]"+k.branchName+",";
		})
		branchesId = branchesId.substring(0,branchesId.length - 1);
		branchName = branchName.substring(0,branchName.length - 1);
		$("#branchIds").val(branchesId);// id
		$("#branchName").val(branchName);
		$("#areaName").val("自定义");
		$("#areaInput").val("");
		 
	},1);
}

//类别选择  ---> 买满送
function getGoodsTypeG(){
	var param = {
			categoryType:"",
			type:1
	}
	new publicCategoryService(function(data){
		var nowRows = gridHandelB.getRowsWhere({categoryCode:'1'});
		
        var addDefaultData  = gridHandelB.addDefault(data,[{}]);
    	var keyNames = {
    			categoryCode:'goodsCategoryCode'
        };
        var rows = gFunUpdateKey(addDefaultData,keyNames);
        var argWhere ={categoryCode:1};  // 验证重复性
        var newRows = gridHandelB.checkDatagrid(nowRows,rows,argWhere);
        gridHandelB.setLoadData(newRows)
	},param);
}

// 类别选择
function getGoodsType(){
	var activityT=$("#activityType").combobox('getValue');
	//买满送调用 selectGoodsG方法
	if(activityT == '10'){
		getGoodsTypeG();
		return;
	}
	
	var param = {
			categoryType:"",
			type:1
	}
	new publicCategoryService(function(data){
		var nowRows = gridHandel.getRowsWhere({categoryCode:'1'});
		
        var addDefaultData  = gridHandel.addDefault(data,[{}]);
    	var keyNames = {
    			categoryCode:'goodsCategoryCode'
        };
        var rows = gFunUpdateKey(addDefaultData,keyNames);
        var argWhere ={categoryCode:1};  // 验证重复性
        var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere);
        $('#'+datagridId).datagrid("loadData",newRows);
		
	},param);
}

// 返回列表页面
function back(){
	location.href = contextPath +"/sale/activity/list";
}


/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
	 $("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	 $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
};

//折扣价处理
function saleAmountOnChange(newV,oldV){
	var priceNumVal = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'price');
	if(parseFloat(priceNumVal) < parseFloat(newV)) {
		messager("促销价格大于商品原价");
		gridHandel.setFieldValue('saleAmount','');
		return;
	}
//	if(parseFloat(newV)==0){
//		messager("促销价格为0");
//		return;
//	}
	//计算新毛利率
    var purchasePrice = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'purchasePrice');
    var newSaleRate = ((newV-purchasePrice)/(2*newV)*100).toFixed(2)+"%";
    gridHandel.setFieldTextValue('newSaleRate',newSaleRate);

	gridHandel.setFieldValue('saleAmount',newV);
}

//生成一个唯一id
function getUUID(headString) {
    var tempId = '';
    tempId = (headString || '') + Math.round((new Date().valueOf() * Math.random())) + '';
    return tempId;
};