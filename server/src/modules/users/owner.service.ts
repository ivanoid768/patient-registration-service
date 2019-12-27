import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Owner } from 'src/models/owner';
import { Model } from 'mongoose';

@Injectable()
export class OwnerService {
    constructor(
        @InjectModel(Owner.OwnerToken) private readonly ownerModel: Model<Owner.IOwner>
    ){}
}
