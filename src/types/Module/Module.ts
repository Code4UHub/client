export interface Module {
  title: string;
  isOpen: boolean;
}

export interface StudentModule extends Module {
  percentage?: number;
}
