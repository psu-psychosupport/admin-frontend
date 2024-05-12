export enum TestTypes {
  OPTIONS,
  INPUT,
}

export interface ITestForm {
  title: string;
  type: TestTypes;
  options?: string[];
  validOptionIndex?: number;
  validTextInput?: string;
}