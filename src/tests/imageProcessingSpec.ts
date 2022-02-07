import imageProcessing from '../imageProcessing';

it ('checks image existenace in a certain path', () => {
    expect(imageProcessing.validateImageExistence('coffee.jpg')).toBeTrue;
});

it ('checks image existenace in a certain path', () => {
    expect(imageProcessing.validateImageExistence('x.jpg')).toBeFalse;
});

it ('handle image processing', async () => {
    expect(imageProcessing.handleImageProcessing).toBeDefined;
});

it ('validate input paraneters', () => {
    expect(imageProcessing.validateInputParameters).toBeDefined;
});

it ('resize image', async() => {
    const resizedImage = await imageProcessing.resizeImage('coffee.jpg', 200, 400, './thumbnails/coffee.jpg-200-400.jpg');
    expect(resizedImage).toBeInstanceOf(Buffer);
});
