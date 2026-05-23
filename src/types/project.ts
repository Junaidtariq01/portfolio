export interface projectProps {
  id: number;
  title: string;
  deployURL: string;
  gitURL: string;
  content: string;
  category: string;
  thumbnail: string;
  year: string;
  technologies: string[];
  isListView?: boolean;
}
