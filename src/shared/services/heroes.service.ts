import {heroesList} from '@/models/heroes';

export function getHeroes(): Promise<{ status: number; data: any[] | {} }> {
    return new Promise((resolve) => {
        resolve({
            status: 200,
            data: {
                data: heroesList,
            },
        });
    });
}
