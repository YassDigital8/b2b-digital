// src/components/InterceptorSetup.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setupInterceptors } from './axioxConfig';

const InterceptorSetup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);

  return null;
};

export default InterceptorSetup;
