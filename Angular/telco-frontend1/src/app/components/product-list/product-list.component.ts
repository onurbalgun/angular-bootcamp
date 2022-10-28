import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productForm: string = '';
  products: string[] = [];
  constructor() {}
  //degis


  ngOnInit(): void {
    this.createProducts();
  }
  createProducts() {
    this.products = ['Patates', 'Soğan ', 'Patlican'];
  }
  deleteProduct(index: number) {
    this.products.splice(index, 1);
  }
  addProduct() {
    this.products.push(this.productForm);
    this.productForm = '';
  }
}
