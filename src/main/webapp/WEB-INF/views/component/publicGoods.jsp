<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<style> 
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
    <script src="${ctx}/static/js/views/component/publicGoods.js"></script>
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
    <input type="hidden" name="supplierId" id="searchSupplierId" value="${searchSupplierId}">
    <input type="hidden" id="type" value="${type}"/>
    <input type="hidden" id="flag" value="${flag}"/>
    <input type="hidden" id="sourceBranchId" value="${sourceBranchId}"/>
    <input type="hidden" id="targetBranchId" value="${targetBranchId}"/>
    <input type="hidden" id="branchId" value="${branchId}"/>
    <input type="hidden" id="categoryCodes" value="${categoryCodes}"/>
    <input type="hidden" id="isManagerStock" value="${isManagerStock}"/>

    </div>
</div>

<!-- 因为列属于动态的，需要C标签，JS直接写在JSP文件里面 -->

    <script>
    $(function(){
    gFunSetEnterKey(cx);
    })

    function goodsArchives(){
    var type = '${type}';
    if(type=='PA' || type=='PR'){
    this.selectTypeName = "supplierId";
    }else{
    this.selectTypeName = "categoryCode";
    }
    //tree的提交参数
    var searchSupplierId = $("#searchSupplierId").val();
    this.treeParam = {
    categoryCode:'',
    supplierId:searchSupplierId,
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
    var arr = [{
    id: 'categoryCode',
    text: '类别',
    },{
    id: 'brandId',
    text: '品牌'
    },{
    id: 'supplierId',
    text: '供应商'
    }];
    for(var i =0 ;i<arr.length;i++){
    if(arr[i]['id']==goodsClass.selectTypeName){
    arr[i]['selected']= true;
    }
    }
    $('#goodsType').combobox({
    valueField:'id',
    textField:'text',
    data: arr,
    onSelect: function(record){
    goodsClass.selectTypeName = record.id;
    initTreeArchives();
    },
    });
    }
    //初始树
    function initTreeArchives(){
    var searchSupplierId = $("#searchSupplierId").val();
    var args = {supplierId:searchSupplierId};
    var httpUrl = goodsClass.getTreeUrl(goodsClass.selectTypeName);
    $.post(httpUrl, args,function(data){
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
    var flag = '${flag}';
    function zTreeOnClick(event, treeId, treeNode) {
    categoryCode=treeNode.code;
    var text =  $("#goodsType").combobox('getText');
    if(text =='类别'){
    brandId = "";
    supplierId = "";
    }else if(text =="品牌"){
    brandId = treeNode.id;
    supplierId = "";
    }else if(text=="供应商"){
    brandId = "";
    supplierId = treeNode.id;
    }
    $("#gridGoods").datagrid("options").queryParams = {categoryCode:categoryCode,brandId:brandId,supplierId:supplierId,flag:flag};
    $("#gridGoods").datagrid("options").method = "post";
    $("#gridGoods").datagrid("options").url =contextPath + '/goods/goodsSelect/getGoodsList?formType=${type}&sourceBranchId=${sourceBranchId}&targetBranchId=${targetBranchId}&branchId=${branchId}&categoryCodes=${categoryCodes}&isManagerStock=${isManagerStock}';
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
    {field:'categoryName',title:'类别',align:'center',width:100},
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
    pageSize:50,
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
    function initSearch(param){
    $("#goodsInfo").val(param.key);
    if(!param.key){
    var searchSupplierId = $("#searchSupplierId").val();
    $("#gridGoods").datagrid("options").method = "post";
    $("#gridGoods").datagrid("options").queryParams = $.extend({'flag':'${flag}','supplierId':searchSupplierId,
    'formType':'${type}','sourceBranchId':'${sourceBranchId}',
    'targetBranchId':'${targetBranchId}','branchId':'${branchId}',
    'categoryCodes':'${categoryCodes}','isManagerStock':'${isManagerStock}'},
    fromParams)
    $("#gridGoods").datagrid("options").url =contextPath + '/goods/goodsSelect/getGoodsList';
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
    var text =  $("#goodsType").combobox('getText');
    var searchSupplierId = '';
    if(text=='供应商'){
    searchSupplierId = $("#searchSupplierId").val();
    }
    // $("#gridGoods").datagrid("options").queryParams = {'categoryId':categoryId,'goodsInfo':goodsInfo,'formType':'${type}','sourceBranchId':'${sourceBranchId}','targetBranchId':'${targetBranchId}'};
    // 梁利 提出左边树与右边的查询无关系
    $("#gridGoods").datagrid("options").queryParams = $.extend({'flag':'${flag}','goodsInfo':goodsInfo,'supplierId':searchSupplierId,
    'formType':'${type}','sourceBranchId':'${sourceBranchId}',
    'targetBranchId':'${targetBranchId}','branchId':'${branchId}',
    'categoryCodes':'${categoryCodes}','isManagerStock':'${isManagerStock}'},
    fromParams)
    $("#gridGoods").datagrid("options").method = "post";
    $("#gridGoods").datagrid("options").url =contextPath + '/goods/goodsSelect/getGoodsList';
    $("#gridGoods").datagrid('load');
    $("#goodsInfo").focus();
    $("#goodsInfo").select();
    },1000)
    }
    var fromParams = {};
    //永亲专用，请勿修改
    function initNewSearch(params){
    fromParams = params;
    if(!params.key){
    $("#gridGoods").datagrid("options").method = "post";
    $("#gridGoods").datagrid("options").queryParams = params;
    $("#gridGoods").datagrid("options").url =contextPath + '/goods/goodsSelect/getGoodsList';
    $("#gridGoods").datagrid('load');
    }else{
    cx()
    }
    }

    </script>
