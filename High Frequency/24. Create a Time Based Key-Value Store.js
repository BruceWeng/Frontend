/**
 * Create a timebased key-value store class TimeMap, that supports two operations.
 * 
 * 1. set(string key, string value, int timestamp)
 * Stores the key and value, along with the given timestamp.
 * 
 * 2. get(string key, int timestamp)
 * Returns a value such that set(key, value, timestamp_prev) was called previously, with timestamp_prev <= timestamp.
 * If there are multiple such values, it returns the one with the largest timestamp_prev.
 * If there are no values, it returns the empty string ("").
 */
class TimeMap {
  constructor() {
    this.store = {}; // <key, [{ timestamp, value }...]>
  }

  set(key, value, timestamp) {
    if(this.store[key]===undefined) this.store[key] = [];
    this.store[key].push({ timestamp, value });
  }

  get(key, timestamp) {
    const list = this.store[key];
    let left = 0, right = list.length; // [left, right)
    while(left<right) {
      const mid = left+((right-left)>>1); // remember ()
      if(list[mid].timestamp>timestamp) right = mid; 
      if(list[mid].timestamp<=timestamp) left = mid+1;
    }
    // after exiting the while loop, left is the minimal k​ satisfying the condition function
    if(left===0) return "";
    else return list[left-1].value;
  }
}

const tm = new TimeMap();
tm.set("rtxoj", "kuexwze", 1);
tm.set("xcywxndnz","herqmazp",2);
tm.get("xcywxndnz",3); // herqmazp
tm.set("rtzoj","dgpguflin",4); 
tm.get("xcywxndnz",5); // herqmazp
tm.set("dgpguflin","lvrexco",6);
tm.set("xcywxndnz","dgpguflin",7);
tm.get("xcywxndnz",8); // dgpguflin
tm.set("rtzoj","wxqixmxs",9);
tm.get("xcywxndnz",10); // dgpguflin
tm.set("kuexwze","lvrexco",11);
tm.get("dgpguflin",12); // lvrexco
tm.set("lvrexco","wxqixmxs",13);
tm.get("xcywxndnz",14); // dgpguflin
tm.set("herqmazp","vjfhio",15);
tm.get("dgpguflin",16); // lvrexco
tm.get("herqmazp",17); // vjfhio
tm.get("herqmazp",18); // vjfhio
tm.get("rtzoj",19); // wxqixmxs
tm.get("herqmazp",20); // vjfhio
tm.get("herqmazp",21); // vjfhio
tm.set("kuexwze","vjfhio",22);
tm.set("dgpguflin","qrkihrb",23);
tm.set("kuexwze","dgpguflin",24);
tm.get("rtzoj",25); // wxqixmxs
tm.get("dgpguflin",26); // qrkihrb
tm.set("herqmazp","rtzoj",27);
tm.set("lvrexco","iztpo",28);
tm.get("lvrexco",29); // iztpo
tm.set("kuexwze","lvrexco",30);