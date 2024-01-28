import { createHttpCilent } from "src/lib/http-client";
import type { OrganizationInfo } from "src/types/organization";
import {
  API_ORGANIGATION,
  API_SEARCH_ORGANIZATION,
  API_JOIN_ORGANIZATION,
  API_WITHDRAW_ORGANIZATION,
} from "../contants";

const instance = createHttpCilent()
  .setBaseUrl(process.env.NEXT_PUBLIC_API_URL ?? "")
  .build();

export const requestCreateOrganization = (name: string): Promise<OrganizationInfo> => {
  return instance.post(API_ORGANIGATION, { name });
};

export const fetchOrganizationSearch = (code: string): Promise<string> => {
  return instance.get(API_SEARCH_ORGANIZATION, { params: { code } });
};

export const requestJoinOrganization = (code: string): Promise<OrganizationInfo> => {
  return instance.post(API_JOIN_ORGANIZATION(code));
};

export const requestWithdrawOrganization = (code: string): Promise<OrganizationInfo> => {
  return instance.delete(API_WITHDRAW_ORGANIZATION(code));
};
