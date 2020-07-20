import { ModuleWithProviders, mobiscroll } from '../frameworks/angular';
import { MbscInput, MbscInputModule } from '../input.angular';
import { MbscNumpadModule, MbscNumpad, MbscNumpadDecimal, MbscNumpadDate, MbscNumpadTime, MbscNumpadTimespan, MbscNumpadOptions, MbscNumpadComponent, MbscNumpadDateComponent, MbscNumpadDecimalComponent, MbscNumpadTimeComponent, MbscNumpadTimespanComponent, MbscNumpadDateOptions, MbscNumpadDecimalOptions, MbscNumpadTimeOptions, MbscNumpadTimespanOptions } from '../numpad.angular';
declare class MbscModule {
    static forRoot(config: {
        angularRouter: any;
    }): ModuleWithProviders;
}
export { mobiscroll, MbscNumpad, MbscNumpadDecimal, MbscNumpadDate, MbscNumpadTime, MbscNumpadTimespan, MbscNumpadComponent, MbscNumpadDateComponent, MbscNumpadDecimalComponent, MbscNumpadTimeComponent, MbscNumpadTimespanComponent, MbscInput, MbscNumpadOptions, MbscNumpadDateOptions, MbscNumpadDecimalOptions, MbscNumpadTimeOptions, MbscNumpadTimespanOptions, MbscModule, MbscInputModule, MbscNumpadModule, };
