export const siteOrigin = "https://imtiazvive.github.io";
export const siteBasePath = "/ontomil-risat";
export const siteUrl = `${siteOrigin}${siteBasePath}/`;

export function withBasePath(path) {
  return `${siteBasePath}/${path.replace(/^\/+/, "")}`;
}
