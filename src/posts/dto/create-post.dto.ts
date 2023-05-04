export class CreatePostDto {
  readonly title: string;
  readonly description: string;
  readonly categories: string[];
  readonly image: string;
  readonly author: string;
}
