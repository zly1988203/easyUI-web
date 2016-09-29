/**
 * Created by huangj02 on 2016/8/11.
 * 公共组件-请选择品牌
 */
function initBrandView(){
    gFunSetEnterKey(brandSearch);
    initDatagridBrand();
}
var brandCallBack ;
//初始化回调函数
function initBrandCallBack(cb){
    brandCallBack = cb;
}
//搜索
function brandSearch(){
    $("#gridBrand").datagrid("options").queryParams = $("#formBrand").serializeObject();
    $("#gridBrand").datagrid("options").method = "post";
    $("#gridBrand").datagrid("load");
}
//选择单行
function brandClickRow(rowIndex, rowData){
    if(brandCallBack){
        brandCallBack(rowData);
    }
}
//初始化表格
function initDatagridBrand(){
    $("#gridBrand").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        url:contextPath+'/common/brand/getComponentList',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'brandCode',title:'品牌代码',width:100,align:'left'},
            {field:'brandName',title:'品牌名称',width:100,align:'left'},
        ]],
        onLoadSuccess:function(data){
        	 $('.datagrid-header').find('div.datagrid-cell').css('text-align','center');
        },
        onClickRow:brandClickRow,
    });
}

