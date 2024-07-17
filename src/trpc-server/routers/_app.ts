import db from "@/trpc-server/db";
import * as trpcNext from "@trpc/server/adapters/next";
import { procedure, router } from "../trpc";
import { z } from "zod";

export const appRouter = router({
  health: procedure.query(({ ctx }) => {
    return "hello";
  }),
  firstPost: procedure.query(async ({ ctx }) => {
    try {
      return db.post.findFirst();
    } catch (error) {}
  }),
  user: procedure.input(z.number()).query(async ({ input, ctx }) => {
    try {
      return db.user.findUnique({
        where: {
          id: input,
        },
      });
    } catch (error) {}
  }),
  allPosts: procedure.query(async ({ ctx }) => {
    try {
      return db.post.findMany();
    } catch (error) {}
  }),
  removePost: procedure.input(z.number()).mutation(async ({ input }) => {
    try {
      return db.post.delete({
        where: {
          id: input,
        },
      });
    } catch (error) {}
  }),
  createPost: procedure.input(z.number()).mutation(async ({ input, ctx }) => {
    try {
      return db.user.update({
        where: {
          id: input,
        },
        data: {
          posts: {
            create: {
              title: "No title",
              content:
                "Ad sit eu exercitation reprehenderit id nostrud ex fugiat ex fugiat.",
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }),
});

export type AppRouter = typeof appRouter;
export { trpcNext };
