import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver, GraphQLField, GraphQLResolveInfo } from 'graphql';
// import {AuthenticationError, ForbiddenError} from 'apollo-server-express';
import { Role } from '../../models/users';
import { ForbiddenException } from '@nestjs/common';

class AuthRequiredDirective extends SchemaDirectiveVisitor {
    // eslint-disable-next-line class-methods-use-this
    visitFieldDefinition(field: GraphQLField<any, any>) {
        const { resolve = defaultFieldResolver } = field;
        const requiredAuthRole = this.args.role;

        /* eslint @typescript-eslint/no-explicit-any: 0 */
        // eslint-disable-next-line no-param-reassign
        field.resolve = async (...args: [any, { [key: string]: any }, any, GraphQLResolveInfo]) => {
            const context = args[2];
            // console.log(args);

            const { user_id, user_role }: { user_id: string, user_role: Role } = context;

            if (!user_id) {
                throw new ForbiddenException('You must be logged in');
            }

            if (requiredAuthRole === 'User' && user_role === 'Admin') {
                return resolve.apply(this, args);
            }

            if (requiredAuthRole) {
                if (user_role !== requiredAuthRole) {
                    throw new ForbiddenException(`You must have role ${requiredAuthRole} to access`);
                }
            }

            return resolve.apply(this, args);
        };
    }
}

export { AuthRequiredDirective };
