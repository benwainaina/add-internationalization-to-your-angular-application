import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedTranslationService } from '../../projects/shared/src/lib/services/shared.translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, AsyncPipe, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public title: string = 'Internationalization In Angular';
  public sharedTranslateService: SharedTranslationService = inject(
    SharedTranslationService
  );

  public sendShoutOut(): void {
    const availableShoutOuts = [
      'APP.SHOUTOUTS.OPTIONS.WORLD',
      'APP.SHOUTOUTS.OPTIONS.BAE',
      'APP.SHOUTOUTS.OPTIONS.YOUTUBE',
      'APP.SHOUTOUTS.OPTIONS.EARTH',
    ];
    alert(
      `${this.sharedTranslateService.translate(
        'APP.SHOUTOUTS.HELLO'
      )} ${this.sharedTranslateService.translate(
        availableShoutOuts[
          Math.floor(Math.random() * availableShoutOuts.length)
        ]
      )}`
    );
  }
}
