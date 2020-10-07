import React, { Component } from 'react';

import './htmldiff';
import './htmldiff.css';

export default class Htmldiff extends Component {
    state = {
        loading: false,
        oldValue: '<p>你好，<span style="font-size:48px">哈哈哈，<em><u>罚款啦解放啦解放啦</u></em> </span>😉😘😉</p><p>ok</p>',//this.props.oldValue,
        //oldValue: '<p>yiyiyirqyiryqiA</p>',//this.props.oldValue,
        currentValue: '<p>yiyiyirqyiryqia</p>',//this.props.currentValue,
        //currentValue: '<p>你好，<span style="font-size:48px">哈哈哈，<em><u>罚款啦解放啦解放啦</u></em> </span>😉😘😉</p><p>ok</p>',//this.props.currentValue,
        diffValue: ''
    }
    componentDidMount() {
        this.getHTMLDiff(this.state.oldValue, this.state.currentValue)
    }
    getHTMLDiff = (oldValue, currentValue) => {
        this.setState({
            diffValue: window.getHTMLDiff(oldValue, currentValue)
        })
    }
    render() {
        return (
            <div className="htmldiff-content">
                <table className="htmldiff-table">
                    <tbody>
                        <tr>
                            <td style={{ width: '50%' }} dangerouslySetInnerHTML={{ __html: this.state.oldValue }}></td>
                            <td style={{ width: '50%' }} dangerouslySetInnerHTML={{ __html: this.state.diffValue }}></td>
                        </tr>
                    </tbody>

                </table>
            </div>

        )
    }

}
