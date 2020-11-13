import axios from 'axios';

export const DefaultBackground = '/images/background.jpg';

/**
 * Fetch a random image thanks to picsum.photos API
 * @returns {Promise<string>}
 */
export default async function fetchRandomImage()
{
    const fetchedImage = await axios.get('https://picsum.photos/600/300.jpg', {responseType: "arraybuffer"});
    if(!fetchedImage){ return DefaultBackground; }
    const buff = new Buffer(fetchedImage.data);
    return `data:image/jpeg;base64,${buff.toString('base64')}`;
}