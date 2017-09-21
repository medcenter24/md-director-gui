/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Media } from '../components/media/media';
export const MediaDb: Media[] = [
  {id: 1, path: 'assets/img/app/profile/Vlad.png', alt: 'Profile picture Vlad'},
].map(x => new Media(x.id, x.path, x.alt));
