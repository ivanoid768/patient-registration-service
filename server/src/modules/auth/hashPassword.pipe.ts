import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordPipe implements PipeTransform {

    async transform(value: any, metadata: ArgumentMetadata) {

        let passwordKey = metadata.data || 'password';

        if (value[passwordKey]) {
            let pass = value[passwordKey] as string;
            if (/^[a-zA-Z0-9$@$!%*?&#^-_.+]{8,}$/i.test(pass)) {
                const saltRounds = 10;
                const passhash = await bcrypt.hash(pass, saltRounds)
                value[passwordKey] = passhash;
            }else{
                throw new BadRequestException('Password length must be at least 8, password must not contain any spaces and non latin (english) letters!')
            }
        }

        return value;
    }
}
