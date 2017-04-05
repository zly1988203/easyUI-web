<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>商品属性批量修改</title>
	
	<%@ include file="/WEB-INF/views/include/header.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 ubor">
		<!-- 操作/筛选 区域 begin -->
		<div class="umar-4 upad-4">
			<form id="queryForm">
				<div class="ub ub-ac">
					<div class="ubtns">
						<div class="ubtns-item" onclick="query()">查询</div>
						<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
						<div class="ubtns-item" onclick="importExcel(0)">导入货号</div>
						<div class="ubtns-item" onclick="importExcel(1)">导入条码</div>
						<div class="ubtns-item" onclick="save()">修改</div>
						<div class="ubtns-item" onclick="toClose()">关闭</div>
					</div>
				</div>
				<div class="ub umar-t8">
		            <div class="ub ub-ac umar-r40">
		                <div class="umar-r10 uw-60 ut-r">机构:</div>
		                <input class="uinp" name="branchId" id="branchId" type="hidden">
		                <input class="uinp" id="branchName" name="branchName" type="text" maxlength="50">
		                <div class="uinp-more" onclick="chooseBranch()">...</div>
		            </div>
		            <div class="ub ub-ac umar-r40">
		                <div class="umar-r10 uw-60 ut-r" style="width: 70px !important;">货号/条码:</div>
		                <input class="uinp" id="createUserName" name ="createUserName" type="text"  maxlength="50">
		            </div>
				</div>
				<div class="ub umar-t8">
		            <div class="ub ub-ac umar-r40">
		                <div class="umar-r10 uw-60 ut-r">类别:</div>
		                <input class="uinp" id="categoryId" name="categoryId" type="hidden">
		                <input class="uinp" id="categoryName" name="categoryName" type="text" maxlength="50">
		                <div class="uinp-more" onclick="chooseGoodsCategory()">...</div>
		            </div>
		            <div class="ub ub-ac umar-r40">
		                <div class="umar-r10 uw-60 ut-r" style="width: 70px !important;">供应商:</div>
		                <input class="uinp" name="supplierId" id="supplierId" type="hidden">
		                <input class="uinp" id="supplierName" name="supplierName" type="text" maxlength="50">
		                <div class="uinp-more" onclick="chooseSupplier()">...</div>
		            </div>
				</div>
			</form>
		</div>
		<!-- 操作/筛选 区域 end -->
		
		<!-- 商品展示区域 -->
		<div class="ub uw umar-t8 ub-f1">
			<table id="goodsGrid"></table>
		</div>
		
		<!-- 批量设置区域 -->
		<div class="ub ub-ver umar-t20">
			<form id="batchUpdateForm">
				<div class="ub ub-ac upad-8">
					<!-- 是否管理库存 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="managerStockChecked" name="managerStockChecked" class="ub" type="checkbox" name="checkbox" />
						&nbsp;
						是否管理库存
					</div>
					<div class="ub uw-80 ub-ac umar-r10">
						<input class="ub" type="radio" id="managerStock1" name="managerStock" value="1" checked="checked" /><span>启用</span>
					</div>
					<div class="ub uw-300 ub-ac umar-r10">
						<input class="ub" type="radio" id="managerStock0" name="managerStock" value="0" /><span>不启用</span>
					</div>
					
					<!-- 分店调价 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="allowAdjustChecked" name="allowAdjustChecked" class="ub" type="checkbox" name="checkbox" />
						&nbsp;
						分店调价
					</div>
					<div class="ub uw-80 ub-ac umar-r10">
						<input class="ub" type="radio" id="allowAdjust1" name="allowAdjust" value="1" /><span>启用</span>
					</div>
					<div class="ub uw-300 ub-ac umar-r10">
						<input class="ub" type="radio" id="allowAdjust0" name="allowAdjust" value="0" checked="checked" /><span>不启用</span>
					</div>
				</div>
				
				<div class="ub ub-ac upad-8">
					<!-- 是否参与促销 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="allowActivityChecked" name="allowActivityChecked" class="ub" type="checkbox" name="checkbox" />
						&nbsp;
						是否参与促销
					</div>
					<div class="ub uw-80 ub-ac umar-r10">
						<input class="ub" type="radio" id="allowActivity1" name="allowActivity" value="1" checked="checked" /><span>启用</span>
					</div>
					<div class="ub uw-300 ub-ac umar-r10">
						<input class="ub" type="radio" id="allowActivity0" name="allowActivity" value="0" /><span>不启用</span>
					</div>
					
					<!-- 安全库存系数 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="safetyCoefficientChecked" name="safetyCoefficientChecked" class="ub" type="checkbox" name="checkbox" />
						&nbsp;
						安全库存系数
					</div>
					<div class="ub uw-200 ub-ac umar-r10">
						<input id="safetyCoefficient" name="safetyCoefficient" value='1' style="width: 204px;" 
							class="uinp uinp-no-more easyui-numberbox easyui-validatebox"
							data-options="min:0.1,max:999.9,precision:2,validType:['length[0,18]']" type="text" maxlength="4">
					</div>
					<div class="ub uw-160 ub-ac umar-r10">
						<input id="safetyCoefficientCascadeChecked" name="safetyCoefficientCascadeChecked" class="ub" type="checkbox" checked="checked" value="true" />
						&nbsp;
						同时更新门店安全系数
					</div>
				</div>
				
				<div class="ub ub-ac upad-8">
					<!-- 是否直送商品 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="fastDeliverChecked" name="fastDeliverChecked" class="ub" type="checkbox" name="checkbox" />
						&nbsp;
						是否直送商品
					</div>
					<div class="ub uw-80 ub-ac umar-r10">
						<input class="ub" type="radio" id="fastDeliver1" name="fastDeliver" value="1" /><span>启用</span>
					</div>
					<div class="ub uw-300 ub-ac umar-r10">
						<input class="ub" type="radio" id="fastDeliver0" name="fastDeliver" value="0" checked="checked" /><span>不启用</span>
					</div>
					
					<!-- 修改主供应商 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="supplierChecked" name="supplierChecked" class="ub" type="checkbox" name="checkbox"  />
						&nbsp;
						修改主供应商
					</div>
					<div class="ub uw-200 ub-ac umar-r10">
						<input id="supplierId" name="supplierId"   class="uinp" type="hidden" value="${supplier.id}">
						<div class="ub">
							<input id="supplierName" name="supplierName" class="uinp easyui-validatebox" type="text" readonly="readonly" data-options="required:true">
							<div class="uinp-more " onclick="getGoodsPupplier()">...</div>
						</div>
					</div>
					<div class="ub uw-160 ub-ac umar-r10">
						<input id="supplierCascadeChecked" name="supplierCascadeChecked" class="ub" type="checkbox" checked="checked" value="true" />
						&nbsp;
						同时更新门店主供应商
					</div>
				</div>
				
				<div class="ub ub-ac upad-8">
					<!-- 是否高值商品 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="highValueChecked" name="highValueChecked" class="ub" type="checkbox" name="checkbox" />
						&nbsp;
						是否高值商品
					</div>
					<div class="ub uw-80 ub-ac umar-r10">
						<input class="ub" type="radio" id="highValue1" name="highValue" value="1" /><span>启用</span>
					</div>
					<div class="ub uw-300 ub-ac umar-r10">
						<input class="ub" type="radio" id="highValue0" name="highValue" value="0" checked="checked" /><span>不启用</span>
					</div>
					
					<!-- 修改商品类别 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="categoryChecked" name="categoryChecked" class="ub" type="checkbox" name="checkbox" />
						&nbsp;
						修改商品类别
					</div>
					<div class="ub uw-200 ub-ac umar-r10">
						<input id="categoryId" name="categoryId" class="uinp" type="hidden">
						<input id="categoryCode" name="categoryCode" class="uinp" type="hidden">
	                    <div class="ub">
	                        <input id="categoryName" name="categoryName" class="uinp uw-200 easyui-validatebox" type="text" readonly="readonly"  data-options="required:true">
	                        <div class="uinp-more " onclick="getGoodsType()">...</div>
	                    </div>
					</div>
				</div>
				
				<div class="ub ub-ac upad-8">
					<!-- 是否关注商品 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="attentionChecked" name="attentionChecked" class="ub" type="checkbox" name="checkbox"  />
						&nbsp;
						是否关注商品
					</div>
					<div class="ub uw-80 ub-ac umar-r10">
						<input class="ub" type="radio" id="attention1" name="attention" value="1" /><span>启用</span>
					</div>
					<div class="ub uw-300 ub-ac umar-r10">
						<input class="ub" type="radio" id="attention0" name="attention" value="0" checked="checked" /><span>不启用</span>
					</div>
					
					<!-- 修改商品品牌 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="brandChecked" name="brandChecked" class="ub" type="checkbox" name="checkbox"  />
						&nbsp;
						修改商品品牌
					</div>
					<div class="ub uw-200 ub-ac umar-r10">
	                    <input id="brandId" name="brandId" class="uinp" type="hidden" value="${goodsBrand.id}">
	                    <input id="brandCode" name="brandCode"   class="uinp" type="hidden">
	                    <div class="ub">
	                        <input id="brandName" name="brandName" class="uinp" type="text" readonly="readonly" value="${goodsBrand.brandName}">
	                        <div class="uinp-more" onclick="getGoodsBrand()">...</div>
	                    </div>
					</div>
				</div>
			</form>
		</div>
	</div>
	
	<script type="text/javascript">
		//网格对象
		var gridHandel = new GridClass();
		
		$(function(){
			//绑定元素的事件
			bindElementEvent();
			//初始元素的状态
			changeElementStatus();
			//初始化查询表单
			initQueryForm();
			//初始化网格
			initGrid();
		});
		
		//绑定元素的事件
		function bindElementEvent(){
			$("#managerStockChecked,#allowActivityChecked,#fastDeliverChecked,#highValueChecked,#attentionChecked").click(function (){
				changeElementStatus(this);
			});
			$("#allowAdjustChecked,#safetyCoefficientChecked,#supplierChecked,#categoryChecked,#brandChecked,#safetyCoefficientCascadeChecked,#supplierCascadeChecked").click(function (){
				changeElementStatus(this);
			});
		}
		
		//初始化查询表单
		function initQueryForm(){
			//默认机构
			$.ajax({
				url : contextPath + "/common/getCurrentBranch",
				type : "POST",
				success : function(result) {
					if(result.code == 0){
						$("#branchId").val(result.data.branchesId);
						$("#branchName").val("["+result.data.branchCode+"]"+result.data.branchName);
						changeBranchType(result.data.type);
					}else{
						successTip("请求发送失败或服务器处理失败");
					}
				},
				error : function(result) {
					successTip("请求发送失败或服务器处理失败");
				}
			});
		}
		
		//初始化网格
		function initGrid(){
			gridHandel.setGridName("goodsGrid");
			$("#goodsGrid").datagrid({
		        method:'post',
		        align:'center',
		        singleSelect:false, //单选  false多选
		        rownumbers:true, //序号
		        pagination:true, //分页
		        pageSize:50,
		        fitColumns:true,    //每列占满
		        showFooter:true,
				height:'100%',
				width:'100%',
		        columns:[[
		            {field:'check',checkbox:true},
		            {field:'skuCode',title:'货号',width:'80px',align:'left'},
		            {field:'skuName',title:'名称',width:'140px',align:'left'},
		            {field:'barCode',title:'条码',width:'120px',align:'left'},
		            {field:'unit',title:'单位',width:'80px',align:'left'},
		            {field:'spec',title:'规格',width:'80px',align:'left'},
		            {
		            	field:"salePrice",title:"零售价",sortable:true,tooltip:true,width:80,align:'right',
			        	formatter : function(value,row,index){
			        		if(value){
			        			return parseFloat(value).toFixed(4);
			        		}
			        		return null;
			        	}
			        },
		            {field:'category',title:'类别',width:'80px',align:'left'},
		            {field:"brand",title:"品牌",sortable:true,tooltip:true,width:80},
		            {field:"supplier",title:"主供应商",sortable:true,tooltip:true,width:140},
		            {field:'safetyCoefficient',title:'安全库存系数',width:'80px',align:'left'},
		            {
		            	field:'isManagerStock',title:'管理库存',width:'80px',align:'left',
		            	formatter : function(value,row,index){
			        		if(value == 1){
			        			return "是";
			        		}else{
			        			return "否";
			        		}
			        	}
		            },
		            {
		            	field:'allowActivity',title:'参与促销',width:'80px',align:'left',
		            	formatter : function(value,row,index){
			        		if(value == true){
			        			return "是";
			        		}else{
			        			return "否";
			        		}
			        	}
		            },
		            {
		            	field:'allowAdjust',title:'分店调价',width:'80px',align:'left',
		            	formatter : function(value,row,index){
			        		if(value == true){
			        			return "是";
			        		}else{
			        			return "否";
			        		}
			        	}
		            },
		            {
		            	field:'isFastDeliver',title:'直送商品',width:'80px',align:'left',
		            	formatter : function(value,row,index){
			        		if(value == 1){
			        			return "是";
			        		}else{
			        			return "否";
			        		}
			        	}
		            }
		        ]],
				onLoadSuccess : function() {
					gridHandel.setDatagridHeader("center");
				}
		    });
		}
		
		//选择机构
		function chooseBranch (){
			new publicAgencyService(function(data){
				$("#branchId").val(data.branchesId);
				$("#branchName").val("["+data.branchCode+"]"+data.branchName);
				changeBranchType(data.type);
				
				//清空表格
				$("#goodsGrid").datagrid("loadData", { total: 0, rows: [] });
			},"","");
		}
		
		//选择商品列表
		function chooseGoodsCategory(){
			new publicCategoryService(function(data){
				$("#categoryId").val(data.goodsCategoryId);
				$("#categoryName").val("["+data.categoryCode+"]"+data.categoryName);
			},null);
		}
		
		//选择供应商
		function chooseSupplier(){
			new publicSupplierService(function(data){
				$("#supplierId").val(data.id);
				$("#supplierName").val(data.supplierName);
			});
		}
		
		//处理页面元素禁用与启用状态
		function changeElementStatus(input){
			//是否管理库存
			if($("#managerStockChecked").is(':checked') && undefined != input && input.id == "managerStockChecked"){
				$("#managerStockChecked").val(true);
				$("input[name='managerStock']").removeAttr("disabled");
			}else{
				$("#managerStockChecked").val(false);
				$("input[name='managerStock']").attr("disabled",true);
			}
			//是否参与促销
			if($("#allowActivityChecked").is(':checked') && undefined != input && input.id == "allowActivityChecked"){
				$("#allowActivityChecked").val(true);
				$("input[name='allowActivity']").removeAttr("disabled");
			}else{
				$("#allowActivityChecked").val(false);
				$("input[name='allowActivity']").attr("disabled",true);
			}
			//是否直送商品
			if($("#fastDeliverChecked").is(':checked') && undefined != input && input.id == "fastDeliverChecked"){
				$("#fastDeliverChecked").val(true);
				$("input[name='fastDeliver']").removeAttr("disabled");
			}else{
				$("#fastDeliverChecked").val(false);
				$("input[name='fastDeliver']").attr("disabled",true);
			}
			//是否高值商品
			if($("#highValueChecked").is(':checked') && undefined != input && input.id == "highValueChecked"){
				$("#highValueChecked").val(true);
				$("input[name='highValue']").removeAttr("disabled");
			}else{
				$("#highValueChecked").val(false);
				$("input[name='highValue']").attr("disabled",true);
			}
			//是否关注商品
			if($("#attentionChecked").is(':checked') && undefined != input && input.id == "attentionChecked"){
				$("#attentionChecked").val(true);
				$("input[name='attention']").removeAttr("disabled");
			}else{
				$("#attentionChecked").val(false);
				$("input[name='attention']").attr("disabled",true);
			}
			//分店调价
			if($("#allowAdjustChecked").is(':checked') && undefined != input && input.id == "allowAdjustChecked"){
				$("#allowAdjustChecked").val(true);
				$("input[name='allowAdjust']").removeAttr("disabled");
			}else{
				$("#allowAdjustChecked").val(false);
				$("input[name='allowAdjust']").attr("disabled",true);
			}
			//安全库存系数
			if($("#safetyCoefficientChecked").is(':checked') && undefined != input && input.id == "safetyCoefficientChecked"){
				$("#safetyCoefficientChecked").val(true);
				//$("#safetyCoefficient").numberbox("disabled",false);
				$("input[name='safetyCoefficientCascadeChecked']").removeAttr("disabled");
			}else{
				$("#safetyCoefficientChecked").val(false);
				//$("#safetyCoefficient").numberbox("disabled", true);
				$("input[name='safetyCoefficientCascadeChecked']").attr("disabled",true);
			}
			if($("#safetyCoefficientCascadeChecked").is(':checked')){
				$("#safetyCoefficientCascadeChecked").val(true);
			}else{
				$("#safetyCoefficientCascadeChecked").val(false);
			}
			//修改主供应商
			if($("#supplierChecked").is(':checked') && undefined != input && input.id == "supplierChecked"){
				$("#supplierChecked").val(true);
				$("input[name='supplierCascadeChecked']").removeAttr("disabled");
			}else{
				$("#supplierChecked").val(false);
				$("input[name='supplierCascadeChecked']").attr("disabled",true);
			}
			if($("#supplierCascadeChecked").is(':checked')){
				$("#supplierCascadeChecked").val(true);
			}else{
				$("#supplierCascadeChecked").val(false);
			}
			//修改商品类别
			if($("#categoryChecked").is(':checked') && undefined != input && input.id == "categoryChecked"){
				$("#categoryChecked").val(true);
			}else{
				$("#categoryChecked").val(false);
			}
			//修改商品品牌
			if($("#brandChecked").is(':checked') && undefined != input && input.id == "brandChecked"){
				$("#brandChecked").val(true);
			}else{
				$("#brandChecked").val(false);
			}
		}
		
		//切换机构类型
		function changeBranchType(branchType){
			//先禁用所有
			$("#managerStockChecked,#allowActivityChecked,#fastDeliverChecked,#highValueChecked,#attentionChecked").attr("disabled",true).removeAttr("checked");
			$("#allowAdjustChecked,#safetyCoefficientChecked,#supplierChecked,#categoryChecked,#brandChecked").attr("disabled",true).removeAttr("checked");
			
			//再根据机构类别放开相应项目
			switch (branchType){
				//总部仅可修改：是否管理库存、是否高值商品、是否关注商品、修改商品类别、修改商品品牌
				case 0:
					$("#managerStockChecked,#highValueChecked,#attentionChecked,#categoryChecked,#brandChecked").removeAttr("disabled");
					break;
				//分公司仅可修改：是否参与促销、是否直送商品、分店调价、安全库存系数、修改主供应商(物流中心暂当分公司处理)
				case 1:
				case 2:
					$("#allowActivityChecked,#fastDeliverChecked,#allowAdjustChecked,#safetyCoefficientChecked,#supplierChecked").removeAttr("disabled");
					break;
				//门店仅可修改：安全库存系数、修改主供应商
				case 3:
				case 4:
				case 5:
				default:
					$("#safetyCoefficientChecked,#supplierChecked").removeAttr("disabled");
					break;
			}
		}
		
		//查询
		function query(){
			$("#goodsGrid").datagrid("options").queryParams = $("#queryForm").serializeObject();
			$("#goodsGrid").datagrid("options").method = "post";
			$("#goodsGrid").datagrid("options").url = contextPath+"/goods/report/getList";
			$("#goodsGrid").datagrid("load");
		}
		
		//导入
		function importExcel(type){
		    var branchId = $("#branchId").val();
		    if(!branchId){
		        messager("请先选择机构");
		        return;
		    }
		    var param = {
		        url:contextPath + "/goods/batchUpdate/import",
		        tempUrl:contextPath+"/goods/batchUpdate/importTemplate",
		        type:type,
		        branchId:branchId
		    };
		    new publicUploadFileService(function(data){
			    var keyNames = {
			    		
			    };
			    var rows = gFunUpdateKey(data,keyNames);
			    //var argWhere ={skuCode:1};  //验证重复性
			    //var isCheck ={isGift:1 };   //只要是赠品就可以重复
			    //var newRows = gridHandel.checkDatagrid(rows,argWhere,isCheck);

			    $("#goodsGrid").datagrid("loadData",rows);
		        
		    },param)
		}
		
		//保存
		function save(){
			//表单序列化
			var reqObj = $("#batchUpdateForm").serializeObject();
			
			//机构ID
			var branchId = $("#branchId").val();
			reqObj.branchId = branchId;
			
			//选中的商品
			var rows = $("#goodsGrid").datagrid("getSelections");
			if (!rows || rows.length == 0) {
				messager("未选择商品");
				return;
			}
			var skuIds = [];
			for (var i in rows) {
				skuIds[i]=rows[i].skuId;
			}
			reqObj.skuIds = skuIds;
			
			//解析Json
			var req = JSON.stringify(reqObj);
			
			//请求提交
			$.ajax({
				url : contextPath + "/goods/batchUpdate/save",
				type : "POST",
				contentType : 'application/json',
				data : req,
				success : function(result) {
					console.log(result);
					if (result['code'] == 0) {
						$.messager.alert("操作提示", "操作成功！", "info", function() {
							
						});
					} else {
						successTip(result['message']);
					}
				},
				error : function(result) {
					successTip("请求发送失败或服务器处理失败");
				}
			});
		}
	</script>
</body>
</html>