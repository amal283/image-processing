import express from 'express';
import  imageProcessing  from '../../imageProcessing';

const images = express.Router();

images.get('/', async (req, res) => {
  imageProcessing.handleImageProcessing(req, res);
});

export default images;
