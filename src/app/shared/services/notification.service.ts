import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, tittle = 'Sucesso') {
    this.toastr.success(message, tittle);
  }

  showError(message: string, tittle = 'Erro') {
    this.toastr.error(message, tittle);
  }

  showInfo(message: string, tittle = 'Informe') {
    this.toastr.info(message, tittle);
  }

  showWarning(message: string, tittle = 'Aviso') {
    this.toastr.warning(message, tittle);
  }
}
