export interface ModelLoadStatus {
  data: {
    status: string;
    output: ModelOutput[];
  }
}

interface ModelOutput {
  label: string,
  score: number
}
