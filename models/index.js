// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongTo(Category,{
  foreignKey:'category_id'
});

Product.belongToMany(Tag,{
  through: ProductTag,
  foreignKey: 'product_id'
});

Tag.belongToMany(Product, {
  through: ProductTag,
  foreignKey:'tag_id'
});

Category.hasMany(Product,{
  foreignKey:'category_id'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
