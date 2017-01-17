<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<style> 
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
<div class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-pc uh ub-f1">
        <div class="ub ub-f1">
            <div class="ub ub-ver uw-200">
                <div class="upad-4">
                    <select id="goodsType" class="easyui-combobox uselect"></select>
                </div>
                <div class="ubor-b "></div>
                <div class="ub ubor ub-f1 uscroll">
                    <div class="zTreeDemoBackground left">
                        <ul id="treeGoodsType" class="ztree"></ul>
                    </div>
                </div>
            </div>
            <div class="ub ub-ver ub-f1 ">
                <div class="ub ub-ac upad-10">
                    <input class="uinp ub ub-f1" type="hidden" id="branchId" name="branchId" value="${branchId}"/>
                    <input class="usearch uinp ub ub-f1" type="text" id="goodsInfo"
                           placeholder="可按货号、自编码、品名、助记码等查询">
                    <input type="button" class="ubtn umar-l10" value="查询" onclick="cx()">
                </div>

                <div class="ub  ub-f1 ">
                    <table id="gridGoods"></table>
                </div>

            </div>
        </div>
    </div>
</div>

<!-- 因为列属于动态的，需要C标签，JS直接写在JSP文件里面 -->
<script>
    $(function(){
    	   gFunSetEnterKey(cx);
    })
     
    function goodsArchives(){
        this.selectTypeName = "categoryCode"
        //tree的提交参数
        this.treeParam = {
            categoryCode:'',
            supplierId:'',
            brandId:'',
            level:'',
        }
        //树的请求地址
        this.treeUrls = [
            {
                name:'categoryCode',
                url:contextPath+'/common/category/getGoodsCategoryToTree'
            },
            {
                name:'brandId',
                url:contextPath+'/common/brand/getBrandToTree'
            },
            {
                name:'supplierId',
                url:contextPath+'/common/supplier/getSupplierToTree'
            }
        ];
        this.getTreeUrl = function(name){
            var httpUrl = ""
            $.each(this.treeUrls,function(i,v){
                if(v.name==name){
                    httpUrl = v.url;
                    return false
                }
            });
            return httpUrl;
        }
    }
    var goodsClass = new goodsArchives();

    $(function(){
        initSelectView();
        initTreeArchives();
    });
    var goodsRadioCallBack ;
    //初始化回调函数
    function initGoodsRadioCallBack(cb){
        goodsRadioCallBack = cb;
        initDatagridGoods();
    }
    function initSelectView(){
        $('#goodsType').combobox({
            valueField:'id',
            textField:'text',
            data: [{
                id: 'categoryCode',
                text: '类别',
                selected:true,
            },{
                id: 'brandId',
                text: '品牌'
            },{
                id: 'supplierId',
                text: '供应商'
            }],
            onSelect: function(record){
                goodsClass.selectTypeName = record.id;
                initTreeArchives();
            },
        });
    }
    //初始树
    function initTreeArchives(){
        var args = { }
        var httpUrl = goodsClass.getTreeUrl(goodsClass.selectTypeName);
        $.get(httpUrl, args,function(data){
            var setting = {
                data: {
                    key:{
                        name:'codeText',
                    }
                },
                callback: {
                    onClick: zTreeOnClick
                }
            };
            $.fn.zTree.init($("#treeGoodsType"), setting, JSON.parse(data));
            var treeObj = $.fn.zTree.getZTreeObj("treeGoodsType");
            var nodes = treeObj.getNodes();
            if (nodes.length>0) {
                treeObj.expandNode(nodes[0], true, false, true);
            }
        });
    }
    /*
     * 树点击事件
     */
    var categoryCode="";
    var supplierId="";
    var brandId="";
    function zTreeOnClick(event, treeId, treeNode) {
        categoryCode=treeNode.code;
       var text =  $("#goodsType").combobox('getText');
       if(text =='类别'){
    	   brandId=""
    	   supplierId=""
       }else if(text =="品牌"){
    	   brandId = treeNode.id;
    	   supplierId="";
       }else if(text=="供应商"){
    	   brandId="";
    	   supplierId = treeNode.id;
       }
        var goodsInfo=$("#goodsInfo").val();
        var branchId=$("#branchId").val();
        $("#gridGoods").datagrid("options").queryParams = {'goodsInfo':goodsInfo,'categoryCode':categoryCode,'brandId':brandId,'supplierId':supplierId,'branchId':branchId};
        $("#gridGoods").datagrid("options").method = "post";
        $("#gridGoods").datagrid("options").url =contextPath + '/goods/goodsSelect/queryGoodsSkuLists';
        $("#gridGoods").datagrid("load");
    };
    //初始化表格
    var gridGoodsDg;
    function initDatagridGoods(){
        var arrColumns = [
            {field:'skuCode',title:'货号',align:'left',width:100,},
            {field:'barCode',title:'条码',align:'left',width:100,},
            {field:'skuName',title:'商品名称',align:'left',width:100,},
            {field:'categoryName',title:'类别',align:'center',width:100},
		    {field:'purchasePrice',title:'进货价',align:'right',width:100,
			        formatter : function(value, row, index) {
				         var str=(value||0).toFixed(2);
				         return str;
				   	}	
		     },
		    {field:'salePrice',title:'零售价',align:'right',hidden:true,width:100,
			        formatter : function(value, row, index) {
				        var str=(value||0).toFixed(2);
				        return str;
				    }
			 },
		   {field:'vipPrice',title:'会员价',align:'right',hidden:true,width:100,
		        formatter : function(value, row, index) {
			        var str=(value||0).toFixed(2);
			        return str;
			    }
		    },
		   {field:'distributionPrice',title:'配送价',align:'right',hidden:true,width:100,
		        formatter : function(value, row, index) {
			        var str=(value||0).toFixed(2);
			        return str;
		   	    }
		    },
		   {field:'wholesalePrice',title:'批发价',align:'right',hidden:true,width:100,
	           formatter : function(value, row, index) {
	               var str=(value||0).toFixed(2);
	               return str;
	           }
	        },
	    {field:'unit',title:'库存单位',align:'left',width:100},
	    {field:'spec',title:'规格',align:'left',width:100},
	    {field:'memoryCode',title:'助记码',align:'left',width:100}
    ];
    if(!goodsRadioCallBack){
        arrColumns.unshift({field:'ck',checkbox:true});
    }
    gridGoodsDg=$("#gridGoods").datagrid({
        //title:'普通表单-用键盘操作',
        method:'POST',
        align:'center',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        pageSize:50,
        showFooter:true,
        height:'100%',
        columns:[arrColumns],
        onClickRow:goodsClickRow,
        idField:'skuCode',
        onLoadSuccess : function() {
        priceGrantUtil.grantPrice("gridGoods");
    }
    });
   }
    //选择单行
    function goodsClickRow(rowIndex, rowData){
        if(goodsRadioCallBack){
            goodsRadioCallBack(rowData);
        }
    }
    function publicGoodsGetCheckGoods(cb){
        var row =  $("#gridGoods").datagrid("getChecked");
        cb(row);
    }
    function initSearch(key){
        if(!key){
            $("#gridGoods").datagrid("options").method = "post";
            var branchId=$("#branchId").val();
            $("#gridGoods").datagrid("options").queryParams = {'branchId':branchId};
            $("#gridGoods").datagrid("options").url =contextPath + '/goods/goodsSelect/queryGoodsSkuLists';
            $("#gridGoods").datagrid('load');
        }else{
            cx();
        }
    }
    /*
     * 查询
     */
    function cx(){
        setTimeout(function(){
            var goodsInfo=$("#goodsInfo").val();
            var branchId=$("#branchId").val();
            $("#gridGoods").datagrid("options").queryParams = {'goodsInfo':goodsInfo,'branchId':branchId};
            $("#gridGoods").datagrid("options").method = "post";
            $("#gridGoods").datagrid("options").url =contextPath + '/goods/goodsSelect/queryGoodsSkuLists';
            $("#gridGoods").datagrid('load');
            $("#goodsInfo").focus();
            $("#goodsInfo").select();
        },1000)
    }
</script>
