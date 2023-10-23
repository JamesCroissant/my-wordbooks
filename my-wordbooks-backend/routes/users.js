const router = require("express").Router();

const User = require("../models/User");

// CRUD
// UPDATE USER INFO
router.put("/:id", async (req, res) => {
  if (req.body._id === req.params.id || req.body.isAdmin) {   // params.id = loginしているuserのid
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,  // parameterを全て指定
      });
      res.status(200).json("You can update information");
    } catch (err) {
      return res.status(500).json(err);  // server error
    }
  } else {
    return res
      .status(403)
      .json("You can only update information when it is in your account");
  }
});


// DELETE USER INFO
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("You can delete information");
  } catch (err) {
    return res.status(500).json(err);
  }
});


// // DELETE USER INFO
// router.delete("/:id", async (req, res) => {
//   if (req.body._id === req.params.id || req.body.isAdmin) {
//     try {
//       const user = await User.findByIdAndDelete(req.params.id);
//       res.status(200).json("You can delete information");
//     } catch (err) {
//       return res.status(500).json(err);
//     }
//   } else {
//     return res
//       .status(403)
//       .json("You can only delete information when it is in your account");
//   }
// });





module.exports = router;