import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const Users = {
    login: (data) => api.post("/users/login", data),
    signup: (data) => api.post("/users/register", data),
    addTransaction: (data) => api.post("/users/Tasks", data),
    getUserExpenses: (userId) => api.get(`/users/expenses/${userId}`),
    updateExpense: (expenseId, data) => api.put(`/users/expenses/${expenseId}`, data),
    deleteExpense: (expenseId) => api.delete(`/users/expenses/${expenseId}`),
    getMonthlySummary: (userId, month, year) => 
        api.get(`/users/summary/${userId}?month=${month}&year=${year}`)
};

export default Users;

