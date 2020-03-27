const titles = [
  "Alipay",
  "Angular",
  "Ant Design",
  "Ant Design Pro",
  "Bootstrap",
  "React",
  "Vue",
  "Webpack"
];
const avatars = [
  "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png", // Alipay
  "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png", // Angular
  "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png", // Ant Design
  "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png", // Ant Design Pro
  "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png", // Bootstrap
  "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png", // React
  "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png", // Vue
  "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" // Webpack
];
const covers = [
  "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
  "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",
  "https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png",
  "https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png"
];
const desc = [
  "那是一种内在的东西， 他们到达不了，也无法触及的",
  "希望是一个好东西，也许是最好的，好东西是不会消亡的",
  "生命就像一盒巧克力，结果往往出人意料",
  "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
  "那时候我只会想自己想要什么，从不想自己拥有什么"
];
const user = [
  "付小小",
  "曲丽丽",
  "林东东",
  "周星星",
  "吴加好",
  "朱偏右",
  "鱼酱",
  "乐哥",
  "谭小仪",
  "仲尼"
];

export function fakeList(count) {
  const list = [];

  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover:
        parseInt(`${i / 4}`, 10) % 2 === 0
          ? covers[i % 4]
          : covers[3 - (i % 4)],
      status: ["active", "exception", "normal"][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: "https://ant.design",
      updatedAt: new Date(
        new Date().getTime() - 1000 * 60 * 60 * 2 * i
      ).getTime(),
      createdAt: new Date(
        new Date().getTime() - 1000 * 60 * 60 * 2 * i
      ).getTime(),
      subDescription: desc[i % 5]
    });
  }

  return list;
}

// function getFakeList(req, res) {
//   const params = req.query;
//   const count = params.count * 1 || 20;
//   const result = fakeList(count);
//   return res.json(result);
// }
