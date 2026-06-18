import { siteUrl } from './config';

export function absoluteUrl(pathname: string) {
  return `${siteUrl}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}
