import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

export default function HeroCreateForm( {onCreate} ) {
  const [images, setImages] = useState([]);

  const initialValues = {
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: '',
  };

  const validationSchema = Yup.object({
    nickname: Yup.string().required('Nickname is required'),
    real_name: Yup.string().required('Real name is required'),
    origin_description: Yup.string().max(1000),
    superpowers: Yup.string().max(1000),
    catch_phrase: Yup.string().max(300),
  });

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();

    for (const key in values) {
      formData.append(key, values[key]);
    }

    images.forEach((img) => {
      formData.append('images', img);
    });

    onCreate(formData);
    resetForm();
    setImages([]);
  };

  return (
    <div className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">Create Superhero</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-5">
          {/* Nickname */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nickname</label>
            <Field
              name="nickname"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage name="nickname" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Real Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Real Name</label>
            <Field
              name="real_name"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage name="real_name" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Origin Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Origin Description</label>
            <Field
              as="textarea"
              name="origin_description"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none"
            />
            <ErrorMessage name="origin_description" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Superpowers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Superpowers</label>
            <Field
              name="superpowers"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="flight, strength, x-ray vision"
            />
            <ErrorMessage name="superpowers" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Catch Phrase */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catch Phrase</label>
            <Field
              name="catch_phrase"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage name="catch_phrase" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Images Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700"
          >
            ➕ Add Superhero
          </button>
        </Form>
      </Formik>
    </div>
  );
}
