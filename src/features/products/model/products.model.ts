export class Product {
  id!: string;
  name!: string;
  description!: string;
  costPrice!: number;
  salePrice!: number;
  stock!: number;

  createdAt!: Date;
  updatedAt!: Date;

  imageUrl!: string | null;
  imageId!: string | null;

  category!: {
    id: string;
    name: string;
  };
}

export class UploadImageResponse {
  id!: string;
  name!: string;
  imageUrl!: string | null;
  imageId!: string | null;
}
