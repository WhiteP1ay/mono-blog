/**
 * 通用的 fetch 请求封装
 * @param url - 请求地址
 * @param options - fetch 配置项
 * @returns Promise<T> - 返回请求数据
 */
export async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const token = localStorage.getItem("token");
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(token ? { Authorization: token } : {}),
    },
  });

  if (res.status >= 400 && res.status < 500) {
    (window as unknown as { navigate: (path: string) => void }).navigate(
      "/login"
    );
    return res.json();
  }

  if (!res.ok) {
    throw new Error(`API request failed: ${res.statusText}`);
  }
  return res.json();
}
