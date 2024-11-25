export const useApi = () => {
  const get = async <T,>(url: string) => {
    const response = await fetch(url, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`GET request failed: ${response.statusText}`);
    }
    return (await response.json()) as T;
  };

  const post = async <T,>(url: string, data = undefined) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`POST request failed: ${response.statusText}`);
    }
    return (await response.json()) as T;
  };

  const put = async <T,>(url: string, data = undefined) => {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`PUT request failed: ${response.statusText}`);
    }
    return (await response.json()) as T;
  };

  const patch = async <T,>(url: string, data = undefined) => {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`PATCH request failed: ${response.statusText}`);
    }
    return (await response.json()) as T;
  };

  const del = async <T,>(url: string) => {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`DELETE request failed: ${response.statusText}`);
    }
    return (await response.json()) as T;
  };

  return {
    get,
    post,
    put,
    patch,
    del,
  };
};

export default useApi;
