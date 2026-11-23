export const siteOrigin = "https://www.ontymil.com";
export const siteBasePath = "";
export const siteUrl = `${siteOrigin}${siteBasePath}/`;

export function withBasePath(path) {
  const normalizedPath = `/${path.replace(/^\/+/, "")}`;
  return `${siteBasePath}${normalizedPath}`;
}
