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
                    <input class="usearch uinp ub ub-f1" type="text" id="goodsInfo"
                           placeholder="可按货号、自编码、品名、助记码等查询">
                    <input type="button" class="ubtn umar-l10" value="查询" onclick="cx()">
                </div>

                <div class="ub  ub-f1 ">
                    <table id="gridGoods"></table>
                </div>

            </div>
        </div>
        <!--<div class="ub ub-pe umar-10">-->
        <!--<input type="button" class="ubtn usure" value="确定" onclick="toSure()">-->
        <!--<input type="button" class="ubtn ucancle" value="取消" onclick="toCancel()">-->
        <!--</div>-->
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
	//var gridHandel = new GridClass();
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
    var categoryId="";
    function zTreeOnClick(event, treeId, treeNode) {
        categoryCode=treeNode.code;
        $("#gridGoods").datagrid("options").queryParams = {categoryCode:categoryCode};
        $("#gridGoods").datagrid("options").method = "post";
        $("#gridGoods").datagrid("options").url =contextPath + '/goods/goodsSelect/getGoodsList?formType=${type}&sourceBranchId=${sourceBranchId}&targetBranchId=${targetBranchId}&branchId=${branchId}';
        $("#gridGoods").datagrid("load");

    };
    //初始化表格
    var gridGoodsDg;
    function initDatagridGoods(){

    	//gridHandel.setGridName("goodsType");
        var arrColumns = [
            {field:'skuCode',title:'货号',align:'left',width:100,},
            {field:'barCode',title:'条码',align:'left',width:100,},
            {field:'skuName',title:'商品名称',align:'left',width:100,},
	  /*   {field:'sourceStock',title:'库存',align:'center',width:100,},  */
	  /*如果是调价单页面，值显示零售价，其他价格隐藏*/
	  //CA 批发单 只显示进货价 
		<c:choose> 
			   <c:when test="${type =='PC'}">
			       {field:'salePrice',title:'零售价',align:'right',width:100,
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
			        {field:'purchasePrice',title:'进货价',align:'right',hidden:true,width:100,
			              formatter : function(value, row, index) {
			               var str=(value||0).toFixed(2);
			               return str;
			   			  }	
		         	 },
		  	
		      </c:when>
		     <c:when test="${type == 'PA' }">
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
		     </c:when>
			 <c:when test="${type == 'PR' }">
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
		     </c:when>
			        
		     <c:otherwise>
				     {field:'salePrice',title:'零售价',align:'right',width:100,
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
			       {field:'purchasePrice',title:'进货价',align:'right',hidden:true,width:100,
			           formatter : function(value, row, index) {
				            var str=(value||0).toFixed(2);
				            return str;
			      	   }	
			       },
		     </c:otherwise> 
		</c:choose> 
	    {field:'unit',title:'库存单位',align:'left',width:100,},
	    {field:'spec',title:'规格',align:'left',width:100,},
	    {field:'memoryCode',title:'助记码',align:'left',width:100,}
    ];
    if(!goodsRadioCallBack){
        arrColumns.unshift({field:'ck',checkbox:true});
    }
    gridGoodsDg=$("#gridGoods").datagrid({
        //title:'普通表单-用键盘操作',
        method:'POST',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        pageSize:10,
       /*  pageList : [10,500],  */
        showFooter:true,
        height:'100%',
        columns:[arrColumns],
        onClickRow:goodsClickRow,
        idField:'skuCode',
        onLoadSuccess : function() {
        //gridHandel.setDatagridHeader();
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
            $("#gridGoods").datagrid("options").url =contextPath + '/goods/goodsSelect/getGoodsList?formType=${type}&sourceBranchId=${sourceBranchId}&targetBranchId=${targetBranchId}&branchId=${branchId}';
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
            // $("#gridGoods").datagrid("options").queryParams = {'categoryId':categoryId,'goodsInfo':goodsInfo,'formType':'${type}','sourceBranchId':'${sourceBranchId}','targetBranchId':'${targetBranchId}'};
            // 梁利 提出左边树与右边的查询无关系
            $("#gridGoods").datagrid("options").queryParams = $.extend({'goodsInfo':goodsInfo,'formType':'${type}','sourceBranchId':'${sourceBranchId}','targetBranchId':'${targetBranchId}','branchId':'${branchId}'},fromParams)
            $("#gridGoods").datagrid("options").method = "post";
            $("#gridGoods").datagrid("options").url =contextPath + '/goods/goodsSelect/getGoodsList';
            $("#gridGoods").datagrid('load');
            $("#goodsInfo").focus();
            $("#goodsInfo").select();
        },1000)
    }
    var fromParams = {};
    function initNewSearch(params){
        fromParams = params;
        if(!params.key){
            $("#gridGoods").datagrid("options").method = "post";
            $("#gridGoods").datagrid("options").queryParams = params;
            $("#gridGoods").datagrid("options").url =contextPath + '/goods/goodsSelect/getGoodsList?formType=${type}&sourceBranchId=${sourceBranchId}&targetBranchId=${targetBranchId}&branchId=${branchId}';
            $("#gridGoods").datagrid('load');
        }else{
            cx()
        }
    }

</script>
