const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
router.get('/', async (req, res) => {
try{
  const tagData = await Tag.findAll({include: [{ model: Product }]})
  res.status(200).json(tagData)
} catch(err){
  res.status(500).json({ message: "Tags not found!" })
}
});

 // find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {include: [{ model: Product }]});
    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json({ message: "Tag not found!" })
  }

});

 // create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json({ message: "Tag creation failed" });
  }
});


  // update a tag's name by its `id` value
router.put('/:id',  async (req, res) => {
  try {
    const updated = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
  
    if (!updated[0]) {
      res.status(404).json({ message: "No tag found with this id!" });
    } else {
      res.status(200).json(updated);
    }
  } catch (err) {
    res.status(500).json({ message: "Tag update failed" });
  }
  
});

 // delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Tag.destroy({ where: { id: req.params.id } });
  
    if (!deleted) {
      res.status(404).json({ message: "No tag found with this id!" });
    } else {
      res.status(200).json(deleted);
    }
  } catch (err) {
    res.status(500).json({ message: "Tag deletion failed" });
  }
  
});

module.exports = router;
