import {ISession} from 'connect-typeorm';
import { Column, Entity, Index, PrimaryColumn, DeleteDateColumn } from 'typeorm';

@Entity({name:'sessions'})
export class SessionEntity implements ISession{
    @Index()
    @Column('bigint')
    expiredAt = Date.now();

    @PrimaryColumn('varchar',{length:255})
    id:string='';

    @Column('text')
    json='';

    @DeleteDateColumn({type:'timestamp',nullable:false})
    destroyedAt:Date;
    // @Column({type:'timestamp',nullable:false,deleteDate:true})
    // deletedAt:Date;
}