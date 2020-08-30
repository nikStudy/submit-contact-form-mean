import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactData } from './contactData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Contact Us';
  contactForm: FormGroup;
  name: string;
  email: string;
  phone: string;
  message: string = '';
  datasaved: boolean = false;

  constructor(private formbuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.contactForm = this.formbuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      subject: [null, Validators.required],
      mssg: [null]
    });
  }

  postdata() {
    this.datasaved = false;
    this.message = '';
    this.email = this.contactForm.get('email').value;
    console.log(this.contactForm.value);
    console.log('Server received our data');
    this.createContact(this.contactForm.value);
  }

  createContact(data: ContactData){
    this.createContactForm(data).subscribe(data =>{
      // this.contactForm.reset();
      console.log(data);
      if (data.success) {
        this.contactForm.reset();
        this.datasaved = true;
        this.message = data.message;
      }
    });
  }

  url = 'http://localhost:4000/email/';
  createContactForm(data: ContactData): Observable<ContactData>{
    let httpheader= new HttpHeaders().set('Content-Type', 'Application/Json');
    let options = {
      headers: httpheader
    }
    return this.http.post<ContactData>(this.url, data, options);
  }
}
