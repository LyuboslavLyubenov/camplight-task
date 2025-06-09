import { renderHook, act } from '@testing-library/react-hooks';
import { useCountries } from './useCountries';
import { Country } from '@camplight-task/domain';

const mockCountries: Country[] = [
  {
    name: { common: 'Bulgaria', official: 'Republic of Bulgaria' },
    region: 'Europe',
    cca3: 'BG',
    flags: { png: 'https://flagcdn.com/w320/bg.png', svg: 'https://flagcdn.com/bg.svg' },
    population: 6927288,
    // ... other required fields
  },
  {
    name: { common: 'Germany', official: 'Federal Republic of Germany' },
    region: 'Europe', 
    cca3: 'DE',
    flags: { png: 'https://flagcdn.com/w320/de.png', svg: 'https://flagcdn.com/de.svg' },
    population: 83240525,
    // ... other required fields
  },
  {
    name: { common: 'Japan', official: 'Japan' },
    region: 'Asia',
    cca3: 'JP',
    flags: { png: 'https://flagcdn.com/w320/jp.png', svg: 'https://flagcdn.com/jp.svg' },
    population: 125836021,
    // ... other required fields
  }
];

describe('useCountries', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCountries),
      })
    ) as jest.Mock;
  });

  it('should fetch countries on mount', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCountries());
    
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    
    expect(result.current.loading).toBe(false);
    expect(result.current.allCountries.length).toBe(mockCountries.length);
  });

  it('should filter countries by search term', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCountries());
    await waitForNextUpdate();
    
    act(() => {
      result.current.setSearchTerm('bul');
    });
    
    expect(result.current.countries.length).toBe(1);
    expect(result.current.countries[0].name.common).toBe('Bulgaria');
  });

  it('should filter countries by region', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCountries());
    await waitForNextUpdate();
    
    act(() => {
      result.current.setSelectedRegion('Asia');
    });
    
    expect(result.current.countries.length).toBe(1);
    expect(result.current.countries[0].name.common).toBe('Japan');
  });

  it('should handle fetch error', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as jest.Mock;
    
    const { result, waitForNextUpdate } = renderHook(() => useCountries());
    await waitForNextUpdate();
    
    expect(result.current.error).toBe('Network error');
  });

  it('should toggle favorites', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCountries());
    await waitForNextUpdate();
    
    act(() => {
      result.current.toggleFavorite('BG');
    });
    
    expect(result.current.favorites.has('BG')).toBe(true);
    
    act(() => {
      result.current.toggleFavorite('BG');
    });
    
    expect(result.current.favorites.has('BG')).toBe(false);
  });

  it('should update notes', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCountries());
    await waitForNextUpdate();
    
    const testNote = 'Test note';
    act(() => {
      result.current.updateNote('BG', testNote);
    });
    
    expect(result.current.notes['BG']).toBe(testNote);
  });
});