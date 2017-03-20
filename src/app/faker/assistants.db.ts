/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Assistant} from "../components/assistant/assistant";
export const AssistantsDb: Assistant[] = [
    {id: 1, title: 'Assistant 1', email: 'assist1@mydocrtors.com', comment: 'This is the first assistant in the list', ref_key: 'a1', picture: 'assets/img/app/profile/Vlad.png'},
    {id: 2, title: 'Assistant 2', email: 'assist2@mydocrtors.com', comment: 'This is the second assistant in the list', ref_key: 'a2', picture: ''},
    {id: 3, title: 'Assistant 3', email: 'assist3@mydocrtors.com', comment: 'This is the third assistant in the list', ref_key: 'a3', picture: ''},
    {id: 4, title: 'Assistant 4', email: 'assist4@mydocrtors.com', comment: 'This is the fourth and also the last assistant in the list', ref_key: 'a4', picture: ''},
].map(x => new Assistant(x.id, x.title, x.email, x.comment, x.ref_key, x.picture));
