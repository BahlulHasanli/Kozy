export function concatenateBuffers(a: any, b: any) {
  const c = new Uint8Array(a.length + b.length);

  c.set(a);
  c.set(b, a.length);

  return c;
}

export function parseFileSize(sizeString: string) {
  const sizeParts = sizeString.split(' ');
  const sizeNumber = parseFloat(sizeParts[0]);
  const unit = sizeParts[1].toUpperCase();

  switch (unit) {
    case 'KB':
      return sizeNumber * 1024;
    case 'MB':
      return sizeNumber * 1024 * 1024;
    case 'GB':
      return sizeNumber * 1024 * 1024 * 1024;
    default:
      return sizeNumber;
  }
}
