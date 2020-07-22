
import Product from '../model/products';

//CREATING AN ARRAY OF PRODUCTS THAT IS USED TO DISPLAY ALL AVAILABLE PRODUCTS IN THE STORE

const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'Milk',
    'https://s.hdnux.com/photos/07/20/46/1902979/10/rawImage.jpg',
    'A red t-shirt, perfect for days with non-red weather.',
    0.99
  ),
  new Product(
    'p2',
    'u1',
    'Eggs',
    'https://media.treehugger.com/assets/images/2018/04/white_eggs_in_carton.jpg.860x0_q70_crop-scale.jpg',
    'Fits your red shirt perfectly. To stand on. Not to wear it.',
    2.99
  ),
  new Product(
    'p3',
    'u2',
    'Coffee',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400/14032f31421011.5949505c9b06a.jpg',
    'Can also be used for tea!',
    8.99
  ),
  new Product(
    'p4',
    'u3',
    'Salad ',
    'https://cdn.andnowuknow.com/thumbnails/chefsalads_story_061316.jpg',
    "What the content is? Why would that matter? It's a limited edition!",
    1.49
  ),
  new Product(
    'p5',
    'u3',
    'Soda',
    'https://static.planetminecraft.com/files/resource_media/screenshot/1320/sodas1_5502528_lrg.jpg',
    'Awesome hardware, crappy keyboard and a hefty price. Buy now before a new one is released!',
    0.89
  ),
  new Product(
    'p6',
    'u1',
    'W. Melon',
    'https://3.bp.blogspot.com/-cnPPRsbumPs/TgFDtj_x-jI/AAAAAAAAIdg/CFJxQ8EtSLI/s1600/watermelon-853.jpg',
    "Can be used for role-playing (not the kind of role-playing you're thinking about...).",
    3.39
  )
];

//EXPORTING THE PRODUUCTS ARRAY
export default PRODUCTS;