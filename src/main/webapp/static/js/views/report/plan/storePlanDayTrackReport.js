$(function(){
	//开始和结束时间
    $("#saleTime").val(dateUtil.getCurrentDate().format("yyyy-MM"));
    initStorePlanList();
    
    //机构选择初始化
    $('#branchSelect').branchSelect();
});
var gridHandel = new GridClass();

var datagridId = 'storePlanFlowList';
//初始化表格 没有成本价权限
function initStorePlanList(){
    dg = $("#"+datagridId).datagrid({
        method:'post',
        align:'right',
        singleSelect:false,  //单选  false多选
        pagination:true,    //分页
        showFooter:true,
        data:[
            {no:1,branchCode:'0232423',branchName:'报业园店',planType:'线上',cur_monthAmount:10000,rj_sale:2000},
            {no:1,branchCode:'0232423',branchName:'报业园店',planType:'线下',cur_monthAmount:20000,rj_sale:3000},
            {no:1,branchCode:'0232423',branchName:'报业园店',planType:'合计',cur_monthAmount:30000,rj_sale:4000},
            {no:2,branchCode:'0232424',branchName:'万科店',planType:'线上',cur_monthAmount:30000,rj_sale:4000},
            {no:2,branchCode:'0232424',branchName:'万科店',planType:'线下',cur_monthAmount:30000,rj_sale:4000},
            {no:2,branchCode:'0232424',branchName:'万科店',planType:'合计',cur_monthAmount:30000,rj_sale:4000}
        ],
		height:'100%',
		pageSize:50,
		width:'100%',
        columns:[[
            {field:'no',title:'序号',width: 50,align:'center'},
            {field:'branchCode',title:'机构编码',width: 120,align:'left'},
            {field:'branchName',title:'机构名称',width: 120,align:'left'},
            {field:'planType',title:'类型',width: 120,align:'center'},
            {field:'cur_monthAmount',title:'当月销售目标',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'rj_sale',title:'日均销售目标',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'cur_date',title:'当天销额',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'cur_order',title:'当天订单数',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'cur_korder',title:'当天客单价',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'cur_monthCount',title:'当月累计销额',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'cy_amount',title:'累计销额差异',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'jd_plan',title:'实际达成进度',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'time_plan',title:'时间进度',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            }
        ]],
        onLoadSuccess:function(data){
            gridHandel.setDatagridHeader("center");
            //合并单元格
            var merges = getMergesData(data.rows);
			for(var i=0; i<merges.length; i++){
				$(this).datagrid('mergeCells',{
					index: merges[i].index,
					field: 'no',
					rowspan: merges[i].rowspan,
				});
				$(this).datagrid('mergeCells',{
					index: merges[i].index,
					field: 'branchCode',
					rowspan: merges[i].rowspan,
				});
				$(this).datagrid('mergeCells',{
					index: merges[i].index,
					field: 'branchName',
					rowspan: merges[i].rowspan,
				});
			}
        }       
    });
}

//合并表格操作
function getMergesData(sc_data){
    var ne_data = []; //目标数组
    var no_Num = 0;  //游标
    var _currentObj; //当前统计小项 用于小小项合计
    console.time('s');
    if(sc_data.length > 0){
        sc_data.forEach(function(obj,ind){
            operateInData(obj);
        })
    }
    function operateInData(arg){
        var ne_item = {};
        if(ne_data.length <= 0){
            //跨行
            ne_item = {
                index:0,
                branchCode:arg.branchCode,
                rowspan:1
            };
            ne_data.push(ne_item);
            _currentObj = ne_item;
            return ;
        }

        //统计项
        
        var _flag = false; //标识符
        ne_data.forEach(function(obc,inc){
            if(obc.branchCode === arg.branchCode){
                _flag = true;
                obc.rowspan++; //跨行累计
                no_Num++;      //游标累计
            }
        });

        if(!_flag){
            //下一个统计项
            var nne_item = {
                index:++no_Num,
                branchCode:arg.branchCode,
                rowspan:1
            };
            _currentObj = nne_item;
            ne_data.push(nne_item);
        }
        

    }
    console.timeEnd('s');
    console.log(JSON.stringify(ne_data));
    return ne_data;
}


//查询入库单
function queryForm(){
	 if($("#branchName").val()==""){
	    $_jxc.alert("请选择店铺名称");
	    return;
	 } 
	var fromObjStr = $('#queryForm').serializeObject();
	// 去除编码
	fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)
	$("#"+datagridId).datagrid("options").method = "post";
	$("#"+datagridId).datagrid('options').url = contextPath + '/storeDaySale/report/getStoreDaySaleList';
	$("#"+datagridId).datagrid('load', fromObjStr);
}

/**
 * 导出
 */
function exportData(){
	var length = $('#storeDaySale').datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("无数据可导");
		return;
	}
	$('#exportWin').window({
		top:($(window).height()-300) * 0.5,   
	    left:($(window).width()-500) * 0.5
	});
	$("#exportWin").show();
	$("#totalRows").html(dg.datagrid('getData').total);
	$("#exportWin").window("open");
}
/**
 * 导出
 */
function exportExcel(){
	var length = $("#"+datagridId).datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("没有数据");
		return;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	
	$("#queryForm").form({
		success : function(data){
			if(data==null){
				$_jxc.alert("导出数据成功！");
			}else{
				$_jxc.alert(JSON.parse(data).message);
			}
		}
	});
	$("#queryForm").attr("action",contextPath+"/storeDaySale/report/exportList?"+fromObjStr);
	$("#queryForm").submit();
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
	 $("#saleTime").val(dateUtil.getCurrentDate().format("yyyy-MM"));
};