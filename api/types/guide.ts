export interface IGuide {
  id: number;
  name: string;
  content: string;
}

export interface IGuideCreate {
  name: string;
  content: string;
}

export interface IGuideUpdate {
  content: string;
}