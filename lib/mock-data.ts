import { Hat, User } from '@/types';

export const mockHats: Hat[] = [
  {
    id: '1',
    name: 'Пэсы',
    description: 'Традиционная кабардинская папаха из каракуля. Символ мужества и достоинства. Изготовлена вручную мастерами по старинным технологиям. Каракуль высшего качества обеспечивает долговечность и элегантный внешний вид.',
    price: 15000,
    category: 'Мужские',
    material: 'Каракуль',
    image_url: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=800',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Къэлъкъей',
    description: 'Войлочная шапка для повседневной носки. Легкая и удобная, идеально подходит для прохладной погоды. Традиционный белый цвет символизирует чистоту и благородство.',
    price: 5000,
    category: 'Мужские',
    material: 'Войлок',
    image_url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Дыщэ пыIэ',
    description: 'Праздничный женский головной убор, украшенный золотым шитьём. Носится на свадьбах и торжественных мероприятиях. Ручная вышивка золотыми нитями делает каждое изделие уникальным.',
    price: 25000,
    category: 'Женские',
    material: 'Бархат, золотое шитьё',
    image_url: 'https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=800',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Фэндырэ пыIэ',
    description: 'Классическая мужская шапка из овчины. Тёплая и практичная для зимнего периода. Натуральный мех обеспечивает отличную теплоизоляцию.',
    price: 8000,
    category: 'Мужские',
    material: 'Овчина',
    image_url: 'https://images.unsplash.com/photo-1445109673451-c511bb51bd17?w=800',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'ПыIэ плъыжь',
    description: 'Красная праздничная шапка с традиционной вышивкой. Символизирует радость и торжество. Используется на национальных праздниках и семейных торжествах.',
    price: 12000,
    category: 'Унисекс',
    material: 'Сукно',
    image_url: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Тхьэгъэлэдж пыIэ',
    description: 'Свадебный головной убор невесты. Украшен серебряными подвесками и жемчугом. Передаётся из поколения в поколение как семейная реликвия.',
    price: 45000,
    category: 'Женские',
    material: 'Шёлк, серебро, жемчуг',
    image_url: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Мок-пользователи (пароль: change-this-password)
// Хеш сгенерирован bcryptjs для 'change-this-password'
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@kabardian-hats.com',
    password_hash: '$2a$10$L9HDv0p8kBAK0qokhvM0e.EGq0e.ooDiSfaS8KOAHkrfKpvEwjtTq',
    role: 'admin',
    created_at: new Date().toISOString(),
  },
];

// Хранилище для моковых данных (для CRUD операций)
let hatsStore = [...mockHats];

export const mockDb = {
  users: {
    getByEmail: (email: string) => mockUsers.find(u => u.email === email) || null,
  },
  hats: {
    getAll: () => [...hatsStore].sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ),
    getById: (id: string) => hatsStore.find(h => h.id === id) || null,
    create: (hat: Omit<Hat, 'id' | 'created_at' | 'updated_at'>) => {
      const newHat: Hat = {
        ...hat,
        id: String(Date.now()),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      hatsStore.push(newHat);
      return newHat;
    },
    update: (id: string, updates: Partial<Hat>) => {
      const index = hatsStore.findIndex(h => h.id === id);
      if (index === -1) return null;
      hatsStore[index] = {
        ...hatsStore[index],
        ...updates,
        updated_at: new Date().toISOString()
      };
      return hatsStore[index];
    },
    delete: (id: string) => {
      const index = hatsStore.findIndex(h => h.id === id);
      if (index === -1) return false;
      hatsStore.splice(index, 1);
      return true;
    },
  },
};
