const BASE_URL = 'http://localhost:3001';

export const api = {
  // === USERS ===
  getUser: async (username: string) => {
    const res = await fetch(`${BASE_URL}/users?username=${username}`);
    return res.json();
  },
  getAllUsers: async () => {
    const res = await fetch(`${BASE_URL}/users`);
    return res.json();
  },
  createUser: async (userData: any) => {
    const res = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  // === GRAPH DATA (CRUD) ===
  getGraphData: async (userId: string) => {
    const res = await fetch(`${BASE_URL}/graphData?userId=${userId}`);
    return res.json();
  },
  
  createGraphData: async (data: any) => {
    const res = await fetch(`${BASE_URL}/graphData`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateGraphData: async (id: string, updateData: any) => {
    const res = await fetch(`${BASE_URL}/graphData/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    return res.json();
  }
};
