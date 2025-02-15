export type ListRes<T> = {
  data: T[];
  success: boolean;
};

export type DetailRes<T> = {
  data: T;
  success: boolean;
};
