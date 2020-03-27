"use strict";
const nodemailer = require("nodemailer");
const Email = require("../models/email");
// async..await is not allowed in global scope, must use a wrapper
class emailUtil {
  async sendMail(code, email, productName, levelName, price, orderId, date) {
    const emails = await Email.findOne();
    const { mailAddress, mailPassword, sendName } = emails[0];
    // console.log(mailAddress, mailPassword, sendName);
    let transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      service: "qq", // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
      port: 465, // SMTP 端口
      secureConnection: true, // 使用了 SSL
      auth: {
        user: mailAddress,
        // 这里密码不是qq密码，是你设置的smtp授权码
        pass: mailPassword
      }
    });

    let mailOptions = {
      from: `${sendName} <${mailAddress}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${productName}${levelName}`, // Subject line
      // 发送text或者html格式
      // text: 'Hello world?', // plain text body
      html: `<!DOCTYPE html><html><head><base target="_blank"/><style type="text/css">::-webkit-scrollbar{display:none}</style><style id="cloudAttachStyle"type="text/css">#divNeteaseBigAttach,#divNeteaseBigAttach_bak{display:none}</style></head><body tabindex="0"role="listitem"><div id="content"><style>a{text-decoration:none}a:hover{text-decoration:underline}.afooter{color:#0044cc!important}body{background:#fff;margin:0;padding:0;-ms-text-size-adjust:100%}.bodywrap{max-width:640px!important;margin:auto;overflow-x:hidden}table{max-width:640px}table td{border-collapse:collapse;margin:0;padding:0}img{border:none}p{margin-bottom:1em}_media only screen and(max-width:480px){.block{display:block;width:100%;padding:5px 0px 5px 0px;box-sizing:border-box}.mobileAdjust{font-size:24px!important;line-height:28px!important}.mobileBlock{display:block!important;width:100%!important;box-sizing:border-box}.mobileHidden{display:none!important}.autoSize{width:100%!important;height:auto!important}h1.h1Header{font-size:28px!important;line-height:28px!important}}</style><style type="text/css">div.preheader{display:none!important}</style><div class="preheader"style="font-size: 1px; display: none !important;">订单详情</div><table cellpadding="0"cellspacing="0"border="0"align="center"><tbody><tr><td align="center"valign="top"width="640"class="bodywrap"><table width="100%"cellpadding="0"cellspacing="0"border="0"align="center"><tbody><tr><td width="20"valign="middle"style="color:#000000; font-family:'Segoe UI',Arial,sans-serif; font-size:12px; font-weight:bold; padding:20px 0;">&nbsp;</td><td width="600"valign="middle"style="color:#000000; font-family:'Segoe UI',Arial,sans-serif; font-size:12px; font-weight:bold; padding:20px 0;"><h1 style="color:#000000; font-family:'Segoe UI Light','Segoe UI',Arial,sans-serif; font-size:38px; font-weight:100; line-height:38px; margin-bottom:12px; padding:0;"class="h1Header">订单详情</h1></td><td width="20"valign="middle"style="color:#000000; font-family:'Segoe UI',Arial,sans-serif; font-size:12px; font-weight:bold; padding:20px 0;">&nbsp;</td></tr></tbody></table><table width="100%"cellpadding="0"cellspacing="0"border="0"align="center"><tbody><tr><td width="20"valign="middle"style="color:#000000; font-family:'Segoe UI',Arial,sans-serif; font-size:12px; padding:0 0 30px;">&nbsp;</td><td width="600"align="left"valign="top"style="font-family:'Segoe UI',Arial,sans-serif; font-size:13px; line-height:16px; padding:0 0 30px;"><p><strong>邮箱：</strong>${email}</p><p><strong>订单号：</strong>${orderId}</p><p><strong>价格：</strong>${price}</p><p><strong>会员码：</strong>${code}</p><p></p><table cellpadding="0"cellspacing="0"border="0"style="font-family:SegoeUI, Tahoma, sans-serif; font-size:12px; margin:0px; color:#000;"><tbody><tr><td style="padding:0 10px 0 0">${productName}${levelName}</td></tr><tr><td style="padding:0 10px 0 0"></td><td style="padding:0 10px 0 0"></td></tr></tbody></table><p>我们非常重视你的使用体验，并期待能为你提供更好的服务。</p><p>你还可以通过以下链接，查询到此订单的更多信息</p><ul><li><a href="http://baidu.com"title="查询订单"style="color:#0044cc;">查询订单</a>。</li></ul><p>此致，<br/>${productName}团队</p></td><td width="20"valign="middle"style="color:#000000; font-family:'Segoe UI',Arial,sans-serif; font-size:12px; padding:0 0 30px;">&nbsp;</td></tr></tbody></table><table width="100%"cellpadding="0"cellspacing="0"border="0"align="center"><tbody><tr><td width="20"bgcolor="#e0e0e0"style="border-bottom:2px solid #e0e0e0;">&nbsp;</td><td width="600"align="left"bgcolor="#e0e0e0"style="font-family:'Segoe UI',Arial,sans-serif; font-size:17px; line-height:19px; padding:30px 0 20px;"class="mobileBlock"><h3 style="margin:0; padding:0;">帐户信息</h3></td></tr></tbody></table><table width="100%"cellpadding="0"cellspacing="0"border="0"align="center"><tbody><tr><td width="640"valign="middle"bgcolor="#f2f2f2"style="color:#000000; font-family:'Segoe UI',Arial,sans-serif; font-size:12px; padding:20px 0;"><table width="100%"cellpadding="0"cellspacing="0"border="0"align="center"><tbody><tr><td width="20"valign="middle"bgcolor="#f2f2f2"style="color:#000000; font-family:'Segoe UI',Arial,sans-serif; font-size:12px; padding:0;">&nbsp;</td><td width="460"colspan="2"align="left"valign="bottom"bgcolor="#f2f2f2"style="color:#000000; font-family:'Segoe UI',Arial,sans-serif; font-size:12px; line-height:16px; padding:0;"class="mobileBlock"><p>这是必需的服务通信。要为其他通信设置联系人首选项，请<a href="https://www.baidu.com"title="单击此处"style="color:#0072c6; text-decoration:underline;">单击此处</a>.</p><p>此邮件发自无人监控的电子邮件地址。请勿回复此邮件。<a href="https://www.baidu.com"title=""style="color:#0072c6; text-decoration:underline;"></a><br/><a href="https://www.baidu.com"title="隐私声明"style="color:#0072c6; text-decoration:underline;">隐私声明</a>|<a href="https://www.baidu.com"title="法律声明"style="color:#0072c6; text-decoration:underline;">法律声明</a></p></td><td width="40"valign="middle"bgcolor="#f2f2f2"style="color:#000000; font-family:'Segoe UI',Arial,sans-serif; font-size:12px; padding:0;"class="mobileHidden">&nbsp;</td><td width="100"align="left"valign="bottom"bgcolor="#f2f2f2"style="color:#000000; font-family:'Segoe UI',Arial,sans-serif; font-size:12px; line-height:16px; padding:0;"class="mobileBlock"></td><td width="20"valign="middle"bgcolor="#f2f2f2"style="color:#000000; font-family:'Segoe UI',Arial,sans-serif; font-size:12px; padding:0;">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><img src="https://click.email.microsoftonline.com/open.aspx?ffcb10-feba1c75766d0378-fdf1157476600c7e721c7172-fe96157074600c7e7d-ff6615707d-fdea1577776c0c7573137574-febe10767c630779&amp;d=40057"width="1"height="1"/></div><script>var _c=document.getElementById("content");_c.innerHTML=(_c.innerHTML||"").replace(/(href|formAction|onclick|javascript)/gi,"__$1").replace(/<\/?marquee>/gi,"");</script><style type="text/css">body{font-size:14px;font-family:arial,verdana,sans-serif;line-height:1.666;padding:0;margin:0;overflow:auto;white-space:normal;word-wrap:break-word;min-height:100px}td,input,button,select,body{font-family:Helvetica,"Microsoft Yahei",verdana}pre{white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;width:95%}th,td{font-family:arial,verdana,sans-serif;line-height:1.666}img{border:0}header,footer,section,aside,article,nav,hgroup,figure,figcaption{display:block}blockquote{margin-right:0px}</style><style id="ntes_link_color"type="text/css">a,td a{color:#064977}</style></body></html>` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
    });
  }
}
module.exports = new emailUtil();
