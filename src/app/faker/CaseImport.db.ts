/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { ImportedFile } from '../components/importer/importedFile';

export const CaseImportDb: ImportedFile[] = [
  {fileName: 'file_1_name.docx', status: 'success', report: 'Has been already pushed'},
  {fileName: 'file_2_name.docx', status: 'fail', report: 'Report message what was the reason which broke importer'},
  {fileName: 'file_3_name.docx', status: 'fail', report: '<div class="lead">Head</div><div class="small">Html body with cause of the fail</div>'},
].map(x => new ImportedFile(x.fileName, x.status, x.report));
