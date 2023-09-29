import { ReactNode } from 'react';

export interface Props {
  children?: ReactNode,
  title?: string,
  products?: any,
  sale?: any,
  removeItem?: any,
  setSale?: any
}