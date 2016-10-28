<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="ub ub-ac umar-l20">
	<input class="Wdate"  readonly="readonly" name="startTime" id="txtStartDate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',maxDate:'#F{$dp.$D(\'txtEndDate\');}'})" />&nbsp;至&nbsp;
	<input class="Wdate"  readonly="readonly" name="endTime" id="txtEndDate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',minDate:'#F{$dp.$D(\'txtStartDate\');}'})" />
	<div class="ub ub-ac umar-l10">
		<input class="ub" type="radio" name="dateradio" id="today" onclick="toChangeDatetime(0);"/><label for="today">今天</label>
	</div>
	<div class="ub ub-ac umar-l10">
		<input class="ub" type="radio" name="dateradio" id="yesterday" onclick="toChangeDatetime(1);"/><label for="yesterday">昨天</label>
	</div>
    <div class="ub ub-ac umar-l10">
        <input class="ub" type="radio" name="dateradio" id="this_week" onclick="toChangeDatetime(2);"/><label for="this_week">本周</label>
    </div>
    <div class="ub ub-ac umar-l10">
        <input class="ub" type="radio" name="dateradio" id="last_week" onclick="toChangeDatetime(3);"/><label for="last_week">上周</label>
    </div>
    <div class="ub ub-ac umar-l10">
        <input class="ub" type="radio" name="dateradio" id="this_month" onclick="toChangeDatetime(4);"/><label for="this_month">本月</label>
    </div>
    <div class="ub ub-ac umar-l10">
        <input class="ub" type="radio" name="dateradio" id="last_month" onclick="toChangeDatetime(5);"/><label for="last_month">上月</label>
    </div>
    <div class="ub ub-ac umar-l10">
        <input class="ub" type="radio" name="dateradio" id="this_season" onclick="toChangeDatetime(6);"/><label for="this_season">本季</label>
    </div>
    <div class="ub ub-ac umar-l10">
        <input class="ub" type="radio" name="dateradio" id="last_season" onclick="toChangeDatetime(7);"/><label for="last_season">上季</label>
    </div>
    <div class="ub ub-ac umar-l10">
        <input class="ub" type="radio" name="dateradio" id="this_year" onclick="toChangeDatetime(8);"/><label for="this_year">今年</label>
    </div>
</div>