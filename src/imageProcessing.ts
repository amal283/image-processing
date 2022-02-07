import { Request, Response } from 'express-serve-static-core';
import { promises as fs } from 'fs';
import sharp from 'sharp';
import { existsSync } from 'fs';

const imageExtension = '.jpg';

async function handleImageProcessing(req: Request, res: Response) {
    //1. Validate input
  if(!validateInputParameters(req)) {
    res.send('Invalid input parameters!');
    return;
  } 

  //2. Validate image existence
  const fileName = req.query.fileName as string;
  const width = +(req.query.width as string);
  const height = +(req.query.height as string);
  if(!validateImageExistence(fileName + imageExtension)) {
    res.send('Image doesn\'t exist');
    return;
  }

  //3. Validate resized image existence
  const resizedImagePath = './thumbnails/' + fileName + '-' + width + '-' + height + imageExtension;
  if(validateImageExistence(resizedImagePath)) {
    const cachedImage = await readImage(resizedImagePath)
    res.end(cachedImage);
    return;
  }

  const resizedImage = await resizeImage(fileName + imageExtension, width, height, resizedImagePath);
  res.end(resizedImage);
}

//Validate query parameters of the request
function validateInputParameters (req: Request): boolean {
    if(req == null || req == undefined) {
        return false;
    }
    if(req.query.fileName == undefined || req.query.fileName == null) {
      return false;
    } else if(req.query.width == undefined || req.query.width == null) {
      return false;
    } else if(req.query.height == undefined || req.query.height == null) {
      return false;
    } if(isNaN(+(req.query.width as string)) || isNaN(+(req.query.height as string))) {
      return false;
    }
    return true;
  }
  
  function validateImageExistence(imagePath: string): boolean {
    if(existsSync(imagePath)) {
      return true;
    } else {
      return false;
    }
  }
  
  async function readImage(imagePath: string) {
    return await fs.readFile(imagePath);
  }
  
  async function resizeImage(imagePath: string, width: number, height: number, resizedImagePath: string) {
    try {
      //1. Read image
      const image = await fs.readFile(imagePath);
  
      //2. Resize image
      await sharp(image)
      .resize(width, height)
      .toFile(resizedImagePath);
  
      return await fs.readFile(resizedImagePath);
    } catch (error) {
      console.error(`Got an error trying to read the file: ${error}`);
    }
  }

  export default {
    handleImageProcessing,
    validateImageExistence,
    resizeImage,
    validateInputParameters
  }