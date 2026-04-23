export class Product {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  description!: string;
  costPrice!: number;
  salePrice!: number;
  stock!: number;
  imageUrl!: string | null;
  imageId!: string | null;
  category!: {
    id: string;
    name: string;
  };
}
