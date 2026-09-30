import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    date: z.coerce.date(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    // Hidden posts are left off the home page but still built and tagged.
    hidden: z.boolean().default(false),
    // Loads Video.js for posts that embed <GoogleDrivePlayer />.
    videos: z.boolean().default(false),
    recipe: z
      .object({
        image: z.string(),
        imagecredit: z.url().optional(),
        recipecredit: z.url().optional(),
        servings: z.coerce.string(),
        prep: z.string(),
        cook: z.string(),
        ingredients: z.string(),
        directions: z.string(),
      })
      .optional(),
  }),
});

export const collections = { posts };
