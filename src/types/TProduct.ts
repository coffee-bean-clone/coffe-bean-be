type TProduct = {
  title: string;
  price: number;
  // createdAt: Date;
  mainCategory: string;
  subCategory: string;
  isSale: boolean;
  isNew: boolean;
  detailImage: string | null;
  productImages: string[];
};

export default TProduct;
