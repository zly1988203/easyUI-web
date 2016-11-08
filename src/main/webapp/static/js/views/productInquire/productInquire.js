/**
 * Created by wxl on 2016/08/11.
 */
$(function(){
    
    //初始化列表
    initProductInquireGrid();
});

function initProductInquireGrid() {
    $("#productInquire").datagrid({
        //title:'普通表单-用键盘操作',
        method: 'get',
        align: 'center',
        url: '../../json/component.json',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        //fitColumns:true,    //占满
        //showFooter:true,
        columns: [[
            {field: 'dpbh', title: '店铺编号', width: 150, align: 'center',},
            {field: 'dpmc', title: '店铺名称', width: 220, align: 'center', },
            {field: 'spmc', title: '商品名称', width: 200, align: 'center'},
            {field: 'tm', title: '条码', width: 200, align: 'center'},
            {field: 'lbbh', title: '类别编号', width: 150, align: 'center'},
            {field: 'lb', title: '类别', width: 100, align: 'center'},
            {field: 'pidw', title: '单位', width: 80, align: 'center'},
            {field: 'gg', title: '规格', width: 80, align: 'center'},
            {field: 'kc', title: '库存', width: 80, align: 'center'},
            {field: 'cbj', title: '成本价', width: 80, align: 'center'},
            {field: 'kcje', title: '库存金额', width: 80, align: 'center'},
            {field: 'sj', title: '售价', width: 80, align: 'center'},
            {field: 'sjje', title: '售价金额', width: 80, align: 'center'},
            {field: 'jjfs', title: '计价方式', width: 80, align: 'center'},
            {field: 'spzt', title: '商品状态', width: 80, align: 'center'},
            {field: 'gys', title: '供应商名称', width: 200, align: 'center'},

        ]]
    });
}
