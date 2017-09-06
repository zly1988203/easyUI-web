/**
 * Created by zhaoly on 2017/9/5.
 */
var gridCostId = "gridCost";
var gridCostHandel = new GridClass();

$(function () {
    initGridCost();
})

function initGridCost() {
    gridCostHandel.setGridName(gridCostId);
    $("#"+gridCostId).datagrid({
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:false,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'skuId',title:'skuId',width:'85px',align:'left',hidden:true},
            {field:'skuCode',title:'货号',width:'70px',align:'left',
                formatter : function(value, row,index) {
                    var str = "";
                    if(row.isFooter) {
                        str = '<div class="ub ub-pc">合计</div> ';
                    }
                    return str;
            }},
            {field:'skuName',title:'商品名称',width:'200px',align:'left'},
            {field:'barCode',title:'国际条码',width:'130px',align:'left'},
            {field:'unit',title:'单位',width:'60px',align:'left'},
            {field:'spec',title:'规格',width:'60px',align:'left'},
            {field:'bigCategoryName',title:'一级类别',width:'60px',align:'left'},
            {field:'largeNum',title:'箱数',width:'80px',align:'right',
                formatter : function(value, row, index) {

                    if(row.isFooter){
                        return ;
                    }
                    if(!value){
                        row["largeNum"] = parseFloat(value||0).toFixed(2);
                    }

                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'realNum',title:'数量',width:'80px',align:'right',
                formatter : function(value, row, index) {

                    if(row.isFooter){
                        return ;
                    }
                    if(!value){
                        row["realNum"] = parseFloat(value||0).toFixed(2);
                    }

                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'actual',title:'当前库存',width:'80px',align:'right',
                formatter : function(value, row, index) {

                    if(row.isFooter){
                        return ;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'costPrice',title:'库存成本价',width:'80px',align:'right',
                formatter : function(value, row, index) {

                    if(row.isFooter){
                        return ;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(4)+'</b>';
                },
            },
            {field:'price',title:'原进货价',width:'80px',align:'right',
                formatter : function(value, row, index) {

                    if(row.isFooter){
                        return ;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(4)+'</b>';
                },
            },
            {field:'amount',title:'原采购金额',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'newAmount',title:'实际采购金额',width:'80px',align:'right',
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
                }
            },
            {field:'totalMoney',title:'调价差额',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'tax',title:'税率',width:'80px',align:'right',
                formatter : function(value, row, index) {

                    if(row.isFooter){
                        return ;
                    }
                    row.tax = value?value:0;
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                options:{
                    min:0,
                    precision:4,
                }
            },
            {field:'taxAmount',title:'税额',width:'80px',align:'right',
                formatter : function(value, row, index) {

                    if(row.isFooter){
                        return ;
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
                }
            },
            {field:'remark',title:'备注',width:'200px',align:'left'}
        ]],
        onClickCell:function(rowIndex,field,value){
            gridCostHandel.setBeginRow(rowIndex);
            gridCostHandel.setSelectFieldName(field);
            var target = gridCostHandel.getFieldTarget(field);
            if(target){
                gridCostHandel.setFieldFocus(target);
            }else{
                gridCostHandel.setSelectFieldName("newAmount");
            }
        },
        onLoadSuccess : function() {
            gridCostHandel.setDatagridHeader("center");
            updateFooter();
        }
    })

}

//合计
function updateFooter(){
    var fields = {amount:0,newAmount:0,totalMoney:0};
    var argWhere = {name:'isGift',value:""}
    gridCostHandel.updateFooter(fields,argWhere);
}

function selectSupplier(){
    var param = {
        formType:"PI",
        isAllowRefOverdueForm:0
    }
    new publicPurchaseFormService(param,function(data){
        $("#refFormNo").val(data.form.formNo);
        //根据选择的采购单，带出采购单的信息
        var keyNames = {
            realNum:'maxRealNum',
        };

        var newRows = gFunUpdateKey(data.list,keyNames);

        var keylargeNum = {
            largeNum:'maxlargeNum',
        };

        var newRows = gFunUpdateKey(newRows,keylargeNum);

        $("#gridCost").datagrid("loadData",newRows);
        //供应商
        $("#supplierId").val(data.form.supplierId);
        $("#supplierName").val(data.form.supplierName);
        //经营方式
        $("#saleWay").val(data.form.saleWay);
        $("#saleWayName").val(data.form.saleWayStr);
        //收货机构
        $("#branchId").val(data.form.branchId);
        $("#branchName").val(data.form.branchName);
        //采购员
        $("#salesmanId").val(data.form.salesmanId);
        $("#operateUserName").val(data.form.salesmanName);
        $("#refFormId").val(data.form.id);
    });
}