//https://dev.to/tylerlwsmith/using-a-typescript-interface-to-define-model-properties-in-objection-js-1231

import { Model } from 'objection';

export default class LikeModel extends Model {
    static tableName = "likes";
    static idColumn = 'ip';

    ip: string;
    movieId: number;
    liked: boolean;

    
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['ip', 'movieId', 'liked'],
            properties: {
                ip: { type: 'string' },
                movieId: { type: 'integer' },
                liked: { type: 'boolean' }
            }
        }
    }
}