export const collectionImage = '/img/WhatsApp Image 2026-04-01 at 14.18.36.jpeg';
export const products = [
  { id: '1', name: 'Серебристая', tone: 'Светло-серый оттенок', file: 'WhatsApp Image at 14.18.37.jpeg' },
  { id: '2', name: 'Графитовая', tone: 'Глубокий серый оттенок', file: 'WhatsApp Image 24324026-04-01 at 14.18.38.jpeg' },
  { id: '3', name: 'Белая', tone: 'Молочно-белый оттенок', file: 'WhatsApp Imag213213e 2026-04-01 at 14.18.37.jpeg' },
  { id: '4', name: 'Дымчатая', tone: 'Мягкий серый оттенок', file: 'WhatsApp Image 2026-04-01 at 14.18.37 — копия.jpeg' },
  { id: '5', name: 'Тёмная', tone: 'Тёмный тёплый оттенок', file: 'WhatsApp Ima3323ge 2026-04-01 at 14.18.38.jpeg' },
  { id: '6', name: 'Серебро и графит', tone: 'Контрастный серый оттенок', file: 'WhatsApp Imag12312321e 2026-04-01 at 14.18.38.jpeg' },
].map(product => ({ ...product, image: `/img/${product.file}` }));
