//https://dev.to/tylerlwsmith/using-a-typescript-interface-to-define-model-properties-in-objection-js-1231

import { Model } from 'objection';

export default class MovieModel extends Model {
    static tableName = "movies";

    id: number;
    title: string;
    description: string;
    releaseYear: number;
    duration: number;
    rating: number;
}