import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const toastr = inject(ToastrService)

  return next(req).pipe(
    catchError(m => {
      if (m) {
        switch (m.status) {
          case 400:
            if (m.error.errors) {
              const modalStateError = [];
              for (const key in m.error.errors) {
                if (m.error.errors[key]) {
                  modalStateError.push(m.error.errors[key]);
                }
              }
              throw modalStateError.flat();
            } else {
              toastr.error(m.error, m.status);
            }
            break;
          case 401:
            toastr.error("unauthorized", m.status);
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras: NavigationExtras = { state: { error: m.error } };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            toastr.error("Something unexpected went wrong");
            break;
        }
      }
      throw m;
    })
  );
};
