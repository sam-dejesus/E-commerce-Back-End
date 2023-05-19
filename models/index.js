// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category,{
  foreignKey:'category_id'
});

Product.belongsToMany(Tag,{
  through: ProductTag,
  foreignKey: 'product_id'
});

Tag.belongsToMany(Product, {
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
