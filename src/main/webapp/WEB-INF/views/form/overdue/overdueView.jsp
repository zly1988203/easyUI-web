<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>调价订单-修改</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script type="text/javascript">
	$(function(){
	    initDatagridEditOrder();
	    $("div").delegate("button","click",function(){
	    	$("p").slideToggle();
	    });
	    
	});
	var printReport = function(){
		parent.addTabPrint("reportPrint"+new Date().getTime(),"打印",contextPath+"/form/overdue/edit/report/print?formNo="+$("#formNo").val());
	}

	var urlEncode = function (param, key, encode) {
		  if(param==null) return '';
		  var paramStr = '';
		  var t = typeof (param);
		  if (t == 'string' || t == 'number' || t == 'boolean') {
		    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
		  } else {
		    for (var i in param) {
		      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
		      paramStr += urlEncode(param[i], k, encode);
		    }
		  }
		  return paramStr;
		};
	var gridDefault = {
	    largeNum:0,
	    realNum:0,
	    isGift:0,
	}
	var gridHandel = new GridClass();
	function initDatagridEditOrder(){
	    gridHandel.setGridName("gridEditOrder");
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
		var formId = $("#formId").val();
	    $("#gridEditOrder").datagrid({
	        //title:'普通表单-用键盘操作',
	        method:'post',
	    	url:contextPath+"/form/overdue/detail/list/"+formId+"?str=all",
	        align:'center',
	        singleSelect:true,  //单选  false多选
	        rownumbers:true,    //序号
	        showFooter:true,
	        height:'100%',
	        width:'100%',
	        columns:[[
	        	{field:'rowNo',title:'行号',hidden:true},
	        	{field:'id',title:'主键',hidden:true},
	            {field:'skuCode',title:'货号',width: '70px',align:'left'},
	            {field:'skuName',title:'商品名称',width:'200px',align:'left'},
	            {field:'barCode',title:'条码',width:'130px',align:'left'},
	            {field:'unit',title:'单位',width:'60px',align:'left'},
	            {field:'spec',title:'规格',width:'90px',align:'left'},
	            {field:'applyNum',title:'数量',width:'80px',align:'right'},
	            {field:'applyPrice',title:'单价',width:'80px',align:'right'},
	            {field:'applyAmount',title:'金额',width:'80px',align:'right'},
	            {field:'applyDesc',title:'申请说明',width:'200px',align:'left'},
	            {field:'auditDesc',title:'处理意见',width:'200px',align:'left'}
	        ]],
	        onClickCell:function(rowIndex,field,value){
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
	            updateFooter();
	        }
	    });
	}


	//限制转换次数
	var n = 0;
	var m = 0;
	//监听商品箱数
	function onChangeLargeNum(newV,oldV){
		if("" == newV){
			 messager("商品箱数输入有误");
			  gridHandel.setFieldValue('applyNum',oldV); 
		     return;
		}
		
		if(m > 0){
			m = 0;
			return;
		}
		
	    if(!gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'skuCode')){
	        return;
	    }
	    
	    var purchaseSpecValue = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'spec');
	    if(!purchaseSpecValue){
	        messager("没有商品规格,请审查");
	        return;
	    }
	    
	    n++;

	    //金额 = 规格 * 单价 * 箱数
	    var priceValue = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'applyPrice');
	    gridHandel.setFieldValue('applyAmount',parseFloat(purchaseSpecValue*priceValue*newV).toFixed(4));
	    
	    var realNumVal = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'applyNum');
	    var realNumVal2 = parseFloat(purchaseSpecValue*newV).toFixed(4);//parseFloat(Math.round(purchaseSpecValue*newV*1000)/1000).toFixed(4);
	    if(Math.abs(realNumVal2-realNumVal)>0.0001){
	        gridHandel.setFieldValue('applyNum',(purchaseSpecValue*newV).toFixed(4));//数量=商品规格*箱数
	    }

	    updateFooter();
	}
	//监听商品数量
	function onChangeRealNum(newV,oldV) {
		if("" == newV){
			 messager("商品数量输入有误");
			 gridHandel.setFieldValue('applyNum',oldV);
		     return;
		}
		
		if(n > 0){
			n = 0;
			return;
		}
		
	    if(!gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'skuCode')){
	        return;
	    }
	    var purchaseSpecValue = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'spec');
	    if(!purchaseSpecValue){
	        messager("没有商品规格,请审查");
	        return;
	    }
	    
		m++;
	    
	    var priceValue = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'applyPrice');

	    gridHandel.setFieldValue('applyAmount',priceValue*newV);                         //金额=数量*单价

	    var largeNumVal = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'applyNum');
	    var largeNumVal2 = parseFloat(purchaseSpecValue*newV).toFixed(4);
	    if(Math.abs(largeNumVal2-largeNumVal)>0.0001){
	        var largeNumVal = parseFloat(newV/purchaseSpecValue).toFixed(4);
	        gridHandel.setFieldValue('applyNum',largeNumVal);   //箱数=数量/商品规格
	    }
	    /*gridHandel.setFieldValue('largeNum',(newV/purchaseSpecValue).toFixed(4));   //箱数=数量/商品规格*/
	    updateFooter();
	}
	//监听商品单价
	function onChangePrice(newV,oldV) {
	    var realNumVal = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'applyNum');
	    gridHandel.setFieldValue('applyAmount',realNumVal*newV);                          //金额=数量*单价
	    updateFooter();
	}
	//监听商品金额
	function onChangeAmount(newV,oldV) {
	    //获取税率
	    gridHandel.setFieldValue('applyAmount',taxAmountVal);
	}

	//合计
	function updateFooter(){
	    var fields = {applyAmount:0,applyNum:0,applyPrice:0, };
	    var argWhere = {name:'applyAmount',value:""}
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
	    //判定供应商是否存在
		var supplierId = $("#supplierId").val();
	    if(supplierId==""){
	        messager("请先选择供应商");
	        return;
	    }
	    
	    var branchId = $("#branchId").val();
	    if(!branchId){
	    	messager("请先选择收货机构");
	    }
	    
	    new publicGoodsService("BA",function(data){
	        if(data.length==0){
	            return;
	        }
	        if(searchKey){
	            $("#gridEditOrder").datagrid("deleteRow", gridHandel.getSelectRowIndex());
	            $("#gridEditOrder").datagrid("acceptChanges");
	        }
	        for(var i in data){
	        	var rec = data[i];
	        	rec.remark = "";
	        }
	        var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
	        var addDefaultData  = gridHandel.addDefault(data,gridDefault);
	        var keyNames = {
	            purchasePrice:'price',
	            id:'skuId',
	            disabled:'',
	            pricingType:'',
	            inputTax:'tax'
	        };
	        var rows = gFunUpdateKey(addDefaultData,keyNames);
	        var argWhere ={skuCode:1};  //验证重复性
	        var isCheck ={isGift:1 };   //只要是赠品就可以重复
	        var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);
	        $("#gridEditOrder").datagrid("loadData",newRows);

	        gridHandel.setLoadFocus();
	        setTimeout(function(){
	            gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
	            gridHandel.setSelectFieldName("applyNum");
	            gridHandel.setFieldFocus(gridHandel.getFieldTarget('applyNum'));
	        },100)
	        
	    },searchKey,0,"","",branchId,supplierId,"0");
	}

	//保存
	function saveItemHandel(){

	    $("#gridEditOrder").datagrid("endEdit", gridHandel.getSelectRowIndex());
	    var rows = gridHandel.getRowsWhere({skuName:'1'});
	    $(gridHandel.getGridName()).datagrid("loadData",rows);
	    if(rows.length==0){
	        messager("表格不能为空");
	        return;
	    }
	    var isCheckResult = true;
	    var isChcekPrice = false;
	    var isChcekNum = false;
	    var isApplyDesc =false;
	    $.each(rows,function(i,v){
	        v["rowNo"] = i+1;
	        if(!v["skuName"]){
	            messager("第"+(i+1)+"行，货号不正确");
	            isCheckResult = false;
	            return false;
	        };
	        if(parseFloat(v["applyPrice"])<=0){
	            isChcekPrice = true;
	        }
	        //数量判断
	        if(parseFloat(v["applyNum"])<=0){
	        	isChcekNum = true;
	        }
	        if (v["applyDesc"].replace(/(^s*)|(s*$)/g, "").length ==0){
	        	isApplyDesc = true;
	        }
	    });
	    if(isCheckResult){
	        if(isChcekPrice){
	            $.messager.confirm('系统提示',"单价存在为0，重新修改",function(r){
	                if (r){
	                    return ;
	                }else{
	                    saveDataHandel(rows);
	                }
	            });
	        }else{
	        	if(isChcekNum){
	          		 /*$.messager.confirm('提示','存在数量为0的商品,是否继续保存?',function(data){
	          			if(data){
	          				saveDataHandel(rows);
	          		    }
	          		 });*/
	        		messager("存在数量为0的商品,不能保存！");
	            }else if(isApplyDesc){
	        		messager("存在商品没有申请说明,不能保存,请填写申请说明！");
	        	}else{
	            	saveDataHandel(rows);
	            }
	        }
	    }
	}
	function saveDataHandel(rows){
	    //供应商
	    var supplierId = $("#supplierId").val();
	    //收货机构
	    var branchId = $("#branchId").val();
	    //交货期限
	    var deliverTime = $("#deliverTime").val();
	    //采购员
	    var salesmanId = $("#salesmanId").val();
	    var id = $("#formId").val();
	    //备注
	    var remark = $("#remark").val();

	    //计算获取商品总数量和总金额
	    //商品总数量
	    var totalNum = 0;
	    //总金额
	    var amount=0;

	    var footerRows = $("#gridEditOrder").datagrid("getFooterRows");
	    if(footerRows){
	        totalNum = parseFloat(footerRows[0]["applyNum"]||0.0).toFixed(4);
	        amount = parseFloat(footerRows[0]["applyAmount"]||0.0).toFixed(4);
	    }

	    var reqObj = {
	        id:id,
	        supplierId:supplierId,
	        branchId:branchId,
	        deliverTime:deliverTime,
	        salesmanId:salesmanId,
	        totalNum:totalNum,
	        amount:amount,
	        remark:remark,
	        detailList:rows
	    };
	    
	    var req = JSON.stringify(reqObj);

	    $.ajax({
	        url:contextPath+"/form/overdue/detail/update",
	        type:"POST",
	        contentType:'application/json',
	        data:req,
	        success:function(result){
	            console.log(result);
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
	function check(){
	    $("#gridEditOrder").datagrid("endEdit", gridHandel.getSelectRowIndex());
	    var rows = gridHandel.getRows();
	    if(rows.length==0){
	        messager("表格不能为空");
	        return;
	    }
	    var isCheckResult = true;
	    var num=0;
	    $.each(rows,function(i,v){
	        v["rowNo"] = i+1;
	        if(!v["skuCode"]){
	            messager("第"+(i+1)+"行，货号不能为空");
	            isCheckResult = false;
	            return false;
	        };
	        if(parseFloat(v["applyNum"])<=0){
	        	num++;
	        }
	    });
	    
	    if(!isCheckResult){
	        return
	    }
	    if(num==rows.length){
	    	 messager("采购商品数量全部为0");
			return
		}else if(parseFloat(num)>0){
			$.messager.confirm('提示',"是否清除单据中数量为0的商品记录?",function(data){
	    		if(data){
	    		    checkOrder();
	    		}	
	    	});
		}else{
			 $.messager.confirm('提示','是否审核通过？',function(data){
				 if(data){
					 checkOrder();
				 }
			    
			 });
		}
	}

	//审核采购单
	function checkOrder(){
		 var id = $("#formId").val();
		 $.ajax({
	         url:contextPath+"/form/purchase/check",
	         type:"POST",
	         data:{
	             formId:id,
	             status:1
	         },
	         success:function(result){
	             console.log(result);
	             if(result['code'] == 0){
	                 $.messager.alert("操作提示", "操作成功！", "info",function(){
	                     location.href = contextPath +"/form/purchase/orderEdit?formId=" + id;
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

	function orderDelete(){
		var id = $("#formId").val();
		$.messager.confirm('提示','是否要删除此条数据',function(data){
			if(data){
				$.ajax({
			    	url:contextPath+"/form/overdue/delete",
			    	type:"POST",
			    	data:{
			    		formIds:id
			    	},
			    	success:function(result){
			    		console.log(result);
			    		if(result['code'] == 0){
			    			messager("操作成功");
			    			toClose();
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

	function selectSupplier(){
		new publicSupplierService(function(data){
			$("#supplierId").val(data.id);
			$("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
		});
	}
	function selectOperator(){
		new publicOperatorService(function(data){
			$("#salesmanId").val(data.id);
			$("#operateUserName").val(data.userName);
		});
	}
	function selectBranch(){
		new publicBranchService(function(data){
			$("#branchId").val(data.branchesId);
			$("#branchName").val("["+data.branchCode+"]"+data.branchName);
		},0);
	}

	//打印
	function printDesign(){
		var id = $("#formId").val();
		var formNo = $("#formNo").val();
	     //弹出打印页面
	     parent.addTabPrint('PASheet' + id,formNo+'单据打印',contextPath + '/printdesign/design?page=PASheet&controller=/form/purchase&template=-1&sheetNo=' + id + '&gridFlag=PAGrid','');
	}


	function back(){
		location.href = contextPath+"/form/purchase/orderList";
	}

	function toImportproduct(type){
	    var branchId = $("#branchId").val();
	    if(!branchId){
	        messager("请先选择收货机构");
	        return;
	    }
	    var param = {
	        url:contextPath+"/form/purchase/importList",
	        tempUrl:contextPath+"/form/purchase/exportTemp",
	        type:type,
	        branchId:branchId,
	    }
	    new publicUploadFileService(function(data){
	        updateListData(data);
	        
	    },param)
	}

	function updateListData(data){
		   // var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
		    //var addDefaultData  = gridHandel.addDefault(data,gridDefault);
	        $.each(data,function(i,val){
	        	data[i]["remark"] = "";
	            data[i]["realNum"]=data[i]["realNum"]||0;
	            data[i]["largeNum"]  = (parseFloat(data[i]["realNum"]||0)/parseFloat(data[i]["purchaseSpec"])).toFixed(4);
	            data[i]["amount"]  = parseFloat(data[i]["purchasePrice"]||0)*parseFloat(data[i]["realNum"]||0);
	        });
		    var keyNames = {
		        purchasePrice:'price',
		        id:'skuId',
		        disabled:'',
		        pricingType:'',
		        inputTax:'tax'
		    };
		    var rows = gFunUpdateKey(data,keyNames);

		    var argWhere ={skuCode:1};  //验证重复性
		    var isCheck ={isGift:1 };   //只要是赠品就可以重复
		    var newRows = gridHandel.checkDatagrid(rows,argWhere,isCheck);

		    $("#gridEditOrder").datagrid("loadData",rows);
		}

	//模板导出
	function exportTemp(){
		var type = $("#temple").attr("value");
		//导入货号
		if(type==0){
			location.href=contextPath+'/form/purchase/exportTemp?type='+type;
		//导入条码
		}else if(type==1){
			location.href=contextPath+'/form/purchase/exportTemp?type='+type;
		}
	}

	/**
	 * 获取导入的数据
	 * @param data
	 */
	function getImportData(data){
	    $.each(data,function(i,val){
	        data[i]["oldPurPrice"] = data[i]["purchasePrice"];
	        data[i]["oldSalePrice"]=data[i]["salePrice"];
	        data[i]["oldWsPrice"]=data[i]["wholesalePrice"];
	        data[i]["oldVipPrice"]=data[i]["vipPrice"];
	        data[i]["oldDcPrice"]=data[i]["distributionPrice"];
	        data[i]["price"] = data[i]["oldPurPrice"];
	        data[i]["realNum"]=data[i]["realNum"]||0;
	        data[i]["amount"]  = parseFloat(data[i]["price"]||0)*parseFloat(data[i]["realNum"]||0);
	        data[i]["largeNum"]  = (parseFloat(data[i]["realNum"]||0)/data[i]["purchaseSpec"]).toFixed(4);
	        
	        
	    });
	    var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
	    var argWhere ={skuCode:1};  //验证重复性
	    var newRows = gridHandel.checkDatagrid(nowRows,data,argWhere,{});

	    $("#"+gridHandel.getGridName()).datagrid("loadData",newRows);
	    messager("导入成功");
	}

	function orderAdd(){
		toAddTab("新增调价申请单",contextPath + "/form/overdue/add");
	}


	function exportDetail(){
		var formId = $("#formId").val();
		window.location.href = contextPath + '/form/overdue/exports?id='+formId+'&formNo='+$("#formNo").val();
	}
	</script>
    
<%--     <script src="${ctx}/static/js/views/purchase/purchaseExport.js"></script>
 --%>    <%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
    <style type="text/css">
    	.uw-60 {
		    width: 76px;
		}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
           <%--  <shiro:hasPermission name="JxcOverdueApply:add"> --%>
	            <div class="ubtns-item" onclick="orderAdd()">新增</div>
	      <%--   </shiro:hasPermission> --%>
                <div class="ubtns-item" onclick="exportDetail();">导出</div>
            <shiro:hasPermission name="JxcPurchaseOrder:print">
                <div class="ubtns-item" onclick="printReport()">打印</div>
            </shiro:hasPermission>
               <div class="ubtns-item" onclick="javaScript:;">设置</div>
               <div class="ubtns-item" onclick="toClose()">关闭</div>
            </div>
        </div>
        <div class="ub umar-t8 uc-black">【单号】:<span ><c:out value="${form.formNo}"></c:out></span></div>
        <div class="ub uline umar-t8"></div>
        <input type="hidden" id="formId" value='<c:out value="${form.id}"></c:out>'>
        <input type="hidden" id="formNo" value='<c:out value="${form.formNo}"></c:out>'>
        <div class="ub umar-t8">
           <div class="ub ub-ac umar-r40" style="width: 664px;">
	                <div class="umar-r10 uw-60 ut-r">申请机构:</div>
	                <div class="utxt">[${form.branchCode}]${form.branchName} </div>
	            </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">制单人员:</div>
                <div class="utxt"><c:out value="${form.createUserName}"></c:out></div>
            </div>
            <div class="ub ub-ac">
                <div class="umar-r10 uw-60 ut-r">制单时间:</div>
                <div class="utxt" id="createDate"><fmt:formatDate value="${form.createTime}" pattern="yyyy-MM-dd HH:mm"/></div>
            </div>
        </div>
        <div class="ub umar-t8">
               <div class="ub ub-ac uw-610 umar-r80" style="width: 624px;">
	           </div>
	           <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">最后修改人:</div>
                <div class="utxt"><c:out value="${form.updateUserName}"></c:out></div>
            </div>
            <div class="ub ub-ac">
                <div class="umar-r10 uw-60 ut-r">修改时间:</div>
                <div class="utxt"><fmt:formatDate value="${form.updateTime}" pattern="yyyy-MM-dd HH:mm"/></div>
            </div>
        </div>
        <div class="already-examine" id="already-examine"><span>已审核</span></div>
         <div class="ub umar-t8">
               <div class="ub ub-ac uw-610 umar-r80" style="width: 624px;">
	                    <div class="umar-r10 uw-60 ut-r">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:</div>
	                    <div class="utxt"><c:out value="${form.remark}"></c:out></div>
	           </div>
	           <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">审核人员:</div>
                <div class="utxt"><c:out value="${form.validUserName}"></c:out></div>
            </div>
            <div class="ub ub-ac">
                <div class="umar-r10 uw-60 ut-r">审核时间:</div>
                <div class="utxt"><fmt:formatDate value="${form.validTime}" pattern="yyyy-MM-dd HH:mm"/></div>
            </div>
        </div>
        <div class="ub ub-f1 datagrid-edit umar-t8">
            <table id="gridEditOrder" ></table>
        </div>
        
    </div>

</body>
</html>