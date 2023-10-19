import * as mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/mongo-relation')

const Category = mongoose.model('Category',new mongoose.Schema({
    name:{type:String}
}))

const Post = mongoose.model('Post',new mongoose.Schema({
    title:{type:String},
    body:{type:String},
    category:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}]
}))

async function init(){
    // await Category.insertMany([
    //     {name:'node.js'},
    //     {name:'vue.js'}
    // ])
    // await insert()
    const cat1 = await Category.findOne({name:'node.js'})
    const cat2 = await Category.findOne({name:'vue.js'})
    const post1 = await Post.findOne({body:'内容1'})
    const post2 = await Post.findOne({body:'内容2'})
    post1.category = cat1
    post2.category = cat1
    post1.categories = [cat1,cat2]
    post2.categories = cat2
    await post1.save()
    await post2.save()


    const category = await Category.find()
    const posts = await Post.find().populate('categories')
    console.log(posts[0],posts[1])
}

async function insert(){
    await Post.insertMany([
        {title:'我的第1篇帖子',body:'内容1'},
        {title:'我的第2篇帖子',body:'内容2'},
    ])
}

init()