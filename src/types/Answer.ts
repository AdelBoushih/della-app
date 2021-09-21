export type Answer = Record<string, AnswerMetadata>;

export interface AnswerMetadata {
  input: {
    question: string;
    normalization?: string;
  };
  predictions: {
    confidence: number;
    isSilent: boolean;
    normalizedValue: string;
    exception: Boolean;
    textSelection: TextSelection;
  }[];
  userCorrection: {
    textSelections: UserTextSelection[];
    normalizedValue: string;
    exception: Boolean;
    comment: string;
  };
}

interface Selection {
  isSilent: boolean;
  text: string;
  textStartOffset?: number;
  textEndOffset?: number;
}

export interface TextSelection extends Selection {
  evidence: string;
  evidenceStartOffset?: number;
  evidenceEndOffset?: number;
}

export interface UserTextSelection extends Selection {
  userTextCorrection: string;
}
