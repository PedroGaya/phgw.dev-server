export type Post = {
  createdAt: Date;
  key: string;
  title: string;
  subtitle: string | null;
  content: string;
  category: string | undefined;
  series: string | undefined;
  tags: string[];
};
