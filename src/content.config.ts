import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const jogos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/jogos' }),
  schema: z.object({
    titulo: z.string(),
    descricao: z.string(),
    status: z.enum(['jogavel', 'em-desenvolvimento']),
    autores: z.array(z.enum(['jojo', 'bento'])),
    ordem: z.number(),
    destaque: z.boolean().default(false),
    // caminho da imagem de capa dentro de /public (ex.: /capas/heroi.webp)
    capa: z.string().optional(),
    // cores do degradê usado quando o jogo ainda não tem capa
    cores: z.tuple([z.string(), z.string()]).default(['#3b2f8f', '#ff8a5b']),
    // onde o jogo abre
    url: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string(),
    data: z.coerce.date(),
    // slug (nome do arquivo) do jogo ao qual o post se refere, se houver
    jogo: z.string().optional(),
  }),
});

export const collections = { jogos, blog };
