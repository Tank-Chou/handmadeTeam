import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import "../../commom/scss/teacher/OrderInfo.scss";
import "bootstrap/dist/css/bootstrap.min.css";

class OrderInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject_name: "",
      people: "1",
      // 最大可報名人數
      maxPeople: "4"
    };
  }

  componentDidMount() {
    // this.getApiData();
    this.getSubjectInfo();
  }

  // ------------ 取得開課資料------------
  getSubjectInfo = () => {
    console.log("this props:", this.props.subject_sid); //開課編號
    fetch(
      "http://localhost:5000/handmade/teacher/subject/" +
        this.props.subject_sid,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "content-type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        let Data = data;
        console.log("subject data:", Data);
        this.setState(
          {
            subject_name: Data.subject_name,
            subject_date: Data.subject_date,
            subject_address: Data.subject_address,
            subject_price: Data.subject_price,
            subject_img: Data.subject_img
          },
          () => {
            console.log(Data.subject_date);
          }
        );
      });
  };

  // ------ get API 取得報名人數、載入報名資料 ------
  // getApiData = () => {
  //   fetch("http://localhost:3000/teacher/")
  //     .then(res => res.json())
  //     .then(member => {
  //       this.setState({
  //         // signuplist: [],
  //         ownerInfo: ""
  //       });
  //     });
  // };

  // ------------  報名人數增加處理------------
  plus = () => {
    // console.log("plus");
    this.setState({
      people:
        this.state.people >= this.state.maxPeople
          ? this.state.maxPeople
          : this.state.people * 1 + 1
      // totalPrice:this.state.people*this.state.subjectPrice
    });
    // console.log(this.state.people * 1 + 1);
  };

  //------------ 報名人數減少處理------------
  minus = () => {
    // console.log("minus");
    this.setState({
      people: this.state.people > 1 ? this.state.people - 1 : 1
      // 會差一步!!
      // totalPrice: this.state.people * this.state.subjectPrice
    });
  };

  // // 改變文字onChange功能
  handleChange = e => {
    // 判斷名字英文或中文都可
    let regex = /^[u4E00-\u9FA5]+$/      
    let value=e.target.value
    if (!(regex.test(value) || value === '')) 
      return false
    this.setState({ [e.target.name]: e.target.value }, () => {
      // console.log("order_sid:",localStorage.getItem('member_id'))
      console.log("subject_sid:",this.props.subject_sid)
      // console.log("phone:", this.state.phone);
      console.log("username:", this.state.username);
    });
    // console.log(this.state.username)  <= 會慢一步，錯誤寫法
  };

  // ------------post API 上傳報名資料------------
  //post表單到資料庫
  postMeberInfo = () => {
    let usersid = localStorage.getItem('member_id'); //(在Application裡看)抓localStorage裡key為member_id的value
     
    console.log("order_sid:",usersid) ;
    console.log("subject_sid:",this.props.subject_sid,);
    console.log("username:",this.state.username)
    console.log("phone:",this.state.phone);
    console.log("people:",this.state.people);
    console.log(this.state.subject_price * this.state.people);

    let postData = {
      usersid: usersid, //會員訂單編號
      subject_sid: this.props.subject_sid,
      username: this.state.username,
      phone: this.state.phone,
      people: this.state.people,
      totalPrice: this.state.subject_price * this.state.people  //訂單總價
    };
    if (this.state.username !== '' && this.state.phone !== ''){
       fetch("http://localhost:5000/handmade/teacher/subject/order", {
        method: "POST",
         headers: {
        "Content-Type": "application/json"
      },
        body: JSON.stringify(postData)
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          alert("上傳成功");
        })
        .catch(error => {
          console.log(error);
        });
    }else{
       alert('請輸入完整資料哦');
    }   
  };

  render() {
    // console.log("props:", this.props.subject_sid);
    // console.log(this.state.username);
    return (
      <>
        <div className="d-flex">
          <sidebar className="booking-sidebar">
            <div className="subject-header"></div>
            {/* 開課圖 */}
            <div className="subject-smallimg">
              <img
                className="sub-img"
                src={`/image/${this.state.subject_img}`}
              ></img>
            </div>
            <div className="subject-data">
              <div className="order-subject-name">
                {this.state.subject_name}
              </div>
              <div className="order-subject-date">
                {this.state.subject_date}
              </div>
              {/* <div className="order-subject-address">
                {this.state.subject_address}
              </div> */}
              {/* <div className="member-name">會員xxx</div> */}
              <div className="user-box">
                <label>報名人 :</label>
                <input
                  className="input-box"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={e => this.handleChange(e)}
                  placeholder="Enter UserName"
                />
              </div>
              <div className="phone-box">
                <label>Phone :</label>
                <input
                  className="input-box"
                  type="number"
                  name="phone"
                  value={this.state.phone}
                  onChange={e => this.handleChange(e)}
                  placeholder="Enter Phone"
                />
              </div>
            </div>
            <div className="price-info">
              <div className="price-info-line">
                <span className="price-left">課程價格</span>
                <span className="price-right">
                  <span>$</span>
                  {this.state.subject_price}
                </span>
              </div>
              <div className="price-info-line">
                <span className="price-left">報名人數</span>
                <button className="minus" onClick={this.minus}>
                  -
                </button>
                <span className="price-right">{this.state.people}</span>
                <button className="plus" onClick={this.plus}>
                  +
                </button>
              </div>
              <div className="price-info-total">
                {/* 總價 */}
                <span>$</span>
                {this.state.subject_price * this.state.people}
              </div>
            </div>
            <div className="subject-btn">
              <button className="order-btn" onClick={this.postMeberInfo}>
                order
              </button>
            </div>
          </sidebar>
        </div>
      </>
    );
  }
}
export default OrderInfo;
