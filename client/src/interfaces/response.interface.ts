export default interface ResponseType<T> {
  data: T;
  status: boolean;
  message: string;
}
