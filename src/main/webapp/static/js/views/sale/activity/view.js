//全局变量
var datagridId = "saleMangeadd";
var activtype="";
var activityType="";
var activityScopedis="";
var activityScopemj="";

$(function(){
	optionHide();
	// 开始和结束时间
	$("#startTime").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
    $("#endTime").val("2016-11-18");
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
	var priceValone=$("#activityType").combobox('getValue');
	editstart(priceValone);
    
  // 一周星期获取和初始化
	  weekCheckDay();
	$(document).on('click','#weekday .ubcheckweek',function(){
	// 点击取消切换方法执行
	  weekCheckDay();
	})
	
});

// 编辑请求数据
function  editstart(selectType){
	var activityId = $("#activityId").val();
	$.ajax({
	      url:contextPath+"/sale/activity/get?activityId="+activityId,
	      type:"get",
	      contentType:'application/json',
	      success:function(data){
	    	  if(data['code'] == 0){
	    		  if(data['obj']['activityStatus'] == "2"){
	    			  $("#already-examine").html("<span>已终止</span>");
	    		  }
	    		  
	    		  var listinfo=data['obj'];
	    		  activtype=listinfo.activityType;
	    		  // 活动名称
	    		  console.log(data.obj.activityName);
	    		  $('#activityName').val(data.obj.activityName);
	    		  // 日期转换格式
		    	  var startTimeedit= new Date(listinfo.startTime);
		    	  var endTimeedit=new Date(listinfo.endTime);
		    	  startTimeedit=startTimeedit.format("yyyy-MM-dd"); 
		    	  endTimeedit=endTimeedit.format("yyyy-MM-dd");
		    		$('#startTime').val(startTimeedit);
		    		$('#endTime').val(endTimeedit);
		    		// 时间转换格式
		    		 var dailyStartTimeedit= new Date(listinfo.dailyStartTime);
			    	 var dailyEndTimeedit=new Date(listinfo.dailyEndTime);
		    		 dailyStartTimeedit=listinfo.dailyStartTime.format("HH:mm:ss"); 
		    		 dailyEndTimeedit=listinfo.dailyEndTime.format("HH:mm:ss");
		    		 $('#dailyStartTime').val(dailyStartTimeedit);
		    		 $('#dailyEndTime').val(dailyEndTimeedit);
		    		 $('#weeklyActivityDay').val(listinfo.weeklyActivityDay);
		    		var strweek=$('#weeklyActivityDay').val();
		    		// 星期字符串处理
		    		StrweekCheckDay(strweek);
		    		//组合结构显示和id
		    		var branchIds="";
		    		var branchName="";
		    		$.each(data.branch,function(i,v){
		    			if(!v.branchName&&!v.branchCode){
		    				return;
		    			}
		    			branchName+="["+v.branchCode+"]"+v.branchName+",";
		    			branchIds = v.branchId+"," + branchIds;
		    		 });
		    		 branchIds = branchIds.substring(0,branchIds.length - 1);
		    		 branchName = branchName.substring(0,branchName.length - 1);
		    		 $('#branchName').val(branchName);
		    		 $('#branchIds').val(branchIds);
                    // combobox 下拉赋值和禁止选择
  		    		$("#activityType").combobox('select',activtype);  
  		    		$("#activityType").combobox("disable");
  		    	    // checkbox 禁止所有选中状态
  		    		checkboxDisabled();
		    		// 满减类型赋值
					if(activtype==5){	    			

						activityScopemj=listinfo.activityScope;	
						radioSetmj(activityScopemj);
						console.log(activityScopemj)
						
						if(activityScopemj == 0 || activityScopemj == 1){
							initmjOneDatagrid(activityId);
							initmjTowDatagrid(activityId);
						}else if(activityScopemj == 2){
							initmjFullDatagrid(activityId);
						}
						
						
						
					  }
					// 其他类型请求
					else{
						initmangeDatagrid(activityId);
						 // 折扣类型赋值
			    		 if(activtype=="2"){
			    		   activityScopedis=listinfo.activityScope;
			    		   radioSetdis(activityScopedis);
			    		  }
					}

	              }else{
	             
	            	  successTip(data['message']);
	          }
	      },
	      error:function(result){
	          successTip("请求发送失败或服务器处理失败");
	      }
	  });
}
// select 选择切换
function onChangeSelect(){
 var priceVal=$("#activityType").combobox('getValue');
	 switch(priceVal)
	 {
	 case "1":
	   selectOptionSpecial();
	   // 禁止按钮点击事件
	   disableGoods('','GoodsType');
	   
	   break;
	 case "2":
	   selectOptionzk();
	   break;
	 case "3":
	   selectOptionOdd();
	   disableGoods('','GoodsType');
	   break;
	 case "4":
	   initDatagridRedemption();
	   disableGoods('','GoodsType');
	   break;
	 case "5":
	   selectOptionMj();

	   break;
	 case "6":
	   initDatagridCompose();
	   disableGoods('','GoodsType');
	 
	  break;
     }	
}


// 特价状态选择隐藏
function selectOptionSpecial(){
	initDatagridSpecial();
	$('.special').removeClass('unhide');
}



// 折扣状态选择隐藏
function selectOptionzk(){
	initDatagridoneZk();
	disableGoods('','GoodsType');
	$('.discount').removeClass('unhide');
	$('.discountTypechoose').removeClass('unhide');
	$(document).on('click','.discountTypechoose .disradio',function(){
      var disval=	$(this).val();
      $('#activityScopedis').val(disval);
      if(disval=="1"){
    	  initDatagridsortZk();
    	  // 禁止按钮点击事件
    	  disableGoods('SelectGoods','');
  	   }
      else{
    	  initDatagridoneZk();
    	  // 禁止按钮点击事件
    	  disableGoods('','GoodsType');
      }
   })
}

// 偶数特价状态选择隐藏
function selectOptionOdd(){
	initDatagridOddtj();
    $('.oddprice ').removeClass('unhide');
}

// 满减状态选择隐藏
function selectOptionMj(){
	$('#consalesetmj').removeClass('unhide');
	$("#consaleadd").removeClass('ub-f1');
	initDatagridshopMj();
	initDatagridsortSet();
	// 禁止按钮点击事件
	disableGoods('','GoodsType');
	$('.mjTypechoose').removeClass('unhide');
	$(document).on('click','.mjTypechoose .mjradio',function(){
	      var mjval=$(this).val();
	      $('#activityScopemj').val(mjval);
	      if(mjval=="2"){
	    	  $('#consalesetmj').removeClass('unhide');
	    	  $("#consalesetmj").addClass('ub-f1');
	    	  $('#consaleadd').addClass('unhide');
	    	  // 禁止按钮点击事件
	    	  disableGoods('SelectGoods','GoodsType');
	    	  initDatagridallMj();  
	    	  initDatagridsortSet();
	  	   }
	      else if(mjval=="1"){
	    	  $("#consaleadd").addClass('ub-f1');
	    	  $('#consaleadd').removeClass('unhide');
	    	  $('#consalesetmj').removeClass('unhide');
	    	  // 禁止按钮点击事件
	    	  disableGoods('SelectGoods','');
	    	  initDatagridsortMj();
	    	  initDatagridsortSet();
	      }
	      else {
	    	  $("#consaleadd").removeClass('ub-f1');
	    	  $('#consaleadd').removeClass('unhide');
	    	  $('#consalesetmj').removeClass('unhide');
	    	  // 禁止按钮点击事件
	    	  disableGoods('','GoodsType');
	    	  initDatagridshopMj();
	    	  initDatagridsortSet();
	    
	      }
	   })
}
// 折扣状态状态radio 赋值
function radioSetdis(radioVal){
	$('.disradio').prop('checked',false);
	$('.disradio').prop('disabled',true);
	$('#disradio'+radioVal).prop('checked',true); 
	if(radioVal=="1"){
  	  initDatagridsortZk();
  	  // 禁止按钮点击事件
  	  disableGoods('SelectGoods','');
	   }
    else{
  	  initDatagridoneZk();
  	  // 禁止按钮点击事件
  	  disableGoods('','GoodsType');
    }
}
// 满减状态radio 赋值
function radioSetmj(radioVal){
	$('.mjradio').prop('checked',false);
	$('.mjradio').prop('disabled',true);
	$('#mjradio'+radioVal).prop('checked',true); 
	if(radioVal=="2"){
  	  $('#consalesetmj').addClass('unhide');
  	  $('#consalesetmj').removeClass('ub-f1');
  	  $("#consaleadd").addClass('ub-f1');
  	  // 禁止按钮点击事件
  	  disableGoods('SelectGoods','GoodsType');
  	  initDatagridallMj();    
	   }
    else if(radioVal=="1"){
  	  $("#consaleadd").removeClass('ub-f1');
  	  $('#consalesetmj').removeClass('unhide');
  	  // 禁止按钮点击事件
  	  disableGoods('SelectGoods','');
  	  initDatagridsortMj();
  	  initDatagridsortSet();
    }
    else {
  	  $("#consaleadd").removeClass('ub-f1');
  	  $('#consalesetmj').removeClass('unhide');
  	  // 禁止按钮点击事件
  	  disableGoods('','GoodsType');
  	  initDatagridshopMj();
  	  initDatagridsortSet();
  
    }
}
// checkbox 禁止 状态
function checkboxDisabled(){
	$(".ubcheckweek").prop('disabled',true);
}

// 状态初始化 隐藏 清空数据
function optionHide(){
	$("#consaleadd").addClass('ub-f1');
	$('.special').addClass('unhide');
	$('.discount').addClass('unhide');
	$('.oddprice ').addClass('unhide');
	$('.discountTypechoose').addClass('unhide');
	$('.mjTypechoose').addClass('unhide');
	$('#consalesetmj').addClass('unhide');	
	$('#activityName').val("");
	$('#startTime').val("");
	$('#endTime').val("");
	$('#dailyStartTime').val("00:00:00");
	$('#dailyEndTime').val("23:59:59");
	$('#branchName').val("");
	$('#saleMangeadd').datagrid('loadData', { total: 0, rows: [] });
	$("#saleMangeadd").datagrid("options").url ="";
	// $('#salesetmj').datagrid('loadData', { total: 0, rows: [] });
	$('.ubcheckweek').prop('checked',true);
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
// 公用表格请求公用方法
function initmangeDatagrid(activityId){
	 $("#saleMangeadd").datagrid("options").method = "get";
     $("#saleMangeadd").datagrid("options").url =contextPath+"/sale/activity/getDetail?activityId="+activityId;
     $("#saleMangeadd").datagrid("load");
}
// 满减请求方法 saleMangeadd
function initmjOneDatagrid(activityId){
	$("#saleMangeadd").datagrid("options").method = "get";
    $("#saleMangeadd").datagrid("options").url =contextPath+"/sale/activity/getDetailFullCut?activityId="+activityId;
    $("#saleMangeadd").datagrid("load");
}
// 满减请求方法 salesetmj
function initmjTowDatagrid(activityId){
	$("#salesetmj").datagrid("options").method = "get";
    $("#salesetmj").datagrid("options").url =contextPath+"/sale/activity/getLimitAmountFullCut?activityId="+activityId;
    $("#salesetmj").datagrid("load");
}

//满减请求方法 saleMangeadd
function initmjFullDatagrid(activityId){
	$("#saleMangeadd").datagrid("options").method = "get";
    $("#saleMangeadd").datagrid("options").url =contextPath+"/sale/activity/getLimitAmountFullCut?activityId="+activityId;
    $("#saleMangeadd").datagrid("load");
}

var datagridObj;
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
    datagridObj = $("#saleMangeadd").datagrid({
        align:'center',
        // toolbar: '#tb', //工具栏 id为tb
        singleSelect:false,  // 单选 false多选
        rownumbers:true,    // 序号
        pagination:true,    // 分页
        fitColumns:true,    // 每列占满
        // fit:true, //占满
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
        columns:[[
					{field:'ck',checkbox:true},
					{field:'skuCode',title:'货号',width:'85px',align:'left'},
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
		                    	disabled:true,
		                        min:0,
		                        precision:2,
		                    }
		                },
		            },
        ]],
      onLoadSuccess:function(data){
		gridHandel.setDatagridHeader("center");
				
		 }
    });
    gridHandel.setLoadData([$.extend({},gridDefault)]) 
}

// 初始化表格-类别折扣
function initDatagridsortZk(){
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
        pagination:true,    // 分页
        fitColumns:true,    // 每列占满
        // fit:true, //占满
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
        columns:[[
					{field:'ck',checkbox:true},
					{field:'categoryName',title:'商品类别',width:'200px',align:'left'},
					 {field:'discount',title:'折扣',width:'80px',align:'right',
		                formatter:function(value,row,index){
		                    if(row.isFooter){
		                        return
		                    }
		                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                },
		                editor:{
		                    type:'numberbox',
		                    options:{
		                    	disabled:true,
		                        min:0,
		                        precision:2,
		           
		                    }
		                },
		            }, 
          ]],
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
        pagination:true,    // 分页
        fitColumns:true,    // 每列占满
        // fit:true, //占满
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
        columns:[[
			{field:'ck',checkbox:true},
			{field:'skuCode',title:'货号',width:'85px',align:'left'},
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
			        	disabled:true,
			            min:0,
			            precision:2,
			        }
			    },
			},
          ]],
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
        pagination:true,    // 分页
        fitColumns:true,    // 每列占满
        // fit:true, //占满
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
        columns:[[
			{field:'ck',checkbox:true},
			{field:'skuCode',title:'货号',width:'85px',align:'left'},
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
			    }
			},
			{field: 'saleAmount', title: '偶数特价', width: 100, align: 'right',
			    formatter : function(value, row, index) {
			        if(row.isFooter){
			            return;
			        }
			        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			    }
			},
          ]],
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
      pagination:true,    // 分页
      fitColumns:true,    // 每列占满
      // fit:true, //占满
      showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
      columns:[[
			{field:'ck',checkbox:true},
			{field:'skuCode',title:'货号',width:'85px',align:'left'},
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
			    }
			},
			{field: 'saleAmount', title: '换购价', width: 100, align: 'right',
			    formatter : function(value, row, index) {
			        if(row.isFooter){
			            return;
			        }
			        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			    }
			},
        ]],
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
        pagination:true,    // 分页
        fitColumns:true,    // 每列占满
        // fit:true, //占满
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
        columns:[[
					{field:'ck',checkbox:true},
					{field:'limitAmount',title:'买满金额',width:'80px',align:'right',
		                formatter:function(value,row,index){
		                    if(row.isFooter){
		                        return
		                    }
		                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                }
		            }, 
					{field:'discountPrice',title:'优惠额',width:'80px',align:'right',
		                formatter:function(value,row,index){
		                    if(row.isFooter){
		                        return
		                    }
		                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                }
		            }, 
          ]],
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
        pagination:true,    // 分页
        fitColumns:true,    // 每列占满
        // fit:true, //占满
        showFooter:true,
		height:'300px',
		pageSize:50,
		width:'100%',
        columns:[[
					{field:'ck',checkbox:true},
					{field:'categoryName',title:'商品类别',width:'200px',align:'left'},
          ]],
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
        pagination:true,    // 分页
        fitColumns:true,    // 每列占满
        // fit:true, //占满
        showFooter:true,
		height:'300px',
		pageSize:50,
		width:'100%',
        columns:[[
					{field:'ck',checkbox:true},
					{field: 'limitAmount', title: '买满金额', width: '100px', align: 'right',
					    formatter : function(value, row, index) {
					        if(row.isFooter){
					            return;
					        }
					        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					    }
					},
					{field: 'discountPrice', title: '优惠额', width: '100px', align: 'right',
					    formatter : function(value, row, index) {
					        if(row.isFooter){
					            return;
					        }
					        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					    }
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
      pagination:true,    // 分页
      fitColumns:true,    // 每列占满
      // fit:true, //占满
      showFooter:true,
		height:'300px',
		pageSize:50,
		width:'100%',
      columns:[[
			{field:'ck',checkbox:true},
			{field:'skuCode',title:'货号',width:'85px',align:'left'},
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
			    }
			},
        ]], 
       
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
      pagination:true,    // 分页
      fitColumns:true,    // 每列占满
      // fit:true, //占满
      showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
      columns:[[
			{field:'ck',checkbox:true},
			{field:'skuCode',title:'货号',width:'85px',align:'left'},
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
			    }
			},
			{field: 'limitCount', title: '组合数量', width: 100, align: 'right',
			    formatter : function(value, row, index) {
			        if(row.isFooter){
			            return;
			        }
			        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			    }
			},
			{field: 'saleAmount', title: '组合特价', width: 100, align: 'right',
			    formatter : function(value, row, index) {
			        if(row.isFooter){
			            return;
			        }
			        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			    }
			},
			{field: 'groupNum', title: '组号', width: 100, align: 'right',
			    formatter : function(value, row, index) {
			        if(row.isFooter){
			            return;
			        }
			        return '<b>'+parseFloat(value||0).toFixed(0)+'</b>';
			    }
			},
        ]],
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
    new publicGoodsService("",function(data){
        if(searchKey){
            $("#saleMangeadd").datagrid("deleteRow", gridHandel.getSelectRowIndex());
            $("#saleMangeadd").datagrid("acceptChanges");
        }
        var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
        var addDefaultData  = gridHandel.addDefault(data,gridDefault);
        var keyNames = {
        	skuId:'goodsSkuId'
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
    },searchKey);
}

// 保存
function saveActivity(){
  // 保存结束编辑
  $("#saleMangeadd").datagrid("endEdit", gridHandel.getSelectRowIndex());
  var rows=$('#saleMangeadd').datagrid('getRows');
  // 活动类型
  var activityType=$("#activityType").combobox('getValue');
  // 打折活动类型
  var activityScopedis=$("#activityScopedis").val();
  // 满减活动类型
  var activityScopemj=$("#activityScopemj").val();
  // 满减活动类型
  var activityScopemj=$("#activityScopemj").val();

  var check = {skuCode:'1'};
  
  if(activityScopedis == 1 || activityScopemj == 1){
	  var check ={goodsCategoryCode:'1'}
  }
  // 获取非空的数据
  var rows= gridHandel.getRowsWhere(check);// $('#saleMangeadd').datagrid('getRows');
  // 重新加载数据，去除空数据
  $("#saleMangeadd").datagrid("loadData",rows);
  
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
	      if(!v["saleAmount"]){
	          messager("第"+(i+1)+"行，促销价不能为空");
	          isCheckResult = false;
	          return false;
	      };
	  }
	  saveDataHandel(rows);
  }
  
  // 活动类型折扣验证
  else if(activityType=="2"){ 
	// 活动类型单品折扣验证
	  if(activityScopedis=="0"){
		  for(var i=0;i<rows.length;i++){
			  var v = rows[i];
		      if(!v["skuCode"]){
		          messager("第"+(i+1)+"行，货号不能为空");
		          isCheckResult = false;
		          return false;
		      };
		      if(!v["discount"]){
		          messager("第"+(i+1)+"行，折扣不能为空");
		          isCheckResult = false;
		          return false;
		      };
		      if(v["discount"]>10||v["discount"]<0){
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
		      if(!v["discount"]){
		          messager("第"+(i+1)+"行，折扣不能为空");
		          isCheckResult = false;
		          return false;
		      };
		      if(v["discount"]>10||v["discount"]<0){
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
			      if(!v["limitAmount"]){
			          messager("第"+(i+1)+"行，买满金额不能为空");
			          isCheckResult = false;
			          return false;
			      };
			      if(!v["discountPrice"]){
			          messager("第"+(i+1)+"行，优惠额不能为空");
			          isCheckResult = false;
			          return false;
			      };
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
			      if(!v["limitAmount"]){
			          messager("第"+(i+1)+"行，买满金额不能为空");
			          isCheckResult = false;
			          return false;
			      };
			      if(!v["discountPrice"]){
			          messager("第"+(i+1)+"行，优惠额不能为空");
			          isCheckResult = false;
			          return false;
			      };
			  }
			  saveDataHandel(rows,setrows); 
		 }
		  else if(activityScopemj=="2"){
			  for(var i=0;i<rows.length;i++){
				  var v = rows[i];
			      if(!v["limitAmount"]){
			          messager("第"+(i+1)+"行，买满金额不能为空");
			          isCheckResult = false;
			          return false;
			      };
			      if(!v["discountPrice"]){
			          messager("第"+(i+1)+"行，优惠额不能为空");
			          isCheckResult = false;
			          return false;
			      };
			  }
			  saveDataHandel(rows);
		  }
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
  if(activityType=="1"||activityType=="3"||activityType=="4"||activityType=="6"){
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
		      var goods = {
		    	  goodsSkuId: data.goodsSkuId,
		      }
		      $.each(setrows,function(i,data){
			      var fullCutData = {
			    	  limitAmount:data.limitAmount,
			          discountPrice:data.discountPrice,
			          price:data.price
			      }
			      var goodsFullCut = $.extend(goods,fullCutData);
			      
			      reqObj.detailList.push(goodsFullCut);
			      
			  });
		      
		  });
	  }
	// 活动状态为满减 -商品
	  else if(activityScopemj=="1"){
		  $.each(rows,function(i,data){
		      var goods = {
		    	  goodsCategoryId:data.goodsCategoryId,
				  goodsCategoryCode:data.goodsCategoryCode,
		      }
		      $.each(setrows,function(i,data){
			      var fullCutData = {
			    	  limitAmount:data.limitAmount,
			          discountPrice:data.discountPrice,
			      }
			      var goodsFullCut = $.extend(goods,fullCutData);
			      
			      reqObj.detailList.push(goodsFullCut);
			      
			  });  
		  });
	  } 
// 满减全场类型
	  else if(activityScopemj=="2"){
		  $.each(rows,function(i,data){
		      var temp = {
		    	  goodsCategoryId:data.goodsCategoryId,
				  goodsCategoryCode:data.goodsCategoryCode,
		      }
		      reqObj.detailList[i] = temp;
		  });
	  }
  }
  var req = JSON.stringify(reqObj);
  console.log(req)
  $.ajax({
      url:contextPath+"/sale/activity/update",
      type:"POST",
      contentType:'application/json',
      data:req,
      success:function(result){
    	  console.log(result)
    	  if(result['code'] == 0){
              $.messager.alert("操作提示", "操作成功！", "info");
          }else{
              successTip(result['message']);
          }
      },
      error:function(result){
          successTip("请求发送失败或服务器处理失败");
      }
  });
}

// 审核
function check(){
	var activityId = $("#activityId").val();
	$.messager.confirm('提示','是否审核通过？',function(data){
		if(data){
			$.ajax({
		    	url : contextPath+"/sale/activity/check",
		    	type : "POST",
		    	data : {
		    		activityId:$("#activityId").val(),
		    	},
		    	success:function(result){
		    		if(result['code'] == 0){
		    			$.messager.alert("操作提示", "操作成功！", "info",function(){
		    				location.href = contextPath +"/sale/activity/edit?activityId="+activityId;
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
  console.log(str)
  $('#weeklyActivityDay').val(str);
}

/**
 * 星期拆分字符串赋值checkbox
 */
function StrweekCheckDay(weekstr){
	$(".ubcheckweek .ub").prop("checked",false);
	var arrWeek = weekstr.split("");
	$.each(arrWeek,function(i,val){
		$("#weekcheckbox"+val+".ub").prop("checked",true);
	})
	
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
		// 清空列表数据
		$('#addModifyPriceGrid').datagrid('loadData', {total: 0, rows:  [$.extend({},gridDefault)]});  
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

// 终止
function stop(){
	var activityId = $("#activityId").val();
	$.messager.confirm('提示','是否终止此活动？',function(data){
		if(data){
			$.ajax({
		    	url : contextPath+"/sale/activity/stop",
		    	type : "POST",
		    	data : {
		    		activityId:$("#activityId").val(),
		    	},
		    	success:function(result){
		    		if(result['code'] == 0){
		    			$.messager.alert("操作提示", "操作成功！", "info",function(){
		    				location.href = contextPath +"/sale/activity/edit?activityId="+activityId;
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
	});
}

//新增
function addActivity(){
	toAddTab("新增促销活动",contextPath + "/sale/activity/add");
}


