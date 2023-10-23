const router = require("express").Router();
const Word = require("../models/Word");



// CREATE WORD
router.post("/", async (req, res) => {
  try {
    const newWord = new Word(req.body);
    const savedWord = await newWord.save();
    return res.status(200).json(savedWord);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(404).json({ error : err.message });
    } else {
      return res.status(500).json({ error : err.message });
    }
  }
});


// PUT WORD
router.put("/:id", async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if(word.userId === req.body.userId) {
      await word.updateOne({
        $set: req.body,
      });
      return res.status(200).json("You can succeed in editing word")
    } else {
      return res
        .status(403).json("You can't edit other's word")
    }

  } catch (err) {
    return res.status(403).json(err);
  }
});


// DELETE WORD
router.delete("/:id", async (req, res) => {
  const word = await Word.findById(req.params.id);
  try {
    const word = await Word.findById(req.params.id);  /// ユーザーじゃないとword消せないのは削除
    await word.deleteOne();
    res.status(200).json("You can succeed in deleting word");
  } catch (err) {
    return res.status(403).json(err);
  }
});


// GET WORD
router.get("/:userId", async (req, res) => {
  try {
    const userWords = await Word.find({ userId: req.params.userId });
    return res.status(200).json(userWords);
  } catch (err) {
    return res.status(500).json(err);
  }
});


module.exports = router;