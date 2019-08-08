import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { products } from './products';

@Injectable()
export class ProductsService {
    products: Product[] = products;

    insertProduct(title: string, desc: string, price: number) {
        const prodId = new Date().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return newProduct;
    }

    getAllProduct() {
        return this.products;
    }

    getOneProduct( prodId: string) {
        const singleProduct = this.products.find((prod) =>  prod.id === prodId );
        if (!singleProduct) {
            throw new NotFoundException('Could not find product');
        }
        return singleProduct;
    }
    updateProduct(prodId: string, title: string, desc: string, price: number){
        const prodIndex = this.products.findIndex((prod) => prodId === prod.id);
        if (!prodIndex) {
            throw new NotFoundException('Could not find product');
        }
    }
}
