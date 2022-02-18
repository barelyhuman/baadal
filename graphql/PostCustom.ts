import { Post, PostCrudResolver } from "@generated/type-graphql";
import { PrismaClient } from "@prisma/client";
import { Arg, Query, Resolver } from "type-graphql";

const prisma = new PrismaClient();

@Resolver()
export class PostResolverExtended extends PostCrudResolver {
  @Query((returns) => [Post!])
  async customQuery() {
    return await prisma.post.findMany();
  }
}
