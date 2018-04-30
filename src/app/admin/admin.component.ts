import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Product, Table } from "../data-model";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { TableService } from '../services/table.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  products: Product[] = [];
  product = new Product();
  tables: Table[] = [];
  table = new Table();
  ploading: boolean = false;
  tloading: boolean = false;
  pAction: string;
  tAction: string;
  productForm: FormGroup;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private tableService: TableService) {
  }

  ngOnInit(): void {
    this.initProductForm();
    this.productService.getProducts()
      .then(p => {
        this.products = p.products;
      });

    this.tableService.getTables()
      .then(t => {
        this.tables = t.tables;
      })
  }

  initProductForm() {
    this.productForm = this.fb.group({
      _id: '',
      name: ['', Validators.required],
      price: 0,
      ordinal: 0,
      imageFile: '',
      image: ''
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.productForm.get('imageFile').setValue(file);
      this.productForm.get('image').setValue(file.name);
      $('.custom-file-label').html(file.name)
    }
  }

  clearFile() {
    this.productForm.get('imageFile').setValue(null);
    this.productForm.get('image').setValue(null);
    this.fileInput.nativeElement.value = '';
    $('.custom-file-label').html("Choose file...")
  }

  prepareSave(): any {
    let formInput = new FormData();
    Object.keys(this.productForm.controls).forEach(key => {
      if ((this.pAction == "c" && key != "_id") || this.pAction == "u")
        formInput.append(key, this.productForm.get(key).value);
    });
    return formInput;
  }

  showCreateProductModal(): void {
    this.product = new Product();
    this.pAction = "c";
    this.createProductForm(this.product);
    $('#createProductModal').modal('show');
  }

  createProduct(): void {
    const formInput = this.prepareSave();
    this.ploading = true;
    if (this.pAction == "c") {
      this.productService.createProduct(formInput)
        .then(p => {
          $('#createProductModal').modal('hide');
          this.ploading = false;

          var position = this.products.filter(x => x.ordinal <= p.product.ordinal).length;
          this.products.splice(position, 0, p.product);
        });
    }
    else if (this.pAction == "u") {
      this.productService.updateProduct(formInput)
        .then(pt => {
          $('#createProductModal').modal('hide');
          this.ploading = false;

          this.products = this.products.map(x => {
            if (pt.product._id !== x._id) {
              return x;
            }
            return { ...x, ...pt.product };
          })
        })
    }
  }

  showUpdateProductModal(product: Product): void {
    this.product = product;
    this.pAction = "u";
    this.createProductForm(this.product);
    $('#createProductModal').modal('show');
  }

  createProductForm(product: Product) {
    this.productForm.get('_id').setValue(product._id);
    this.productForm.get('name').setValue(product.name);
    this.productForm.get('price').setValue(product.price);
    this.productForm.get('ordinal').setValue(product.ordinal);
    this.productForm.get('image').setValue(product.image);
  }

  updateProduct(): void {
    const formInput = this.prepareSave();
    this.ploading = true;
  }

  showDeleteProductModal(product: Product): void {
    this.product = product;
    $('#deleteProductModal').modal('show');
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.product)
      .then(p => {
        $('#deleteProductModal').modal('hide');
        this.products = this.products.filter(x => x._id != this.product._id);
      })
  }

  /////////// Table

  showCreateTableModal(): void {
    this.table = new Table();
    this.tAction = "c";
    $('#createTableModal').modal('show');
  }

  createTable(): void {
    this.tloading = true;
    if (this.tAction == "c") {
      this.tableService.createTable(this.table)
        .then(tb => {
          $('#createTableModal').modal('hide');
          this.tloading = false;

          var position = this.tables.filter(x => x.ordinal <= tb.table.ordinal).length;
          this.tables.splice(position, 0, tb.table);
        });
    }
    else if (this.tAction == "u") {
      this.tableService.updateTable(this.table)
        .then(tb => {
          $('#createTableModal').modal('hide');
          this.tloading = false;

          this.tables = this.tables.map(x => {
            if (tb.table._id !== x._id) {
              return x;
            }
            return { ...x, ...tb.table };
          })
        })
    }
  }

  showUpdateTableModal(table: Table): void {
    this.table = table;
    this.tAction = "u";
    $('#createTableModal').modal('show');
  }

  showDeleteTableModal(table: Table): void {
    this.table = table;
    $('#deleteTableModal').modal('show');
  }

  deleteTable(): void {
    this.tableService.deleteTable(this.table)
      .then(p => {
        $('#deleteTableModal').modal('hide');
        this.tables = this.tables.filter(x => x._id != this.table._id);
      })
  }
}
