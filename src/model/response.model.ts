export interface ApiResponse<T> {
  data: T;
  message?: string;
  meta?: Record<string, any>;
}
