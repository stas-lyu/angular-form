import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from "@angular/forms";
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";

interface Technology {
  angular: object;
  react: object;
  vue: object;
}

interface TechnologyVersion {
}

@Component({
  selector: 'form-component',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  formData: any[] = [
    {label: 'hobby', placeholder: 'Your favorite hobby', value: 'name'},
    {label: 'duration', placeholder: 'how long have you been doing this hobby', value: 'duration'},
  ]
  hobbiesGroup = new FormGroup({
    first: new FormControl(''),
    second: new FormControl('')
  });

  hobbies: any[] = []

  nameControl = new FormControl;
  surnameControl = new FormControl;
  emailControl = new FormControl;
  versionControl = new FormControl;
  disableSelect = new FormControl(true);
  technologyControl = new FormControl;
  submitControl = new FormControl;
  datepickerControl = new FormControl;
  hobbiesNameControl = new FormControl;
  isDisabled = true;
  current = '';
  payLoad = '';

  technologies: Technology = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  }

  technologyVersion: TechnologyVersion[] = []

  ngOnInit() {
    this.setSettings(this.formData)
    this.nameControl = new FormControl('', [Validators.required]);
    this.surnameControl = new FormControl('', [Validators.required]);
    // @ts-ignore
    this.emailControl = new FormControl('', [Validators.required, Validators.email], [emailValidator]);
    this.datepickerControl = new FormControl('', [Validators.required]);
    this.technologyControl = new FormControl('', Validators.required);
    this.versionControl = new FormControl({value: '', disabled: true}, Validators.required);
    this.submitControl = new FormControl('');

    this.technologyControl.valueChanges.subscribe((value => {
      if (value != null) {
        this.technologyVersion = [];
        this.isDisabled = false;
        this.current = value;
        Object.entries(this.technologies).forEach((item) => {
          if (item[0] === value) {
            item[1].forEach((v: TechnologyVersion) => {
              this.technologyVersion.push(v)
            })
          }
        })
      }
    }));
  }

  addHobbiesField() {
    this.hobbies.push(this.hobbiesGroup.value);
    this.formData.push(
      {label: 'hobby', placeholder: 'Your favorite hobby', value: 'name'},
      {label: 'duration', placeholder: 'how long have you been doing this hobby', value: 'duration'}
    );
  }

  onSubmit() {
    this.hobbies.push(this.hobbiesGroup.value);
    let data = {
      firstName: this.nameControl.value,
      lastName: this.surnameControl.value,
      dateOfBirth: this.datepickerControl.value,
      framework: this.technologyControl.value,
      frameworkVersion: this.versionControl.value,
      email: this.emailControl.value,
      hobby: this.hobbies,
    }
    alert(JSON.stringify(data))
  }

  setSettings(formData: any[]) {
    let form: any = {};
    for (let i = 0; i < formData.length; i++) {
      form[formData[i].value] = new FormControl('');
    }

    this.hobbiesGroup = new FormGroup(form);
  }
}


function emailValidator(formControl: FormControl): Observable<any | null> {
  if (formControl.value === 'test@test.test') {
    return of({emailValidator: {message: 'Already create'}}).pipe(delay(2000))
  } else {
    return of(null)
  }
}

