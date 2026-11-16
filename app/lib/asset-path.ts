const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string) {
  return `${BASE_PATH}${`/Gautier_Gaetan_Projet9_Fisheye`}${path.startsWith("/") ? path : `/${path}`}`;
}
