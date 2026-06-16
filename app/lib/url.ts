import qs from "query-string";

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

// URL'ye query parametresi ekler
// URL'ye query parametresi ekler
export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string;
}) {
  const urlParams = new URLSearchParams(params);
  urlParams.set(key, value); // Parametreyi ekle veya güncelle
  return `${window.location.pathname}?${urlParams.toString()}`;
}

// URL'den belirtilen parametreyi kaldırır
// URL'den belirtilen parametreyi kaldırır
export function removeKeysFromUrlQuery({
  params,
  keysToRemove,
}: {
  params: string;
  keysToRemove: string[];
}) {
  const urlParams = new URLSearchParams(params);
  keysToRemove.forEach((key) => urlParams.delete(key)); // Belirtilen parametreyi sil
  return `${window.location.pathname}?${urlParams.toString()}`;
}
