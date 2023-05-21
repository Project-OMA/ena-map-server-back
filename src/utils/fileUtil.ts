export const normalizeFileName = (name: string): string => name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
