import { type IBlog } from '@/shared/model/blog.model';
import { type ITag } from '@/shared/model/tag.model';

export interface IPost {
  id?: number;
  title?: string;
  content?: string;
  date?: Date;
  blog?: IBlog | null;
  tags?: ITag[] | null;
}

export class Post implements IPost {
  constructor(
    public id?: number,
    public title?: string,
    public content?: string,
    public date?: Date,
    public blog?: IBlog | null,
    public tags?: ITag[] | null,
  ) {}
}
