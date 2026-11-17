const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_PAGES ? "/Gautier_Gaetan_Projet9_Fisheye" : "");

export async function assetPath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
