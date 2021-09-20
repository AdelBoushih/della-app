export type Answer = Record<string, AnswerMetadata>;

export interface AnswerMetadata {
  input: {
    question: string;
    normalization?: string;
  };
  predictions: {
    confidence: number;
    isSilent: boolean;
    textSelection: TextSelection;
  }[];
}

export interface TextSelection {
  text: string;
  textStartOffset?: number;
  textEndOffset?: number;
  evidence: string;
  evidenceStartOffset?: number;
  evidenceEndOffset?: number;
}
