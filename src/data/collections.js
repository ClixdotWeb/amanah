/**
 * Proposed navigation groupings, not a confirmed catalogue structure.
 * Edit, rename or remove freely. `id` must match `category` in products.js.
 */
export const collections = [
  {
    id: 'necklaces',
    name: 'Necklaces',
    tagline: 'Drawn close to the heart',
    description: 'Pendants and fine chains designed to be layered, gifted and kept.',
    media: { src: '/images/hero-necklace-bust.jpg', alt: 'Gold bar pendant necklace on a burgundy velvet bust', label: 'Collection: necklaces', tone: 'deep', motif: 'necklace' },
  },
  {
    id: 'earrings',
    name: 'Earrings',
    tagline: 'Light that frames the face',
    description: 'Studs, drops and hoops for quiet everyday moments and grand occasions.',
    media: { src: '/images/earrings-drop-velvet.jpg', alt: 'Sculpted gold drop earrings on burgundy velvet', label: 'Collection: earrings', tone: 'champagne', motif: 'earrings' },
  },
  {
    id: 'rings',
    name: 'Rings',
    tagline: 'Promises worn every day',
    description: 'Sculpted bands and statement rings made to carry meaning.',
    media: { src: '/images/collection-rings.jpg', alt: 'Gold ring with two marquise stones on a marble block', label: 'Collection: rings', tone: 'deep', motif: 'ring' },
  },
  {
    id: 'bracelets',
    name: 'Bracelets',
    tagline: 'Elegance at the wrist',
    description: 'Cuffs and delicate bracelets that move with you.',
    media: { src: '/images/hero-card-bracelet.jpg', alt: 'Gold bangle with a star centrepiece on burgundy satin', label: 'Collection: bracelets', tone: 'ivory', motif: 'bracelet' },
  },
  {
    id: 'designer',
    name: 'Designer Jewellery',
    tagline: 'Signature statement pieces',
    description: 'Distinctive designs where craftsmanship takes centre stage.',
    media: { src: '/images/collection-designer.jpg', alt: 'A-shaped gold statement earrings on a marble block', label: 'Collection: designer', tone: 'deep', motif: 'designer' },
  },
];

export const getCollection = (id) => collections.find((c) => c.id === id);
