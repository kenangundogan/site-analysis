import scanService from '../../../src/services/scanService';

describe('Scan Service', () => {
  it('should throw an error if url or baseurl is missing', async () => {
    await expect(scanService.startScan({})).rejects.toThrow(
      'URL ve baseurl parametreleri zorunludur.',
    );
  });

  // Diğer test senaryoları...
});
