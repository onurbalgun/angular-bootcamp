import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList:string[]=[];
  @ViewChild("productName") productName:ElementRef;
  constructor() { }

  createProductList()
  {
    this.productList=['Product 1','Araba','Telefon','Kol saati']
  }

  addProduct()
   {
    console.log("Add product" +this.productName.nativeElement.value);
    this.productList.push(this.productName.nativeElement.value);
    this.productName.nativeElement.value='';
   }
   addProduct2(formValue:NgForm)
   {

    console.log(formValue.value);
    this.productList.push(formValue.value.productName );

    formValue.reset()


   }


   deleteProduct(index:number)
   {
    console.log("Delete function "+ index);
    this.productList.splice(index,1)

   }
  ngOnInit(): void {
    this.createProductList();
  }


}
