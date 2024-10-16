import { ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

type Methods = "POST" | "PATCH" | "PUT" | "DELETE";

const baseUrl = "https://reqres.in/api/";
const methods: Methods[] = ["POST", "PATCH", "PUT", "DELETE"];

export function useFetch<T>(
  endpoint: string,
  params?: Record<string, string>,
  options?: RequestInit,
  message?: string | undefined
) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref<boolean>(true);

  const constructUrl = (
    base: string,
    endpoint: string,
    params: Record<string, string> = {}
  ) => {
    const url = new URL(`${base}${endpoint}`);
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    );
    return url.toString();
  };

  const fetchData = async () => {
    loading.value = true;
    const url = constructUrl(baseUrl, endpoint, params);

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        if (methods.includes(options?.method as Methods)) {
          toast(message as string, {
            theme: "colored",
            type: "success",
            position: "bottom-right",
            dangerouslyHTMLString: true,
          });
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      data.value = result;
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  fetchData();

  return { data, error, loading, fetchData };
}
