export interface NewCategory {
  enterpriseId: string;
  title: string;
}

export interface Category extends NewCategory {
  id: string;
}
