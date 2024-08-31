import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      setNotification('Login successful!');
      setTimeout(() => {
        navigate('/products');
      }, 1500);
    } catch (error) {
      console.error('Login failed', error);
      setNotification('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="flex flex-col items-center p-6 border rounded shadow bg-white">
              <h1 className="text-2xl mb-6">Login</h1>
              {notification && <p className="text-green-500 mb-4">{notification}</p>}
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
                Login
              </button>
              <p className="text-center">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="text-blue-500 underline"
                >
                  Register here
                </button>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
