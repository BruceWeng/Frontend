// Time Complexity O (html length * keys.length)
function highlightKeywords(html, keywords) {
  // sort keys by length to advance maximal steps and 
  // for case of keys = ["Front", "FrontEnd"]
  let sortedKeysByLength = keywords.sort((a,b) => b.length - a.length)
  let keys = new Set(sortedKeysByLength);
  let result = "";
  let i = 0;
  while (i < html.length) {
    let increment = 1;
    for (let k of keys) {
      let htmlPartition = html.slice(i, i+k.length);
      if (htmlPartition === k) {
        // found a match of html partition starting at index i
        result += '<em>' + htmlPartition + '</em>';
        increment = k.length;
        break;
      }
    }
    result += increment === 1 ? html[i] : "";
    i += increment;
  }
  // post processing for keys =["Front", "End"]
  return result.replace("</em><em>", "");
};