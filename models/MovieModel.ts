//https://dev.to/tylerlwsmith/using-a-typescript-interface-to-define-model-properties-in-objection-js-1231

import { Model } from 'objection';
import LikeModel from 'models/LikeModel';

export default class MovieModel extends Model {
    static tableName = "movies";

    id: number;
    title: string;
    description: string;
    releaseYear: number;
    duration: number;
    rating: number;
    liked: any;

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['title', 'description', 'releaseYear', 'duration', 'rating'],
            properties: {
                id: { type: 'integer' },
                title: { type: 'string', minLength: 1, maxLength: 255 },
                description: { type: 'string', minLength: 1 },
                releaseYear: { type: 'integer' },
                duration: { type: 'integer' },
                rating: { type: 'number' }
            }
        }
    }

    static get relationMappings() {
        return {
            liked: {
                relation: Model.HasOneRelation,
                modelClass: LikeModel,
                join: {
                    from: 'movies.id',
                    to: 'likes.movieId'
                }
            }
        }
    }
}