import 'styled-components';

import type { IAppTheme } from '../styles/app-theme';

declare module "styled-components" {
  export interface DefaultTheme extends IAppTheme {}
}
