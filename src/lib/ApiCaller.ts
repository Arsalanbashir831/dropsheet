// src/lib/apiCaller.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

type RequestData =
	| Record<string, string | number | boolean | File | Blob>
	| FormData;

const API_BASE = import.meta.env.VITE_REACT_APP_BACKEND_URL;

// Create a single Axios instance for your API
const api = axios.create({
	baseURL: API_BASE,
	headers: { "Content-Type": "application/json" },
	withCredentials: false, // change if you use cookies
});

// Helpers to read/write tokens
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");
const setTokens = (access: string, refresh: string) => {
	localStorage.setItem("accessToken", access);
	localStorage.setItem("refreshToken", refresh);
};
const clearTokens = () => {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("refreshToken");
};

// Attach the access token to each request
api.interceptors.request.use((config) => {
	const token = getAccessToken();
	if (token && config.headers) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Refresh-token logic: queue requests while refreshing
let isRefreshing = false;
let failedQueue: {
	resolve: (value: AxiosResponse) => void;
	reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
	failedQueue.forEach(async ({ resolve, reject }) => {
		if (error) {
			reject(error);
		} else {
			resolve(
				await api.request({
					...axios.defaults,
					headers: { Authorization: `Bearer ${token}` },
				})
			);
		}
	});
	failedQueue = [];
};

// Response interceptor to catch 401s
api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as AxiosRequestConfig & {
			_retry?: boolean;
		};

		// Only handle 401 once per request
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			if (isRefreshing) {
				// Queue the request until the refresh is done
				return new Promise<AxiosResponse>((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				});
			}

			isRefreshing = true;
			const refreshToken = getRefreshToken();

			try {
				// Call your refresh endpoint
				const { data } = await axios.post(
					`${API_BASE}/token/refresh/`,
					{ refresh: refreshToken },
					{ headers: { "Content-Type": "application/json" } }
				);
				const { access, refresh } = data;

				// Save new tokens
				setTokens(access, refresh);
				api.defaults.headers.Authorization = `Bearer ${access}`;

				// Process queued requests
				processQueue(null, access);

				// Retry the original request
				return api(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError, null);
				clearTokens();
				window.location.href = "/login"; // or use your router to navigate
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		// If not a 401 or already retried, reject
		return Promise.reject(error);
	}
);

/**
 * Main API caller function.
 */
export default async function apiCaller(
	url: string,
	method: AxiosRequestConfig["method"] = "GET",
	data?: RequestData,
	options: AxiosRequestConfig = {},
	dataType: "json" | "formdata" = "json",
	signal?: AbortSignal
): Promise<AxiosResponse> {
	const config: AxiosRequestConfig = {
		url,
		method,
		...options,
		signal,
	};

	if (data) {
		if (dataType === "json") {
			config.data = data;
		} else {
			const formData = new FormData();
			Object.entries(data).forEach(([k, v]) => formData.append(k, v as string));
			config.data = formData;
			delete config.headers?.["Content-Type"];
		}
	}

	return api.request(config);
}
