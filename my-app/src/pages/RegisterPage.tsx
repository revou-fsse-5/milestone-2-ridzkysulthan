import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  username: Yup.string().required('Username is required'),
});

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = async (values: { email: string; password: string; username: string }) => {
    try {
      await register(values.email, values.password, values.username);
      setNotification('Registration successful!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error('Registration failed', error);
      setNotification('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto">
        <Formik
          initialValues={{ email: '', password: '', username: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="flex flex-col items-center p-6 border rounded shadow bg-white">
              <h1 className="text-2xl mb-6">Register</h1>
              {notification && <p className="text-green-500 mb-4">{notification}</p>}
              <div className="w-full mb-4">
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="border p-2 w-full"
                />
                <ErrorMessage name="username" component="p" className="text-red-500 mt-1" />
              </div>
              <div className="w-full mb-4">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="border p-2 w-full"
                />
                <ErrorMessage name="email" component="p" className="text-red-500 mt-1" />
              </div>
              <div className="w-full mb-4">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="border p-2 w-full"
                />
                <ErrorMessage name="password" component="p" className="text-red-500 mt-1" />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded w-full mb-4"
              >
                Register
              </button>
              <p className="text-center">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-blue-500 underline"
                >
                  Login here
                </button>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
