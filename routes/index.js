const express = require ('express'); 
const router = express.Router(); 
const multer = require('multer');
const Recipe = require('../models/recipe'); 


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './client/public/images/uploads');
  },
  filename: function(req, file, cb) {   
      cb(null, file.originalname);
  }
});

// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//   if(allowedFileTypes.includes(file.mimetype)) {
//       cb(null, true);
//   } else {
//       cb(null, false);
//   }
// }

let upload = multer({ storage: storage });

router.get('/recipes', function(req, res) { 
  Recipe.find(function(err, recipes) {
    res.json(recipes);
  });
});

router.get('/recipes/:id', function(req, res) {  
  Recipe.findById(req.params.id, function(err, recipe) {
    if (!recipe) {
      res.status(404).send('No result found');
    } else {
      res.json(recipe);
    }
  });
});

router.post('/recipes', upload.single('photo'), function(req, res) { 
    let recipe = new Recipe({
    title: req.body.title,
    summary: req.body.summary,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    photo: req.file.originalname
  });
  recipe.save()
    .then(recipe => {
      res.send(recipe);
    })
    .catch(function(err) {
      res.status(422).send('Recipe add failed');
    });
});

router.patch('/recipes/:id', upload.single('photo'), function(req, res){    
  Recipe.findByIdAndUpdate(req.params.id , {
    title: req.body.title,
    summary: req.body.summary,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    photo: req.file.originalname
    })
    .then(function(recipe) {
      res.json('Recipe updated');
    })
    .catch(function(err) {
      res.status(422).send("Recipe update failed.");
    });
});

router.delete('/recipes/:id', function(req, res) {  
  Recipe.findById(req.params.id, function(err, recipe) {
    if (!recipe) {
      res.status(404).send('Recipe not found');
    } else {
      Recipe.findByIdAndRemove(req.params.id)
        .then(function() { res.status(200).json("Recipe deleted") })
        .catch(function(err) {
          res.status(400).send("Recipe delete failed.");
        })
    }
  });
})

module.exports = router; 