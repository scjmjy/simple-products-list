var faker = require('faker');


var categories = ['IT书籍','视频教学' ,'技术文章','学习路径','技术栈','实践项目','产品级项目'];

var tags = ['前端','后端','JavaScript','NodeJS','Vue.js','React','Angular'];

var data = [];

faker.seed(100);

for (let i = 1; i <= 500; i++) {
  var category = faker.helpers.randomize(categories);
  var tagSet = new Set();
  tagSet.add(faker.helpers.randomize(tags)); // tag 1
  tagSet.add(faker.helpers.randomize(tags)); // tag 2
  tagSet.add(faker.helpers.randomize(tags)); // tag 3
  data.push({
  id: i,
  name: faker.commerce.productName(),
  category: category,
  tags: [...tagSet],
  description: `${category}: ${faker.lorem.sentence(3)}`,
  price: faker.commerce.price()
  })
}
 
module.exports = function () {
  return {
    products: data,
    categories: categories,
    tags: tags,
    orders: []
  }
}