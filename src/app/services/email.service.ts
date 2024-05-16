import { Injectable } from '@angular/core';
import { ParseHttpResponse, ParseService } from '@pagmf/parse';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private parseService: ParseService) { }

  async sendPasswordResetEmail(email: string) {
    try {
      await this.parseService.Parse.User.requestPasswordReset(email);
      // alert(`Success! Please check ${email} to proceed with password reset.`);
      // console.log(response)
      return true;
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

}
