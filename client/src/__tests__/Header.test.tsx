import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Header from '../components/Header';

//this file contains an exemple of unit testing using vitest
describe('Header component', () => {
  const mockOnShowTable = vi.fn();
  const mockOnShowForm = vi.fn();
  const mockOnShowChart = vi.fn();
  const mockSetActiveButton = vi.fn();

  const setup = () => {
    //render Header testing each props
    render(
      <Header
        onShowTable={mockOnShowTable}
        onShowForm={mockOnShowForm}
        onShowChart={mockOnShowChart}
        activeButton={0}
        setActiveButton={mockSetActiveButton}
      />
    );
  };

  it('renders the Header component', () => {
    setup();
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });

  it('calls the correct function when a button is clicked', () => {
    setup();

    fireEvent.click(screen.getByLabelText('Show Table'));
    expect(mockOnShowTable).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText('Show Form'));
    expect(mockOnShowForm).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText('Show Chart'));
    expect(mockOnShowChart).toHaveBeenCalled();
  });
});
