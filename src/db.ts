
import { Config } from '@foal/core';
import { DataSource } from 'typeorm';

export function createDataSource(): DataSource {

  const Source = new DataSource({

    type: Config.getOrThrow('database.type', 'string') as any,
    //type: 'postgres',
    
    url: Config.get('database.url', 'string'), 
    //url:'postgres://cankvfix:KB4cnm-mIFHfmYPFeyKtPXxq4NZ9J3EE@mahmud.db.elephantsql.com/cankvfix',
    host: Config.get('database.host', 'string'),
    //host: 'mahmud.db.elephantsql.com',
    port: Config.get('database.port', 'number'),
    //port : 5432,
    username: Config.get('database.username', 'string'),
    //username: 'cankvfix',
    password: Config.get('database.password', 'string'),
    //password: 'KB4cnm-mIFHfmYPFeyKtPXxq4NZ9J3EE',
    database: Config.get('database.database', 'string'),
    //database: 'cankvfix',

    dropSchema: Config.get('database.dropSchema', 'boolean', false),
    synchronize: Config.get('database.synchronize', 'boolean', false),

    entities: ['build/app/**/*.entity.js'],
    migrations: ['build/migrations/*.js'],
  });

  

  return Source
}

export const dataSource = createDataSource();