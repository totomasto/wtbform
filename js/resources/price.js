// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')
 
// const adapter = new FileSync('db.json')
// const db = low(adapter)
 
// // Set some defaults
// db.defaults({ posts: [], user: {} })
//   .write()
 
// // Add a post
// db.get('posts')
//   .push({ id: 2, title: 'lowdb is awesomfffe', price : 5.23})
//   .write()
 
// // Set a user using Lodash shorthand syntax
// db.set('user.name', 'typicode')
//   .write()



//   // Use .value() instead of .write() if you're only reading from db
//  let post = db.get('posts')
// .find({ id: 2 })
// .value();

// console.log(post);