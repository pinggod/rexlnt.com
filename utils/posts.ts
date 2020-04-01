// @ts-nocheck
const importAll = (r): any => r.keys().map(r);

export interface Post {
    meta: {
        title: string;
        date: string;
        slug: string;
    };
    children?: JSX.Element;
}

export const posts: Post[] = importAll(
    require.context('../pages/posts', false, /.mdx$/)
).sort((a, b) =>
    new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
);
