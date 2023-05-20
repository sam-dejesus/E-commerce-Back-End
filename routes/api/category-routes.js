const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {

try{
  const categories = await Category.findAll({include: [{ model: Product}]});
  res.status(200).json(categories);
} catch(err){
  res.status(500).json({message: 'server error data not found'})
}
});


router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product }] });
    if (!category) {
      res.status(404).json({ message: 'error product not found' });
      return;
    } else {
      res.status(200).json(category);
    }
  } catch (error) { // Add the error parameter here
    res.status(500).json({ message: 'server error data not found', error: error.message });
  }
});


router.post('/', async (req, res) => {
  // create a new category
  try{
    const newCategory = await Category.create(req.body)
    res.status(200).json(newCategory);
  }catch(err){
    res.status(400).json({message:'category creation has failed'})
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const updated = await Category.update(req.body, {where:{id: req.params.id}})
    if (!updated[0]) {
      res.status(404).json({ message: 'id not found' });
    } else {
      res.status(200).json(updated);
    }
  } catch (err) {
    res.status(500).json({ message: 'update has failed' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
const deleted = await Category.destroy({where: { id: req.params.id}})
if (!deleted) {
  res.status(404).json({ message: 'data not found' });
} else {
  res.status(200).json(deleted);
}
} catch (err) {
res.status(500).json({ message: 'delete has failed' });
}
});

module.exports = router;
