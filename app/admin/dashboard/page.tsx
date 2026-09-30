'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { Hat } from '@/types';
import { supabase, uploadImage } from '@/lib/supabase';
import Image from 'next/image';

export default function AdminDashboard() {
  const router = useRouter();
  const [hats, setHats] = useState<Hat[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingHat, setEditingHat] = useState<Hat | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    material: '',
    image: null as File | null,
  });

  useEffect(() => {
    loadHats();
  }, []);

  const loadHats = async () => {
    try {
      if (!supabase) throw new Error('Supabase не настроен');
      const { data, error } = await supabase
        .from('hats')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHats(data || []);
    } catch (error) {
      console.error('Error loading hats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (!supabase) throw new Error('Supabase не настроен');
      let imageUrl = editingHat?.image_url || '';

      if (formData.image) {
        imageUrl = await uploadImage(formData.image);
      }

      const hatData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        material: formData.material,
        image_url: imageUrl,
        updated_at: new Date().toISOString(),
      };

      if (editingHat) {
        const { error } = await supabase
          .from('hats')
          .update(hatData)
          .eq('id', editingHat.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('hats')
          .insert([hatData]);

        if (error) throw error;
      }

      resetForm();
      loadHats();
    } catch (error) {
      console.error('Error saving hat:', error);
      alert('Ошибка при сохранении');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (hat: Hat) => {
    setEditingHat(hat);
    setFormData({
      name: hat.name,
      description: hat.description,
      price: hat.price.toString(),
      category: hat.category,
      material: hat.material,
      image: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить этот головной убор?')) return;

    try {
      if (!supabase) throw new Error('Supabase не настроен');
      const { error } = await supabase
        .from('hats')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadHats();
    } catch (error) {
      console.error('Error deleting hat:', error);
      alert('Ошибка при удалении');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      material: '',
      image: null,
    });
    setEditingHat(null);
    setShowForm(false);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-kabardian-cream flex items-center justify-center">
        <div className="text-xl text-kabardian-dark">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kabardian-cream">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-kabardian-dark">
            Панель управления
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-kabardian-gold text-white rounded-lg hover:bg-opacity-90 transition"
            >
              {showForm ? 'Отменить' : '+ Добавить головной убор'}
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Выйти
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-serif font-semibold text-kabardian-dark mb-6">
              {editingHat ? 'Редактировать' : 'Добавить новый головной убор'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kabardian-red focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена (₽) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kabardian-red focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категория *
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Например: Мужской, Женский"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kabardian-red focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Материал *
                  </label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="Например: Шерсть, Каракуль"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kabardian-red focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kabardian-red focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Фотография {!editingHat && '*'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kabardian-red focus:border-transparent outline-none"
                  required={!editingHat}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Рекомендуемый размер: 800x800px, формат: JPG, PNG, WebP
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-8 py-3 bg-kabardian-red text-white rounded-lg hover:bg-kabardian-accent transition disabled:opacity-50"
                >
                  {uploading ? 'Сохранение...' : editingHat ? 'Сохранить изменения' : 'Добавить'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Отменить
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-serif font-semibold text-kabardian-dark">
              Все головные уборы ({hats.length})
            </h2>
          </div>

          {hats.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              Пока нет добавленных головных уборов
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Фото
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Название
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Категория
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Цена
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {hats.map((hat) => (
                    <tr key={hat.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={hat.image_url}
                            alt={hat.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{hat.name}</div>
                        <div className="text-sm text-gray-500">{hat.material}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-kabardian-cream text-kabardian-dark">
                          {hat.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {hat.price.toLocaleString('ru-RU')} ₽
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(hat)}
                          className="text-kabardian-red hover:text-kabardian-accent mr-4"
                        >
                          Редактировать
                        </button>
                        <button
                          onClick={() => handleDelete(hat.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
