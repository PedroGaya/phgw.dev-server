export type Post = {
  createdAt: Date;
  title: string;
  subtitle: string | null;
  content: string;
  category: string | undefined;
  series: string | undefined;
  tags: string[];
};
