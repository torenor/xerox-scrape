async function load() {
    const allPromise = Promise.all([
      resolveTimeout(["potatoes", "tomatoes"], 1000),
      resolveTimeout(["oranges", "apples"], 1000)
    ]);
  
    // wait...
    const lists = await allPromise;
  
    // after 1 second
    console.log(lists);
    // [['potatoes', 'tomatoes'], ['oranges', 'apples']]
  }
  
  load();
  
  function resolveTimeout(value, delay) {
    return new Promise((resolve) => setTimeout(() => resolve(value), delay));
  }
  
  function rejectTimeout(reason, delay) {
    return new Promise((r, reject) => setTimeout(() => reject(reason), delay));
  }
  