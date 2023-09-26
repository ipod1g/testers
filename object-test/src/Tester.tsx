export type Page = {
  name: string;
  id: number;
  content: JSX.Element;
};

export type ModalData = {
  [key: string]: Page[];
};

export const modalData: ModalData = {
  first: [
    { name: 'About us', id: 1, content: <h1>Page 1</h1> },
    { name: 'About us 2', id: 2, content: <h1>Page 2</h1> },
    { name: 'About us 3', id: 3, content: <h1>Page 3</h1> },
    { name: 'About us 4', id: 4, content: <h1>Page 4</h1> },
  ],
  second: [
    { name: 'About us', id: 1, content: <h1>Page 1</h1> },
    { name: 'About us 2', id: 2, content: <h1>Page 2</h1> },
  ],
};

export default modalData;
