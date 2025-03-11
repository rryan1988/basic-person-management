import { Router } from "@angular/router";

export function navigateWithAnimation(url: string, rootSelector: string, router: Router, timeout: number): void {
    const element = document.querySelector(rootSelector);
    if (element) {
      element.classList.add('fade-out');
      setTimeout(() => {
        router.navigate([url]);
      }, timeout); // Match the duration of the leave animation
    } else {
      router.navigate([url]);
    }
  }