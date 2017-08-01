<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>日志级别变更</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
    <style>
        .datagrid-header-row .datagrid-cell{text-align: center!important;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
<c:if test="${user.branchId eq '0'}" >
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
        <form id="queryForm" action="" method="post">
            <div class="ub ub-ac">
                <div class="ubtns">
                    <div class="ubtns-item" onclick="query()">查询</div>
                    <div class="ubtns-item" onclick="deleteKey()">删除</div>
                    <div class="ubtns-item" onclick="resetForm()">重置</div>
                </div>
            </div>
            <div class="ub uline umar-t8"></div>
            <div class="ub umar-t8">
                <div class="ub ub-ac umar-r40">
                    <div class="umar-r10 uw-70 ut-r">keys:</div>
                    <select class="uinp ub ub-f1"  id="pattern" name="pattern" >
                        <option value="STOCK*">STOCK*</option>
                        <option value="LOCK*">LOCK*</option>
                    </select>
                </div>
            </div>
        </form>
        <table id="dg"></table>
    </div>
    <script type="application/javascript" >
        /**
         * 重置
         */
        var resetForm = function(){
            location.href=contextPath+"/redis";
        };

        $(function () {
            $('#dg').datagrid({
                url:contextPath+"/redis/list?pattern=STOCK*",
                nowrap:false,
                columns:[[
                    {field:'key',title:'key',width:500},
                    {field:'vale',title:'vale',width:700},
                    {field:'timeout',title:'过期时间',width:100}
                ]]
            });
        });

        var query = function () {
            $('#dg').datagrid({
                url:contextPath+"/redis/list?pattern=" + $("#pattern").val(),
                nowrap:false,
                columns:[[
                    {field:'key',title:'key',width:500},
                    {field:'vale',title:'vale',width:700},
                    {field:'timeout',title:'过期时间',width:100}
                ]]
            });
        };


        var deleteKey= function () {
            var rows =$("#dg").datagrid("getChecked");
            if($("#dg").datagrid("getChecked").length <= 0){
                $_jxc.alert('请选中一行进行删除！');
                return null;
            }
            var keys='';
            $.each(rows,function(i,v){
                keys+=v.key+",";
            });
            $_jxc.confirm('是否要删除选中数据?',function(r){
                if(r){
                    $_jxc.ajax({
                        url:contextPath+"/redis/del",
                        type:"POST",
                        data:{'keys':keys.substring(0,keys.length-1)}
                    },function(result){
                        if (result.code=="0"){
                            $_jxc.alert("删除成功!",function () {
                                $('#dg').datagrid('reload');    // reload the current page data
                            });
                        }else{
                            $_jxc.alert("删除失败!");
                        }
                    });
                }
            });
        };
    </script>
</c:if>
</body>
</html>