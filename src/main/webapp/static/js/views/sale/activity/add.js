var datagridId = "saleMangeadd";
$(function(){
	//开始和结束时间
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    $("#txtStartTime").val("00:00:00");
    $("#txtEndTime").val("23:59:59");
    initDatagridSpecial();
    //禁止按钮点击事件
    disableGoods('','GoodsType');
    //加载进行批量特价设置
    $('#special,#discount,#batchcount').on('input',function(){
    	var obj=$(this).attr('id');
    	specialRows(obj,$(this).val());

	})
});

//select 选择切换
function onChangeSelect(){
 var priceVal=$("#priceType").combobox('getValue');
	 switch(priceVal)
	 {
	 case "1":
	   selectOptionSpecial();
	   //禁止按钮点击事件
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
}


//特价状态选择隐藏
function selectOptionSpecial(){
	initDatagridSpecial();
	optionHide();
	 $('.special').removeClass('unhide');
}



//折扣状态选择隐藏
function selectOptionzk(){
	initDatagridsortZk();
	optionHide();
    disableGoods('SelectGoods','');
	$('.discount').removeClass('unhide');
	$('.discountTypechoose').removeClass('unhide');
	$(document).on('click','.discountTypechoose .disradio',function(){
      var disval=	$(this).val();
      if(disval=="1"){
    	  initDatagridsortZk();
    	  //禁止按钮点击事件
    	  disableGoods('SelectGoods','');
  	   }
      else{
    	  initDatagridoneZk();
    	  //禁止按钮点击事件
    	  disableGoods('','GoodsType');
      }
   })
}

//偶数特价状态选择隐藏
function selectOptionOdd(){
	initDatagridOddtj();
	optionHide();
    $('.oddprice ').removeClass('unhide');
}

//满减状态选择隐藏
function selectOptionMj(){
	initDatagridallMj();
	optionHide();
	//禁止按钮点击事件
	disableGoods('SelectGoods','GoodsType');
	$('.mjTypechoose').removeClass('unhide');
	$(document).on('click','.mjTypechoose .mjradio',function(){
	      var mjval=	$(this).val();
	      if(mjval=="2"){
	    	  $('#consalesetmj').addClass('unhide');
	    	  $("#item1").addClass('ub-f1');
	    	  //禁止按钮点击事件
	    	  disableGoods('SelectGoods','GoodsType');
	    	  initDatagridallMj();  
	  	   }
	      else if(mjval=="1"){
	    	  $("#item1").removeClass('ub-f1');
	    	  $('#consalesetmj').removeClass('unhide');
	    	  //禁止按钮点击事件
	    	  disableGoods('SelectGoods','');
	    	  initDatagridsortMj();
	    	  initDatagridsortSet();
	    	 
	      }
	      else {
	    	  $("#item1").removeClass('ub-f1');
	    	  $('#consalesetmj').removeClass('unhide');
	    	  //禁止按钮点击事件
	    	  disableGoods('','GoodsType');
	    	  initDatagridshopMj();
	    	  initDatagridsortSet();
	      }
	   })
}
//状态初始化 隐藏
function optionHide(){
	$('.special').addClass('unhide');
	$('.discount').addClass('unhide');
	$('.oddprice ').addClass('unhide');
	$('.discountTypechoose').addClass('unhide');
	$('.mjTypechoose').addClass('unhide');
	$('#consalesetmj').addClass('unhide');	
}

//状态初始化 禁止点击
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
//初始化表格-特价
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
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
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
					{field:'categoryName',title:'商品类别',width:'80px',align:'left'},
					{field:'unit',title:'单位',width:'60px',align:'left'},
					{field:'spec',title:'规格',width:'90px',align:'left'},
					 {field:'price',title:'单价',width:'80px',align:'right',
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
		                    }
		                },
		            },
        ]],
      onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
				
		 }
    });
    gridHandel.setLoadData([$.extend({},gridDefault)]);}

//初始化表格-类别折扣
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
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
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
					{field:'categoryName',title:'商品类别',width:'80px',align:'left',editor:'textbox'},
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
    gridHandel.setLoadData([$.extend({},gridDefault)]);
 }

//初始化表格-单品折扣
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
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
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
			{field:'categoryName',title:'商品类别',width:'80px',align:'left'},
			{field:'unit',title:'单位',width:'60px',align:'left'},
			{field:'spec',title:'规格',width:'90px',align:'left'},
			 {field:'price',title:'单价',width:'80px',align:'right',
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
      onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
				
		 }
    });
    gridHandel.setLoadData([$.extend({},gridDefault)]);
   }


//初始化表格-偶数特价
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
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
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
			{field:'categoryName',title:'商品类别',width:'80px',align:'left'},
			{field:'unit',title:'单位',width:'60px',align:'left'},
			{field:'spec',title:'规格',width:'90px',align:'left'},
			 {field:'price',title:'单价',width:'80px',align:'right',
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
			{field: 'saleAmount', title: '偶数特价', width: 100, align: 'right',
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
      onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
				
		 }
    });
    gridHandel.setLoadData([$.extend({},gridDefault)]);
    
}


//初始化表格-换购
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
      method:'post',
      align:'center',
      //toolbar: '#tb',     //工具栏 id为tb
      singleSelect:false,  //单选  false多选
      rownumbers:true,    //序号
      pagination:true,    //分页
      fitColumns:true,    //每列占满
      //fit:true,            //占满
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
			{field:'categoryName',title:'商品类别',width:'80px',align:'left'},
			{field:'unit',title:'单位',width:'60px',align:'left'},
			{field:'spec',title:'规格',width:'90px',align:'left'},
			 {field:'price',title:'单价',width:'80px',align:'right',
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
			{field: 'saleAmount', title: '换购价', width: 100, align: 'right',
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
    onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
				
		 }
  });
  gridHandel.setLoadData([$.extend({},gridDefault)]);
  
}

//初始化表格-全场满减
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
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
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
					{field:'price',title:'买满金额',width:'80px',align:'right',
		                formatter:function(value,row,index){
		                    if(row.isFooter){
		                        return
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
					{field:'price',title:'优惠额',width:'80px',align:'right',
		                formatter:function(value,row,index){
		                    if(row.isFooter){
		                        return
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
      onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
				
		 }
    });
    gridHandel.setLoadData([$.extend({},gridDefault)]);
    
}

//初始化表格-类别满减
function initDatagridsortMj(){
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
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
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
					{field:'categoryName',title:'商品类别',width:'80px',align:'left',editor:'textbox'},
          ]],
      onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
				
		 }
    });
    gridHandel.setLoadData([$.extend({},gridDefault)]);
    
}
//初始化表格-类别满减设置
function initDatagridsortSet(){
	gridHandel.setGridName("salesetmj");
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
    $("#salesetmj").datagrid({
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
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
					{field: 'limitAmount', title: '买满金额', width: 100, align: 'right',
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
					{field: 'discountPrice', title: '优惠额', width: 100, align: 'right',
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
      onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
				
		 }
    });
    gridHandel.setLoadData([$.extend({},gridDefault)]);
    
}

//初始化表格-商品满减
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
      method:'post',
      align:'center',
      //toolbar: '#tb',     //工具栏 id为tb
      singleSelect:false,  //单选  false多选
      rownumbers:true,    //序号
      pagination:true,    //分页
      fitColumns:true,    //每列占满
      //fit:true,            //占满
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
			{field:'categoryName',title:'商品类别',width:'80px',align:'left'},
			{field:'unit',title:'单位',width:'60px',align:'left'},
			{field:'spec',title:'规格',width:'90px',align:'left'},
			 {field:'price',title:'单价',width:'80px',align:'right',
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
  gridHandel.setLoadData([$.extend({},gridDefault)]);
  
}

//初始化表格-组合特价
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
      method:'post',
      align:'center',
      //toolbar: '#tb',     //工具栏 id为tb
      singleSelect:false,  //单选  false多选
      rownumbers:true,    //序号
      pagination:true,    //分页
      fitColumns:true,    //每列占满
      //fit:true,            //占满
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
			{field:'categoryName',title:'商品类别',width:'80px',align:'left'},
			{field:'unit',title:'单位',width:'60px',align:'left'},
			{field:'spec',title:'规格',width:'90px',align:'left'},
			 {field:'price',title:'单价',width:'80px',align:'right',
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
			        return '<b>'+parseFloat(value||0).toFixed(0)+'</b>';
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
    onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
				
		 }
  });
  gridHandel.setLoadData([$.extend({},gridDefault)]);
}


//查询入库单
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
//批量设置
function specialRows(id,val){
	// 获取选中行的Index的值
	var rowIndex = -1;
	var newData = $("#"+datagridId).datagrid("getRows");
	if(id=="special"){
		for(var i = 0;i < newData.length;i++){
			newData[i].saleAmount= val;
			rowIndex = $("#"+datagridId).datagrid('getRowIndex',newData[i]);
			//更新行数据
			$("#"+datagridId).datagrid('updateRow',{
				index: rowIndex,
				row: newData[i]
			});
			//刷新行
			$("#"+datagridId).datagrid('refreshRow',rowIndex);
		}
	}
	else if(id=="discount"){
		for(var i = 0;i < newData.length;i++){
			newData[i].discount= val;
			rowIndex = $("#"+datagridId).datagrid('getRowIndex',newData[i]);
			//更新行数据
			$("#"+datagridId).datagrid('updateRow',{
				index: rowIndex,
				row: newData[i]
			});
			//刷新行
			$("#"+datagridId).datagrid('refreshRow',rowIndex);
		}
	}
	else if(id=="batchcount"){
		for(var i = 0;i < newData.length;i++){
			newData[i].saleAmount= val;
			rowIndex = $("#"+datagridId).datagrid('getRowIndex',newData[i]);
			//更新行数据
			$("#"+datagridId).datagrid('updateRow',{
				index: rowIndex,
				row: newData[i]
			});
			//刷新行
			$("#"+datagridId).datagrid('refreshRow',rowIndex);
		}
	}
	
}

//监听新价
function onChangeCostPrice(newV,oldV) {
	//获取差额
	var actual = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'actual')||0;
	var oldCostPrice = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'oldCostPrice')||0;
	var CostPrice = newV;
	gridHandel.setFieldValue('diffMoney',(parseFloat(actual)*(parseFloat(newV)-parseFloat(oldCostPrice)).toFixed(2)));
	updateFooter();
}

//合计
function updateFooter(){
    var fields = {actual:0,diffMoney:0,isGift:0, };
    var argWhere = {name:'isGift',value:0}
    gridHandel.updateFooter(fields,argWhere);
}
//插入一行
function addLineHandel(event){
    event.stopPropagation(event);
    var index = $(event.target).attr('data-index')||0;
    gridHandel.addRow(index,gridDefault);
}
//删除一行
function delLineHandel(event){
    event.stopPropagation();
    var index = $(event.target).attr('data-index');
    gridHandel.delRow(index);
}

//选择商品
function selectGoods(searchKey){
    new publicGoodsService("",function(data){
        if(searchKey){
            $("#saleMangeadd").datagrid("deleteRow", gridHandel.getSelectRowIndex());
            $("#saleMangeadd").datagrid("acceptChanges");
        }
        var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
        var addDefaultData  = gridHandel.addDefault(data,gridDefault);
        var keyNames = {
        		distributionPrice:'price',
                id:'skuId',
                disabled:'',
                pricingType:'',
                inputTax:'tax'
        };
        var rows = gFunUpdateKey(addDefaultData,keyNames);
        var argWhere ={skuCode:1};  //验证重复性
        var isCheck ={isGift:1 };   //只要是赠品就可以重复
        var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);
        $("#saleMangeadd").datagrid("loadData",newRows);
        setTimeout(function(){
            gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
            gridHandel.setSelectFieldName("promotionPrice");
            gridHandel.setFieldFocus(gridHandel.getFieldTarget('promotionPrice'));
        },100)
    },searchKey);
}


/**
 * 活动店铺名称
 */
function searchBranch(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}

//类别选择
function getGoodsType(){
	new publicCategoryService(function(data){
		$("#goodsCategoryId").val(data.goodsCategoryId);
		$("#categoryCode").val(data.categoryCode);
		$("#categoryName").val(data.categoryName);
	});
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
	 $("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	 $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
};