export interface IVagon<T> {
    vagon: T;
    color: string;
    gancho: IVagon<T> | null;
  }
  