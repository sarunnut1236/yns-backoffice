import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Automatically redirect to home after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <ShieldAlert size={40} className="text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">{t('unauthorized.title')}</h1>
        
        <p className="text-gray-600 mb-6">
          {t('unauthorized.message')}
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
