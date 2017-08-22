/**
 * Created by zhaoly on 2017/8/18.
 */

$(function () {
    initgridAddPosAct();
    //机构选择初始化
    $('#branchTemp').branchSelect({
        //数据过滤
        onAfterRender:function(data){
           $("#branchIds").val(data.branchId);
        }
    });
    if($("#pageStatue").val() === "add"){
        $("#actStarTime").val(dateUtil.getCurrentDateStr());
        $("#actEndTime").val(dateUtil.getCurrentDateStr());
        $("#prizeStarTime").val(dateUtil.getCurrentDateStr());
        $("#prizeEndTime").val(dateUtil.getCurrentDateStr());
    }else if ($("#pageStatue").val() == "copy"){
        $_jxc.ajax({url:contextPath+"/pos/wheelsurf/form/edit/detail/"+$("#copyId").val()},function (data) {
            $("#gridAddPosAct").datagrid("loadData",data.detail);
        });
    }else if($("#pageStatue").val() == "0"){
        $_jxc.ajax({url:contextPath+"/pos/wheelsurf/form/edit/detail/"+$("#formId").val()},function (data) {
            $("#gridAddPosAct").datagrid("loadData",data.detail);
        });
    }else{
        $_jxc.ajax({url:contextPath+"/pos/wheelsurf/form/edit/detail/"+$("#formId").val()},function (data) {
            $("#gridAddPosAct").datagrid("loadData",data.detail);
        });
    }

})

var gridName = "gridAddPosAct";
var gridAddPosActHandle = new GridClass();
var gridDefault = {
    prizeType:1,
}
function initgridAddPosAct() {
    gridAddPosActHandle.setGridName(gridName);
    $("#"+gridName).datagrid({
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'id',title:'id',align:'left',hidden:true},
            {field:'skuId',title:'skuId',align:'left',hidden:true},
            {field:'prizeType',title:'奖品类型',width:'200px',align:'left',
                formatter:function(value,row){
                    if(row.isFooter){
                        return;
                    }
                    row.prizeType = row.prizeType?row.prizeType:0;
                    return value=='1'?'商品':'谢谢惠顾';
                },
                editor:{
                    type:'combobox',
                    options:{
                        valueField: 'id',
                        textField: 'text',
                        editable:false,
                        required:true,
                        data: [{
                            "id":'1',
                            "text":"商品",
                        },{
                            "id":'3',
                            "text":"谢谢惠顾",
                        }],
                         onSelect:onSelectprizeType
                    }
                }
            },
            {field:'prizeFullName',title:'奖品名称',width:'200px',align:'left',
                editor:{
                    type:'textbox',
                    options:{
                        disabled:true
                    }
                }
            },
            {field:'prizeShortName',title:'奖品简称',width:'100px',align:'right',
                editor:{
                    type:'textbox',
                    options:{
                        validType:{maxLength:[20]},
                    }
                }
            },
            {field:'rowNo',title:'顺序',width:'150px',align:'left',
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:0,
                    }
                },
            },
            {field:'winNum',title:'中奖数量',width:'100px',align:'right',
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:0,
                    }
                },
            },
            {field:'winRate',title:'中奖概率',width:'150px',align:'left',
                editor:{
                    type:'numberbox',
                    options:{
                        min:0.00,
                        precision:2,
                    }
                },
            },
            {
                field : 'picUrl',
                title : '图片',
                align : 'center',
                width : 250,
                formatter:function(value,row){
                    var str = "";
                    if(value!="" && value!=null && undefined!=value){
                        str = "<img style=\"height: 60px;width: 60px;\" src=\""+value+"\"/>";
                        return str;
                    }
                }},
        ]],
        onClickCell:function(rowIndex,field,value){
            gridAddPosActHandle.setBeginRow(rowIndex);
            gridAddPosActHandle.setSelectFieldName(field);
            var target = gridAddPosActHandle.getFieldTarget(field);
            if(target){
                gridAddPosActHandle.setFieldFocus(target);
            }else{
                gridAddPosActHandle.setSelectFieldName("shortName");
            }
        },
        onLoadSuccess:function(data){
            gridAddPosActHandle.setDatagridHeader("center");
        }
    })

    if($("#pageStatue").val() == "add") {
        gridAddPosActHandle.setLoadData([$.extend({}, gridDefault), $.extend({}, gridDefault),
            $.extend({}, gridDefault), $.extend({}, gridDefault), $.extend({}, gridDefault), $.extend({}, gridDefault)]);
    }
}

function onSelectprizeType(data) {
    if(data.id == "3"){
        gridAddPosActHandle.setFieldTextValue("prizeFullName","谢谢惠顾");
        gridAddPosActHandle.setFieldTextValue("prizeShortName","谢谢惠顾")

    }else {
        gridAddPosActHandle.setFieldTextValue("prizeFullName","");
        gridAddPosActHandle.setFieldTextValue("prizeShortName","")

    }
}

function selectPrize() {
    var branchId = $("#branchIds").val();
    if(!branchId){
        $_jxc.alert("请先选择活动机构");
        return;
    }

    var row = $("#"+gridName).datagrid("getSelected");
    if(!row || row.prizeType == "0"){
        $_jxc.alert("请选择一行奖品类型为商品的数据");
        return;
    }

    var queryParams = {
        type:'',
        key:"",
        isRadio:1,
        'branchId': $('#branchIds').val(),
        sourceBranchId:'',
        targetBranchId:'',
        flag:'0',
    };

    new publicGoodsServiceTem(queryParams,function(data){
        if(data.length==0){
            return;
        }

        row['prizeFullName'] = data[0].skuName;
        row['skuId'] = data[0].skuId;

        $("#gridAddPosAct").datagrid("acceptChanges");

        setTimeout(function(){
            gridAddPosActHandle.setBeginRow(gridAddPosActHandle.getSelectRowIndex()||0);
            gridAddPosActHandle.setSelectFieldName("shortName");
            gridAddPosActHandle.setFieldFocus(gridAddPosActHandle.getFieldTarget('shortName'));
        },100)
    });


}

function uploadPic() {
    var branchId = $("#branchIds").val();
    if(!branchId){
        $_jxc.alert("请先选择活动机构");
        return;
    }

    var row = $("#"+gridName).datagrid("getSelected");
    if(!row){
        $_jxc.alert("请选择一行数据");
        return;
    }

    var param = {
        url:'/pos/wheelsurf/form/upload'
    }
    publicUploadImgService(param,function (data) {
        row.picUrl = data.filePath;
        $("#gridAddPosAct").datagrid("acceptChanges");
    });
}


function saveWheelsurf() {
    $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());

    var branchId = $("#branchIds").val();
    if(!branchId){
        $_jxc.alert("请先选择活动机构");
        return;
    }

    var actName = $("#wheelsurfName").val();
    if(!actName){
        $_jxc.alert("请填写活动名称");
        return;
    }

    $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());

    var isValid = $("#gridAddForm").form('validate');
    if (!isValid) {
        return;
    }
    var formObj = $("#formAdd").serializeObject();

    var param = {
        formObj : JSON.stringify(formObj),
        list : JSON.stringify(gridAddPosActHandle.getRows())
    };

    $_jxc.ajax({
        url:contextPath+'/pos/wheelsurf/form/save',
        data:param
    },function(result){
        if(result.code == 0){
            $_jxc.alert("保存成功",function (data) {
                window.parent.frames[src]=contextPath+'/pos/wheelsurf/form/edit/'+data.id;
            })
        }else{
            $_jxc.alert(result['message']);
        }
    })


}

function updateWheelsurf() {
    $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());

    var branchId = $("#branchIds").val();
    if(!branchId){
        $_jxc.alert("请先选择活动机构");
        return;
    }

    var actName = $("#wheelsurfName").val();
    if(!actName){
        $_jxc.alert("请填写活动名称");
        return;
    }

    $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());

    var isValid = $("#gridEditForm").form('validate');
    if (!isValid) {
        return;
    }


    var formObj = $("#formAdd").serializeObject();

    var param = {
        formObj : JSON.stringify(formObj),
        list : JSON.stringify(gridAddPosActHandle.getRows())
    };

    $_jxc.ajax({
        url:contextPath+'/pos/wheelsurf/form/update',
        data:param,
    },function(result){
        if(result.code == 0){
            $_jxc.alert("保存成功",function () {
                gFunRefresh();
            })
        }else{
            $_jxc.alert(result['message']);
        }
    })
}

function checkWheelsurf() {
    var actName = $("#wheelsurfName").val();
    if(!actName){
        $_jxc.alert("请填写活动名称");
        return;
    }

    $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());

    var isValid = $("#gridEditForm").form('validate');
    if (!isValid) {
        return;
    }

    $_jxc.ajax({
        url:contextPath+'/pos/wheelsurf/form/audit',
        data:{
            formId : $("#formId").val(),
        },
    },function(result){
        if(result.code == 0){
            $_jxc.alert("审核成功",function () {
                gFunRefresh();
            });
        }else{
            $_jxc.alert(result['message']);
        }
    })

}

function overWheelsurf() {

    $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());

    var isValid = $("#gridEditForm").form('validate');
    if (!isValid) {
        return;
    }

    $_jxc.ajax({
        url:contextPath+'/pos/wheelsurf/form/over',
        data:{
            formId : $("#formId").val(),
        },
    },function(result){
        if(result.code == 0){
            $_jxc.alert("终止成功",function () {
                gFunRefresh();
            });
        }else{
            $_jxc.alert(result['message']);
        }
    })
}

function copyPosActivity(id) {
    window.parent.addTab('复制POS客屏活动',contextPath+'/pos/wheelsurf/form/copy/'+id);
}