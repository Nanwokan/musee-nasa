import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Salles from './salles';

vi.mock('../services/nasaApi', () => ({
  getMediasFromNASA: vi.fn(),
}));

import { getMediasFromNASA } from '../services/nasaApi';

describe('Salles page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getMediasFromNASA.mockImplementation((query) =>
      Promise.resolve([{
        thumbUrl: `https://example.com/${query}.jpg`,
      }]),
    );
  });

  it('renders the page title and all salle names', async () => {
    render(
      <MemoryRouter>
        <Salles />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: /les salles du musée/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Apollo' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Hubble' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Mars' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Station spatiale internationale' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Revivez les premiers pas de l’humanité sur la Lune.'),
    ).toBeInTheDocument();
  });

  it('loads each room image from NASA search results', async () => {
    render(
      <MemoryRouter>
        <Salles />
      </MemoryRouter>,
    );

    expect(await screen.findByAltText('Illustration de la salle Apollo')).toHaveAttribute(
      'src',
      'https://example.com/apollo.jpg',
    );
    expect(screen.getByAltText('Illustration de la salle Hubble')).toHaveAttribute(
      'src',
      'https://example.com/hubble.jpg',
    );
    expect(screen.getByAltText('Illustration de la salle Mars')).toHaveAttribute(
      'src',
      'https://example.com/mars.jpg',
    );
    expect(
      screen.getByAltText('Illustration de la salle Station spatiale internationale'),
    ).toHaveAttribute('src', 'https://example.com/international space station.jpg');
    expect(getMediasFromNASA).toHaveBeenCalledWith('apollo', 'image');
  });

  it('makes the whole salle card link to its detail page', async () => {
    render(
      <MemoryRouter>
        <Salles />
      </MemoryRouter>,
    );

    const salleLink = screen.getByRole('link', { name: /apollo.*découvrir la salle/i });

    expect(salleLink).toHaveAttribute('href', '/salles/apollo');
    expect(salleLink).toContainElement(screen.getByRole('heading', { name: 'Apollo' }));
    expect(salleLink).toHaveTextContent('Découvrir la salle');
    await screen.findByAltText('Illustration de la salle Apollo');
  });
});
