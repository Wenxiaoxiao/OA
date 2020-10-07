import React, { Component } from 'react';
import { Input,Button} from 'antd';
import './index.css';
import Api from '../../Base/api';
import Fetch from'../../Base/base';
import Common  from'../../Base/common';

class Login extends Component {
  state = {
    loading: false,
  }


  submit = () => {

    this.setState({ loading: true });
     this.props.history.push("/Main");

   /*   Fetch("http://10.3.4.177:20361/api/FinanceSharing/GetBill?billId=FDGRLD00000047&branchId=FDG",null, {method: 'GET'}
     ).then((data) => {


     }).catch((error) => {console.log(error);

     });  */
   
  

  }

  render() {
    return (
      <div className="main">
   
        <h3 >项目管理平台</h3>
        <div className="item" >
          <Input placeholder="账号" />
        </div>
        <div className="item" >
          <Input placeholder="密码" type="password" />
        </div>
        <div className="item" >
        <Button type="primary" block   loading={this.state.loading} onClick={this.submit}>登 陆</Button>
        </div>

      </div>
    );
  }
}

export default Login;
