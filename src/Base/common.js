
const Common = {
    BranchId:'',
    StaffId:'',
    StaffName:'',
    OrgName:'',
    Access_token:'',
    Token_type:'',
    getday:function getday(type) {
        var date_ = new Date();
        var year = date_.getFullYear();
        var month = date_.getMonth() + 1;
    
        if (type === 1) {
            return year + '-' + month + '-01' //本月第一天
        }
        else if (type === 2) {
            var day = new Date(year, month, 0);
            return year + '-' + month + '-' + day.getDate(); //下个月
        }
        else if (type === 0) {
            return year + '-' + month + '-' + date_.getDate(); //当日
        }
        else if (type === 3) {
            var curDate = new Date();
            var nextDate = new Date(curDate.getTime() + 24*60*60*1000); //后一天
            return nextDate;
        }
   },
    dateformat:function (date) { 
        var date_  = new Date(date);
        var result = date_.getFullYear()+'年'+(date_.getMonth()+1)+'月'+date_.getDate()+'日  '+date_.getHours()+':'+date_.getMinutes()+':'+date_.getSeconds();
        return result;
   },
   WebApiHost:{},
   ZDAWebApiHost:{},
   token:{},


}
 export default Common;