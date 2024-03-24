import { Pipe, PipeTransform } from '@angular/core';
import { StartupEvent } from '../store/login.interface';

@Pipe({
  name: 'resultType',
  standalone: true
})
export class ResultTypePipe implements PipeTransform {
    transform(event: StartupEvent, appliedUser: any): string {
        let text = '';

        const email = appliedUser?.email;
        const user = event.participants.find(participant => participant.email === email);

        if (user && appliedUser) {
          switch(user.status) {
            case 'Deny':
              text = "Deny";
              break;
            case 'Application passed':
              text = "Application passed";
              break;
            case 'Under consideration':
              text = "Under consideration";
              break;
            default:
              text = '';
          }
        } else {
          text = appliedUser ? '' : "Need to login";
        }

        return text;
      }
}
