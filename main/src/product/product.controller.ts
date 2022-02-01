import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {

    constructor(
        private productService: ProductService,
        private httpService: HttpService
    ) { }

    @Get()
    async all() {
        return this.productService.all()
    }

    @Post(':id/like')
    async like(@Param('id') id: number) {
        const product = await this.productService.findOne(id)

        this.httpService.post(`${process.env.ADMIN_ENDPOINT}/products/${id}/like`).subscribe(
            res => console.log(res)
        )

        await this.productService.update(id, {
            likes: product.likes + 1
        })

        return this.productService.findOne(id)
    }

    @EventPattern('product_created')
    async productCreated(product: any) {
        this.productService.create({
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes
        })
    }

    @EventPattern('product_updated')
    async productUpdated(product: any) {
        this.productService.update(product.id, {
            title: product.title,
            image: product.image,
            likes: product.likes
        })
    }

    @EventPattern('product_deleted')
    async productDeleted(id: number) {
        this.productService.delete(id)
    }
}
