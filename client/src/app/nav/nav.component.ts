import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_service/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent {
  accountservice = inject(AccountService)
  private router = inject(Router)
  private toaster = inject(ToastrService)
  model: any = {};

  Login() {
    this.accountservice.login(this.model).subscribe({
      next: m => {
        this.router.navigateByUrl('/members')
      },
      error: p => this.toaster.error(p.error)
    })
  }

  Logout() {
    this.accountservice.logout();
    this.router.navigateByUrl('/')
  }

}
