import { Component} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addSuggestedEvent } from '../store/login.actions';
import { UserService } from '../store/user.service';


@Component({
  selector: 'app-suggestedeventform',
  standalone: true,
  imports: [FormsModule, HeaderComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './suggestedeventform.component.html',
  styleUrl: './suggestedeventform.component.scss'
})

export class SuggestedeventformComponent {
  eventForm!:FormGroup;
  isApplied = false;
  currentUser: string | null = null;
  constructor(private fb: FormBuilder, private store: Store, private userService: UserService) {}
  Logged = false;

  ngOnInit()
  {
    this.eventForm = this.fb.group({
      eventname: ['', Validators.required],
      date: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      location: ['', Validators.required],
      description: ['', Validators.required],
      typeevent: ['', Validators.required],
      deadline: ['',[Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      photourl: ['',[Validators.required, Validators.pattern(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(:[0-9]+)?(\/\S*)?$/)]],
    })
    this.Logged = this.userService.isLogged()
  }

  ngDoCheck()
  {
    this.Logged = this.userService.isLogged()
  }

  addEvent()
  {
    if(this.eventForm.valid)
    {
      const event = this.eventForm.value;
      this.store.dispatch(addSuggestedEvent({eventname: event.eventname, date: event.date, location: event.location, description: event.description, typeevent: event.typeevent, deadline: event.deadline, photourl: event.photourl}))
      this.eventForm.reset()
      this.isApplied = true;
      setTimeout(() => {
        this.isApplied = false;
      }, 10000)
    }
  }

}
