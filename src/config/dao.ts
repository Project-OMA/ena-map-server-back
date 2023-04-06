import { PrismaClient } from '@prisma/client';

// Implementar uma typagem do prisma para facilitar o lint no PrismaClientAdapter
export interface PrismaClientAdapter {
    [key: string]: any;
}

const logLevel:any =   ['query', 'info', 'warn', 'error'] 

const dao = new PrismaClient({
  log: logLevel 
});


export default dao;

export const models: PrismaClientAdapter = {
  ...dao
};

