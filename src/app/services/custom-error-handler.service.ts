import { ErrorHandler, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandler  implements ErrorHandler {

  constructor(
      private toastr: ToastrService,
  ) { }

  handleError(error: any): void {
    // Überprüfe, ob der Fehler vom Typ 'Error' ist und eine eigene Meldung hat
    if (error instanceof Error && error.message) {
      this.toastr.error(error.message, '2222'); // Benutze die Meldung aus dem Fehlerobjekt
    } else {
      this.toastr.error('Ein allgemeiner Fehler ist aufgetreten'); // Fallback-Meldung
    }
    console.error(error); // Logge den Fehler in die Konsole
  }
}
