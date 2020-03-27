import React, { Component } from "react";
import "./index.css";
class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // console.log(this.props.productInfo, "shsdh");
    const renderContact = () => {
      return this.props.productInfo.contact.map((item, index) => {
        return (
          <div className="contact-info" key={index}>
            {item}
          </div>
        );
      });
    };
    return (
      <div className="contact-container">
        <div className="contact-talk">联系我们</div>
        {renderContact()}
        <img
          src="/assets/contact-header.png"
          alt=""
          className="contact-header"
        />
        <img
          src="/assets/contact-footer.png"
          alt=""
          className="contact-footer"
        />
      </div>
    );
  }
}

export default Contact;
