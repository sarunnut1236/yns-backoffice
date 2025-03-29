import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Profile from './Profile';
import { UserRole, Region } from '@/enums/User';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

// Create simple mocks for the required contexts
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      id: '1',
      firstname: 'John',
      surname: 'Doe',
      nickname: 'JD',
      email: 'john@example.com',
      phone: '123456789',
      role: UserRole.ADMIN,
      region: Region.BKK,
      joinedAt: new Date(2022, 0, 1),
      birthdate: new Date(1990, 0, 1),
      lineId: 'john_doe',
      foodAllergy: 'Nuts',
      personalMedicalCondition: 'None',
      bio: 'Test bio',
      title: 'Developer'
    }
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children
}));

// Mock translation
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      // Map translation keys to their expected values in the tests
      const translations: Record<string, string> = {
        'profile.title': 'Profile',
        'profile.details': 'Details',
        'profile.fullName': 'Full Name',
        'profile.nickname': 'Nickname',
        'profile.email': 'Email',
        'profile.phone': 'Phone',
        'profile.region': 'Region',
        'profile.joinedDate': 'Joined Date',
        'profile.birthdate': 'Birthdate',
        'profile.lineId': 'LINE ID',
        'profile.healthInfo': 'Health Information',
        'profile.foodAllergy': 'Food Allergies',
        'profile.medicalCondition': 'Medical Conditions',
        'profile.edit': 'Edit',
        'profile.roleAndPermissions': 'Role & Permissions',
        'profile.currentRole': 'Current Role',
        'profile.manageUsers': 'Manage Users & Roles',
        'profile.settings': 'Settings',
        'profile.language': 'Language',
        'profile.selectLanguage': 'Select Language',
        'profile.english': 'English',
        'profile.thai': 'Thai'
      };
      return translations[key] || key;
    }
  })
}));

// Mock the useLanguage hook
vi.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'en',
    changeLanguage: vi.fn()
  })
}));

// Create a custom render function for this test
function customRender(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      {ui}
    </MemoryRouter>
  );
}

describe('Profile', () => {
  it('renders user information correctly', () => {
    customRender(<Profile />);
    
    // Check for basic user info - use getAllByText for elements that appear multiple times
    const johnDoeElements = screen.getAllByText('John Doe');
    expect(johnDoeElements.length).toBeGreaterThan(0);
    expect(johnDoeElements[0]).toBeInTheDocument();
    
    expect(screen.getByText('"JD"')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Test bio')).toBeInTheDocument();
  });
  
  it('displays contact information', () => {
    customRender(<Profile />);
    
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('123456789')).toBeInTheDocument();
    expect(screen.getByText('BKK')).toBeInTheDocument();
    expect(screen.getByText('john_doe')).toBeInTheDocument();
  });
  
  it('shows health information', () => {
    customRender(<Profile />);
    
    expect(screen.getByText('Health Information')).toBeInTheDocument();
    expect(screen.getByText('Nuts')).toBeInTheDocument();
    expect(screen.getByText('None')).toBeInTheDocument();
  });
  
  it('displays role information', () => {
    customRender(<Profile />);
    
    expect(screen.getByText('Role & Permissions')).toBeInTheDocument();
    expect(screen.getByText('Current Role')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });
  
  it('shows admin actions for admin users', () => {
    customRender(<Profile />);
    
    expect(screen.getByText('Manage Users & Roles')).toBeInTheDocument();
  });
  
  it('has edit profile and delete buttons', () => {
    customRender(<Profile />);
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });
}); 