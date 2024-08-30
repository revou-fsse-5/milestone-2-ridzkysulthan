import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';

const AuthPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        if (isRegistering) {
          await register(values.email, values.password);
        } else {
          await login(values.email, values.password);
        }
        navigate('/products');
      } catch (error: any) {
        console.error('Authentication failed', error);
        setFieldError('email', isRegistering ? 'Registration failed. Please try again.' : 'Login failed. Please check your credentials and try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto">
        <form onSubmit={formik.handleSubmit} className="p-6 border rounded shadow bg-white">
          <h2 className="text-2xl mb-6 text-center">{isRegistering ? 'Register' : 'Login'}</h2>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Email"
            required
            className="border p-2 mb-4 w-full"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 mb-2">{formik.errors.email}</p>
          ) : null}

          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Password"
            required
            className="border p-2 mb-4 w-full"
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500 mb-2">{formik.errors.password}</p>
          ) : null}

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full mb-4"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Submitting...' : isRegistering ? 'Register' : 'Login'}
          </button>
          {formik.errors.email && <p className="text-red-500 mb-4">{formik.errors.email}</p>}

          <div className="text-center">
            {!isRegistering ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegistering(true)}
                  className="text-blue-500 underline"
                >
                  Register here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="text-blue-500 underline"
                >
                  Login here
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;