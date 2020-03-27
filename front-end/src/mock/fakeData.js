var faker = require("faker");
faker.locale = "zh_CN";
const formatGMT = (date, long) => {
  let m = date.getMonth() + 1,
    mm = "-" + (m < 10 ? "0" + m : m);
  let d = date.getDate(),
    dd = "-" + (d < 10 ? "0" + d : d);
  let h = date.getHours(),
    hh = " " + (h < 10 ? "0" + h : h);
  let i = date.getMinutes(),
    ii = ":" + (i < 10 ? "0" + i : i);
  let s = date.getSeconds(),
    ss = ":" + (s < 10 ? "0" + s : s);

  return date.getFullYear() + mm + dd + (long ? hh + ii + ss : "");
};
function generateData() {
  var salesData = [];
  var order = [];
  var stats = [];
  for (var i = 0; i < 365; i++) {
    var date = faker.date.past();

    salesData.push({
      number: i,
      date: date.toLocaleDateString(),
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      week: date.getDay(),
      sales: parseFloat(faker.finance.amount()),
      visits: parseFloat(faker.finance.amount()),
      orders: parseFloat(faker.finance.amount())
    });
  }
  for (var i = 0; i < 365; i++) {
    var date = faker.date.past();

    stats.push({
      number: i,
      date: date.toLocaleDateString(),
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      week: date.getDay(),
      totalSales: parseFloat(faker.finance.amount()),
      totalVisits: parseFloat(faker.finance.amount()),
      totalOrders: parseFloat(faker.finance.amount()),
      todayVisits: parseFloat(faker.random.number())
    });
  }
  for (var i = 0; i < 365; i++) {
    var activation = i % 2 === 0 ? "已激活" : "未激活";
    var date = faker.date.past();
    var code = faker.random.uuid();
    order.push({
      code: code,
      activation: code + "  " + activation,
      number: i,
      date: date.toLocaleDateString(),
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      week: date.getDay(),
      time: date.toLocaleTimeString(),
      price: faker.random.number(),
      email: faker.internet.email(),
      ip: faker.internet.ip()
    });
  }
  var productInfo = [
    {
      productName: "Soundify",
      productInfo: "一个支持多端同步的本地音乐播放器",
      memberLevel: 4,
      sendMail: "yes",
      shippingMethod: "auto",
      onSale: "yes",
      levelName: ["免费版", "入门版", "高级版", "终身版"],
      levelPrice: [
        { price: 0, unit: "每年" },
        { price: 9, unit: "每年" },
        { price: 15, unit: "每年" },
        { price: 29, unit: "终身" }
      ],
      levelDesc: [
        ["支持 MP3 格式", "支持 WAV 格式", "支持 WAV 格式"],
        [
          "支持 MP3 格式",
          "支持 WAV 格式",
          "支持 WAV 格式",
          "支持 APE 格式",
          "支持 FLAC 格式 "
        ],
        [
          "支持 MP3 格式",
          "支持 WAV 格式",
          "支持 WAV 格式",
          "支持 APE 格式",
          "支持 FLAC 格式",
          "多网盘同步",
          "WebDAV 同步",
          "获取歌词和封面"
        ],
        [
          "支持 MP3 格式",
          "支持 WAV 格式",
          "支持 WAV 格式",
          "支持 APE 格式",
          "支持 FLAC 格式",
          "多网盘同步",
          "WebDAV 同步",
          "获取歌词和封面"
        ]
      ],
      levelLimit: [null, null, null, 600],
      levelNote: [null, null, null, "限时赠送 500G 无损古典乐合集"],
      theme: "default",
      id: "1"
    }
  ];
  console.log(JSON.stringify(salesData));
  console.log(JSON.stringify(stats));

  return {
    salesData: salesData,
    order: order,
    stats: stats,
    product: productInfo
  };
}
module.exports = generateData;
