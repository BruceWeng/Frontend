# Frontend
## Part 1: BFE fundamental
| # | Category | # | Questions |
|:-:|:--------:|:-:|-----------|
| 1 | Utility  | 1 | 1. Implement curry() |
|   |          | 2 | 2. Implement curry() with placeholder support |
|   |          | 3 | 3. Implement Array.prototype.flat() |
|   |          | 4 | 4. Implement basic throttle() |
|   |          | 5 | 5. Implement throttle() with leading & trailing option |
|   |          | 6 | 6. Implement basic debounce() |
|   |          | 7 | 7. Implement debounce() with leading & trailing option |
|   |          | 8 | 11. Implement pipe() |
|   |          | 9 | 12. Implement Immutability helper |
|   |          | 10 | 14. Implement memo() |
|   |          | 11 | 15. Implement jQuery DOM wrapper |
|   |          | 12 | 16. Create an Event Emitter |
|   |          | 13 | 17. Create a simple store for DOM element |
|   |          | 14 | 20. Detect data type in JavaScript |
|   |          | 15 | 22. Implement JSON.parse() |
|   |          | 16 | 23. Create a sum() |
|   |          | 17 | 24. Create a Priority Queue in JavaScript |
|   |          | 18 | 26. Implement Object.assign() |
|   |          | 19 | 46. Implement _.once() |
|   |          | 20 | 54. Flatten Thunk |
|   |          | 21 | 63. Create _.cloneDeep() |
|   |          | 22 | 69. Implement deep equal _.isEqual() |
|   |          | 23 | 85. Implement _.get() |
|   |          | 24 | 122. Implement memoizeOne() |
|   |          | 25 | 125. Implement classNames() |
| 2 | DOM Maniputation | 1 | 19. Find corresponding node in two identical DOM tree |
|   |                  | 2 | 58. Get DOM tree height |
|   |                  | 3 | 68. Get DOM tags |
|   |                  | 4 | 89. Next Right Sibling |
|   |                  | 5 | 104. Traverse DOM level by level |
|   |                  | 6 | 113. Virtual DOM I |
|   |                  | 7 | 118. Birtual DOM II - createElement |
| 3 | Async Utility | 1 | 29. Implement sequence() |
|   |               | 2 | 30. Implement parallel() |
|   |               | 3 | 31. Implement race() |
|   |               | 4 | 56. Call APIs with pagination |
|   |               | 5 | 101. Merge identical API calls |
| 4 | Promise       | 1 | 32. Implement Promise.all() |
|   |               | 2 | 33. Implement Promise.allSettled() |
|   |               | 3 | 34. Implement Promise.any() |
|   |               | 4 | 35. Implement Promise.race() |
|   |               | 5 | 64. Auto-retry Promise on rejection |
|   |               | 6 | 67. Create your own Promise |
|   |               | 7 | 92. Throttle Promises |
|   |               | 8 | 123. Implement Promise.prototype.finally() |
| 5 | Timer         | 1 | 28. Implement clearAllTimeout() |
|   |               | 2 | 36. Create a fake timer (setTimeout) |
|   |               | 3 | 83. Create an interval |
|   |               | 4 | 84. Create a fake timer (setInterval) |
|   |               | 5 | 130. Create LazyMan() |
|   |               | 6 | Implement a stopwatch |
| 6 | Testing       | 1 | 38. Implement jest.spyOn() |
| 7 | Generator     | 1 | 39. Implement range() |
|   |               | 2 | 119. Create a tokenizer |
| 8 | Sorting       | 1 | 40. Bubble Sort |
|   |               | 2 | 41. Merge Sort |
|   |               | 3 | 42. Insertion Sort |
|   |               | 4 | 43. Quick Sort |
|   |               | 5 | 44. Selection Sort |
| 9 | Middleware    | 1 | 52. Create a middleware system |
| 10 | HTML manipulation | 1 | 55. Highlight keywords in HTML string |
|    |                   | 2 | 99. Extract all anchor element form HTML string |
| 11 | Observable   | 1 | 57. Create an Observable |
|    |              | 2 | 70. Implement Observable.from() |
|    |              | 3 | 71. Implement Observable Subject |
|    |              | 4 | 72. Implement Observable interval() |
|    |              | 5 | 73. Implement Observable fromEvent() |
|    |              | 6 | 74. Implement Observable Transformation Operators |
| 12 | Browser      | 1 | 59. Create a browser history |
|    |              | 2 | 80. Implement your own URLSearchParams |
|    |              | 3 | 117. Event Delegation |
|    |              | 4 | 134. Create your own Cookie |
|    |              | 5 | 135. localStorage with expriration |
| 13 | JS syntax    | 1 | 60. Create your own new operator |
|    |              | 2 | 61. Create your own Function.prototype.call |
|    |              | 3 | 88. Support negative Array index in JavaScript |
|    |              | 4 | 90. Write your own instanceof |
|    |              | 5 | 94. Implement your own Object.create() |
|    |              | 6 | 95. Implement String.prototype.trim() |
|    |              | 7 | 116. Implement Object.is() |
| 14 | Math         | 1 | 132. The angle between hour hand and minute hand of a clock |

## Part 2: Widget Design
| # | Question |
|:-:|----------|
| 1 | Carousel |
| 2 | Light out game |
| 3 | Excel table (calculated cell, sort, filter) |
| 4 | Todo app CRUD |
| 5 | Fuzzy search |
| 6 | Click outside to close drop down |
| 7 | Star rating |
| 8 | Accordion |
| 9 | File uploader |
| 10 | Progress bar |
| 11 | Autocompolete |
| 12 | Infinite scroller |
| 13 | Datepicker/timepicker |
| 14 | Poll |

## Part 3: Performance

## part 4: System Design
### 1. API
### 2. Async query function:
```js
const GetPostList = async () => {
  const {data} = await axios.get(url: 'http://hostname/api/posts/');
  return data;
}
```
### 3. Query wrapper: ```useQuery(queryKey[], queryFn)```
### 4. Component: 
```js
function({props}) { 
  let state = {};
  return virtualElement;
}
```
### 5. Virtual Element:
```js
{
  key: 'unique key',
  props: {
    children: [children node],
    eventListener: () => {}
  },
  ref: 'actual DOM',
  type: 'ComponentName'
}
```
### 6.1 Client-side State management
1. Pub/Sub lib
```ts
class PubSub {
  constructor() {
    this.events = {};
  }
  subscribe(event: String, callback: Function): Void
  publish(event: String, date: Object): Void
}
```
2. Store object
```ts
class Store {
  constructor(params) {
    this.actions = {};
    this.status = 'resting';
    this.events = new PubSub();
    if (params.hasOwnProperty('actions')) {
      this.actions = params.actions;
    }
    this.state = new Proxy((params.state || {}), {
      set: function (state, key, value) {
        state.key = value;
        this.events.publish('stateChange', this.state);
        this.status = 'resting';
        return true;
      }
    });
  }
  dispatch(actionKey: String, payload: Object): Boolean {
    if (typeof this.actions.actionKey !== 'function') {
      return false;
    }
    this.status = 'action';
    this.actions.actionKey(this, payload);
    return true;
  }
}
```
### 6.2 Reconciler and linked list:
1. ```createNodeFromTypeAndProps(virtualElement) => LinkedListNode```

2. ```updateHostComponent(current, workInProgress)```

3. Linked List Node:
```js
{
  stateNode: new ComponentName,
  type: 'ComponentName',
  alternate: 'WorkInProgress Node',
  key: 'unique key',
  updateQueue: [],
  memoizedState: {},
  pendingProps: {
    children: [children node],
    eventListener: () => {},
  },
  memoizedProps: {
    children: [children node],
    eventListener: () => {},
  },
  tag: Number,
  effectTag: Number,
  nextEffectTag: Number
}
```
4. Phases: 
    1. Render Phase:

        Run ```updateHostComponent(current, workInProgress)```

    2. Commit Phase:

        Traverse effect list to perform DOM mutation and async request. Start when 

        1. After component mounted
        2. After component updated
        3. Before component unmounted
