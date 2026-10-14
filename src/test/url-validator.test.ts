import { describe, it, expect } from 'vitest';
import {
  isValidHttpsUrl,
  getSafeExternalLinkProps,
  formatDisplayUrl,
} from '@/utils/url-validator';

describe('URL Validator', () => {
  it('permits valid HTTPS destinations', () => {
    expect(isValidHttpsUrl('https://my-app.vercel.app')).toBe(true);
    expect(isValidHttpsUrl('https://sub.domain.com/path?query=1')).toBe(true);
  });

  it('rejects unencrypted HTTP URLs', () => {
    expect(isValidHttpsUrl('http://insecure-app.vercel.app')).toBe(false);
  });

  it('rejects javascript: and pseudo protocol URLs', () => {
    expect(isValidHttpsUrl('javascript:alert(1)')).toBe(false);
    expect(isValidHttpsUrl('data:text/html,<h1>XSS</h1>')).toBe(false);
    expect(isValidHttpsUrl('file:///etc/passwd')).toBe(false);
  });

  it('rejects malformed or non-string inputs', () => {
    expect(isValidHttpsUrl('')).toBe(false);
    expect(isValidHttpsUrl('not a url')).toBe(false);
    // @ts-expect-error test invalid runtime type
    expect(isValidHttpsUrl(null)).toBe(false);
    // @ts-expect-error test invalid runtime type
    expect(isValidHttpsUrl(undefined)).toBe(false);
  });

  it('returns safe link attributes for valid HTTPS URLs', () => {
    const props = getSafeExternalLinkProps('https://project.vercel.app');
    expect(props.isSafe).toBe(true);
    expect(props.href).toBe('https://project.vercel.app');
    expect(props.target).toBe('_blank');
    expect(props.rel).toBe('noopener noreferrer');
  });

  it('returns disabled/fallback attributes for invalid URLs', () => {
    const props = getSafeExternalLinkProps('http://unsafe.example.com');
    expect(props.isSafe).toBe(false);
    expect(props.href).toBe('#');
    expect(props.target).toBeUndefined();
  });

  it('formats display URLs cleanly', () => {
    expect(formatDisplayUrl('https://app.vercel.app/')).toBe('app.vercel.app');
    expect(formatDisplayUrl('https://app.vercel.app/demo')).toBe('app.vercel.app/demo');
    expect(formatDisplayUrl('invalid')).toBe('invalid');
  });
});
