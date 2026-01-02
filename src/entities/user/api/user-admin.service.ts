import httpClient from "@shared/api/httpClient.ts";
import {ChangePasswordRequest, LockAccountRequest} from "../model/types/user.types";

export const changePassword = async (userId: number, data: ChangePasswordRequest) => {
  await httpClient.put(`/users/${userId}/password`, data);
};

export const lockAccount = async (userId: number, data: LockAccountRequest) => {
  await httpClient.post(`/users/${userId}/lock`, data);
};

export const unlockAccount = async (userId: number) => {
  await httpClient.post(`/users/${userId}/unlock`);
};
