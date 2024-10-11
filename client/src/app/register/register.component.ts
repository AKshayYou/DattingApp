import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_service/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountService)
  model: any = {}
  // userFromHomeComponent = input.required<any>();
  cancelRegister = output<boolean>();

  register() {
    this.accountService.Register(this.model).subscribe({
      next: m => {
        console.log(m);
        this.cancel();
      },
      error: p => { console.log(p); }
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
