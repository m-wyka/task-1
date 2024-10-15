import type { Pagination } from "./Pagination";
import type { User } from "./User";

type ResponseSupport = {
  url: string;
  text: string;
};

export type ResponseData<T> = Pagination & {
  data: T;
  support: ResponseSupport;
};

export type ResponseSingleUser = {
  data: User;
  support: ResponseSupport;
};
