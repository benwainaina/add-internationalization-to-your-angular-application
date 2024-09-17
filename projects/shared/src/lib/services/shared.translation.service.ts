import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

interface ILanguage {
  /**
   * for example en
   */
  key: string;

  /**
   * for example Englinsh
   */
  label: string;
}

@Injectable({
  providedIn: 'root',
})
export class SharedTranslationService {
  private _currentLanguage$: BehaviorSubject<string>;
  private _availableLanguages$: Observable<Array<ILanguage>>;
  private _translateService: TranslateService = inject(TranslateService);

  constructor() {
    this._currentLanguage$ = new BehaviorSubject('en');
    this._availableLanguages$ = of([
      { key: 'sw', label: 'APP.LANGUAGES.SW' },
      { key: 'ar', label: 'APP.LANGUAGES.AR' },
      { key: 'pt', label: 'APP.LANGUAGES.PT' },
      { key: 'es', label: 'APP.LANGUAGES.ES' },
      { key: 'en', label: 'APP.LANGUAGES.EN' },
      { key: 'de', label: 'APP.LANGUAGES.DE' },
    ]);
    this._setLanguageInUse('en');
  }

  public getAvailableLanguages(): Observable<Array<ILanguage>> {
    return this._availableLanguages$;
  }

  public getCurrentLanguage(): Observable<string> {
    return this._currentLanguage$;
  }

  public setCurrentLanguage(languageKey: string): void {
    this._setLanguageInUse(languageKey);
  }

  private _setLanguageInUse(languageKey: string): void {
    this._currentLanguage$.next(languageKey);
    this._translateService.use(languageKey);
  }

  public translate(contentKey: string): string {
    return this._translateService.instant(contentKey);
  }
}
