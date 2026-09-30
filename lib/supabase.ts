import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { mockDb } from './mock-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Проверяем, настроен ли Supabase
export const isMockMode = !supabaseUrl ||
  supabaseUrl === 'https://your-project.supabase.co' ||
  supabaseUrl.includes('your-project');

// Создаём клиент только если есть реальные данные
export const supabase: SupabaseClient | null = isMockMode
  ? null
  : createClient(supabaseUrl, supabaseAnonKey);

// Мок-клиент с интерфейсом похожим на Supabase
export const mockSupabase = {
  from: (table: string) => ({
    select: (_columns?: string) => ({
      order: (_column: string, _options?: { ascending: boolean }) => {
        if (table === 'hats') {
          return Promise.resolve({ data: mockDb.hats.getAll(), error: null });
        }
        return Promise.resolve({ data: [], error: null });
      },
      eq: (column: string, value: string) => ({
        single: () => {
          if (table === 'hats' && column === 'id') {
            const hat = mockDb.hats.getById(value);
            return Promise.resolve({
              data: hat,
              error: hat ? null : { message: 'Not found' }
            });
          }
          if (table === 'users' && column === 'email') {
            const user = mockDb.users.getByEmail(value);
            return Promise.resolve({
              data: user,
              error: user ? null : { message: 'Not found' }
            });
          }
          return Promise.resolve({ data: null, error: { message: 'Not found' } });
        },
      }),
    }),
    insert: (data: unknown) => ({
      select: () => ({
        single: () => {
          if (table === 'hats') {
            const newHat = mockDb.hats.create(data as Parameters<typeof mockDb.hats.create>[0]);
            return Promise.resolve({ data: newHat, error: null });
          }
          return Promise.resolve({ data: null, error: { message: 'Table not found' } });
        },
      }),
    }),
    update: (data: unknown) => ({
      eq: (column: string, value: string) => ({
        select: () => ({
          single: () => {
            if (table === 'hats' && column === 'id') {
              const updated = mockDb.hats.update(value, data as Parameters<typeof mockDb.hats.update>[1]);
              return Promise.resolve({
                data: updated,
                error: updated ? null : { message: 'Not found' }
              });
            }
            return Promise.resolve({ data: null, error: { message: 'Not found' } });
          },
        }),
      }),
    }),
    delete: () => ({
      eq: (column: string, value: string) => {
        if (table === 'hats' && column === 'id') {
          const deleted = mockDb.hats.delete(value);
          return Promise.resolve({
            data: null,
            error: deleted ? null : { message: 'Not found' }
          });
        }
        return Promise.resolve({ data: null, error: { message: 'Not found' } });
      },
    }),
  }),
};

// Экспортируем универсальный клиент
export const db = isMockMode ? mockSupabase : supabase!;

// Функция для загрузки изображений
export async function uploadImage(file: File, bucket: string = 'hats-images') {
  if (isMockMode) {
    // В мок-режиме возвращаем URL-заглушку
    return URL.createObjectURL(file);
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

  const { error } = await supabase!.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw error;
  }

  const { data: urlData } = supabase!.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

// Функция для удаления изображений
export async function deleteImage(url: string, bucket: string = 'hats-images') {
  if (isMockMode) {
    return; // В мок-режиме ничего не делаем
  }

  const fileName = url.split('/').pop();
  if (!fileName) return;

  const { error } = await supabase!.storage
    .from(bucket)
    .remove([fileName]);

  if (error) {
    throw error;
  }
}
