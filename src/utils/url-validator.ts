export function isValidHttpsUrl(urlString: string): boolean {
  if (!urlString || typeof urlString !== 'string') {
    return false;
  }

  try {
    const parsed = new URL(urlString);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export interface SafeLinkAttributes {
  href: string;
  target?: '_blank';
  rel?: 'noopener noreferrer';
  isSafe: boolean;
}

export function getSafeExternalLinkProps(urlString: string): SafeLinkAttributes {
  if (!isValidHttpsUrl(urlString)) {
    return {
      href: '#',
      isSafe: false,
    };
  }

  return {
    href: urlString,
    target: '_blank',
    rel: 'noopener noreferrer',
    isSafe: true,
  };
}

export function formatDisplayUrl(urlString: string): string {
  try {
    const parsed = new URL(urlString);
    return parsed.hostname + (parsed.pathname === '/' ? '' : parsed.pathname);
  } catch {
    return urlString;
  }
}
