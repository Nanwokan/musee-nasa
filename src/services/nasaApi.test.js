import { describe, expect, it, vi } from 'vitest';
import { getMediasFromNASA, normalizeMedia } from './nasaApi';

describe('normalizeMedia', () => {
  it('returns a cleaned object from NASA data', () => {
    const rawItem = {
      data: [
        {
          nasa_id: 'abc-123',
          title: 'Mission Apollo',
          description: 'Une mission emblématique.',
          date_created: '2024-03-15T00:00:00Z',
          media_type: 'image',
          center: 'JPL',
          keywords: ['moon', 'apollo'],
        },
      ],
      links: [{ href: 'https://example.com/image.jpg' }],
    };

    expect(normalizeMedia(rawItem)).toEqual({
      id: 'abc-123',
      title: 'Mission Apollo',
      description: 'Une mission emblématique.',
      date: '2024-03-15',
      mediaType: 'image',
      center: 'JPL',
      keywords: ['moon', 'apollo'],
      thumbUrl: 'https://example.com/image.jpg',
    });
  });

  it('uses fallback values when NASA payload is incomplete', () => {
    const result = normalizeMedia({ data: [{}], links: [{}] });

    expect(result).toMatchObject({
      id: '',
      title: 'Sans titre',
      description: '',
      date: 'Date inconnue',
      mediaType: 'image',
      center: 'NASA',
      keywords: [],
      thumbUrl: '',
    });
  });
});

describe('getMediasFromNASA', () => {
  it('calls the NASA API with the expected query parameters and returns normalized results', async () => {
    const rawItem = {
      data: [
        {
          nasa_id: 'nasa-1',
          title: 'Mars rover',
          description: 'Image de rover.',
          date_created: '2018-04-01T00:00:00Z',
          media_type: 'image',
          center: 'JPL',
          keywords: ['mars'],
        },
      ],
      links: [{ href: 'https://example.com/mars.jpg' }],
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ collection: { items: [rawItem] } }),
    });

    const result = await getMediasFromNASA('mars', 'image', '2010', '2024');

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch.mock.calls[0][0]).toContain('q=mars');
    expect(globalThis.fetch.mock.calls[0][0]).toContain('year_start=2010');
    expect(globalThis.fetch.mock.calls[0][0]).toContain('year_end=2024');
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: 'nasa-1',
      title: 'Mars rover',
      mediaType: 'image',
    });
  });
});
