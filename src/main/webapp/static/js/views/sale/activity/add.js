var datagridId = "saleMangeadd";
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
    $('#special,#discount,#batchcount').on('input',function(){
    	var obj=$(this).attr('id');
    	specialRows(obj,$(this).val());

	})
	//一周星期获取和初始化
	  weekCheckDay();
	$(document).on('click','#weekday .ubcheckweek',function(){
	//点击取消切换方法执行
	  weekCheckDay();
	})
	
});

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
		    case "2":
			    selectOptionzk();
			    break;
		    case "3":
			    selectOptionOdd();
			    break;
		    case "4":
			    optionHide();
			    initDatagridRedemption();
			    disableGoods('','GoodsType');
			    break;
		    case "5":
			    selectOptionMj();
			    break;
		    case "6":
			    optionHide();
			    initDatagridCompose();
			    disableGoods('','GoodsType');
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


// 特价状态选择隐藏
function selectOptionSpecial(){
    // 禁止按钮点击事件
    disableGoods('','GoodsType');
	initDatagridSpecial();
	optionHide();
	 $('.special').removeClass('unhide');
}



// 折扣状态选择隐藏
function selectOptionzk(){
	optionHide();
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
	initDatagridOddtj();
    $('.oddprice ').removeClass('unhide');
}

// 满减状态选择隐藏
function selectOptionMj(){
	optionHide();
	//初始化
	$('#consalesetmj').removeClass('unhide');
	$("#consaleadd").removeClass('ub-f1');
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
		

	      /*var mjval=$(this).val();
	      $('#activityScopemj').val(mjval);
	      if(mjval=="2"){
	    	  $('#consalesetmj').removeClass('unhide');
	    	  $("#consalesetmj").addClass('ub-f1');
	    	  $('#consaleadd').addClass('unhide');
	    	  //禁止按钮点击事件
	    	  disableGoods('SelectGoods','GoodsType');
	    	  initDatagridallMj();  
	    	  initDatagridsortSet();
	  	   }
	      else if(mjval=="1"){
	    	  $("#consaleadd").addClass('ub-f1');
	    	  $('#consaleadd').removeClass('unhide');
	    	  $('#consalesetmj').removeClass('unhide');
	    	  //禁止按钮点击事件
	    	  disableGoods('SelectGoods','');
	    	  initDatagridsortMj();
	    	  initDatagridsortSet();
	      }
	      else {
	    	  $("#consaleadd").removeClass('ub-f1');
	    	  $('#consaleadd').removeClass('unhide');
	    	  $('#consalesetmj').removeClass('unhide');
	    	  //禁止按钮点击事件
	    	  disableGoods('','GoodsType');
	    	  initDatagridshopMj();
	    	  initDatagridsortSet();

	      }*/
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
	/*$('#activityName').val("");
	$('#startTime').val("");
	$('#endTime').val("");
	$('#dailyStartTime').val("00:00:00");
	$('#dailyEndTime').val("23:59:59");
	$('#branchName').val("");
	$('#saleMangeadd').datagrid('loadData', { total: 0, rows: [] });
	$("#saleMangeadd").datagrid("options").url ="";*/
	//$('#salesetmj').datagrid('loadData', { total: 0, rows: [] });
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
		                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                },
		                editor:{
		                    type:'numberbox',
		                    options:{
		                        min:0,
		                        precision:2,
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
			{field: 'saleAmount', title: '偶数特价', width: 100, align: 'right',
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
			        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			    },
			    editor:{
			        type:'numberbox',
			        options:{
			            min:0,
			            precision:2,
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
			newData[i].saleAmount= val;
			rowIndex = $("#"+datagridId).datagrid('getRowIndex',newData[i]);
			// 更新行数据
			$("#"+datagridId).datagrid('updateRow',{
				index: rowIndex,
				row: newData[i]
			});
			// 刷新行
			$("#"+datagridId).datagrid('refreshRow',rowIndex);
		}
	}
	else if(id=="discount"){
		for(var i = 0;i < newData.length;i++){
			newData[i].discount= val;
			rowIndex = $("#"+datagridId).datagrid('getRowIndex',newData[i]);
			// 更新行数据
			$("#"+datagridId).datagrid('updateRow',{
				index: rowIndex,
				row: newData[i]
			});
			// 刷新行
			$("#"+datagridId).datagrid('refreshRow',rowIndex);
		}
	}
	else if(id=="batchcount"){
		for(var i = 0;i < newData.length;i++){
			newData[i].saleAmount= val;
			rowIndex = $("#"+datagridId).datagrid('getRowIndex',newData[i]);
			// 更新行数据
			$("#"+datagridId).datagrid('updateRow',{
				index: rowIndex,
				row: newData[i]
			});
			// 刷新行
			$("#"+datagridId).datagrid('refreshRow',rowIndex);
		}
	}
	
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
// 选择商品
function selectGoods(searchKey){
	if($("#branchName").val()==" "){ //是否选择活动机构的校验
		messager("请先选择活动分店！");
		return;
	}
    new publicGoodsService("",function(data){
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
        $("#saleMangeadd").datagrid("loadData",newRows);
        /*
		 * setTimeout(function(){
		 * gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
		 * gridHandel.setSelectFieldName("saleAmount");
		 * gridHandel.setFieldFocus(gridHandel.getFieldTarget('saleAmount'));
		 * },100)
		 */
    },searchKey,0,"","",$("#branchIds").val(),"");
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

  if(rows.length==0){
      messager("表格不能为空");
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
		      var _goodsSkuId = data.goodsSkuId;
		      
		      $.each(setrows,function(i,data){
			      var fullCutData = {
			    	  limitAmount:data.limitAmount,
			          discountPrice:data.discountPrice,
			          price:data.price
			      }
			      var goodsFullCut = $.extend({goodsSkuId:_goodsSkuId}, fullCutData);
			      
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
  }
  var req = JSON.stringify(reqObj);
  console.log(req)
  $.ajax({
      url:contextPath+"/sale/activity/save",
      type:"POST",
      contentType:'application/json',
      data:req,
      success:function(result){
    	  console.log(result)
          if(result['code'] == 0){
              console.log(result);
              console.log(result);
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

// 类别选择
function getGoodsType(){
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
		
	},"",1);
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
	gridHandel.setFieldValue('saleAmount',newV);
}
