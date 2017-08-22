/**
 * Created by zhaoly on 2017/8/18.
 */

$(function () {
    initgridAddPosAct();
    //机构选择初始化 发货机构
    $('#branchTemp').branchSelect();
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
            {field:'prizeFullName',title:'奖品名称',width:'200px',align:'left'},
            {field:'prizeShortName',title:'奖品简称',width:'100px',align:'right',
                editor:{
                    type:'textbox',
                    options:{
                        validType:{maxLength:[20]},
                    }
                }
            },
            {field:'rowNo',title:'顺序',width:'150px',align:'left'},
            {field:'winNum',title:'中奖数量',width:'100px',align:'right'},
            {field:'winRate',title:'中奖概率',width:'150px',align:'left'},
            {
                field : 'picUrl',
                title : '图片',
                align : 'center',
                width : 250,
                formatter:function(value,row){
                    var str = "";
                    if(value!="" && value!=null && undefined!=value){
                        str = "<img style=\"height: 60px;width: 60px;\" src=\""+contextPath+"/"+value+"\"/>";
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
    if(data.id == "0"){
        gridAddPosActHandle.setFieldValue("prizeName","谢谢惠顾");
        gridAddPosActHandle.setFieldTextValue("shortName","谢谢惠顾")

    }else {
        gridAddPosActHandle.setFieldValue("prizeName","");
        gridAddPosActHandle.setFieldTextValue("shortName","")

    }
}

function selectPrize() {
    var branchId = $("#branchId").val();
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
        type:'HD',
        key:"",
        isRadio:0,
        'branchId': $('#branchId').val(),
        sourceBranchId:'',
        targetBranchId:'',
        flag:'0',
    };

    new publicGoodsServiceTem(queryParams,function(data){
        if(data.length==0){
            return;
        }
        var nowRows = gridAddPosActHandle.getRowsWhere();
        $.each(data,function (index,item) {
            data[index]['prizeFullName'] = item.skuName;
        });
        var newRows = nowRows.push(data);
        $("#gridAddPosAct").datagrid("loadData",newRows);

        setTimeout(function(){
            gridAddPosActHandle.setBeginRow(gridAddPosActHandle.getSelectRowIndex()||0);
            gridAddPosActHandle.setSelectFieldName("shortName");
            gridAddPosActHandle.setFieldFocus(gridAddPosActHandle.getFieldTarget('shortName'));
        },100)
    });


}

function imgUrlChange(event) {
    var branchId = $("#branchId").val();
    if(!branchId){
        $_jxc.alert("请先选择活动机构");
        return;
    }

    var row = $("#"+gridName).datagrid("getSelected");
    if(!row){
        $_jxc.alert("请选择一行数据");
        return;
    }

    var value=$("#file").val();
    var img = $("#file")[0].files[0];
    // 判断图片格式
    if(!(img.type.indexOf('image')==0 && img.type && /\.(?:jpg|png|gif)$/.test(img.name)) ){
        $_jxc.alert('图片只能是jpg,gif,png');
        return;
    }

    var imgSize = img.size;
    if(imgSize>2*1024*1024){
        $_jxc.alert('上传的图片的大于2M,请重新选择');
        return;
    }

    var formData = new FormData();
    formData.append("file",$("#file")[0].files[0]);
}

function uploadPic() {

}

function saveWheelsurf() {
    $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());

    var branchId = $("#branchId").val();
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

    var branchId = $("#branchId").val();
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