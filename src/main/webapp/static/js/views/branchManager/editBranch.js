/**
 * Created by zhaoly on 2017/5/18.
 */

var gridName = "branchCost";
var gridHandle = new GridClass();
function saveBranch(){

}

var editId = '';
function initGridBranchCost(){
    gridHandle.setGridName(gridName);
    $('#'+gridName).treegrid({
        idField: 'id',
        treeField:'name',
        showFooter: true,
        rownumbers: true,
        animate: true,
        collapsible: true,
        fitColumns: true,
        columns:[[
            {field:'cz',title:'操作',width:'60px',align:'center',
                formatter : function(value, row,index) {
                    var str = "";
                    if(typeof(row._parentId) != 'undefined'){
                        str = '&nbsp;&nbsp;<a name="del" class="del-line" data-id="'+row.id+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';

                    }else{
                        str =  '<a name="add" class="add-line" data-id="'+row.id+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
                    }
                    return str;
                },
            },

            {field:'name',title:'Task Name',width:180,editor:'text'},
            {field:'persons',title:'Persons',width:60,align:'right',
                formatter : function(value, row, index) {
                    if(typeof(row._parentId) === 'undefined'){
                        var total = 0;
                        var nodes = $("#pg").treegrid("getChildren",row.id);
                        $.each(nodes,function (index,node) {
                            var person = parseFloat(node.persons);
                            if(!isNaN(person)){
                                total += person;
                            }
                        })
                        return '<b>'+parseFloat(total||0).toFixed(2)+'</b>';
                    }

                    if(!value){
                        row["largeNum"] = parseFloat(value||0).toFixed(2);
                    }

                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    value:0,
                    options:{
                        min:0,
                        precision:4,
                    }
                },
            },
        ]],
        onClickRow:function (row) {
            $('#pg').treegrid('endEdit', editId);
            if(typeof(row._parentId) != 'undefined'){
                editId = row.id;
                $('#pg').treegrid('beginEdit', row.id);
            }
        },
        onBeforeEdit:function(row){
            //这里是功能实现的主要步骤和代码
        }
        ,onAfterEdit:function(row,changes){
            var rowId = row.id;
            var pNode = $("#pg").treegrid("getParent",rowId);
            var total = 0;
            var nodes = $("#pg").treegrid("getChildren",pNode.id);

            $.each(nodes,function (index,node) {
                var person = parseFloat(node.persons);
                if(!isNaN(person)){
                    total += person;
                }
            })
            pNode.persons = total;

            setTimeout(function(){
                $("#pg").treegrid("loadData",$("#pg").treegrid("getData"));
            },10);
        }
    });

    var data = {"total":7,"rows":[
        {"id":'2',"name":"Designing","persons":3,"progress":100,},
        {"id":'3',"name":"Coding","persons":2,"progress":80},

    ]}

    $('#pg').treegrid('loadData', data);
}


//插入一行

function addLineHandel(event){
    event.stopPropagation(event);
    var id = $(event.target).attr('data-id')||'0';
    // $("#pg").treegrid("select",id);
    var timestamp=new Date().getTime();
    var gridDefault = [{
        'id':id+"_"+timestamp,
        'name':'新费用'+id+"_"+timestamp,
        'persons':0,
        "progress":100,
        "_parentId":id
    }]

    $("#pg").treegrid("append",{
        parent: id,
        data:gridDefault
    });
    setTimeout(function(){
        $("#pg").treegrid("loadData",$("#pg").treegrid("getData"));
    },10);
}
//删除一行
function delLineHandel(event){
    event.stopPropagation();
    var id = $(event.target).attr('data-id');
    $("#pg").treegrid("remove",id)

    setTimeout(function(){
        $("#pg").treegrid("loadData",$("#pg").treegrid("getData"));
    },10);



}