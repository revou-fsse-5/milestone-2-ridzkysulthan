import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Login failed');
        }

        const result = await response.json();
        console.log('Login successful', result);


        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('refresh_token', result.refresh_token);


        navigate('/products');  
      } catch (error: any) {
        console.error('Error:', error);
        setFieldError('email', 'Login failed. Please check your credentials.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
          className="border p-2 mb-4 w-full"
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-500 mt-2">{formik.errors.email}</p>
        ) : null}

        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Password"
          className="border p-2 mb-4 w-full"
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="text-red-500 mt-2">{formik.errors.password}</p>
        ) : null}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        {formik.errors.email && (
          <p className="text-red-500 mt-2">{formik.errors.email}</p>
        )}
      </form>
    </div>
  );
};

export default Login;