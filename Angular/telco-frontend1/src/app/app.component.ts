import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'telco-frontend';
  btnClick(){
    alert("Tıklandı.")
  }
}

//ProductList componenti oluştur.+
//bu component içerisinde ekleme formu olsun.(Name)+
//Bu  componenti app.component'de çağor.+
//sayfa yüklenir yüklenmez product isimleri listelenecek!+
//2 way data binding
//Reactive Forms araştırıp  geçir
//
//Ekleme formu ile ürün eklendiğinde liste otomatik yenilecek.+

//<ul>
//<li <button> Delete </button> </li>

//</ul>

//Delete butonu basıldığında ilgili eleman silinsin.
