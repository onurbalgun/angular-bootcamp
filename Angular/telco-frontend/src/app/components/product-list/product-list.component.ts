import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  productForm: FormGroup;

  products: string[] = [];
  constructor() {
    this.createProducts();
  }



  ngOnInit(): void {

    this.createProductForm();

  }
  createProductForm()
  {
    this.productForm = new FormGroup({
      productGroup: new FormGroup({
        productName: new FormControl(null,Validators.required ),
      }),
    });
  }
  createProducts() {
    this.products = ['Patates', 'Soğan ', 'Patlican'];
  }
  deleteProduct(index: number) {
    this.products.splice(index, 1);
  }
  addProduct() {
    const productValue: string = this.productForm.get(
      'productGroup.productName'
    ).value;
    console.log(productValue);
    this.products.push(productValue);
    this.productForm.reset();


  }
}
