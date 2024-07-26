import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, vi } from 'vitest';
import App from '../App';
//this file contains an exemple of integration testing using vitest

// Mock react-toastify
vi.mock('react-toastify', () => ({
  ToastContainer: () => <div>Mocked ToastContainer</div>,
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  },
}));

// Mock react-modal
vi.mock('react-modal', () => {
  const Modal = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
  Modal.setAppElement = vi.fn();
  return { default: Modal };
});

// Mock react-chartjs-2
vi.mock('react-chartjs-2', () => ({
  Pie: () => <div>Mocked Pie Chart</div>,
}));

//check if app component is render
describe('App component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Mocked ToastContainer')).toBeInTheDocument();
    const dashboardElements = screen.getAllByText(/Bridge Status Overview/i);
    expect(dashboardElements.length).toBeGreaterThan(0);
    expect(screen.getByText('Mocked Pie Chart')).toBeInTheDocument();
  });
});
