import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Creado con ♥ por <b><a href="https://github.com/NTHINGs" target="_blank">NTHINGs</a></b> 2019
    </span>
    <div class="socials">
      <a href="#" target="_blank" class="ion ion-social-github">https://github.com/NTHINGs</a>
    </div>
  `,
})
export class FooterComponent {
}
