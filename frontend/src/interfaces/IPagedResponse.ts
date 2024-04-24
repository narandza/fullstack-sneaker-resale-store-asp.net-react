import { ISneaker, tempSneaker } from "./ISneaker";

export interface IPagedResponse {
  currentPage: number;
  items: ISneaker[];
  itemsPerPage: number;
  pageCount: number;
  totalCount: number;
}

export const tempSneakers: IPagedResponse = {
  currentPage: 1,
  items: [tempSneaker],
  itemsPerPage: 1,
  pageCount: 1,
  totalCount: 1,
};
