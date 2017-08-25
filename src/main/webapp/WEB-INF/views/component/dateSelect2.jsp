<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="ub ub-ac umar-l20">
	<input class="Wdate"  readonly="readonly" name="startTime" id="txtStartDate" onfocus="updateWdatePicker(0)"/>&nbsp;至&nbsp;
	<input class="Wdate"  readonly="readonly" name="endTime" id="txtEndDate" onfocus="updateWdatePicker(1)"/>
<!--     <div class="ub ub-ac umar-l10">
        <input class="ub" type="radio" name="dateradio" id="this_month" onclick="toChangeDate(4,'yyyy-MM');"/><label for="this_month">本月</label>
    </div> -->
    <div class="ub ub-ac umar-l10">
        <input class="ub" type="radio" name="dateradio" id="last_month" onclick="toChangeDate(5,'yyyy-MM');"/><label for="last_month">上月</label>
    </div>
    <div class="ub ub-ac umar-l10">
        <input class="ub" type="radio" name="dateradio" id="this_season" onclick="toChangeDate(6,'yyyy-MM');"/><label for="this_season">本季</label>
    </div>
    <div class="ub ub-ac umar-l10">
        <input class="ub" type="radio" name="dateradio" id="last_season" onclick="toChangeDate(7,'yyyy-MM');"/><label for="last_season">上季</label>
    </div>
    <div class="ub ub-ac umar-l10">
        <input class="ub" type="radio" name="dateradio" id="this_year" onclick="toChangeDate(8,'yyyy-MM');"/><label for="this_year">今年</label>
    </div>
</div>
<script>
    function updateWdatePicker(type){
    	
    	if(type==0){
   		 WdatePicker({
   	                	dateFmt:'yyyy-MM',
   	                	maxDate:'#F{$dp.$D(\'txtStartDate\');}',
   	                    onpicked:function(dp){
   	                        $("input:radio[name='dateradio']").attr("checked",false);
   	                    }
   	                })
	   	}else{
	   		 WdatePicker({
		   	                	dateFmt:'yyyy-MM',
		   	                	maxDate:'#F{$dp.$D(\'txtStartDate\')}',
		   	                    onpicked:function(dp){
		   	                        $("input:radio[name='dateradio']").attr("checked",false);
		   	                    }
		   	                })
	   	}
    	
    }
</script>
