/**
 * services/api.js
 * Com proxy no vite.config.js, BASE_URL fica vazio em dev.
 * Em produção, defina VITE_API_URL no .env.
 */

const BASE_URL = import.meta.env.VITE_API_URL || '';

async function request(method, path, body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${path}`, options);

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const err = await res.json();
      message = err.message || err.error || message;
    } catch (_) {}
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const studentsApi    = {
  getAll:  ()          => request('GET',    '/students'),
  getById: (id)        => request('GET',    `/students/${id}`),
  create:  (data)      => request('POST',   '/students', data),
  update:  (id, data)  => request('PUT',    `/students/${id}`, data),
  delete:  (id)        => request('DELETE', `/students/${id}`),
};

export const teachersApi    = {
  getAll:  ()          => request('GET',    '/teachers'),
  getById: (id)        => request('GET',    `/teachers/${id}`),
  create:  (data)      => request('POST',   '/teachers', data),
  update:  (id, data)  => request('PUT',    `/teachers/${id}`, data),
  delete:  (id)        => request('DELETE', `/teachers/${id}`),
};

export const coursesApi     = {
  getAll:  ()          => request('GET',    '/courses'),
  getById: (id)        => request('GET',    `/courses/${id}`),
  create:  (data)      => request('POST',   '/courses', data),
  update:  (id, data)  => request('PUT',    `/courses/${id}`, data),
  delete:  (id)        => request('DELETE', `/courses/${id}`),
};

export const classroomsApi  = {
  getAll:  ()          => request('GET',    '/classrooms'),
  getById: (id)        => request('GET',    `/classrooms/${id}`),
  create:  (data)      => request('POST',   '/classrooms', data),
  update:  (id, data)  => request('PUT',    `/classrooms/${id}`, data),
  delete:  (id)        => request('DELETE', `/classrooms/${id}`),
};

export const enrollmentsApi = {
  getAll:  ()          => request('GET',    '/enrollments'),
  getById: (id)        => request('GET',    `/enrollments/${id}`),
  create:  (data)      => request('POST',   '/enrollments', data),
  update:  (id, data)  => request('PUT',    `/enrollments/${id}`, data),
  delete:  (id)        => request('DELETE', `/enrollments/${id}`),
};

export const usersApi       = {
  getAll:  ()          => request('GET',    '/users'),
  getById: (id)        => request('GET',    `/users/${id}`),
  create:  (data)      => request('POST',   '/users', data),
  update:  (id, data)  => request('PUT',    `/users/${id}`, data),
  delete:  (id)        => request('DELETE', `/users/${id}`),
};

const api = {
  students:    studentsApi,
  teachers:    teachersApi,
  courses:     coursesApi,
  classrooms:  classroomsApi,
  enrollments: enrollmentsApi,
  users:       usersApi,
};

export default api;
