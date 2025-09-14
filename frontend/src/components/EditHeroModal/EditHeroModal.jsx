import { useState, useEffect } from 'react';
import { XMarkIcon, CheckIcon, XCircleIcon } from '@heroicons/react/24/solid';


export default function EditHeroModal({ hero, onClose, onSave }) {
  const [formData, setFormData] = useState({
    nickname: '',
    real_name: '',
    origin_description: '',
    catch_phrase: '',
    superpowers: '',
    newImageFiles: [],       
    imagesToDelete: [],      
  });

  useEffect(() => {
    if (hero) {
      setFormData({
        nickname: hero.nickname || '',
        real_name: hero.real_name || '',
        origin_description: hero.origin_description || '',
        catch_phrase: hero.catch_phrase || '',
        superpowers: Array.isArray(hero.superpowers)
          ? hero.superpowers.join(', ')
          : hero.superpowers || '',
        newImageFiles: [],
        imagesToDelete: [],
      });
    }
  }, [hero]);

    useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  if (!hero) return null;

  const handleDeleteImage = (public_id) => {
    setFormData((prev) => ({
      ...prev,
      imagesToDelete: [...prev.imagesToDelete, public_id],
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'newImageFiles') {
      setFormData((prev) => ({
        ...prev,
        newImageFiles: [...prev.newImageFiles, ...Array.from(files)],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedHeroData = {
      ...hero,
      ...formData,
      superpowers: formData.superpowers
        .split(',')
        .map((sp) => sp.trim())
        .filter(Boolean),
    };

    onSave(updatedHeroData);
  };


  const visibleImages = hero.images?.filter(
    (img) => !formData.imagesToDelete.includes(img.public_id)
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center px-4 backdrop-blur-sm bg-black/20">
    <div className="bg-white rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative transition-all">
    {/* Close Button */}
    <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-label="Close modal"
      >
        <XMarkIcon className="w-6 h-6" />
    </button>

    {/* Title */}
    <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Edit Superhero</h2>

    {/* Form */}
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    {/* Nickname */}
    <div className="flex flex-col gap-1">
        <label htmlFor="nickname" className="text-sm font-medium text-gray-700">
        Nickname
        </label>
        <input
        id="nickname"
        type="text"
        name="nickname"
        value={formData.nickname}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
        />
    </div>

  {/* Real Name */}
  <div className="flex flex-col gap-1">
    <label htmlFor="real_name" className="text-sm font-medium text-gray-700">
      Real Name
    </label>
    <input
      id="real_name"
      type="text"
      name="real_name"
      value={formData.real_name}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      required
    />
  </div>

  {/* Origin Description */}
  <div className="flex flex-col gap-1">
    <label htmlFor="origin_description" className="text-sm font-medium text-gray-700">
      Origin Description
    </label>
    <textarea
      id="origin_description"
      name="origin_description"
      value={formData.origin_description}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      rows={3}
      required
    />
  </div>

  {/* Catch Phrase */}
  <div className="flex flex-col gap-1">
    <label htmlFor="catch_phrase" className="text-sm font-medium text-gray-700">
      Catch Phrase
    </label>
    <input
      id="catch_phrase"
      type="text"
      name="catch_phrase"
      value={formData.catch_phrase}
      onChange={handleChange}
      className="inpw-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>

  {/* Superpowers */}
  <div className="flex flex-col gap-1">
    <label htmlFor="superpowers" className="text-sm font-medium text-gray-700">
      Superpowers
    </label>
    <input
      id="superpowers"
      type="text"
      name="superpowers"
      value={formData.superpowers}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>

  {/* Upload new images */}
  <div className="flex flex-col gap-1">
    <label htmlFor="newImageFiles" className="text-sm font-medium text-gray-700">
      Upload new images
    </label>
    <input
      id="newImageFiles"
      type="file"
      name="newImageFiles"
      accept="image/*"
      onChange={handleChange}
      className="block w-full text-sm text-gray-500
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-lg file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700
                 hover:file:bg-blue-100"
      multiple
    />
  </div>
  {/*Img gallery*/}
    {visibleImages?.length > 0 && (
      <div className="mt-2">
        <h3 className="text-md font-medium text-gray-700 mb-2">Current Images</h3>
        <div className="flex flex-wrap gap-3">
          {visibleImages.map((img, index) => (
            <div
              key={img.public_id || index}
              className="relative group w-24 h-24 rounded overflow-hidden shadow border"
            >
              <img
                src={img.url}
                alt={`hero-img-${index}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleDeleteImage(img.public_id)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-80 group-hover:opacity-100 hover:bg-red-800"
                aria-label="Delete image"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
      </div>
    )}
      {/* Buttons */}
    <div className="flex justify-end gap-4 mt-6">
    <button
        type="button"
        onClick={onClose}
        className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
    >
        Cancel
    </button>
    <button
        type="submit"
        className="px-5 py-2 rounded-md border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 transition-all duration-200"
    >
        Save
    </button>
    </div>
    </form>

  </div>
</div>

  );
}
