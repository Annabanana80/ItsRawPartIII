const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({ 
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  summary: {
    type: String,
    required: [true, "Summary can't be blank"]
  },
  ingredients: {
    type: String,
    required: [true, "Ingredients can't be blank"]
  },
  instructions: {
    type: String,
    required: [true, "Intructions can't be blank"]
  },
  photo: {
    type: String
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);