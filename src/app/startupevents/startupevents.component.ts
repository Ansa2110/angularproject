import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppliedUser } from '../store/login.interface';
import { UserService } from '../store/user.service';
import { ResultTypePipe} from './startupevents.pipe';
import { error } from 'console';



interface Participant {
  name: string;
  surname: string;
  age: string;
  phonenumber: string;
  email: string;
  status: string;
}

interface StartupEvent {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  type: string;
  deadline: string;
  participants: Participant[];
  photourl: string;
}

@Component({
  selector: 'app-startupevents',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, ResultTypePipe],
  templateUrl: './startupevents.component.html',
  styleUrl: './startupevents.component.scss'
})
export class StartupeventsComponent {
  startupEvents: StartupEvent[] = [];
  eventTypes: string[] = [];
  selectedType: string = '';
  appliedUser: AppliedUser | null = null;
  email: string | undefined;
  isLoading: boolean = false;
  constructor(private http: HttpClient, private userService: UserService) {}
  ngOnInit(): void
  {
    this.fetchStartupEvent();
  }
  ngDoCheck()
  {
    this.appliedUser = this.userService.getUserFromLocalStorage
  }
  fetchStartupEvent() {
    this.appliedUser = this.userService.getUserFromLocalStorage
    this.isLoading = true;
    this.http.get<StartupEvent[]>('https://65f1afc9034bdbecc763605d.mockapi.io/api/angularproject/startupevents')
        .subscribe(data => {
          this.startupEvents = data;
          this.eventTypes = [...new Set(data.map(event => event.type))];
          this.isLoading = false;
        }, error => {
          console.error('Error fetching startup events', error);
          this.isLoading = false;
        }
      )
  }
  get filteredEvents(): StartupEvent[] {
    if (!this.selectedType) {
      return this.startupEvents;
    } else {
      return this.startupEvents.filter(event => event.type === this.selectedType);
    }
  }
  apply(event: StartupEvent): void
  {
    if(this.appliedUser)
    {
      const participant: Participant =
      {
        name: this.appliedUser.name,
        surname: this.appliedUser.surname,
        age: this.appliedUser.age,
        phonenumber: this.appliedUser.phonenumber,
        email: this.appliedUser.email,
        status: "Under consideration"
      }
      event.participants.push(participant)
      this.http.put(`https://65f1afc9034bdbecc763605d.mockapi.io/api/angularproject/startupevents/${event.id}`, event)
      .subscribe(response => {
        console.log('Данные успешно отправлены на сервер', response);
      }, error => {
        console.error('Произошла ошибка при отправке данных на сервер', error);
      });
    }
  }


}
