export function restoreFormData(productInfo) {
  // console.log(productInfo, "productInfo");
  return Object.assign(productInfo, {
    contact:
      typeof productInfo.contact === "string"
        ? productInfo.contact
        : productInfo.contact.join("\n"),
    levelName1: productInfo.levelName[0],
    levelName2: productInfo.levelName[1],
    levelName3: productInfo.levelName[2],
    levelName4: productInfo.levelName[3],
    levelDesc1: productInfo.levelDesc[0]
      ? productInfo.levelDesc[0].join("\n")
      : null,
    levelDesc2: productInfo.levelDesc[1]
      ? productInfo.levelDesc[1].join("\n")
      : null,
    levelDesc3: productInfo.levelDesc[2]
      ? productInfo.levelDesc[2].join("\n")
      : null,
    levelDesc4: productInfo.levelDesc[3]
      ? productInfo.levelDesc[3].join("\n")
      : null,
    levelPrice1: {
      price1: productInfo.levelPrice[0].price,
      unit1: productInfo.levelPrice[0].unit
    },
    levelPrice2: productInfo.levelPrice[1]
      ? {
          price2: productInfo.levelPrice[1].price,
          unit2: productInfo.levelPrice[1].unit
        }
      : null,
    levelPrice3: productInfo.levelPrice[2]
      ? {
          price3: productInfo.levelPrice[2].price,
          unit3: productInfo.levelPrice[2].unit
        }
      : null,
    levelPrice4: productInfo.levelPrice[3]
      ? {
          price4: productInfo.levelPrice[3].price,
          unit4: productInfo.levelPrice[3].unit
        }
      : null,
    levelLimit1: productInfo.levelLimit[0],
    levelLimit2: productInfo.levelLimit[1],
    levelLimit3: productInfo.levelLimit[2],
    levelLimit4: productInfo.levelLimit[3],
    levelNote1: productInfo.levelNote[0],
    levelNote2: productInfo.levelNote[1],
    levelNote3: productInfo.levelNote[2],
    levelNote4: productInfo.levelNote[3]
  });
}
export function parseFormData(data, productId) {
  // console.log(productId, "parse");
  return Object.assign(
    {
      productName: data.productName,
      productInfo: data.productInfo,
      memberLevel: parseInt(data.memberLevel),
      sendMail: data.sendMail,
      shippingMethod: data.shippingMethod,
      onSale: data.onSale,
      theme: data.theme || "default",
      productId: parseInt(productId) || 1,
      contact: data.contact.split("\n")
    },
    {
      levelName: [
        data.levelName1,
        data.levelName2 !== undefined ? data.levelName2 : null,
        data.levelName3 !== undefined ? data.levelName3 : null,
        data.levelName4 !== undefined ? data.levelName4 : null
      ],
      // console.log(levelName, "levelName");
      levelPrice: [
        { price: data.levelPrice1.price1, unit: data.levelPrice1.unit1 },
        data.levelPrice2 !== undefined
          ? { price: data.levelPrice2.price2, unit: data.levelPrice2.unit2 }
          : null,
        data.levelPrice3 !== undefined
          ? { price: data.levelPrice3.price3, unit: data.levelPrice3.unit3 }
          : null,
        data.levelPrice4 !== undefined
          ? { price: data.levelPrice4.price4, unit: data.levelPrice4.unit4 }
          : null
      ],
      // console.log(levelPrice, "levelPrice");
      levelDesc: [
        data.levelDesc1.split("\n"),
        data.levelDesc2 !== undefined ? data.levelDesc2.split("\n") : null,
        data.levelDesc3 !== undefined ? data.levelDesc3.split("\n") : null,
        data.levelDesc4 !== undefined ? data.levelDesc4.split("\n") : null
      ],
      // console.log(levelDesc, "levelDesc");
      levelLimit: [
        data.levelLimit1,
        data.levelLimit2 !== undefined ? data.levelLimit2 : null,
        data.levelLimit3 !== undefined ? data.levelLimit3 : null,
        data.levelLimit4 !== undefined ? data.levelLimit4 : null
      ],
      // console.log(levelLimit, "levelLimit");
      levelNote: [
        data.levelNote1,
        data.levelNote2 !== undefined ? data.levelNote2 : null,
        data.levelNote3 !== undefined ? data.levelNote3 : null,
        data.levelNote4 !== undefined ? data.levelNote4 : null
      ]
    }
  );
}
