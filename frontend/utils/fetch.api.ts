import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie'
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // Replace with your actual API URL

// Generic GET request with TypeScript
export const getData = async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
        const response = await axios.get<T>(`${API_BASE_URL}${endpoint}`, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error("Error in GET request:", error);
        throw error;
    }
};

// Generic POST request with TypeScript
export const postData = async <T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
    try {
        console.log("post hit")
        const response = await axios.post<T>(`${API_BASE_URL}${endpoint}`, data);
        console.log(response)
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // Log error details from the response
            // console.error("Error Response Data:", error.response.data);
            // console.error("Error Response Status:", error.response.status);
            // console.error("Error Response Headers:", error.response.headers);
            return error.response.data;
        } else {
            // Throw generic error if no response from the server
            return error.response || "Something went wrong";
        }
    }
};


export const isLoggedIn = async <T> () => {
    try {
        // const token = Cookies.get("token")
        // const id  = Cookies.get("id")
        const headers = {
            "Content-Type": "application/json",
            "access-token": Cookies.get("token"),
            "User-Id" : Cookies.get("id")
        };
        console.log(headers)

        const response = await axios.get<T>(`${API_BASE_URL}/auth/isLoggedIn`,{ headers });
        console.log(response)
        return response.data;
    } catch (error) {
        Cookies.remove("token")
        Cookies.remove("id")
        return false
    }
}