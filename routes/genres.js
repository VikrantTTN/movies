const {Genre, validate} = require('../models/genre');
const auth=require('../middleware/auth')
const mongoose = require('mongoose');
const express = require('express');
const checkAdmin = require('../middleware/checkAdmin');
const exceptionHandling = require('../middleware/exceptionHandling');
const router = express.Router();

router.get('/', exceptionHandling(
  async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
  }
));

router.post('/',auth, exceptionHandling(
  async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    
    res.send(genre);
  }
) );

router.put('/:id', exceptionHandling(
  async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
      new: true
    });
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    
    res.send(genre);
  }
));

router.delete('/:id',[auth,checkAdmin], exceptionHandling(
  async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(genre);
  }
));

router.get('/:id', exceptionHandling(
  async (req, res) => {
    const genre = await Genre.findById(req.params.id);
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(genre);
  }
));

module.exports = router;