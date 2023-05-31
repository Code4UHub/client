import { OpenQuestion } from 'types/Questions/OpenQuestion';
import { ClosedQuestion } from 'types/Questions/CloseQuestion';

export type Assignment = Array<OpenQuestion | ClosedQuestion>;
