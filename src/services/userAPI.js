import axios from 'axios';

const API_URL = "https://lnswoejypfhvjblbnyxb.supabase.co/rest/v1/user_profile";
const API_KEY = "sb_publishable_3ehmfKC2YPl4HFr1Kb9qKg_YeE3opyG";

const headers = {
  'apikey': API_KEY,
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
};

export const userAPI = {
  async registerUser(dataForm) {
    const response = await axios.post(API_URL, dataForm, {
      headers: {
        ...headers,
        'Prefer': 'return=representation'
      }
    });
    // PostgREST return=representation returns an array containing the created record
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    return response.data;
  },

  async loginUser(username, password) {
    const response = await axios.get(`${API_URL}?username=eq.${username}&password=eq.${password}`, { headers });
    if (response.data.length > 0) return response.data[0];
    throw new Error("Username atau Password salah!");
  },

  async fetchAllUsers() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async updateUser(id, updatedData) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, updatedData, {
      headers: {
        ...headers,
        'Prefer': 'return=representation'
      }
    });
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    return response.data;
  },

  async deleteUser(id) {
    const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    return response.data;
  }
};
