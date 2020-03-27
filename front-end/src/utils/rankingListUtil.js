import { monthAxis, dayAxis, weekAxis } from "./fetchChartData";
export function getRankingList(list, range) {
  let oldList = [];
  // console.log(list, "list");
  list.forEach(item => {
    oldList.push(item);
  });
  let arr = oldList.sort(function(a, b) {
    return b - a;
  });
  let indexArr = [];
  // console.log(arr, "arr");

  arr.forEach(item => {
    // console.log(item, list, list.indexOf(item));
    indexArr.push(list.indexOf(item));
  });
  // console.log(indexArr);

  let rankingList = [];
  indexArr.forEach(item => {
    rankingList.push({
      title:
        range === "year"
          ? monthAxis()[item]
          : range === "week"
          ? weekAxis()[item]
          : dayAxis()[item],
      total: list[item]
    });
  });
  // console.log(rankingList, "list");
  return rankingList.splice(0, 7);
}
