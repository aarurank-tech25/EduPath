import axios from 'axios';

const API_BASE = 'https://edupath-ubou.onrender.com/api';

const client = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const api = {
  getDashboard: () => client.get('/dashboard').then(r => r.data),
  getSkills: () => client.get('/skills').then(r => r.data),
  addSkill: (skill) => client.post('/skills', skill).then(r => r.data),
  getSkillGaps: (role) => client.get('/skill-gaps', { params: { role } }).then(r => r.data),
  getLearningPlan: () => client.get('/learning-plan').then(r => r.data),
  updateProgress: (weekNumber, objectiveIndex, completed) =>
    client.post('/progress', { weekNumber, objectiveIndex, completed }).then(r => r.data),
  getPracticeTask: () => client.get('/practice').then(r => r.data),
  evaluatePractice: (code, taskId) => client.post('/practice/evaluate', { code, taskId }).then(r => r.data),
  getChatHistory: () => client.get('/ai-chat/history').then(r => r.data),
  sendChatMessage: (message, context) => client.post('/ai-chat', { message, context }).then(r => r.data),
  getProfile: () => client.get('/profile').then(r => r.data),
  updateProfile: (data) => client.put('/profile', data).then(r => r.data),
  uploadResume: (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    return client.post('/upload-resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(r => r.data);
  }
};

export default api;
