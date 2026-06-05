import { http } from "@/api/http";


export const getReservations = () => http.get("/reservations");


export const getReservationsByUser = (userId) => http.get(`/reservations?userId=${userId}`);


export const createReservation = (data) => http.post("/reservations", data);


export const updateReservation = (id, data) => http.put(`/reservations/${id}`, data);


export const changeStatus = (id, status) => http.patch(`/reservations/${id}`, { status });


export const deleteReservation = (id) => http.delete(`/reservations/${id}`);
