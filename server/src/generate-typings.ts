import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
    typePaths: ['./src/**/*.graphql'], // ./**/*.graphql 
    path: join(process.cwd(), 'src/graphql.ts'),
    outputAs: 'class',
    watch: true // Doesn't work because of chokidar version 3.1.1 doesn't watch in windows. Updated chokidar to 3.2.0 manually for node_modules/@nest/graphql
});