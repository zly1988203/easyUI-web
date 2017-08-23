/**
 * Created by zhaoly on 2017/8/18.
 */

$(function () {
    initgridAddPosAct();
    //机构选择初始化
    initBranchGroup();
    if($("#pageStatue").val() === "add"){
        $("#beginTime").val(dateUtil.getCurrentDateStr());
        $("#overTime").val(dateUtil.getCurrentDateStr());
        $("#validBeginTime").val(dateUtil.getCurrentDateStr());
        $("#validOverTime").val(dateUtil.getCurrentDateStr());
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


function initBranchGroup(){
    $('#branchTemp').branchSelect({
        param:{
            selectType:1,  //多选
            view:'group', //分组
            formType:''
        },
        loadFilter:function(data){
            if(data && data.length >0 ){
                data.forEach(function(obj,index){
                    obj.branchIds = obj.branchId;
                })
            }
            return data;
        },
        onAfterRender:function(data){
            $('#branchName').attr('title',$('#branchName').val());
            if(data && data.length>0){
                var ids = [];
                data.forEach(function(obj,inx){
                    if(obj.type == -1){
                        ids.push(obj.branchId);
                    }
                })
                if(ids.length == 0) return;
                var param = {
                    "groupIds":ids.join(',')
                }
                //拉取分组详细
                publicGetBranchGroupDetail(param,function(result){
                    $('#branchIds').val(result&&result.branchId);
                    $('#branchName').attr('title',result&&result.branchName);
                    // $('#branchsFullName').val(result&&result.branchName);
                })
            }
        }
    });
}


var gridName = "gridAddPosAct";
var gridAddPosActHandle = new GridClass();
var gridDefault = {
    skuId:"",
    prizeType:1,
    rowNo:"",
    winNum:"",
    winRate:"",
    picUrl:""
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
            {field:'skuId',title:'skuId',align:'left',hidden:true,
                editor:{
                    type:'textbox',
                    options:{
                        disabled:true
                    }
                }
            },
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
            {field:'prizeShortName',title:'奖品简称',width:'100px',align:'left',
                editor:{
                    type:'textbox',
                    options:{
                        validType:{maxLength:[20]},
                        required:true
                    }
                }
            },
            {field:'rowNo',title:'顺序',width:'150px',align:'right',
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:0,
                        required:true
                    }
                },
            },
            {field:'winNum',title:'中奖数量',width:'100px',align:'right',
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:0,
                        required:true
                    }
                },
            },
            {field:'winRate',title:'中奖概率',width:'150px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    if(!value){
                        value = "0.00";
                    }else{
                        row['winRate'] = value;
                    }
                    return '<b>'+value+'% </b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0.00,
                        precision:2,
                        required:true
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
                gridAddPosActHandle.setSelectFieldName("prizeShortName");
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

    var row = $("#"+gridName).datagrid("getSelected");

    if(data.id == "3"){
        row['skuId'] = "xxhg";
        row['prizeFullName'] = "谢谢惠顾";
        row['prizeShortName'] = "谢谢惠顾";
        gridAddPosActHandle.setFieldTextValue("skuId","xxhg");
        gridAddPosActHandle.setFieldTextValue("prizeFullName","谢谢惠顾");
        gridAddPosActHandle.setFieldTextValue("prizeShortName","谢谢惠顾");
    }else {
        if(row.skuId=="" || row.skuId =="xxhg"){
            gridAddPosActHandle.setFieldTextValue("skuId","");
            gridAddPosActHandle.setFieldTextValue("prizeFullName","");
            gridAddPosActHandle.setFieldTextValue("prizeShortName","");
        }
    }

    row['prizeType'] = data.id;
    // $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());
    $("#"+gridName).datagrid("acceptChanges");
    // $("#"+gridName).datagrid("updateRow",row);
    // $("#"+gridName).datagrid("refreshRow",gridAddPosActHandle.getSelectRowIndex())
}

function selectPrize() {
    var branchId = $("#branchIds").val();
    if(!branchId){
        $_jxc.alert("请先选择活动机构");
        return;
    }

    $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());
    var row = $("#"+gridName).datagrid("getSelected");
    if(!row || row.prizeType == "3"){
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
        gridAddPosActHandle.setFieldTextValue("skuId",data[0].skuId);
        gridAddPosActHandle.setFieldTextValue("prizeFullName",data[0].skuName);

        // $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());
        $("#"+gridName).datagrid("acceptChanges");
        $("#"+gridName).datagrid("updateRow",{index:gridAddPosActHandle.getSelectRowIndex(),row:row});
        $("#"+gridName).datagrid("refreshRow",gridAddPosActHandle.getSelectRowIndex())
        // setTimeout(function(){
        //     gridAddPosActHandle.setBeginRow(gridAddPosActHandle.getSelectRowIndex()||0);
        //     gridAddPosActHandle.setSelectFieldName("prizeShortName");
        //     gridAddPosActHandle.setFieldFocus(gridAddPosActHandle.getFieldTarget('prizeShortName'));
        // },100)
    });


}

function uploadPic() {
    var branchId = $("#branchIds").val();
    if(!branchId){
        $_jxc.alert("请先选择活动机构");
        return;
    }
    $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());
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
        // $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());
        $("#"+gridName).datagrid("acceptChanges");
        $("#"+gridName).datagrid("updateRow",row);
        $("#"+gridName).datagrid("refreshRow",gridAddPosActHandle.getSelectRowIndex())
    });
}


function saveWheelsurf() {

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

    var rows = gridAddPosActHandle.getRowsWhere({skuId:'1'})
    var formObj = $("#formAdd").serializeObject();

    if(rows.length < 6){
        $_jxc.alert("检测到数据没有完成，请完成");
        return;
    }

    var rowNoArr = [];
    var hasRepeat = false;
    var totalRate = 0.00;
    $.each(rows,function (index,item) {
        if($.inArray(item.rowNo, rowNoArr) == -1){
            rowNoArr.push(item.rowNo);
        }else{
            hasRepeat = true;
        }
        totalRate = totalRate + parseFloat(item.winRate);
    })

    if(hasRepeat){
        $_jxc.alert("顺序不能数字重复")
        return;
    }
    if(totalRate > 100){
        $_jxc.alert("中奖概率总和不能超过100%")
        return;
    }

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