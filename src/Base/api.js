
let Api = {

    ReleaseModel:true,//当前应用是发布模式
    InnerNetwork:false,//内网模式
 	CurrentHost:'',
    //正式_内网
    hostList_inner: {
        lt: 'http://10.3.4.233:20296/',
    }, 
    //正式_外网
    hostList: {
        lt: 'http://219.139.241.226:5801/',
    
    },
    //测试_内网
    hostList_inner_test: { 
    // lt: 'http://10.3.1.97:20361/', //预生产  
      lt: 'http://10.3.2.21:20296/',  //测试   
    },
    //测试_外网
    hostList_test: {
       // lt: 'http://219.139.241.226:20999/', //预生产  
      lt: 'http://27.17.17.214:6547/',  //测试

    },

    // GetRegisterInfo: 'SysService/api/RegisterManager/GetRegisterInfo?isIntnet=true',
    // GetUser:'api/MobileCommerce/GetUser',//获取用户  
    // QueryBySqlName: 'api/CommonQuery/GetDataSetBySqlName',//Query通用方法

}

let _GetApi = function (apiname) {
    // return Api.ReleaseModel ? Api.Host_Formal.Inner + Api[apiname] : Api.Host_Test.Inner + Api[apiname];
}

export function GetApi(apiname) {
    return _GetApi(apiname);
};

export function GetToken() {
    return Api.ReleaseModel ? Api.Host_Formal.InnerToken + Api.Token : Api.Host_Test.InnerToken + Api.Token;
};
//export let ProdImageHost = 'http://static.yyjzt.com/MedicinedePository_new/';
export default Api




